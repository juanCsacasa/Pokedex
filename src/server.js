const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let pokemons = [];

//pokemon search
app.get('/pokemonsearch', (req,res)=>{
  console.log("sirvo");
})

//pokemon display
app.get('/pokemondisplay', (req,res) =>{ 
  console.log("sirvo");
})
//pokemon registration
app.post('/pokemonregistration', (req,res) => {
  const newPokemon = req.body;
  pokemons.push(newPokemon);
  res.status(201).json({ message: 'Pokémon registrado exitosamente', pokemon: newPokemon });
});

//editing and deleting pokemon
app.put('/pokemonedit', (req,res) => {
  console.log("sirvo");
})








app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}`);
});