const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  images: [String], // Campo para la URL de la imagen
  pokedex_number: String ,
  name: String,
  type: String,
  evolution: String,
  generation: String,
  attack: String,
  weakness: String
});

const pokemons = mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemons;