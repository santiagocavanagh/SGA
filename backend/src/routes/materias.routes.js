const express = require("express");
const router = express.Router();

let materias = [
  {
    id: 1,
    nombre: "Programacion IV",
    codigo: "PGIV2026",
    carrera: "TUP",
  },
  {
    id: 2,
    nombre: "Proyecto Desarrollo Software",
    codigo: "PDS2026",
    carrera: "TUP",
  },
];

router.get("/", (req, res) => {
  res.json(materias);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const materia = materias.find((a) => a.id === id);
  if (materia) {
    res.json(materia);
  } else {
    res.status(404).json({ error: "Materia no encontrada" });
  }
});
