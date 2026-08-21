const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#lista");
let alumnoEditId = null;

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const carrera = document.querySelector("#carrera").value.trim();
  const correo = document.querySelector("#correo").value.trim();

  if (nombre === "" || carrera === "" || correo === "") {
    mostrarMensaje("Todos los campos son obligatorios", "mje-error");
    return;
  }

  if (!correo.includes("@")) {
    mostrarMensaje("Ingrese un correo electrónico válido", "mje-error");
    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error");
    return;
  }

  const alumnos = obtenerAlumnos();

  if (alumnoEditId === null) {
    const alumno = {
      id: Date.now(),
      nombre: nombre,
      carrera: carrera,
      correo: correo,
    };
    alumnos.push(alumno);
    mostrarMensaje("Alumno guardado correctamente", "mje-exito");
  } else {
    const alumno = alumnos.find((alumno) => alumno.id === alumnoEditId);
    alumno.nombre = nombre;
    alumno.carrera = carrera;
    alumno.correo = correo;
    alumnoEditId = null;
    formulario.querySelector("button").textContent = "Guardar Alumno";

    mostrarMensaje("Alumno actualizado correctamente", "mje-exito");
  }
  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  mostrarAlumnos(alumnos);
  formulario.reset();
});

function obtenerAlumnos() {
  const datos = localStorage.getItem("alumnos");
  if (datos) {
    return JSON.parse(datos);
  }
  return [];
}

function mostrarMensaje(texto, clase) {
  mensaje.className = clase;
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "oculto";
  }, 3000);
}

function mostrarAlumnos() {
  lista.innerHTML = "";
  for (const alumno of alumnos) {
    lista.innerHTML += `
    <tr>
        <td>${alumno.id}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.correo}</td>
        <td>
          <button class="btn-editar" data-id="${alumno.id}" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-eliminar" data-id="${alumno.id}" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  }
}

function eliminarAlumno(id) {
  const alumnos = obtenerAlumnos();
  const alumnosActualizados = alumnos.filter((alumno) => alumno.id !== id);
  localStorage.setItem("alumnos", JSON.stringify(alumnosActualizados));

  mostrarAlumnos(alumnosActualizados);
  if (alumnoEditId === id) {
    formulario.reset();
    alumnoEditId = null;
    formulario.querySelector("button").textContent = "Guardar Alumno";
  }
  mostrarMensaje("Alumno Eliminado", "mje-exito");
}

lista.addEventListener("click", (e) => {
  const btn_eliminar = e.target.closest(".btn-eliminar");
  const btn_editar = e.target.closest(".btn-editar");

  if (btn_eliminar) {
    const id = Number(btn_eliminar.dataset.id);
    const confirmar = confirm("¿Desea eliminar el alumno?");
    if (confirmar) {
      eliminarAlumno(id);
    }
  }
  if (btn_editar) {
    const id = Number(btn_editar.dataset.id);
    editarAlumno(id);
  }
});

function editarAlumno(id) {
  const alumnos = obtenerAlumnos();
  const alumno = alumnos.find((alumno) => alumno.id === id);
  document.querySelector("#nombre").value = alumno.nombre;
  document.querySelector("#carrera").value = alumno.carrera;
  document.querySelector("#correo").value = alumno.correo;
  alumnoEditId = id;
  formulario.querySelector("button").textContent = "Actualizar Alumno";
  document.querySelector("#nombre").focus();
}

const alumnos = obtenerAlumnos();
mostrarAlumnos(alumnos);
