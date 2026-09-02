const express = require("express");
const router = express.Router();
const {
  obtenerAlumnos,
  obtenerAlumno,
  agregarAlumno,
  editarAlumno,
  borrarAlumno,
} = require("../controllers/alumnos.controller");

router.get("/", obtenerAlumnos);

router.get("/:id", obtenerAlumno);

router.post("/", agregarAlumno);

router.put("/:id", editarAlumno);

router.delete("/:id", borrarAlumno);

module.exports = router;
