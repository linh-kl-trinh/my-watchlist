/* eslint-disable no-undef */
import React, { useState } from 'react';
import './App.css';
import MovieList from './model/MovieList';
import Movie from './model/Movie';
import Collection from './model/Collection';
import MovieDetails from './model/MovieDetails';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/search';

function App() {
  const [activeList, setActiveList] = useState('waiting');
  const [selectedList, setSelectedList] = useState('waiting');
  const [movieTitle, setMovieTitle] = useState('');
  const [movies, setMovies] = useState([]);
  const [collection, setCollection] = useState(new Collection());

  const handleAddMovie = async () => {
    if (movieTitle) {
      try {
        const response = await fetch(
          `${BASE_URL}/movie?query=${movieTitle}&api_key=${API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const result = data.results[0];
          const newMovie = new Movie(
            result.title,
            result.release_date,
            result.poster_path,
            result.overview,
            result.vote_average
          );

          const activeMovieList = collection[activeList];
          activeMovieList.addMovie(newMovie);
          setMovies([...activeMovieList.movies]);

          setMovieTitle('');
        }
      } catch (error) {
        console.error('Error adding movie:', error);
      }
    }
  };

  // Remove a movie from the active list
  const handleRemoveMovie = (movie) => {
    const activeMovieList = collection[activeList];
    activeMovieList.removeMovie(movie);
    setMovies([...activeMovieList.movies]);
  };

  // Sort movies by release date
  const handleSortByDate = () => {
    const activeMovieList = collection[activeList];
    activeMovieList.sortByDate();
    setMovies([...activeMovieList.movies]);
  };

  // Sort movies by rating
  const handleSortByRating = () => {
    const activeMovieList = collection[activeList];
    activeMovieList.sortByRating();
    setMovies([...activeMovieList.movies]);
  };

  // Sort movies by popularity
  const handleSortByPopularity = () => {
    const activeMovieList = collection[activeList];
    activeMovieList.sortByPopularity();
    setMovies([...activeMovieList.movies]);
  };

  // Move a movie to another list
  const handleMoveMovie = (movie, targetList) => {
    const currentList = collection[activeList];
    currentList.removeMovie(movie);
    setMovies([...currentList.movies]);

    const targetMovieList = collection[targetList];
    targetMovieList.addMovie(movie);

    handleListChange(targetList);
  };

  // Change the active list
  const handleListChange = (listName) => {
    setActiveList(listName);
    const activeMovieList = collection[listName];
    setMovies([...activeMovieList.movies]);
  };

  // Save collection data to local storage
  const saveDataToLocal = (data) => {
    localStorage.setItem('movieCollection', JSON.stringify(data));
  };

  const handleSaveData = () => {
    saveDataToLocal(collection);
  };

  const loadDataFromLocal = () => {
    const data = localStorage.getItem('movieCollection');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  };
  
  const handleLoadData = () => {
    const loadedData = loadDataFromLocal();
    if (loadedData) {
      const newCollection = new Collection();

      ['waiting', 'watching', 'finished', 'dropped'].forEach((listName) => {
        const listData = loadedData[listName];
        if (listData) {
          const newList = new MovieList(listData.name);
          newList.movies = listData.movies.map((movieData) => {
            const { title, date, poster, overview, rating, popularity } = movieData;
            const movie = new Movie(title, date, poster, overview, rating, popularity);
            return movie;
          });
          newCollection[listName] = newList;
        }
      });
  
      setCollection(newCollection);
      handleListChange('waiting');
    }
  }; 

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Watchlist</h1>
        <nav className="navbar">
          <a onClick={() => handleListChange('waiting')}>Waiting</a>
          <a onClick={() => handleListChange('watching')}>Watching</a>
          <a onClick={() => handleListChange('finished')}>Finished</a>
          <a onClick={() => handleListChange('dropped')}>Dropped</a>
        </nav>
      </header>
      <main className="scrollable-container">
        <h2>Been {activeList} for a while...</h2>
        Sort by:&nbsp;
        <button onClick={() => handleSortByDate()}>Release date</button>
        <button onClick={() => handleSortByRating()}>Rating</button>
        <button onClick={() => handleSortByPopularity()}>Popularity</button>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              Move to:&nbsp;
              <select
                value={selectedList}
                onChange={(e) => setSelectedList(e.target.value)}
              >
                {Object.keys(collection).map((listName) => (
                  <option key={listName} value={listName}>
                    {listName}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (selectedList) {
                    handleMoveMovie(movie, selectedList);
                  }
                }}
              >
                Move
              </button>
              <button onClick={() => handleRemoveMovie(movie)}>Remove</button>
              <MovieDetails movie={movie} />
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
          <button onClick={handleAddMovie}>Add</button>
        </div>
        <div className="save-load-buttons">
          <button onClick={() => handleLoadData()}>Load</button>
          <button onClick={() => handleSaveData()}>Save</button>
        </div>
      </footer>
    </div>
  );
}

export default App;