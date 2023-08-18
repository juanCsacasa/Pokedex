const express = require('express');
const mongoose = require('mongoose'); // Importa el módulo mongoose
const path = require('path');
const multer = require('multer');
const Pokemon = require('./pokeSchema');

const app = express();
const port = 8000;

//Configuracion del multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'), // Ajusta la ruta según tu estructura
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});
const upload = multer({ storage });

// Conectar a MongoDB Atlas
mongoose.connect('mongodb+srv://juan:0804sacasa@cluster0.rghvpdl.mongodb.net/pokedex?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//servir archivos estaticos 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/style', express.static(path.join(__dirname, '..', 'style')));
app.use('/img', express.static(path.join(__dirname, '..', 'img')));
app.use('/src', express.static(path.join(__dirname, '..', 'src')));

// Ruta para mostrar el formulario de registro de Pokemon
app.get('/pokemonregistration', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'page', 'index.html'));
});
// Ruta para registrar un nuevo Pokemon con imágenes
app.post('/pokemonregistration', upload.array('images', 3), async (req, res) => {
  try {
    const newPokemon = req.body;
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`); // Construir URLs completas
    newPokemon.images = imagePaths;
    const createdPokemon = await Pokemon.create(newPokemon);
    console.log('Nuevo Pokémon agregado:', createdPokemon);
    res.status(201).json({ message: 'Pokémon registrado exitosamente', pokemon: createdPokemon });
  } catch (error) {
    console.error('Error al registrar un nuevo Pokémon:', error);
    res.status(500).json({ error: 'Error al registrar un nuevo Pokémon' });
  }
});

//Ruta para ver los pokemones
app.get('/Viewpokemons', async (req, res) => {
  try {
    // Utiliza el método find para obtener todos los Pokémon de la base de datos
    const allPokemons = await Pokemon.find();
    // Envía la respuesta JSON con los Pokémon obtenidos
    res.json({ pokemons: allPokemons });
  } catch (error) {
    console.error('Error al obtener los Pokémon:', error);
    res.status(500).json({ error: 'Error al obtener los Pokémon' });
  }
});

//Ruta para buscar un pokemon por su id
app.get('/pokemonsearch', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    console.log('Received search term on server:', searchTerm); // Agregar este console.log

    const matchingPokemons = await Pokemon.find({ name: searchTerm });
    res.json({ pokemons: matchingPokemons });
  } catch (error) {
    console.error('Error al buscar Pokémon:', error);
    res.status(500).json({ error: 'Error al buscar Pokémon' });
  }
});

// Ruta para eliminar un Pokémon por su ID
app.delete('/pokemon/:id', async (req, res) => {
  try {
    const pokemonId = req.params.id;
    // Eliminar el Pokémon de la base de datos por su ID
    const deletedPokemon = await Pokemon.findByIdAndDelete(pokemonId);
    
    if (deletedPokemon) {
      res.status(204).send(); // Envía una respuesta exitosa sin contenido
    } else {
      res.status(404).json({ error: 'Pokémon not found' });
    }
  } catch (error) {
    console.error('Error al eliminar Pokémon:', error);
    res.status(500).json({ error: 'Error al eliminar Pokémon' });
  }
});



app.use((req, res) => {
  res.status(404).send('Not found');
});
app.listen(port, () => {
  console.log(`La aplicación está escuchando en http://localhost:${port}/pokemonregistration`);
});