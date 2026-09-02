const docentes = require("../data/docentes.data");

function obtenerDocentes(req, res) {
  res.json(docentes);
}

function obtenerDocente(req, res) {
  const id = Number(req.params.id);
  const docente = docentes.find((a) => a.id === id);
  if (docente) {
    res.json(docente);
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
}

function agregarDocente(req, res) {
  const { id, nombre, carrera, email } = req.body;
  const nuevoDocente = { id, nombre, carrera, email };

  docentes.push(nuevoDocente);
  return res.status(201).json({
    mensaje: "Docente creado exitosamente",
    docente: nuevoDocente,
  });
}

function editarDocente(req, res) {
  const id = Number(req.params.id);
  const docenteIndex = docentes.findIndex((a) => a.id === id);
  if (docenteIndex !== -1) {
    docentes[docenteIndex] = { ...docentes[docenteIndex], ...req.body };
    res.json(docentes[docenteIndex]);
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
}

function borrarDocente(req, res) {
  const id = Number(req.params.id);
  const docenteIndex = docentes.findIndex((a) => a.id === id);
  if (docenteIndex !== -1) {
    docentes.splice(docenteIndex, 1);
    res.json({ mensaje: "Docente eliminado exitosamente" });
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
}

module.exports = {
  obtenerDocentes,
  obtenerDocente,
  agregarDocente,
  editarDocente,
  borrarDocente,
};
