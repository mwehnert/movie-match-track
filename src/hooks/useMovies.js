import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAuth0 } from '../auth/auth0-wrapper';

export const MOVIE_LIST = gql`
  query($listId: Int!) {
    list(where: { id: { _eq: $listId } }, order_by: { name: desc }) {
      id
      name
      movies {
        id
      }
    }
  }
`;

const ADD_MOVIE = gql`
  mutation($movieName: String!, $userId: String!, $year: Int!, $imdbUrl: String!, $listId: Int) {
    insert_movie(objects: [{ name: $movieName, created_by: $userId, year: $year, imdb_url: $imdbUrl, list: $listId }]) {
      affected_rows
    }
  }
`;

function useMovies(listId) {
  const { loading, error, data } = useQuery(MOVIE_LIST, {
    variables: {
      listId,
    },
  });

  const [addMovie] = useMutation(ADD_MOVIE, {
    refetchQueries: [
      {
        query: MOVIE_LIST,
        variables: {
          listId,
        },
      },
    ],
  });

  return [loading, error, data, addMovie];
}

export default useMovies;
