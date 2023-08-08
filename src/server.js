const express = require('express');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/style', express.static(path.join(__dirname, '..', 'style')));
app.use('/img', express.static(path.join(__dirname, '..', 'img')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));

let pokemons = [];

//pokemon registration
app.get('/pokemonregistration', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'page', 'index.html'));
});
app.post('/pokemonregistration', (req, res) => {
  const newPokemon = req.body;
  pokemons.push(newPokemon);
  console.log('Nuevo Pokémon agregado:', newPokemon); // Ver si los pokemones se agregan
  res.status(201).json({ message: 'Pokémon registrado exitosamente', pokemon: newPokemon });
});

//pokemon view
app.get('/Viewpokemons', (req, res) => {
  res.json({ pokemons });
});

//editing and deleting pokemon
app.put('/pokemonedit', (req,res) => {
  console.log("sirvo");
})

//pokemon search
app.get('/pokemonsearch', (req,res)=>{
  console.log("sirvo");
})

app.use((req, res) => {
  res.status(404).send('Not found');
});
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});