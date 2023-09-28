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

  sortByYear() {
    this.movies.sort((a, b) => b.year - a.year);
  }

  sortByRating() {
    this.movies.sort((a, b) => b.rating - a.rating);
  }

  // toJson() {
  //   return {
  //     name: this.name,
  //     movies: this.movies
  //   };
  // }
}

export default MovieList;
