$(document).ready(function () {
  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  const main = document.getElementById("main");
  const form = document.getElementById("form");
  const search = document.getElementById("search");

  //La declaración de función async ==> devuelve un elemento Promise

  //La API Fetch proporciona una interfaz JavaScript para acceder y manipular partes del canal HTTP
  obtenerPeliculas(APIURL);

  async function obtenerPeliculas(api) {
    //await es usado para esperar a una Promise. Sólo puede ser usado dentro de una función async function.
    const respuesta = await fetch(api);
    //el método json() toma un flujo de respuesta y lo lee hasta el final. Devuelve una promesa que se resuelve con el resultado de analizar el texto del cuerpo como JSON.
    const respuestaData = await respuesta.json();
    // console.log(respuestaData);

    //sin el results me marca que movies.forEach is not a function
    mostrarPeliculas(respuestaData.results);
    mostrarDetalles(respuestaData.results);
  }

  function mostrarPeliculas(movies) {
    main.innerHTML = "";

    movies.forEach((movie) => {
      // console.log(movie);
      const { poster_path, title, vote_average, overview, id } = movie;

      const divMovie = document.createElement("div");
      divMovie.classList.add("movie");

      divMovie.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}"/>
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${colorRate(vote_average)}">${vote_average}</span>
        </div>
        <div id="detalle-${id}" class="overview overviewDisplay">
            <h3>Overview:</h3>
            <p>${overview}</p>
        </div>
    `;

      main.appendChild(divMovie);
    });
  }

  //async porque tiene que esperar que esten disponibles los datos de la API
  //tmb va async porque los datos q entran por parametro vienen de una async function
  async function mostrarDetalles(movies) {
    movies.forEach((movie) => {
      const { id } = movie;
      const ids = document.getElementById(`detalle-${id}`);
      const div = ids.parentElement;

      div.addEventListener("click", () => {
        ids.classList.toggle("overviewDisplay");
      });
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
});
