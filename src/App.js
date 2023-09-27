import React, { useState } from 'react';
import './App.css';
import MovieList from './model/MovieList';
import Movie from './model/Movie';
import Collection from './model/Collection';

function App() {
  const [activeList, setActiveList] = useState('waiting');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieRating, setMovieRating] = useState('');
  const [movies, setMovies] = useState([]);
  const [collection, setCollection] = useState(new Collection());

  const handleAddMovie = () => {
    const newMovie = new Movie(movieTitle, parseInt(movieYear, 10));
    newMovie.giveRating(parseFloat(movieRating));

    const activeMovieList = collection[activeList];
    activeMovieList.addMovie(newMovie);
    setMovies([...activeMovieList.getWatchlist()]);
    
    setMovieTitle('');
    setMovieYear('');
    setMovieRating('');
  };

  const handleRemoveMovie = (movie) => {
    const activeMovieList = collection[activeList];
    activeMovieList.removeMovie(movie);
    setMovies([...activeMovieList.getWatchlist()]);
  };

  const handleChangeMovieTitle = (movie, newTitle) => {
    movie.rename(newTitle);
    setMovies([...movies]);
  };

  const handleChangeMovieYear = (movie, newYear) => {
    movie.changeYear(parseInt(newYear, 10));
    setMovies([...movies]);
  };

  const handleChangeMovieRating = (movie, newRating) => {
    movie.giveRating(parseFloat(newRating));
    setMovies([...movies]);
  };

  const handleListChange = (listName) => {
    setActiveList(listName);
    const activeMovieList = collection[listName];
    setMovies([...activeMovieList.getWatchlist()]);
  };

  const saveDataToLocal = (data) => {
    localStorage.setItem('movieCollection', JSON.stringify(data));
  };

  const loadDataFromLocal = () => {
    const data = localStorage.getItem('movieCollection');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };
  
  const handleSaveData = () => {
    saveDataToLocal(collection);
  };
  
  const handleLoadData = () => {
    const loadedData = loadDataFromLocal();
      if (loadedData) {
        const collection = new Collection();
        collection.waiting = new MovieList(loadedData.waiting.name);
        collection.waiting.watchlist = loadedData.waiting.watchlist.map((movieData) => {
          const { title, year, rating } = movieData;
          const movie = new Movie(title, year);
          movie.giveRating(rating);
          return movie;
        });

        collection.watching = new MovieList(loadedData.watching.name);
        collection.watching.watchlist = loadedData.watching.watchlist.map((movieData) => {
          const { title, year, rating } = movieData;
          const movie = new Movie(title, year);
          movie.giveRating(rating);
          return movie;
        });

        collection.finished = new MovieList(loadedData.finished.name);
        collection.finished.watchlist = loadedData.finished.watchlist.map((movieData) => {
          const { title, year, rating } = movieData;
          const movie = new Movie(title, year);
          movie.giveRating(rating);
          return movie;
        });

        collection.dropped = new MovieList(loadedData.dropped.name);
        collection.dropped.watchlist = loadedData.dropped.watchlist.map((movieData) => {
          const { title, year, rating } = movieData;
          const movie = new Movie(title, year);
          movie.giveRating(rating);
          return movie;
        });

        setCollection(collection);

        handleListChange('waiting');
      }
  };  

  return (
    <div className="App">
      <header className="App-header">
        <h1>my movie collection</h1>
        <nav className="navbar">
          <button onClick={() => handleListChange('waiting')}>waiting</button>
          <button onClick={() => handleListChange('watching')}>watching</button>
          <button onClick={() => handleListChange('finished')}>finished</button>
          <button onClick={() => handleListChange('dropped')}>dropped</button>
        </nav>
      </header>
      <main className="scrollable-container">
        <h2>{activeList}</h2>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <input
                type="text"
                value={movie.getTitle()}
                onChange={(e) => handleChangeMovieTitle(movie, e.target.value)}
              />
              <input
                type="number"
                value={movie.getYear()}
                onChange={(e) => handleChangeMovieYear(movie, e.target.value)}
              />
              <input
                type="number"
                value={movie.getRating()}
                onChange={(e) => handleChangeMovieRating(movie, e.target.value)}
              />
              <button onClick={() => handleRemoveMovie(movie)}>remove</button>
            </li>
          ))}
        </ul>
        </main>
        <footer className="App-footer">
        <div className="add-movie-form">
            <input
              type="text"
              placeholder="title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="year"
              value={movieYear}
              onChange={(e) => setMovieYear(e.target.value)}
            />
            <input
              type="number"
              placeholder="rating"
              value={movieRating}
              onChange={(e) => setMovieRating(e.target.value)}
            />
            <button onClick={handleAddMovie}>add</button>
        </div>
        <div className="save-load-buttons">
          <button onClick={() => handleLoadData()}>load</button>
          <button onClick={() => handleSaveData()}>save</button>
        </div>
      </footer>
    </div>
  );
}

export default App;