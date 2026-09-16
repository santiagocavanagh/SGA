const formulario = document.querySelector("#form");
const mensaje = document.querySelector("#mensaje");
const cantidadAlumnos = document.getElementById("cantidadAlumnos");
const list = document.getElementById("list");
const btnCancelar = document.querySelector("#btnCancelar");
const btnGuardar = document.querySelector("#btnGuardar");
const API_ALUMNO = "http://localhost:3000/alumnos";
let Legajo = null;
let Editar = null;

formulario.addEventListener("submit", async function (event) {
  // event.preventDefault();
  const legajo = document.querySelector("#legajo").value.trim();
  const nombre = document.querySelector("#nombre").value.trim();
  const carrera = document.querySelector("#carrera").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (legajo === "" || nombre === "" || carrera === "" || email === "") {
    mostrarMensaje("Todos los campos son obligatorios", "mje-error");
    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error");
    return;
  }

  if (!email.includes("@" || ".com")) {
    mostrarMensaje("Ingrese un correo electrónico válido", "mje-error");
    return;
  }

  // POST
  if (Legajo === null) {
    const alumno = {
      legajo: Number(legajo),
      nombre: nombre,
      carrera: carrera,
      email: email,
    };
    const res = await fetch(API_ALUMNO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alumno),
    });

    if (!res.ok) {
      mostrarMensaje("No se puede guardar los datos", "mje-error");
      return;
    }
    mostrarMensaje("Alumno guardado correctamente", "mje-exito");
  } else {
    // PUT
    const alumno = alumno.find((alumno) => alumno.id === Legajo);

    if (!alumno) {
      mostrarMensaje("No se encontró el alumno", "mje-error");
      return;
    }

    const res = await fetch(`${API_ALUMNO}/${Legajo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: "nombre",
        carrera: "carrera",
        email: "email",
      }),
    });
    if (!res.ok) {
      mostrarMensaje("No se puede Actualizar Alumno", "mje-error");
      return;
    }

    Legajo = null;
    Editar = null;

    btnGuardar.textContent = "Guardar Alumno";
    document.querySelector("#legajo").disabled = false;

    mostrarMensaje("Alumno actualizado correctamente", "mje-exito");
  }
  updateList();
  // localStorage.setItem("alumnos", JSON.stringify(alumnos));
  // guardarDatos("alumnos", alumnos);
});

async function obtenerAlumnos() {
  const res = await fetch(API_ALUMNO);
  const alumnos = await res.json();
  return alumnos;
}

function mostrarAlumnos(alumnos) {
  list.innerHTML = "";
  cantidadAlumnos.textContent = `Cantidad de alumnos: ${alumnos.length}`;

  for (const alumno of alumnos) {
    list.innerHTML += `
    <tr>
        <td>${alumno.legajo}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.email}</td>
        <td>
          <button 
            class="btn-editar" data-legajo="${alumno.legajo}" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button 
            class="btn-eliminar" data-legajo="${alumno.legajo}" title="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }
}

async function eliminarAlumno(legajo) {
  const res = await fetch(`${API_ALUMNO}/${legajo}`);

  const alumnosActualizados = alumno.filter((alumno) => alumno.id !== id);

  guardarDatos("alumnos", alumnosActualizados);

  mostrarAlumnos(alumnosActualizados);

  if (Legajo === legajo) {
    formulario.reset();
    Editar = null;
    btnGuardar.textContent = "Guardar Alumno";

    document.querySelector("#legajo").disabled = false;
    btnCancelar.style.display = "none";
  }

  mostrarMensaje("Alumno Eliminado", "mje-exito");
  updateList();
}

list.addEventListener("click", async function (e) {
  const btnEliminar = e.target.closest(".btn-eliminar");
  const btnEditar = e.target.closest(".btn-editar");

  if (btnEliminar) {
    const legajo = Number(btnEliminar.dataset.legajo);
    const confirmar = confirm("¿Desea eliminar el alumno?");

    if (confirmar) {
      eliminarAlumno(legajo);
    }
  }

  if (btnEditar) {
    const legajo = Number(btnEditar.dataset.legajo);
    editarAlumno(legajo);
  }
});

async function editarAlumno(legajo) {
  const alumnos = await obtenerAlumnos();
  const alumno = alumnos.find((alumno) => alumno.legajo === legajo);
  if (!alumno) {
    mostrarMensaje("No se encontró el alumno", "mje-error");
    return;
  }
  document.querySelector("#legajo").value = alumno.legajo;
  document.querySelector("#legajo").disabled = true;
  document.querySelector("#nombre").value = alumno.nombre;
  document.querySelector("#carrera").value = alumno.carrera;
  document.querySelector("#email").value = alumno.email;

  Editar = {
    nombre: alumno.nombre,
    carrera: alumno.carrera,
    email: alumno.email,
  };
  Legajo = alumno.legajo;

  btnCancelar.style.display = "inline-block";
  btnGuardar.textContent = "Actualizar Alumno";
  document.querySelector("#nombre").focus();
}

async function updateList() {
  const alumnoUpdate = await obtenerAlumnos();
  load(alumnoUpdate);
  formulario.reset();
}

async function iniciar() {
  const alumnos = await obtenerAlumnos();
  mostrarAlumnos(alumnos);
}

iniciar();

/* TEST CODE

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
*/
