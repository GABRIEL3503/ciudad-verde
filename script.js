// guardamos en una variable contante el peso de cada objeto reciclado en kg

const PESO_OBJETO_KG = {
  BOTELLA: 0.025,
  LATA:    0.014,
  HOJA:    0.0045
};

// esta funcion calcula el impacto ambiental de cada objeto reciclado
// según su tipo y cantidad en kg, devolviendo un mensaje descriptivo  
// tofixed redondea el resultado con o sin decimales 
function obtenerImpacto(tipo, kg) {
  switch (tipo) {
    case "BOTELLA": return (kg * 1.5).toFixed(2) + " kg de CO₂ evitado";
    case "LATA":    return (kg * 9).toFixed(2) + " kWh de energía ahorrada";
    case "HOJA":    return (kg * 17).toFixed(0) + " litros de agua ahorrados";
    default: return "";
  }
}

// validacion
function validarTodo() {
  limpiarErrores();
  let esValido = true;
  
//  creamos un objeto con los campos del formulario
  const campos = {
    objeto:     document.getElementById("txObjeto"),
    cantidad:   document.getElementById("txCantidad"),
    nombre:     document.getElementById("nombre"),
    direccion:  document.getElementById("direccion"),
    fecha:      document.getElementById("fecha"),
    telefono:   document.getElementById("telefono")
  };

  // Objeto válido
  if (!["BOTELLA", "LATA", "HOJA"].includes(campos.objeto.value)) {
    marcarErrorInput(campos.objeto, true);
    mostrarError("Debe elegir un objeto reciclado.");
    esValido = false;
  }

  // Cantidad válida parseint se encarga de convertir el valor a un número entero
  const cant = parseInt(campos.cantidad.value);
  if (isNaN(cant) || cant <= 0) {
    marcarErrorInput(campos.cantidad, true);
    mostrarError("Ingrese una cantidad válida mayor a 0.");
    esValido = false;
  }

  // Nombre trim elimina los espacios al principio y al final
  if (campos.nombre.value.trim() === "") {
    marcarErrorInput(campos.nombre, true);
    mostrarError("Ingrese su nombre.");
    esValido = false;
  }

  // Dirección
  if (campos.direccion.value.trim() === "") {
    marcarErrorInput(campos.direccion, true);
    mostrarError("Ingrese su dirección.");
    esValido = false;
  }

  // Fecha válida
  if (!fechaValida(campos.fecha.value)) {
    marcarErrorInput(campos.fecha, true);
    mostrarError("Ingrese una fecha válida.");
    esValido = false;
  }

// este campo es opcional  usamos expercion regular 
if (campos.telefono.value.trim() !== "" &&
      !/^[0-9\-\+\s]{7,15}$/.test(campos.telefono.value.trim())) {
    marcarErrorInput(campos.telefono, true);
    mostrarError("Teléfono con formato inválido.");
    esValido = false;
  }

// si esta todo bien muestra el impacto usamoa interpolacion como concatenacion
 if (esValido) {
    const tipo = campos.objeto.value;
    const pesoKg = cant * PESO_OBJETO_KG[tipo];
    const impacto = obtenerImpacto(tipo, pesoKg);
    document.getElementById("resultado").textContent =
      `Peso total reciclado: ${pesoKg.toFixed(3)} kg — Impacto: ${impacto}`;

    alert("✅ Solicitud enviada correctamente.");
    return true;
  }

  document.getElementById("resultado").textContent = "";
  // no se envia el form si hay errores
  return false;  
}

function marcarErrorInput(input, hayError) {
  input.style.border = hayError ? "2px solid red" : "";
  input.style.backgroundColor = hayError ? "#ffe6e6" : "";
}

function limpiarErrores() {
  document.getElementById("errores").innerHTML = "";
  document.querySelectorAll("input, select").forEach(input => {
    input.style.border = "";
    input.style.backgroundColor = "";
  });
}

function mostrarError(mensaje) {
  document.getElementById("errores").innerHTML += `<p>${mensaje}</p>`;
}


function fechaValida(fecha) {
  if (!fecha) return false;
// divide la fecha en partes usando el guion como array

  const partes = fecha.split("-");
  const anio  = parseInt(partes[0]);
  const mes   = parseInt(partes[1]);
  const dia   = parseInt(partes[2]);
  // Validamos que sean números válidos enteros

  if (isNaN(anio) || isNaN(mes) || isNaN(dia)) return false;

  // Creamos la fecha con los valores usamo el objeto date de js, enero es el mes 0
  const fechaObj = new Date(anio, mes - 1, dia);
  // Confirmamos que coincidan los valores devuelve true o false

  return fechaObj.getFullYear() === anio &&
         fechaObj.getMonth() === mes - 1 &&
         fechaObj.getDate() === dia;
}

function toggleMenu() {
  document.getElementById("menu").classList.toggle("mostrar");}