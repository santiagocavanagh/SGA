const express = require("express");
const {
  obtenerMaterias,
  obtenerMateria,
  agregarMateria,
  editarMateria,
  borrarMateria,
} = require("../controllers/materias.controller");
const router = express.Router();

router.get("/", obtenerMaterias);
router.get("/:id", obtenerMateria);
router.post("/", agregarMateria);
router.put("/:id", editarMateria);
router.delete("/:id", borrarMateria);

module.exports = router;
