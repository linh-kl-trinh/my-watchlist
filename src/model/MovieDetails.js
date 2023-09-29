/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3/search';
const BASE_POSTER_URL = 'https://www.themoviedb.org/t/p/w1280';

function MovieDetails({ movie }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      if (movie) {
        try {
          const response = await fetch(
            `${BASE_URL}/movie?query=${movie.title}&api_key=${API_KEY}`
          );
          const data = await response.json();
          if (data.results && data.results.length > 0) {
            const result = data.results[0];
            setDetails({
              title: result.title,
              date: result.release_date,
              poster: result.poster_path,
              overview: result.overview,
              rating: result.vote_average,
              popularity: result.popularity,
            });
          }
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      }
    }

    fetchMovieDetails();
  }, [movie]);

  if (!details) {
    return <div>No movies found!</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="title-image-container">
        <h3>{details.title}</h3>
        <img
          src={`${BASE_POSTER_URL}${details.poster}`}
          alt={details.title}
        />
      </div>
      <div className="details-container">
        <p><b>Release date: </b>{details.date}</p>
        <p><b>Rating: </b>{details.rating}</p>
        <p><b>Popularity score: </b>{details.popularity}</p>
        <p><b>Overview: </b>{details.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
