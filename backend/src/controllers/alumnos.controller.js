const Alumno = require("../models/Alumno");

async function obtenerAlumnos(req, res) {
  const alumnos = await Alumno.find();
  res.json(alumnos);
}

async function obtenerAlumno(req, res) {
  const legajo = Number(req.params.legajo);
  const alumno = Alumno.find((a) => a.legajo === legajo);

  if (alumno) {
    res.json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
}

function crearAlumno(req, res) {
  const { legajo, nombre, carrera, email } = req.body;
  const nuevoAlumno = { legajo, nombre, carrera, email };

  Alumno.create(nuevoAlumno);
  return res.status(201).json({
    mensaje: "Alumno creado exitosamente",
    alumno: nuevoAlumno,
  });
}

function editarAlumno(req, res) {
  const id = Number(req.params.id);
  const alumno = Alumno.findByIdAndUpdate(id);

  if (alumno) {
    Alumno[alumno] = { ...Alumno[alumno], ...req.body };
    res.status(202).json({ mensaje: "alumno editado" });
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
}

function borrarAlumno(req, res) {
  const id = Number(req.params.id);
  const alumno = Alumno.findIndex((a) => a.id === id);
  if (alumno !== -1) {
    Alumno.splice(alumno, 1);
    res.json({ mensaje: "Alumno eliminado exitosamente" });
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
}

module.exports = {
  obtenerAlumnos,
  obtenerAlumno,
  crearAlumno,
  editarAlumno,
  borrarAlumno,
};
