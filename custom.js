/*
 * API_KEY : api_key=870967436c1517d581daf3b245495790
 * Popular Movie API: https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=<api_key>>
 * Search API : https://api.themoviedb.org/3/search/company?query=<<QUERY>>&api_key=<<api_key>>&page=1
 * Find By ID: https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
 * Image - https://image.tmdb.org/t/p/w1280
 */

//
const apiKey = "870967436c1517d581daf3b245495790";
const displayArea = document.getElementById("show-movies");
const singleDisplayArea = document.getElementById("singleMovie");

function getPopularMovies() {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      let previousHTML = displayArea.innerHTML;

      data.results.slice(0, 12).map((movie) => {
        const htmlTemplate = `
            <div class="col">
                    <div class="card">
                    <img src="https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <button onclick="movieDetailsView(${movie.id})" class="btn btn-outline-success">View Details</button>
                    </div>
                    </div>
            </div>
            `;
        previousHTML += htmlTemplate;
      });

      displayArea.innerHTML = previousHTML;
    })
    .catch((err) => console.log(err.message));
}

function movieDetailsView(id) {
  fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);

      displayArea.classList.add("d-none");
      singleDisplayArea.classList.remove("d-none");

      const htmlTemplate = ` 
        <div class="card">
        <img src="https://image.tmdb.org/t/p/w1280/${data.backdrop_path}" alt="${data.original_title}">
            <div class="card-body">
            <h5 class="card-title">${data.original_title}</h5>
           
            <p class="card-text">${data.overview}</p>
            </div>
        </div>`;
      singleDisplayArea.innerHTML = htmlTemplate;
    })
    .catch((err) => console.log(err.message));
}

getPopularMovies();
