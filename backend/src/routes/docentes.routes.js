const express = require("express");
const router = express.Router();

let docentes = [
  {
    id: 1,
    nombre: "Irina Agretti",
    especialidad: "Programacion IV",
    email: "iriagretti@gmail.com",
  },
  {
    id: 2,
    nombre: "Eliana Sulligoy",
    especialidad: "Proyecto Desarrollo Software",
    email: "elisulligoy@gmail.com",
  },
];

router.get("/", (req, res) => {
  res.json(docentes);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const docente = docentes.find((a) => a.id === id);
  if (docente) {
    res.json(docente);
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
});
