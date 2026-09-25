class ServicioError extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ServicioError";
  }
}

function obtenerDatosUsuario(escenario = "aleatorio") {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito =
        escenario === "exito" ||
        (escenario === "aleatorio" && Math.random() >= 0.3);
      if (exito) {
        resolve({ usuario: "Ana", rol: "estudiante" });
      } else {
        reject(new ServicioError("No se pudo conectar con el servicio"));
      }
    }, 800);
  });
}

const boton = document.getElementById("btnCargar");
const resultado = document.getElementById("resultado");
const escenario = document.getElementById("escenario");
const respuesta = document.getElementById("respuesta");

boton.addEventListener("click", async () => {
  if (boton.disabled) return;
  boton.disabled = true;
  escenario.disabled = true;
  respuesta.dataset.state = "loading";
  resultado.textContent = "Cargando...";
  try {
    const datos = await obtenerDatosUsuario(escenario.value);
    resultado.textContent = `Bienvenido, ${datos.usuario} (${datos.rol}).`;
    respuesta.dataset.state = "success";
  } catch (error) {
    resultado.textContent =
      error instanceof ServicioError
        ? `Error: ${error.message}. Vuelve a intentarlo.`
        : "Ocurrió un error inesperado. Vuelve a intentarlo.";
    respuesta.dataset.state = "error";
  } finally {
    boton.disabled = false;
    escenario.disabled = false;
  }
});
