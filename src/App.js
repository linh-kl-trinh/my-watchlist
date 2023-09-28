import React, { useState } from 'react';
import './App.css';
import MovieList from './model/MovieList';
import Movie from './model/Movie';
import Collection from './model/Collection';

function App() {
  const [activeList, setActiveList] = useState('waiting');
  const [selectedList, setSelectedList] = useState('waiting');
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
    setMovies([...activeMovieList.movies]);
    
    setMovieTitle('');
    setMovieYear('');
    setMovieRating('');
  }

  const handleRemoveMovie = (movie) => {
    const activeMovieList = collection[activeList];
    activeMovieList.removeMovie(movie);
    setMovies([...activeMovieList.movies]);
  };

  const handleSortByYear = () => {
    const activeMovieList = collection[activeList];
    activeMovieList.sortByYear();
    setMovies([...activeMovieList.movies]);
  }

  const handleSortByRating = () => {
    const activeMovieList = collection[activeList];
    activeMovieList.sortByRating();
    setMovies([...activeMovieList.movies]);
  }

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

  const handleMoveMovie = (movie, targetList) => {
    const currentList = collection[activeList];
    currentList.removeMovie(movie);

    setMovies([...currentList.movies]);
  
    const targetMovieList = collection[targetList];
    targetMovieList.addMovie(movie);

    handleListChange(targetMovieList.name);
  };

  const handleListChange = (listName) => {
    setActiveList(listName);
    const activeMovieList = collection[listName];
    setMovies([...activeMovieList.movies]);
  };

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
            const { title, year, rating } = movieData;
            const movie = new Movie(title, year);
            movie.giveRating(rating);
            return movie;
          });
          newCollection[listName] = newList;
        }
      });
  
      setCollection(newCollection);
      setActiveList('waiting');
    }
  };  

  return (
    <div className="App">
      <header className="App-header">
        <h1>my watchlist</h1>
        <nav className="navbar">
          <a onClick={() => handleListChange('waiting')}>waiting</a>
          <a onClick={() => handleListChange('watching')}>watching</a>
          <a onClick={() => handleListChange('finished')}>finished</a>
          <a onClick={() => handleListChange('dropped')}>dropped</a>
        </nav>
      </header>
      <main className="scrollable-container">
        <h2>{activeList}</h2>
        <button onClick={() => handleSortByYear()}>latest</button>
        <button onClick={() => handleSortByRating()}>best</button>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <input
                type="text"
                value={movie.title}
                onChange={(e) => handleChangeMovieTitle(movie, e.target.value)}
              />
              <input
                type="number"
                value={movie.year}
                onChange={(e) => handleChangeMovieYear(movie, e.target.value)}
              />
              <input
                type="number"
                value={movie.rating}
                onChange={(e) => handleChangeMovieRating(movie, e.target.value)}
              />
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
                move
              </button>
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