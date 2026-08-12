/*
function obtenerAlumnos() {
  return new Promise((resolve) => {
    (setTimeout(() => {
      resolve(Alumnos);
    }),
      3000);
  });
}


async function obtenerAlumnos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const alumnos = await res.json();
  return alumnos;
}


function mostrarAlumnos(alumnos) {
  //  console.table(alumnos)
  console.log(typeof alumnos);
  localStorage.setItem("alumnos", JSON.stringify(alumnos));
  const datos = localStorage.getItem("alumnos");
  console.log(typeof datos);
  const datosConvert = JSON.parse(datos);
  console.log(typeof datosConvert);
  console.table(datosConvert);
}

async function iniciar() {
  const alumnos = await obtenerAlumnos;
  mostrarAlumnos(alumnos);
}

// Ejercicio Consola F12 navegador

const materias = [
  { id: 1, materia: "Economia" },
  { id: 2, materia: "Defensa Personal" },
  { id: 3, materia: "Contabilidad" },
];
localStorage.setItem("materias");
localStorage.getItem("materias");

for (m in materias) {
  console.log(m);
}

materias.push({ id: 4, materia: "Intereses" });

localStorage.getItem("materias");
console.table(materias);
localStorage.removeItem("materias");
*/

// Formulario
const formulario = ;
const datos = ;
const alumnos = ;
formulario.addEventListener("submit", function (event) {
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

function mostratMensaje(texto) {
  mensaje.textContent = texto;
  setTimeout(() => {
    mensaje.textContent = " ";
  }, 3000);
}

function mostrarAlumnos() {
  listAlumnos.innerHTML = ""
  for (const alumno of alumnos) {
    listAlumnos.innerHTML += `
    <tr>
        <td>${alumno.id}</td>
        <td>${alumno.nombre}</td>
        <td>${alumno.carrera}</td>
        <td>${alumno.correo}</td>
        <td>
          <button class="btn-editar" data-id="${alumno.id}">Editar</button>
          <button class="btn-eliminar" data-id="${alumno.id}">Eliminar</button>
        </td>
      </tr>
    `;
  }
}

function eliminarAlumno(id) {
  const alumnos = obtenerAlumnos()
  const alumnosActualizados = alumnos.filter(
    alumno => alumno.id !== id
  );
  localStorage.setItem("alumno", JSON.stringify(alumnosActualizados))
  mostrarAlumnos(alumnosActualizados)
  mostrarMensaje("Alumno Eliminado")
}

listaAlumnos.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")){
    const id = Number(e.target.dataset.id)
    eliminarAlumno(id)
  }
})