// artworkRoutes.js
const express = require('express');
const router = express.Router();
const artworkModel = require('./artworkModel');

// Ruta para obtener todas las obras
router.get('/artworks', (req, res) => {
  artworkModel.getAllArtworks((err, artworks) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(artworks);
  });
});

module.exports = router;
