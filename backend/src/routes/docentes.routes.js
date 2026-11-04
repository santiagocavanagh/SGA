const express = require("express");
const router = express.Router();
const {
  obtenerDocentes,
  obtenerDocente,
  agregarDocente,
  editarDocente,
  borrarDocente,
} = require("../controllers/docentes.controller");

router.get("/", obtenerDocentes);
router.get("/:id", obtenerDocente);
router.post("/", agregarDocente);
router.put("/:id", editarDocente);
router.delete("/:id", borrarDocente);

module.exports = router;
