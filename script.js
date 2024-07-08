let urlBase = "https://api.openweathermap.org/data/2.5/weather";
let api_key = "905a15e3566f9fcfcd4dc341183212a5";
let difKelvin = 273.15;

// Define las categorías de temperatura y sus fondos de pantalla
const categorias = [
  { rango: [46, 33], fondo: "muyCaluroso.jpg" },
  { rango: [32, 24], fondo: "caluroso.jpg" },
  { rango: [23, 12], fondo: "calido.jpg" },
  { rango: [11, 4], fondo: "frio.jpg" },
  { rango: [3, -10], fondo: "muyFrio.jpg" },
];

// Objeto de mapeo para traducciones de descripciones
const descripcionesTraduccion = {
  "clear sky": "Cielo despejado",
  "few clouds": "Pocas nubes",
  "scattered clouds": "Nubes dispersas",
  "broken clouds": "Nubes moderadas",
  "shower rain": "Lluvia ligera",
  rain: "Lluvia",
  thunderstorm: "Tormenta",
  snow: "Nieve",
  mist: "Niebla",
  "light rain": "Lluvia ligera",
  sunny: "Soleado",
  "overcast clouds": "Nubes cubiertas",
  "moderate rain": "Lluvia moderada",
};

document.getElementById("botonBusqueda").addEventListener("click", () => {
  const ciudad = document.getElementById("ciudadEntrada").value;
  if (ciudad) {
    fetchDatosClima(ciudad);
    document.getElementById("ciudadEntrada").value = "";
    volverAPaginaInicial();
  }
});

function fetchDatosClima(ciudad) {
  fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then((data) => data.json())
    .then((data) => mostrarDatosClima(data));
}

function mostrarDatosClima(data) {
  const divDatosClima = document.getElementById("datosClima");
  divDatosClima.innerHTML = "";

  const ciudadNombre = data.name;
  const paisNombre = data.sys.country;
  const temperatura = data.main.temp;
  const humedad = data.main.humidity;
  let descripcion = data.weather[0].description;

  const tempCelsius = Math.floor(temperatura - difKelvin);

  const ciudadTitulo = document.createElement("h3");
  ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`;

  const temperaturaInfo = document.createElement("p");
  temperaturaInfo.textContent = `La temperatura es de: ${tempCelsius}ºC`;

  const humedadInfo = document.createElement("p");
  humedadInfo.textContent = `La humedad es del: ${humedad}%`;

  // Traduce la descripción del clima
  descripcion = descripcionesTraduccion[descripcion] || descripcion;

  const descripcionInfo = document.createElement("p");
  descripcionInfo.textContent = `Estado del Tiempo: ${descripcion}`;

  divDatosClima.appendChild(ciudadTitulo);
  divDatosClima.appendChild(temperaturaInfo);
  divDatosClima.appendChild(humedadInfo);
  divDatosClima.appendChild(descripcionInfo);

  // Cambia el fondo de pantalla según la temperatura
  cambiarFondo(tempCelsius);
}

function cambiarFondo(tempCelsius) {
  let fondo = "default.jpg";
  for (let categoria of categorias) {
    if (
      tempCelsius <= categoria.rango[0] &&
      tempCelsius >= categoria.rango[1]
    ) {
      fondo = categoria.fondo;
      break;
    }
  }
  document.body.style.backgroundImage = `url('/img/${fondo}')`;
}

document
  .getElementById("ciudadEntrada")
  .addEventListener("keypress", handleEnter);

function handleEnter(event) {
  if (event.key === "Enter") {
    const ciudad = document.getElementById("ciudadEntrada").value;
    if (ciudad) {
      fetchDatosClima(ciudad);
      document.getElementById("ciudadEntrada").value = "";
      volverAPaginaInicial();
    }
  }
}

//Vuelve a la página inicial
function volverAPaginaInicial() {
  setTimeout(() => {
    document.getElementById("datosClima").innerHTML = "";
    document.body.style.backgroundImage = "url('./img/fondo.png')";
  }, 8000);
}
