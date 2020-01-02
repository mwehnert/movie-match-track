import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ChevronLeft from '@kiwicom/orbit-components/lib/icons/ChevronLeft';
import Stack from '@kiwicom/orbit-components/lib/Stack';

import { useParams, Link } from 'react-router-dom';

import MovieInput from './MovieInput.js';
import { Movie } from './Movie.js';
import MovieData from './MovieData.js';
import MovieToAdd from './MovieToAdd.js';
import useMovies from '../hooks/useMovies';

const MoviesAddSection = styled.section`
  margin: 40px 0;
`;

const BackLink = styled(Link)`
  text-decoration: none;
  color: white;
  vertical-align: middle;
  &:hover,
}
  &:focus {
    text-decoration: none;
    color: lightgrey;
  }
  > * {
    display: inline-block;
    vertical-align: middle;
    color: lightgrey;
  }
`;

const ListTitle = styled.h1`
  color: goldenrod;
  margin-top: 0;
`;

function Movies(props) {
  const [moviesToAdd, setMoviesToAdd] = useState([]);
  const { id: listId } = useParams();
  const [loading, error, data, addMovie] = useMovies(listId);

  const markMovieAsToAdd = ({ name, year, imdb_url }) => {
    if (name && year && imdb_url) {
      setMoviesToAdd([...moviesToAdd, { name, year, imdb_url }]);
    }
  };

  const removeMovieFromToAdd = ({ name, year, imdb_url }) => {
    const newMoviesToAdd = moviesToAdd.filter(movie => {
      return movie.name !== name;
    });
    setMoviesToAdd(newMoviesToAdd);
  };

  if (loading) return 'Loading...';
  if (error) return `Movies Error! ${error.message}`;
  return (
    <>
      <BackLink to="/">
        <ChevronLeft />
        <span>Back</span>
      </BackLink>
      <ListTitle>ListTitle</ListTitle>
      <MovieInput markToAdd={markMovieAsToAdd} />
      {moviesToAdd.length > 0 && (
        <MoviesAddSection>
          <h3>Add the following movies?</h3>
          {moviesToAdd.map(movieToAdd => {
            return <MovieToAdd movie={movieToAdd} addMovieMutation={addMovie} removeFromAdd={removeMovieFromToAdd} />;
          })}
        </MoviesAddSection>
      )}
      {data.movie.map((movie, index) => {
        return <MovieData renderer={Movie} id={movie.id} key={index} />;
      })}
    </>
  );
}

export default Movies;
