const express = require("express");
const Obra = require("../models/Obra");
const Usuario = require("../models/Usuario"); // Importar el modelo de usuarios
const router = express.Router();

// Crear una nueva obra
router.post("/", async (req, res) => {
  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findById(req.body.publicada_por.usuario_id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const nuevaObra = new Obra(req.body);
    const obraGuardada = await nuevaObra.save();
    res.status(201).json(obraGuardada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las obras con datos del usuario
router.get("/obtenerObras", async (req, res) => {
  try {
    const obras = await Obra.find().populate("publicada_por.usuario_id", "nombre contacto");
    res.json(obras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una obra
router.put("/:id", async (req, res) => {
  try {
    // Validar si el usuario_id proporcionado existe
    if (req.body.publicada_por?.usuario_id) {
      const usuario = await Usuario.findById(req.body.publicada_por.usuario_id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
    }

    const obraActualizada = await Obra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(obraActualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una obra
router.delete("/:id", async (req, res) => {
  try {
    await Obra.findByIdAndDelete(req.params.id);
    res.json({ message: "Obra eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar un comentario a una obra
router.post("/comentarios/nuevo", async (req, res) => {
  try {
    
    const {obra_id, usuario_id, nombre_usuario, comentario } = req.body;
    const obra = await Obra.findById(obra_id);

    if (!obra) {
      return res.status(404).json({ error: "Obra no encontrada" });
    }

    // Agregar el comentario al array de comentarios
    obra.comentarios.push({ usuario_id, nombre_usuario, comentario, fecha: new Date() });
    await obra.save();

    res.json({ message: "Comentario agregado con éxito", obra });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar comentario", detalle: err.message });
  }
});


module.exports = router;
