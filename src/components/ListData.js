import React, { useRef } from 'react';
import { gql } from 'apollo-boost';

import { useAuth0 } from '../auth/auth0-wrapper';
import useList from '../hooks/useList';

function ListData(props) {
  const { isAuthenticated, user } = useAuth0();

  const userId = useRef(null);

  if (isAuthenticated) {
    userId.current = user.sub;
  } else {
    userId.current = 'none';
  }
  const listId = props.id ? props.id : props.match.params.id;
  const [loading, error, data, addMember, removeMember] = useList(listId, userId);
  const RenderComponent = props.renderer ? props.renderer : null;

  // const isMovieWatched = movie => {
  //   return movie.watches
  //     .map(watch => {
  //       return watch.user.id;
  //     })
  //     .includes(userId.current);
  // };

  if (loading) return '';
  if (error) return `Movie Error! ${error.message}`;

  return (
    <>
      {data.list.map((list, index) => {
        return (
          <RenderComponent addMember={addMember} userId={userId} removeMember={removeMember} list={list} key={index} />
        );
      })}
    </>
  );
}

export default ListData;
