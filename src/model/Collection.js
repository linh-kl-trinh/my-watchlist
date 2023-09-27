import MovieList from "./MovieList";

class Collection {
  constructor() {
    this.waiting = new MovieList('waiting');
    this.watching = new MovieList('watching');
    this.finished = new MovieList('finished');
    this.dropped = new MovieList('dropped');
  }

  getWaiting() {
    return this.waiting;
  }

  getWatching() {
    return this.watching;
  }

  getFinished() {
    return this.finished;
  }

  getDropped() {
    return this.dropped;
  }
  
  toJson() {
    return {
      lists: this.lists
    };
  }

  // addList(list) {
  //   this.lists.push(list);
  // }

  // numLists() {
  //   return this.lists.length;
  // }
}

export default Collection;
