// Obtener una referencia al elemento HTML donde deseas mostrar la lista de Pokémon
const pokemonList = document.getElementById('pokemon-list');
/*----------------------------------*/
const searchForm = document.getElementById('search-form');
const searchResults = document.getElementById('search-results');

// Función para crear el HTML de una tarjeta de Pokémon
function createPokemonCard(pokemon) {
  const imagesHtml = pokemon.images.map(image => `<img src="${image}" alt="${pokemon.name}" class="poke-image">`).join('');
  const cardHTML = `
    <div class="poke-card">
      ${imagesHtml}
      <p class="poke-title">Pokédex Number:</p> ${pokemon.pokedex_number}
      <p class="poke-title">Name:</p> ${pokemon.name}
      <p class="poke-title">Type:</p> ${pokemon.type}
      <p class="poke-title">Evolution:</p> ${pokemon.evolution}
      <p class="poke-title">Generation:</p> ${pokemon.generation}
      <p class="poke-title">Attack:</p> ${pokemon.attack}
      <p class="poke-title">Weakness:</p> ${pokemon.weakness}
      <div>
      <button class="btnpokemon" data-id="${pokemon._id}">Edit</button>
      <button class="btnpokemon delete-button" data-id="${pokemon._id}">Delete</button>
      </div>
    </div>
  `;
  return cardHTML;
}

// Función para obtener y mostrar la lista de Pokémon
async function fetchAndDisplayPokemons() {
  try {
    const response = await fetch('/Viewpokemons');
    const data = await response.json();
    const pokemons = data.pokemons;
    
    // Limpiar la lista actual antes de mostrar los nuevos Pokémon
    pokemonList.innerHTML = '';

    // Recorrer la lista de Pokémon y agregar las tarjetas al frontend
    pokemons.forEach(pokemon => {
      const listItem = document.createElement('li');
      listItem.innerHTML = createPokemonCard(pokemon);
      pokemonList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error al obtener la lista de Pokémon:', error);
  }
}

// Función para eliminar un Pokémon
async function deletePokemon(pokemonId) {
  try {
    const response = await fetch(`/pokemon/${pokemonId}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      // Recargar la página después de eliminar el Pokémon
      location.reload();
    } else {
      console.error('Error al eliminar Pokémon');
    }
  } catch (error) {
    console.error('Error al eliminar Pokémon:', error);
  }
}

// Agregar un event listener a las tarjetas de Pokémon para manejar la eliminación
document.addEventListener('click', event => {
  if (event.target.classList.contains('delete-button')) {
    const pokemonId = event.target.dataset.id;
    deletePokemon(pokemonId);
  }
});


// Función para mostrar los resultados de búsqueda en tarjetas
function displaySearchResults(pokemons) {
  // Limpiar los resultados de búsqueda anteriores
  searchResults.innerHTML = '';

  // Recorrer los resultados de búsqueda y agregar las tarjetas al frontend
  pokemons.forEach(pokemon => {
    const listItem = document.createElement('li');
    listItem.innerHTML = createPokemonCard(pokemon);
    searchResults.appendChild(listItem);
  });
}
// Función para realizar la búsqueda de Pokémon y mostrar los resultados
async function searchPokemons(searchTerm) {
  console.log('Search term in searchPokemons:', searchTerm); // Agregar este console.log
  try {
    const response = await fetch(`/pokemonsearch?searchTerm=${searchTerm}`);
    console.log('Server response:', response); // Agregar este console.log
    const data = await response.json();
    const matchingPokemons = data.pokemons;
    console.log('Matching pokemons:', matchingPokemons); // Agregar este console.log
    displaySearchResults(matchingPokemons);
  } catch (error) {
    console.error('Error al buscar Pokémon:', error);
  }
}
// Agregar un listener al formulario de búsqueda
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchTerm = document.getElementById('searchTerm').value; // Obtener el valor del campo de búsqueda
  searchPokemons(searchTerm);
});



// Llamar a la función para obtener y mostrar la lista de Pokémon al cargar la página
fetchAndDisplayPokemons();
