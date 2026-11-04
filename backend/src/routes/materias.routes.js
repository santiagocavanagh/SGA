const express = require("express");
const router = express.Router();
const {
  obtenerMaterias,
  obtenerMateria,
  agregarMateria,
  editarMateria,
  borrarMateria,
} = require("../controllers/materias.controller");

router.get("/", obtenerMaterias);
router.get("/:id", obtenerMateria);
router.post("/", agregarMateria);
router.put("/:id", editarMateria);
router.delete("/:id", borrarMateria);

module.exports = router;
