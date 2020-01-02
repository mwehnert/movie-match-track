import React, { useRef } from 'react';
import styled from 'styled-components';

import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import { useAuth0 } from '../auth/auth0-wrapper';

import { Movie } from './Movie';

const MovieAddWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MovieAdd = styled.div`
  flex-grow: 1;
`;
const MovieAddButtons = styled.div`
  min-width: 100px;
  display: flex;
  flex-direction: column;
`;

function MovieToAdd(props) {
  const { isAuthenticated, user } = useAuth0();
  const { removeFromAdd, movie, list } = props;

  const userId = useRef(null);

  if (isAuthenticated) {
    userId.current = user.sub;
  } else {
    userId.current = 'none';
  }

  // like post mutation
  const addMovie = () => {
    props.addMovieMutation({
      variables: {
        movieName: movie.name,
        userId: userId.current,
        year: movie.year,
        imdbUrl: movie.imdb_url,
        listId: list[0].id,
      },
    });
  };

  const onRemoveClick = e => {
    e.preventDefault();
    removeFromAdd(movie);
  };

  const onAddClick = e => {
    e.preventDefault();
    addMovie();
    removeFromAdd(movie);
  };

  return (
    <MovieAddWrapper>
      <MovieAdd>
        <Movie add movie={movie} />
      </MovieAdd>
      <MovieAddButtons>
        <Button size="large" onClick={onAddClick} type="success">
          Yes
        </Button>
        <Button size="large" onClick={onRemoveClick} type="critical">
          No
        </Button>
      </MovieAddButtons>
    </MovieAddWrapper>
  );
}

export default MovieToAdd;
