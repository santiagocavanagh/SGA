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
  if (!legajo || !nombre || !carrera || !email) {
    return res.status(400).json({
      mensaje: "Todos los campos son obligatorios",
    });
  }
  if (typeof nombre !== "string") {
    return res.status(400).json({
      mensaje: "El nombre debe ser un texto",
    });
  }
  if (typeof legajo !== "number") {
    return res.status(400).json({
      mensaje: "El legajo debe ser un número",
    });
  }
  if (typeof carrera !== "string") {
    return res.status(400).json({
      mensaje: "La carrera debe ser un texto",
    });
  }
  const legajoExist = await Alumno.findOne({ legajo });

  if (legajoExist) {
    return res.status(400).json({
      mensaje: "Legajo ya está en uso",
    });
  }
  const nuevoAlumno = await Alumno.create({ legajo, nombre, carrera, email });
  res.status(201).json(nuevoAlumno);
}

async function editarAlumno(req, res) {
  const { nombre, carrera, email } = req.body;
  const alumno = await Alumno.findOneAndUpdate(
    { legajo: Number(req.params.id) },
    { nombre, carrera, email },
    { returnDocument: "after" },
  );
  if (alumno) {
    res.json(alumno);
  } else {
    return res.status(404).json({ mensaje: "alumno no encontrado" });
  }
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
