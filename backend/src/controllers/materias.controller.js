const materias = require("../data/docentes.data");

function obtenerMaterias(req, res) {
  res.json(materias);
}

function obtenerMateria(req, res) {
  const id = Number(req.params.id);
  const materia = materias.find((a) => a.id === id);
  if (materia) {
    res.json(materia);
  } else {
    res.status(404).json({ error: "Materia no encontrada" });
  }
}

function agregarMateria(req, res) {
  const { id, nombre, codigo, carrera } = req.body;
  const nuevaMateria = { id, nombre, codigo, carrera };

  materias.push(nuevaMateria);
  return res.status(201).json({
    mensaje: "Materia creada exitosamente",
    materia: nuevaMateria,
  });
}

function editarMateria(req, res) {
  const id = Number(req.params.id);
  const materiaIndex = materias.findIndex((a) => a.id === id);
  if (materiaIndex !== -1) {
    materias[materiaIndex] = { ...materias[materiaIndex], ...req.body };
    res.json(materias[materiaIndex]);
  } else {
    res.status(404).json({ error: "Materia no encontrada" });
  }
}

function borrarMateria(req, res) {
  const id = Number(req.params.id);
  const materiaIndex = materias.findIndex((a) => a.id === id);
  if (materiaIndex !== -1) {
    materias.splice(materiaIndex, 1);
    res.json({ mensaje: "Materia eliminada exitosamente" });
  } else {
    res.status(404).json({ error: "Materia no encontrado" });
  }
}

module.exports = {
  obtenerMaterias,
  obtenerMateria,
  agregarMateria,
  editarMateria,
  borrarMateria,
};
