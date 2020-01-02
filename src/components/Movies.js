import React, { useState } from 'react';
import styled from 'styled-components';
import ChevronLeft from '@kiwicom/orbit-components/lib/icons/ChevronLeft';
import Loading from '@kiwicom/orbit-components/lib/Loading';

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
  width: 100px;
  text-align: center;
  color: DarkSlateGray;
  background-color: goldenrod;
  margin-top: 5px;
  transform: rotate(-3deg);
  font-weight: bold;
  line-height: 1.6;
  &:hover,
  &:focus {
    text-decoration: none;
    color: DarkSlateGray;
    transform: rotate(-2deg);
  }
  > * {
    display: inline-block;
    vertical-align: middle;
    color: DarkSlateGray;
  }
`;

const ListTitle = styled.h1`
  color: goldenrod;
  margin-top: 0;
`;

const MoviesWrapper = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

  if (loading) return <Loading />;
  if (error) return `Movies Error! ${error.message}`;

  return (
    <MoviesWrapper>
      <BackLink to="/">
        <ChevronLeft />
        <span>Back</span>
      </BackLink>
      <ListTitle>{data.list[0].name}</ListTitle>
      <MovieInput markToAdd={markMovieAsToAdd} />
      {moviesToAdd.length > 0 && (
        <MoviesAddSection>
          <h3>Add the following movies?</h3>
          {moviesToAdd.map(movieToAdd => {
            return (
              <MovieToAdd
                list={data.list}
                movie={movieToAdd}
                addMovieMutation={addMovie}
                removeFromAdd={removeMovieFromToAdd}
              />
            );
          })}
        </MoviesAddSection>
      )}
      {data.list[0].movies.map((movie, index) => {
        return <MovieData renderer={Movie} id={movie.id} key={index} />;
      })}
    </MoviesWrapper>
  );
}

export default Movies;
