import React, { useState, useRef } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { useAuth0 } from '../auth/auth0-wrapper';

export const LIST_INFO = gql`
  query($id: Int!) {
    list(where: { id: { _eq: $id } }) {
      id
      name
      created_by
      user {
        avatar
        id
        name
      }
      list_members {
        user {
          avatar
          id
          name
        }
      }
    }
  }
`;

const ADD_LISTMEMBER = gql`
  mutation($listId: Int!, $userId: String!) {
    insert_list_member(objects: [{ list: $listId, member: $userId }]) {
      affected_rows
    }
  }
`;

const REMOVE_LISTMEMBER = gql`
  mutation($listId: Int!, $userId: String!) {
    delete_listmember(where: { list: { _eq: $listId }, member: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

function useList(listId, userId) {
  const { loading, error, data } = useQuery(LIST_INFO, {
    variables: {
      id: listId,
    },
  });

  const [addMember] = useMutation(ADD_LISTMEMBER, {
    variables: {
      listId,
      // userId: userId.current, needs to be added dynamically
    },
    refetchQueries: [
      {
        query: LIST_INFO,
        variables: {
          id: listId,
        },
      },
    ],
  });

  const [removeMember] = useMutation(REMOVE_LISTMEMBER, {
    variables: {
      listId,
      // userId: userId.current, dynamically
    },
    refetchQueries: [
      {
        query: LIST_INFO,
        variables: {
          id: listId,
        },
      },
    ],
  });

  return [loading, error, data, addMember, removeMember];
}

export default useList;
