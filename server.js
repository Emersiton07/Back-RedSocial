const express = require('express');
const cors = require('cors'); // Importa cors
const artworksRoutes = require('./routes/ArtWorksRoutes'); // Ajusta la ruta según tu estructura

const app = express();

// Middleware para permitir CORS
app.use(cors()); // Permitir CORS para todas las solicitudes

// Middleware para parsear JSON
app.use(express.json());

// Usar el router con el prefijo /artworks
app.use('/artworks', artworksRoutes); // Este es el prefijo

// Ruta raíz (opcional)
app.get('/', (req, res) => {
  res.send('API de la Red Social de Arte Mural');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor.');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
