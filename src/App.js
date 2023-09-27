import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeList, setActiveList] = useState('waiting');
  const handleListChange = (listName) => {
    setActiveList(listName);
  };

  let movies = [];

  switch (activeList) {
    case 'waiting':
      movies = ['Movie 1', 'Movie 2', 'Movie 3'];
      break;
    case 'watching':
      movies = ['Movie A', 'Movie B'];
      break;
    case 'dropped':
      movies = ['Movie X', 'Movie Y', 'Movie Z'];
      break;
    case 'finished':
      movies = ['Movie Alpha', 'Movie Beta'];
      break;
    default:
      movies = [];
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Collection</h1>
        <div className="list-buttons">
          <button
            className={`list-button ${activeList === 'waiting' ? 'active' : ''}`}
            onClick={() => handleListChange('waiting')}
          >
            Waiting
          </button>
          <button
            className={`list-button ${activeList === 'watching' ? 'active' : ''}`}
            onClick={() => handleListChange('watching')}
          >
            Watching
          </button>
          <button
            className={`list-button ${activeList === 'dropped' ? 'active' : ''}`}
            onClick={() => handleListChange('dropped')}
          >
            Dropped
          </button>
          <button
            className={`list-button ${activeList === 'finished' ? 'active' : ''}`}
            onClick={() => handleListChange('finished')}
          >
            Finished
          </button>
        </div>
      </header>
      <main>
        <h2>{activeList}</h2>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;