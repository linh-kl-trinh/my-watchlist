class MovieList {
  constructor(name) {
    this.name = name;
    this.watchlist = [];
  }

  getName() {
    return this.name;
  }

  getWatchlist() {
    return this.watchlist;
  }

  addMovie(movie) {
    this.watchlist.push(movie);
    
  }

  removeMovie(movie) {
    this.watchlist = this.watchlist.filter((m) => m !== movie);
  }

  sortByYear() {
    return this.watchlist
    .slice()
    .sort((a, b) => b.getYear() - a.getYear());
  }

  toJson() {
    return {
      name: this.name,
      watchlist: this.watchlist
    };
  }
}

export default MovieList;
