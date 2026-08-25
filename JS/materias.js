const formulario = document.querySelector("#formulario");
const mensaje = document.querySelector("#mensaje");
const lista = document.querySelector("#lista");
const cantidadMaterias = document.querySelector("#cantidadMaterias");

let materiaEditId = null;

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = document.querySelector("#nombre").value.trim();
  const codigo = document.querySelector("#codigo").value.trim();
  const carrera = document.querySelector("#carrera").value.trim();

  if (nombre === "" || codigo === "" || carrera === "") {
    mostrarMensaje("Todos los campos son obligatorios", "mje-error");
    return;
  }

  if (nombre.length < 3) {
    mostrarMensaje(
      "El nombre de la materia debe tener al menos 3 caracteres",
      "mje-error",
    );
    return;
  }

  if (codigo.length < 3) {
    mostrarMensaje("El código debe tener al menos 3 caracteres", "mje-error");
    return;
  }

  const materias = obtenerMaterias();

  if (materiaEditId === null) {
    const materia = {
      id: Date.now(),
      nombre: nombre,
      codigo: codigo,
      carrera: carrera,
    };

    materias.push(materia);

    mostrarMensaje("Materia guardada correctamente", "mje-exito");
  } else {
    const materia = materias.find((materia) => materia.id === materiaEditId);

    if (!materia) {
      mostrarMensaje("No se encontró la materia", "mje-error");
      return;
    }

    materia.nombre = nombre;
    materia.codigo = codigo;
    materia.carrera = carrera;

    materiaEditId = null;

    formulario.querySelector("button").textContent = "Guardar Materia";

    mostrarMensaje("Materia actualizada correctamente", "mje-exito");
  }

  guardarDatos("materias", materias);

  mostrarMaterias(materias);
  formulario.reset();
});

function obtenerMaterias() {
  return obtenerDatos("materias");
}

function mostrarMensaje(texto, clase) {
  mensaje.className = clase;
  mensaje.textContent = texto;

  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "oculto";
  }, 3000);
}

function mostrarMaterias(materias) {
  lista.innerHTML = "";

  cantidadMaterias.textContent = `Materias: ${materias.length}`;

  for (const materia of materias) {
    lista.innerHTML += `
      <tr>
        <td>${materia.id}</td>
        <td>${materia.nombre}</td>
        <td>${materia.codigo}</td>
        <td>${materia.carrera}</td>
        <td>
          <button
            class="btn-editar" data-id="${materia.id}" title="Editar">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button
            class="btn-eliminar" data-id="${materia.id}" title="Eliminar">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    `;
  }
}

function eliminarMateria(id) {
  const materias = obtenerMaterias();

  const materiasActualizadas = materias.filter((materia) => materia.id !== id);

  guardarDatos("materias", materiasActualizadas);

  mostrarMaterias(materiasActualizadas);

  if (materiaEditId === id) {
    formulario.reset();
    materiaEditId = null;

    formulario.querySelector("button").textContent = "Guardar Materia";
  }

  mostrarMensaje("Materia eliminada", "mje-exito");
}

lista.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  const btnEditar = e.target.closest(".btn-editar");

  if (btnEliminar) {
    const id = Number(btnEliminar.dataset.id);

    const confirmar = confirm("¿Desea eliminar la materia?");

    if (confirmar) {
      eliminarMateria(id);
    }
  }

  if (btnEditar) {
    const id = Number(btnEditar.dataset.id);
    editarMateria(id);
  }
});

function editarMateria(id) {
  const materias = obtenerMaterias();

  const materia = materias.find((materia) => materia.id === id);

  if (!materia) {
    mostrarMensaje("No se encontró la materia", "mje-error");
    return;
  }

  document.querySelector("#nombre").value = materia.nombre;

  document.querySelector("#codigo").value = materia.codigo;

  document.querySelector("#carrera").value = materia.carrera;

  materiaEditId = id;

  formulario.querySelector("button").textContent = "Actualizar Materia";

  document.querySelector("#nombre").focus();
}

const materias = obtenerMaterias();
mostrarMaterias(materias);
