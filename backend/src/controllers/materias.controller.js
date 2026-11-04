const Materia = require("../models/Materia");

async function obtenerMaterias(req, res) {
  const materias = await Materia.find();
  res.json(materias);
}

async function obtenerMateria(req, res) {
  const materia = await Materia.findOne({
    codigo: req.params.id,
  });
  if (materia) {
    res.json(materia);
  } else {
    res.status(404).json({ error: "Materia no encontrada" });
  }
}

async function agregarMateria(req, res) {
  const { codigo, nombre, horario, aula } = req.body;

  if (!codigo || !nombre || !horario || !aula) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }
  if (typeof nombre !== "string") {
    return res.status(400).json({
      mensaje: "El nombre debe ser un texto",
    });
  }
  if (typeof codigo !== "string") {
    return res.status(400).json({
      mensaje: "El Codigo debe corresponder a Letras",
    });
  }

  const exist = await Materia.findOne({ codigo });
  if (exist) {
    return res.status(400).json({
      mensaje: "El codigo ya está en uso",
    });
  }
  const nuevaMateria = await Materia.create({
    codigo,
    nombre,
    horario: Number(horario),
    aula: Number(aula),
  });

  res.status(201).json(nuevaMateria);
}

async function editarMateria(req, res) {
  const { nombre, horario, aula } = req.body;

  const materia = await Materia.findOneAndUpdate(
    { codigo: req.params.id },
    { nombre, horario, aula },
    { returnDocument: "after" },
  );

  if (!materia) {
    return res.status(404).json({
      mensaje: "Materia no econtrado",
    });
  }

  res.json(materia);
}

async function borrarMateria(req, res) {
  const materia = await Materia.findOneAndDelete({
    codigo: req.params.id,
  });

  if (!materia) {
    return res.status(404).json({
      mensaje: "Materia no econtrado",
    });
  }

  res.json({ mensaje: "Materia eliminada correctamente" });
}

module.exports = {
  obtenerMaterias,
  obtenerMateria,
  agregarMateria,
  editarMateria,
  borrarMateria,
};
