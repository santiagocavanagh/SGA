const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#list");
const cantidadAlumnos = document.querySelector("#cantidadAlumnos");
const btnCancelar = document.querySelector("#btnCancelar");
const btnGuardar = document.querySelector("#btnGuardar");

let alumnoEditId = null;
let alumnoEditar = null;

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const carrera = document.querySelector("#carrera").value.trim();
  const correo = document.querySelector("#correo").value.trim();

  if (nombre === "" || carrera === "" || correo === "") {
    mostrarMensaje("Todos los campos son obligatorios", "mje-error");
    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error");
    return;
  }

  if (!correo.includes("@")) {
    mostrarMensaje("Ingrese un correo electrónico válido", "mje-error");
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

    if (!alumno) {
      mostrarMensaje("No se encontró el alumno", "mje-error");
      return;
    }

    alumno.nombre = nombre;
    alumno.carrera = carrera;
    alumno.correo = correo;

    alumnoEditId = null;
    alumnoEditar = null;

    btnGuardar.textContent = "Guardar Alumno";

    mostrarMensaje("Alumno actualizado correctamente", "mje-exito");
  }

  // localStorage.setItem("alumnos", JSON.stringify(alumnos));
  guardarDatos("alumnos", alumnos);

  mostrarAlumnos(alumnos);
  formulario.reset();
});

function obtenerAlumnos() {
  return obtenerDatos("alumnos");
}

function mostrarAlumnos(alumnos) {
  lista.innerHTML = "";

  cantidadAlumnos.textContent = `Cantidad de alumnos: ${alumnos.length}`;

  for (const alumno of alumnos) {
    lista.innerHTML += `
    <tr>
        <td>${alumno.id}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.correo}</td>
        <td>
          <button 
            class="btn-editar" data-id="${alumno.id}" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button 
            class="btn-eliminar" data-id="${alumno.id}" title="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }
}

function eliminarAlumno(id) {
  const alumnos = obtenerAlumnos();

  const alumnosActualizados = alumnos.filter((alumno) => alumno.id !== id);

  guardarDatos("alumnos", alumnosActualizados);

  mostrarAlumnos(alumnosActualizados);

  if (alumnoEditId === id) {
    formulario.reset();
    alumnoEditId = null;
    btnGuardar.textContent = "Guardar Alumno";
    btnCancelar.style.display = "none";
  }

  mostrarMensaje("Alumno Eliminado", "mje-exito");
}

lista.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  const btnEditar = e.target.closest(".btn-editar");

  if (btnEliminar) {
    const id = Number(btnEliminar.dataset.id);

    const confirmar = confirm("¿Desea eliminar el alumno?");

    if (confirmar) {
      eliminarAlumno(id);
    }
  }

  if (btnEditar) {
    const id = Number(btnEditar.dataset.id);
    editarAlumno(id);
  }
});

function editarAlumno(id) {
  const alumnos = obtenerAlumnos();

  const alumno = alumnos.find((alumno) => alumno.id === id);
  if (!alumno) {
    mostrarMensaje("No se encontró el alumno", "mje-error");
    return;
  }

  document.querySelector("#nombre").value = alumno.nombre;

  document.querySelector("#carrera").value = alumno.carrera;

  document.querySelector("#correo").value = alumno.correo;

  alumnoEditId = id;

  btnCancelar.style.display = "inline-block";

  btnGuardar.textContent = "Actualizar Alumno";

  document.querySelector("#nombre").focus();
}

btnCancelar.addEventListener("click", () => {
  formulario.reset();
  alumnoEditId = null;
  btnGuardar.textContent = "Guardar Alumno";
  btnCancelar.style.display = "none";
});

const alumnos = obtenerAlumnos();
mostrarAlumnos(alumnos);
