const mongoose = require("mongoose");
const Usuario = require("../models/Usuario");
const Obra = require("../models/Obra");

// Conexión a MongoDB
async function conexion() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("Error conectando a MongoDB:", err);
  }
}

// Datos ficticios para usuarios
const usuarios = [
  { nombre: "Juan Pérez", contacto: "juan.perez@example.com" },
  { nombre: "Ana Gómez", contacto: "ana.gomez@example.com" },
  { nombre: "Carlos Ruiz", contacto: "carlos.ruiz@example.com" },
  { nombre: "Luisa Martínez", contacto: "luisa.martinez@example.com" },
];

// Datos ficticios para obras
const obras = [
  {
    nombre: "Catedral Basílica Metropolitana Santiago de Tunja",
    fecha_creacion: new Date("2022-01-15"),
    dueño: { nombre: "Juan Pérez", contacto: "juan.perez@example.com" },
    ubicacion: { latitud: 5.5453, longitud: -73.3577, direccion: "Calle 10 #5-15" },
    dimensiones: { ancho: 10, alto: 5, unidad: "metros" },
    imagenes: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/23/23/c5/catedral-basilica-metropolitan.jpg?w=800&h=-1&s=1"],
    publicada_por: { usuario_id: null, nombre: "Juan Pérez" },
    fecha_publicacion: new Date(),
    descripcion: "Un mural lleno de colores cálidos para representar el amanecer.",
    etiquetas: ["amanecer", "colorido", "realismo"],
    comentarios: [
      { usuario_id: null, nombre_usuario: "Ana Gómez", comentario: "¡Me encanta este mural!", fecha: new Date() },
      { usuario_id: null, nombre_usuario: "Juan Pérez", comentario: "¡Me encanta este mural gay!", fecha: new Date() },
    ],
    calificaciones: [
      { usuario_id: null, nombre_usuario: "Carlos Ruiz", calificacion: 5 },
      { usuario_id: null, nombre_usuario: "Ana Gómez", calificacion: 4 },
    ],
    promedio_calificaciones: 4.5,
  },
  {
    nombre: "Plaza De Bolivar",
    fecha_creacion: new Date("2023-05-20"),
    dueño: { nombre: "Ana Gómez", contacto: "ana.gomez@example.com" },
    ubicacion: { latitud: 5.5353, longitud: -73.3577, direccion: "Carrera 7 #12-45" },
    dimensiones: { ancho: 15, alto: 6, unidad: "metros" },
    imagenes: ["https://upload.wikimedia.org/wikipedia/commons/d/dc/Tunja_centro_historico7.jpg", "https://upload.wikimedia.org/wikipedia/commons/d/dc/Tunja_centro_historico7.jpg"],
    publicada_por: { usuario_id: null, nombre: "Ana Gómez" },
    fecha_publicacion: new Date(),
    descripcion: "Mural que narra la historia del barrio a través del arte.",
    etiquetas: ["historia", "arte urbano", "cultura"],
    comentarios: [
      { usuario_id: null, nombre_usuario: "Juan Pérez", comentario: "Una obra realmente inspiradora.", fecha: new Date() },
    ],
    calificaciones: [
      { usuario_id: null, nombre_usuario: "Luisa Martínez", calificacion: 5 },
      { usuario_id: null, nombre_usuario: "Carlos Ruiz", calificacion: 4 },
    ],
    promedio_calificaciones: 4.5,
  },{
    nombre: "UPTC",
    fecha_creacion: new Date("2022-01-15"),
    dueño: { nombre: "Juan Pérez", contacto: "juan.perez@example.com" },
    ubicacion: { latitud: 5.550719, longitud: -73.354981, direccion: "Calle 10 #5-15" },
    dimensiones: { ancho: 10, alto: 5, unidad: "metros" },
    imagenes: ["https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/23/23/c5/catedral-basilica-metropolitan.jpg?w=800&h=-1&s=1"],
    publicada_por: { usuario_id: null, nombre: "Juan Pérez" },
    fecha_publicacion: new Date(),
    descripcion: "Un mural lleno de colores cálidos para representar el amanecer.",
    etiquetas: ["amanecer", "colorido", "realismo"],
    comentarios: [
      { usuario_id: null, nombre_usuario: "Ana Gómez", comentario: "¡Me encanta este mural!", fecha: new Date() },
    ],
    calificaciones: [
      { usuario_id: null, nombre_usuario: "Carlos Ruiz", calificacion: 5 },
      { usuario_id: null, nombre_usuario: "Ana Gómez", calificacion: 4 },
    ],
    promedio_calificaciones: 4.5,
  }
];

async function seedDatabase() {
  try {
    // Conectar a la base de datos
    await conexion();

    // Eliminar datos previos
    await Usuario.deleteMany({});
    await Obra.deleteMany({});
    console.log("Datos anteriores eliminados.");

    // Insertar usuarios
    const usuariosGuardados = await Usuario.insertMany(usuarios);
    console.log("Usuarios insertados:", usuariosGuardados);

    // Verificar que se guardaron los usuarios
    if (usuariosGuardados.length === 0) {
      console.error("No se pudieron guardar los usuarios.");
      return;
    }

    // Actualizar datos de obras con referencias a usuarios
    obras.forEach((obra, index) => {
      const usuario = usuariosGuardados[index % usuariosGuardados.length]; // Ciclar usuarios
      obra.publicada_por.usuario_id = usuario._id;

      // Asignar el usuario_id a los comentarios y calificaciones
      obra.comentarios.forEach((comentario) => {
        comentario.usuario_id = usuario._id;
      });
      obra.calificaciones.forEach((calificacion) => {
        calificacion.usuario_id = usuario._id;
      });
    });

    // Verifica si las obras tienen referencias correctas
    console.log("Obras con referencias asignadas:");
    obras.forEach((obra, index) => {
      console.log(`Obra ${index + 1}:`, obra);
    });

    // Insertar obras
    const obrasGuardadas = await Obra.insertMany(obras);
    console.log("Obras insertadas:", obrasGuardadas);

  } catch (err) {
    console.error("Error llenando la base de datos:", err);
  } finally {
    // Cerrar la conexión
    mongoose.connection.close();
  }
}
// Ejecutar la función para llenar la base de datos
seedDatabase();
