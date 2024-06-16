const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');
const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');
const ulcontainer = document.querySelectorAll('.ulcontainer');

// Los paises descargados desde la api se guardan en el array de countries
// La api deberia pedirse solo una vez
// Usar este array para crear el filtrado
let countries = [];
let wheater = [];

// Funcion que pide todos los paises
const getCountries = async () => {
  // Llamo a la API Rest Countries
  const respuestapaises = await fetch('https://restcountries.com/v3.1/all')
  // Transformo la respuesta a JSON
  const paises = await respuestapaises.json()
  // Guardo el array de los paises recibido dentro de contries
  countries = paises
}
getCountries();


searchInput.addEventListener('keyup', async e => {

  // Toda la logica del desafio va dentro del evento del input.
  if(searchInput.value !== ''){
  const newCountries = countries.filter(countri => countri.name.common.toLowerCase().slice(0, 20).startsWith(searchInput.value.toLowerCase()))
  
  if(newCountries.length > 10){
    container.innerHTML = `<h2>Debe ser mas especifico en la busqueda</h2>`
    return
    }else if(newCountries.length === 0){
    container.innerHTML = `<h2>El nombre del pais ingresado no existe</h2>`
    return
    }else if(newCountries.length === 1){

      const latitude = newCountries[0].latlng[0];
      const longitude = newCountries[0].latlng[1];
        container.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`
        const urlOpenWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&appid=fe6f0dd7e575dada28a25ef6bb34d41f&units=metric`)
        const datosclima = await urlOpenWeather.json()
        console.log(datosclima)
        renderCountries2(newCountries)
        
        const createCountriItems2HTML =  
        `<ul class="ulcontainer">
        <li><img src=" ${newCountries[0].flags.svg}" flag"></li>
        <li><h3>Nombre: ${newCountries[0].name.common}</h3></li>
        <li><h3>Capital: ${newCountries[0].capital}</h3></li>
        <li><h3>Habitantes: ${newCountries[0].population.toLocaleString("es-ES")}</h3></li>
        <li><h3>Continente: ${newCountries[0].region}</h3></li>
        <li><h3>Continente: ${newCountries[0].timezones[0]}</h3></li>
        <li><img class="imgclima" src="https://openweathermap.org/img/wn/${datosclima.weather[0].icon}@2x.png"></li>
        <li><h3>Clima: ${datosclima.weather[0].description}</h3></li>
        <li><h3>Temp: ${datosclima.main.temp} Cº</h3></li>
        </ul>` 
        container.innerHTML = createCountriItems2HTML;
        return
        }else{
        renderCountries2(newCountries)
        }
        }else{
        container.innerHTML = `<h1>Loading</h1>`
        return 
      }
});

const createCountriItems2 = countries => countries.map(countri =>
 `<ul class="ulcontainer">
  <li><img src=" ${countri.flags.svg}" flag"></li>
  <li><h3>Nombre: ${countri.name.common}</h3></li>
  </ul>`
).join(' ')


function renderCountries2(countries){
  const itemsString = createCountriItems2(countries)
  container.innerHTML = itemsString
}
  // container.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`

  // const createCountriItems = countries => countries.map(countri =>
// ` <ul class="ulcontainer">
//   </ul>
// `)
  

// function renderCountries(countries){
//   const itemsString = createCountriItems(countries)
//   container.innerHTML = itemsString
// }

