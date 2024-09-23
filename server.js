// server.js
const express = require('express');
const mysql = require('mysql2');
const artworkRoutes = require('./artworksRoutes'); // Importa las rutas
require('dotenv').config(); // Carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Usa las rutas
app.use('/api', artworkRoutes); // Prefijo para las rutas de artworks

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
