const express = require('express');
const app = express();
const artworksRoutes = require('./routes/ArtWorksRoutes');

// Middleware para parsear JSON
app.use(express.json());

// Usar el router con el prefijo /artworks
app.use('/artworks', artworksRoutes); // Este es el prefijo

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
