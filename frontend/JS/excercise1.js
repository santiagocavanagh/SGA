console.log("Solicitando lista de Alumnos");
setTimeout(
  () => {
    console.log("Programa Ejecutandose");
  },
  2000,
  setTimeout(() => {
    console.log("Lista Recibida");
  }, 5000),
);

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
  const alumnos = await obtenerAlumnos();
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
