function mostrarMensaje(texto, clase) {
  const mensaje = document.querySelector("#mensaje");

  mensaje.textContent = texto;
  mensaje.className = `clase ${clase}`;
  mensaje.style.display = "block";

  setTimeout(() => {
    mensaje.textContent = "";
    mensaje.className = "oculto";
  }, 3000);
}

/*function guardarDatos() {
    const datos = this.obtenerDatos();
    localStorage.setItem('datosUsuario', JSON.stringify(datos));
    alert('Datos guardados correctamente.');
  }
*/
