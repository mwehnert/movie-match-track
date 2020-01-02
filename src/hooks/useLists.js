import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAuth0 } from '../auth/auth0-wrapper';

export const LIST_LIST = gql`
  {
    list(order_by: { name: desc }) {
      id
    }
  }
`;

const ADD_LIST = gql`
  mutation($listName: String!) {
    insert_list(objects: [{ name: $listName }]) {
      affected_rows
    }
  }
`;

function useLists() {
  const { loading, error, data } = useQuery(LIST_LIST);

  const [addList] = useMutation(ADD_LIST, {
    refetchQueries: [
      {
        query: LIST_LIST,
      },
    ],
  });

  return [loading, error, data, addList];
}

export default useLists;
