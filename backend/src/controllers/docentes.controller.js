const Docente = require("../models/Docente");

async function obtenerDocentes(req, res) {
  const docentes = await Docente.find();
  res.json(docentes);
}

async function obtenerDocente(req, res) {
  const docente = await Docente.findOne({
    dni: Number(req.params.id),
  });
  if (docente) {
    res.json(docente);
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
}

async function agregarDocente(req, res) {
  const { dni, nombre, especialidad, email } = req.body;

  if (!dni || !nombre || !especialidad || !email) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }
  if (typeof nombre !== "string") {
    return res.status(400).json({
      mensaje: "El nombre debe ser un texto",
    });
  }
  if (typeof dni !== "number") {
    return res.status(400).json({
      mensaje: "El dni debe ser un número",
    });
  }

  const exist = await Docente.findOne({ dni });
  if (exist) {
    return res.status(400).json({
      mensaje: "El dni ya está en uso",
    });
  }
  const nuevoDocente = await Docente.create({
    dni,
    nombre,
    especialidad,
    email,
  });

  res.status(201).json(nuevoDocente);
}

async function editarDocente(req, res) {
  const { nombre, especialidad, email } = req.body;

  const docente = await Docente.findOneAndUpdate(
    { dni: Number(req.params.id) },
    { nombre, especialidad, email },
    { returnDocument: "after" },
  );

  if (!docente) {
    return res.status(404).json({
      mensaje: "Docente no econtrado",
    });
  }

  res.json(docente);
}

async function borrarDocente(req, res) {
  const docente = await Docente.findOneAndDelete({
    dni: Number(req.params.id),
  });
  if (!docente) {
    return res.status(404).json({
      mensaje: "Docente no econtrado",
    });
  }

  res.json({ mensaje: "Docente eliminado correctamente" });
}

module.exports = {
  obtenerDocentes,
  obtenerDocente,
  agregarDocente,
  editarDocente,
  borrarDocente,
};
