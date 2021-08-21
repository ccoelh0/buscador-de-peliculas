const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//La declaración de función async define una función asíncrona,que devuelve un objeto AsyncFunction --> esta devuelve un elemento Promise. Cuando la función async devuelve un valor, Promise se resolverá con el valor devuelto. Si la función async genera una excepción o algún valor, Promise se rechazará con el valor generado.

//El objeto Promise (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

//  //El operador await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.

//La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP

obtenerPeliculas(APIURL);

async function obtenerPeliculas(api) {
  const respuesta = await fetch(api);
  //el método json() toma un flujo de respuesta y lo lee hasta el final. Devuelve una promesa que se resuelve con el resultado de analizar el texto del cuerpo como JSON.
  const respuestaData = await respuesta.json();
  //   console.log(respuestaData);

  //sin el results me marca que movies.forEach is not a function
  mostrarPeliculas(respuestaData.results);
}

function mostrarPeliculas(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    // console.log(movie);
    const { poster_path, title, vote_average, overview } = movie;

    const divMovie = document.createElement("div");
    divMovie.classList.add("movie");

    divMovie.innerHTML = `
    <img src="${IMGPATH + poster_path}" alt="${title}"/>
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${colorRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview:</h3>
        ${overview}
    </div>
    `;

    main.appendChild(divMovie);
  });
}

function colorRate(rate) {
  if (rate >= 8) {
    return "green";
  }
  if (rate > 7) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const busqueda = search.value;

  if (busqueda) {
    obtenerPeliculas(SEARCHAPI + busqueda);
    search.value = "";
  }
});
