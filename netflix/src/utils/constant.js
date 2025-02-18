const isDevelopment = process.env.NODE_ENV === "development";

export const API_END_POINT = isDevelopment
  ? "http://localhost:6060/api/v1/user" // Local backend for development
  : "https://netflix-egwu.onrender.com/api/v1/user"; // Deployed backend for production

export const options = {
  method: "GET",
  url: "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDc1NzRiMTU4MjJjYTRiOWRmMjMzNzM2NmEyMzZmZSIsIm5iZiI6MTczNzMwNDcyOC45MTIsInN1YiI6IjY3OGQyYTk4ODgwZjZiZDM4NDZkZmY2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T27zh66nF9cGYM5X38Q3ij0qfhXkk_dP1toKJ19_PmI",
  },
};
export const Now_Playing_Movie =
  "https://api.themoviedb.org/3/movie/now_playing";
export const Popular_Movie = "https://api.themoviedb.org/3/movie/popular";
export const Top_Rated_Movie = "https://api.themoviedb.org/3/movie/top_rated";
export const Upcoming_Movie = "https://api.themoviedb.org/3/movie/upcoming";

export const SEARCH_MOVIE_URL =
  "https://api.themoviedb.org/3/search/movie?query=";

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";