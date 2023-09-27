import React, { useState } from 'react';
import './App.css';
// import MovieList from './model/MovieList';
import Movie from './model/Movie';
import Collection from './model/Collection';

function App() {
  const [activeList, setActiveList] = useState('waiting');
  const [movieTitle, setMovieTitle] = useState('');
  const [movieYear, setMovieYear] = useState('');
  const [movieRating, setMovieRating] = useState('');
  const [movies, setMovies] = useState([]);
  const [collection] = useState(new Collection());

  const handleAddMovie = () => {
    // Create a new Movie object based on the form inputs
    const newMovie = new Movie(movieTitle, parseInt(movieYear, 10));
    newMovie.giveRating(parseFloat(movieRating));

    // Determine the active MovieList and add the new Movie
    const activeMovieList = collection[activeList];
    if (activeMovieList) {
      activeMovieList.addMovie(newMovie);
      setMovies([...activeMovieList.getWatchlist()]);
    }

    // Clear the form inputs
    setMovieTitle('');
    setMovieYear('');
    setMovieRating('');
  };

  const handleRemoveMovie = (movie) => {
    // Determine the active MovieList and remove the movie
    const activeMovieList = collection[activeList];
    if (activeMovieList) {
      activeMovieList.removeMovie(movie);
      setMovies([...activeMovieList.getWatchlist()]);
    }
  };

  const handleChangeMovieTitle = (movie, newTitle) => {
    // Update the movie's title
    movie.rename(newTitle);
    setMovies([...movies]);
  };

  const handleChangeMovieYear = (movie, newYear) => {
    // Update the movie's year
    movie.changeYear(parseInt(newYear, 10));
    setMovies([...movies]);
  };

  const handleChangeMovieRating = (movie, newRating) => {
    // Update the movie's rating
    movie.giveRating(parseFloat(newRating));
    setMovies([...movies]);
  };

  // Handle list selection
  const handleListChange = (listName) => {
    setActiveList(listName);
    const activeMovieList = collection[listName];
    if (activeMovieList) {
      setMovies([...activeMovieList.getWatchlist()]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Collection</h1>
        <div className="list-buttons">
          <button onClick={() => handleListChange('waiting')}>Waiting</button>
          <button onClick={() => handleListChange('watching')}>Watching</button>
          <button onClick={() => handleListChange('finished')}>Finished</button>
          <button onClick={() => handleListChange('dropped')}>Dropped</button>
        </div>
      </header>
      <main>
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
              <button onClick={() => handleRemoveMovie(movie)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="add-movie-form">
          <h3>Add a Movie</h3>
          <input
            type="text"
            placeholder="Title"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Year"
            value={movieYear}
            onChange={(e) => setMovieYear(e.target.value)}
          />
          <input
            type="number"
            placeholder="Rating"
            value={movieRating}
            onChange={(e) => setMovieRating(e.target.value)}
          />
          <button onClick={handleAddMovie}>Add</button>
        </div>
      </main>
    </div>
  );
}

export default App;