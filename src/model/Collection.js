import MovieList from "./MovieList";

class Collection {
  constructor() {
    this.waiting = new MovieList('waiting');
    this.watching = new MovieList('watching');
    this.finished = new MovieList('finished');
    this.dropped = new MovieList('dropped');
  }
}

export default Collection;
