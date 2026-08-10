/*
function obtenerAlumnos() {
  return new Promise((resolve) => {
    (setTimeout(() => {
      resolve(Alumnos);
    }),
      3000);
  });
}
*/

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
}

async function iniciar() {
  const alumnos = await obtenerAlumnos;
  mostrarAlumnos(alumnos);
}
