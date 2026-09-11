const Alumno = require("../models/Alumno");

async function obtenerAlumnos(req, res) {
  const alumnos = await Alumno.find();
  res.json(alumnos);
}

async function obtenerAlumno(req, res) {
  const alumno = await Alumno.findOne({
    legajo: Number(req.params.id),
  });

  if (alumno) {
    res.json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
}

async function crearAlumno(req, res) {
  const { legajo, nombre, carrera, email } = req.body;
  const nuevoAlumno = await Alumno.create({ legajo, nombre, carrera, email });
  res.status(201).json(nuevoAlumno);
}

async function editarAlumno(req, res) {
  const alumno = await Alumno.findOneAndUpdate(
    { legajo: Number(req.params.id) },
    req.body,
  );

  res.json(alumno);
}

async function borrarAlumno(req, res) {
  const alumno = await Alumno.findOneAndDelete({
    legajo: Number(req.params.id),
  });
  if (alumno) {
    res.json("alumno eliminado");
  } else {
    res.json("alumno no encontrado");
  }
}

module.exports = {
  obtenerAlumnos,
  obtenerAlumno,
  crearAlumno,
  editarAlumno,
  borrarAlumno,
};
