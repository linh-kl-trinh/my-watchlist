class Movie {
  constructor(title, date, poster, overview, rating, popularity) {
    this.title = title;
    this.date = new Date(date);
    this.poster = poster;
    this.overview = overview;
    this.rating = rating;
    this.popularity = popularity;
  }
}

export default Movie;