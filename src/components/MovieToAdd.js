import React, { useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Button from '@kiwicom/orbit-components/lib/Button';
import Stack from '@kiwicom/orbit-components/lib/Stack';
import { useAuth0 } from '../auth/auth0-wrapper';

import { Movie } from './Movie';

// export const ADD_MOVIE = gql`
//   query($id: Int!) {
//   }
// `;

// const ADD_MOVIE = gql`
//   mutation(
//     $movieName: String!
//     $userId: String!
//     $year: Int!
//     $imdbUrl: String!
//   ) {
//     insert_movie(
//       objects: [
//         {name: $movieName, created_by: $userId, year: $year, imdb_url: $imdbUrl}
//       ]
//     ) {
//       affected_rows
//     }
//   }
// `;

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
    <Stack flex align="center">
      <Movie add movie={movie} />
      <Button size="large" onClick={onRemoveClick} type="critical">
        No
      </Button>
      <Button size="large" onClick={onAddClick} type="success">
        Yes
      </Button>
    </Stack>
  );
}

export default MovieToAdd;
