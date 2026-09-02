const express = require("express");
const {
  obtenerDocentes,
  obtenerDocente,
  agregarDocente,
  editarDocente,
  borrarDocente,
} = require("../controllers/docentes.controller");
const router = express.Router();

router.get("/", obtenerDocentes);
router.get("/:id", obtenerDocente);
router.post("/", agregarDocente);
router.put("/:id", editarDocente);
router.delete("/:id", borrarDocente);

module.exports = router;
