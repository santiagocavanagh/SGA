const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#lista");
const cantidadDocentes = document.querySelector("#cantidadDocentes");

let docenteEditId = null;

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const especialidad = document.querySelector("#especialidad").value.trim();
  const correo = document.querySelector("#correo").value.trim();

  if (nombre === "" || especialidad === "" || correo === "") {
    mostrarMensaje("Todos los campos son obligatorios", "mje-error");
    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje("El nombre debe tener al menos 3 caracteres", "mje-error");
    return;
  }

  if (especialidad.length < 3) {
    mostrarMensaje(
      "La especialidad debe tener al menos 3 caracteres",
      "mje-error",
    );
    return;
  }

  if (!correo.includes("@")) {
    mostrarMensaje("Ingrese un correo electrónico válido", "mje-error");
    return;
  }

  const docentes = obtenerDocentes();

  if (docenteEditId === null) {
    const docente = {
      id: Date.now(),
      nombre: nombre,
      especialidad: especialidad,
      correo: correo,
    };

    docentes.push(docente);

    mostrarMensaje("Docente guardado correctamente", "mje-exito");
  } else {
    const docente = docentes.find((docente) => docente.id === docenteEditId);

    if (!docente) {
      mostrarMensaje("No se encontró el docente", "mje-error");
      return;
    }

    docente.nombre = nombre;
    docente.especialidad = especialidad;
    docente.correo = correo;

    docenteEditId = null;

    formulario.querySelector("button").textContent = "Guardar Docente";

    mostrarMensaje("Docente actualizado correctamente", "mje-exito");
  }

  guardarDatos("docentes", docentes);

  mostrarDocentes(docentes);
  formulario.reset();
});

function obtenerDocentes() {
  return obtenerDatos("docentes");
}

function mostrarMensaje(texto, clase) {
  mensaje.className = clase;
  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "oculto";
  }, 3000);
}

function mostrarDocentes(docentes) {
  lista.innerHTML = "";

  cantidadDocentes.textContent = `Docentes: ${docentes.length}`;

  for (const docente of docentes) {
    lista.innerHTML += `
      <tr>
        <td>${docente.id}</td>
        <td>${docente.nombre}</td>
        <td>${docente.especialidad}</td>
        <td>${docente.correo}</td>
        <td>
          <button 
            class="btn-editar" data-id="${docente.id}" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button
            class="btn-eliminar" data-id="${docente.id}" title="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }
}

function eliminarDocente(id) {
  const docentes = obtenerDocentes();

  const docentesActualizados = docentes.filter((docente) => docente.id !== id);

  guardarDatos("docentes", docentesActualizados);

  mostrarDocentes(docentesActualizados);

  if (docenteEditId === id) {
    formulario.reset();
    docenteEditId = null;

    formulario.querySelector("button").textContent = "Guardar Docente";
  }

  mostrarMensaje("Docente eliminado", "mje-exito");
}

lista.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  const btnEditar = e.target.closest(".btn-editar");

  if (btnEliminar) {
    const id = Number(btnEliminar.dataset.id);

    const confirmar = confirm("¿Desea eliminar el docente?");

    if (confirmar) {
      eliminarDocente(id);
    }
  }

  if (btnEditar) {
    const id = Number(btnEditar.dataset.id);
    editarDocente(id);
  }
});

function editarDocente(id) {
  const docentes = obtenerDocentes();

  const docente = docentes.find((docente) => docente.id === id);

  if (!docente) {
    mostrarMensaje("No se encontró el docente", "mje-error");
    return;
  }

  document.querySelector("#nombre").value = docente.nombre;

  document.querySelector("#especialidad").value = docente.especialidad;

  document.querySelector("#correo").value = docente.correo;

  docenteEditId = id;

  formulario.querySelector("button").textContent = "Actualizar Docente";

  document.querySelector("#nombre").focus();
}

const docentes = obtenerDocentes();
mostrarDocentes(docentes);
