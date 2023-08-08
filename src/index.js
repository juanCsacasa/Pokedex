// Obtener una referencia al elemento HTML donde deseas mostrar la lista de Pokémon
const pokemonList = document.getElementById('pokemon-list');

// Función para obtener y mostrar la lista de Pokémon
async function fetchAndDisplayPokemons() {
  try {
    const response = await fetch('/Viewpokemons');
    const data = await response.json();
    const pokemons = data.pokemons;

    // Limpiar la lista actual antes de mostrar los nuevos Pokémon
    pokemonList.innerHTML = '';

    // Recorrer la lista de Pokémon y agregarlos a la lista en el frontend
    pokemons.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="poke-card">
          <img src="/uploads/${pokemon.img}" alt="${pokemon.name}" class="poke-image">
          <strong class="poke-title">Nombre:</strong> ${pokemon.name}<br>
          <strong class="poke-title">Tipo:</strong> ${pokemon.type}<br>
          <strong class="poke-title">Evolución:</strong> ${pokemon.evolution}<br>
          <strong class="poke-title">Generación:</strong> ${pokemon.generation}<br>
          <strong class="poke-title">Ataque:</strong> ${pokemon.attack}
        </div>
      `;
      pokemonList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
}

// Llamar a la función para obtener y mostrar la lista de Pokémon al cargar la página
fetchAndDisplayPokemons();

