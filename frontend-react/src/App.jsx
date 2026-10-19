import { useState, useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";

export function App() {
  const [actualizar, setActualizar] = useState(0);
  const [editarAlumno, setEditarAlumno] = useState(null);

  function crearAlumno() {
    setActualizar((valor) => valor + 1);
    setEditarAlumno(null);
  }

  function alumnoSelect(alumno) {
    setEditarAlumno(alumno);
  }

  return (
    <main>
      <Form key={editarAlumno?.legajo ?? "nuevo"} onCrearAlumno={crearAlumno} />
      <List actualizar={actualizar} onCrearAlumno={crearAlumno} />
    </main>
  );
}
