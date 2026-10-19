import { useState, useEffect } from "react";

export function List({ actualizar, onCrearAlumno }) {
  const [alumnos, setAlumnos] = useState([]);
  const [cargar, setCargar] = useState(true);
  const [error, setError] = useState("");

  async function eliminarAlumno(legajo) {
    const confirmar = alert.confirm("Seguro quiere eliminar este alumno?");
    if (!confirmar) {
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/alumnos/"`${legajo}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`No se puede eliminar! HTTP ERROR: ${res.status}`);
      }
      onCrearAlumno();
    } catch (error) {
      console.error("Error al eliminar: ", error);
      alert(error.message || "No se puede eliminar Alumno");
    }
  }

  useEffect(() => {
    async function lista() {
      setCargar(true);

      setError("");

      try {
        const response = await fetch("http://localhost:3000/alumnos");

        if (!response.ok) {
          throw new Error("no se pudo obtener la lista", response.status);
        }

        const list = await response.json();
        setAlumnos(list);
      } catch (error) {
        console.error("Error de conexión", error);
      } finally {
        setCargar();
      }
    }
    lista();
  }, [actualizar]);

  return (
    <section>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.legajo}>
            {alumno.nombre}
            {alumno.carrera}
            {alumno.email}
            <br />
            <button type="button" onClick={() => eliminarAlumno(alumno.legajo)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
