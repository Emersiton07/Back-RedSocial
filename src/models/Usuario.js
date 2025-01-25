const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  contacto: {
    type: String, // Puede ser un email, teléfono, etc.
    required: true,
    unique: true,
  },
  obras_publicadas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Obra", // Relación con el modelo de obras
    },
  ],
  rol: {
    type: String, // Ejemplo: "admin", "artista", "usuario"
    default: "usuario",
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
