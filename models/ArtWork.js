// artworkModel.js
const mysql = require('mysql2');

// Conexión a la base de datos (usa las variables de entorno o define tus credenciales aquí)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función para obtener todas las obras
const getAllArtworks = (callback) => {
  const sql = 'SELECT * FROM artworks'; // Asume que tu tabla se llama 'artworks'
  db.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

// Exporta el modelo
module.exports = {
  getAllArtworks,
};
