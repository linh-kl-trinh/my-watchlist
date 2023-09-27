class Movie {
  constructor(title, year) {
    this.title = title;
    this.year = year;
    this.rating = 0;
  }

  getTitle() {
    return this.title;
  }

  getYear() {
    return this.year;
  }

  getRating() {
    return this.rating;
  }

  rename(title) {
    this.title = title;
  }

  changeYear(year) {
    this.year = year;
  }

  giveRating(rating) {
    this.rating = rating;
  }

  toJson() {
    return {
      title: this.title,
      year: this.year,
      rating: this.rating
    };
  }
}

export default Movie;