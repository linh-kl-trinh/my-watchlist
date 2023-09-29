class MovieList {
  constructor(name) {
    this.name = name;
    this.movies = [];
  }

  addMovie(movie) {
    this.movies.push(movie);
    
  }

  removeMovie(movie) {
    this.movies = this.movies.filter((m) => m !== movie);
  }

  sortByDate() {
    this.movies.sort((a, b) => b.date - a.date);
  }

  sortByRating() {
    this.movies.sort((a, b) => b.rating - a.rating);
  }

  sortByPopularity() {
    this.movies.sort((a, b) => b.popularity - a.popularity);
  }
}

export default MovieList;
