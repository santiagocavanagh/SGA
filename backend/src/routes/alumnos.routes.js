const express = require("express");
const router = express.Router();
const { obtenerAlumnos } = require("../controllers/alumnos.controller");
//import { obtenerAlumnos } from "../controllers/alumnos.controller";

router.get("/", obtenerAlumnos);

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const alumno = alumnos.find((alumno) => alumno.id === id);

  if (alumno) {
    alumno.id = req.body.id;
    alumno.nombre = req.body.nombre;
    alumno.carrera = req.body.carrera;
    alumno.email = req.body.email;

    res.json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

router.post("/", (req, res) => {
  const { id, nombre, carrera, email } = req.body;
  const nuevoAlumno = { id, nombre, carrera, email };

  alumnos.push(nuevoAlumno);
  return res.status(201).json({
    mensaje: "Alumno creado exitosamente",
    alumno: nuevoAlumno,
  });
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const alumnoIndex = alumnos.findIndex((a) => a.id === id);
  if (alumnoIndex !== -1) {
    alumnos[alumnoIndex] = { ...alumnos[alumnoIndex], ...req.body };
    res.json(alumnos[alumnoIndex]);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const alumnoIndex = alumnos.findIndex((a) => a.id === id);
  if (alumnoIndex !== -1) {
    alumnos.splice(alumnoIndex, 1);
    res.json({ mensaje: "Alumno eliminado exitosamente" });
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

module.exports = router;
