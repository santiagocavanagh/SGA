const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const alumnos = [
  {
    id: 1,
    nombre: "Santiago Raul Ignacio Cavanagh",
    carrera: "TUP2026",
    email: "santicav92@gmail.com",
  },
];

const docentes = [
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

const materias = [
  {
    id: 1,
    nombre: "Programacion IV",
    codigo: "PGIV2026",
    carrera: "TUP",
  },
  {
    id: 1,
    nombre: "Proyecto Desarrollo Software",
    codigo: "PDS2026",
    carrera: "TUP",
  },
];

app.get("/alumnos", (req, res) => {
  res.json(alumnos);
});

app.get("/docentes", (req, res) => {
  res.json(docentes);
});

app.get("/Materias", (req, res) => {
  res.json(materias);
});

app.get("/alumnos/:id", (req, res) => {
  const id = Number(req.params.id);
  const alumno = alumnos.find((a) => a.id === id);
  if (alumno) {
    res.json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

app.get("/docentes/:id", (req, res) => {
  const id = Number(req.params.id);
  const docente = docentes.find((a) => a.id === id);
  if (docente) {
    res.json(docente);
  } else {
    res.status(404).json({ error: "Docente no encontrado" });
  }
});

app.get("/materias/:id", (req, res) => {
  const id = Number(req.params.id);
  const materia = materias.find((a) => a.id === id);
  if (materia) {
    res.json(materia);
  } else {
    res.status(404).json({ error: "Materia no encontrada" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
