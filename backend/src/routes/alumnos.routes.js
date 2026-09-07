const express = require("express");
const router = express.Router();
const {
  obtenerAlumnos,
  obtenerAlumno,
  crearAlumno,
  editarAlumno,
  borrarAlumno,
} = require("../controllers/alumnos.controller");

router.get("/", obtenerAlumnos);
router.get("/:id", obtenerAlumno);
router.post("/", crearAlumno);
router.put("/:id", editarAlumno);
router.delete("/:id", borrarAlumno);

module.exports = router;
