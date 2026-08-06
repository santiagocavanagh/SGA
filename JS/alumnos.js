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
  const alumno = await res.json();
  return alumno
}

function mostrarAlumnos(alumnos){
  console.table(alumnos)
}

async function iniciar(){
  const alumnos = await obtenerAlumnos
  mostrarAlumnos(alumnos)
}
