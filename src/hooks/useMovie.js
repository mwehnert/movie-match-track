import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAuth0 } from '../auth/auth0-wrapper';

export const MOVIE_INFO = gql`
  query($id: Int!) {
    movie(where: { id: { _eq: $id } }) {
      id
      name
      year
      imdb_url
      user {
        avatar
        id
        name
      }
      watches {
        user {
          avatar
          id
        }
      }
    }
  }
`;

const WATCH_MOVIE = gql`
  mutation($movieId: Int!, $userId: String!) {
    insert_watch(objects: [{ movie_id: $movieId, user_id: $userId }]) {
      affected_rows
    }
  }
`;

const UNWATCH_MOVIE = gql`
  mutation($movieId: Int!, $userId: String!) {
    delete_watch(where: { movie_id: { _eq: $movieId }, user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

function useMovie(movieId, userId) {
  const { loading, error, data } = useQuery(MOVIE_INFO, {
    variables: {
      id: movieId,
    },
  });

  const [watchMovie] = useMutation(WATCH_MOVIE, {
    variables: {
      movieId,
      userId: userId.current,
    },
    refetchQueries: [
      {
        query: MOVIE_INFO,
        variables: {
          id: movieId,
        },
      },
    ],
  });

  const [unwatchMovie] = useMutation(UNWATCH_MOVIE, {
    variables: {
      movieId,
      userId: userId.current,
    },
    refetchQueries: [
      {
        query: MOVIE_INFO,
        variables: {
          id: movieId,
        },
      },
    ],
  });

  return [loading, error, data, watchMovie, unwatchMovie];
}

export default useMovie;
