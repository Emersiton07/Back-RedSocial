const mongoose = require("mongoose");

const obraSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  dueño: {
    nombre: { type: String, required: true },
    contacto: String,
  },
  ubicacion: {
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true },
    direccion: String,
  },
  dimensiones: {
    ancho: { type: Number, required: true },
    alto: { type: Number, required: true },
    unidad: { type: String, default: "cm" },
  },
  imagenes: [String],
  publicada_por: {
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
    nombre: String,
  },
  fecha_publicacion: { type: Date, default: Date.now },
  descripcion: String,
  etiquetas: [String],
  comentarios: [
    {
      usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      nombre_usuario: String,
      comentario: String,
      fecha: { type: Date, default: Date.now },
    },
  ],
  calificaciones: [
    {
      usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
      nombre_usuario: String,
      calificacion: { type: Number, min: 0, max: 5 },
    },
  ],
  promedio_calificaciones: { type: Number, default: 0 },
});

module.exports = mongoose.model("Obra", obraSchema);
