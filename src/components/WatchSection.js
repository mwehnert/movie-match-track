import React from 'react';
import styled from 'styled-components';
import Plus from "@kiwicom/orbit-components/lib/icons/Plus";

import { useAuth0 } from '../auth/auth0-wrapper';

const Watcher = styled.li`
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 0 5px;
  border-radius: 100%;
  background-image: url("${props => {
    return props.user.avatar;
  }}");
  background-size: contain;
  &:hover, &:focus {
    opacity: ${props => props.me ? 0.5 : 1};
  }
`;


const WatcherMe = styled(Watcher)`
  background: transparent;
  border: 2px solid grey;
  border-style: dashed;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover, &:focus {
    background-image: url('${props => {
      return props.user.picture;
    }}');
    background-size: contain;
    opacity: 0.5;
  }
`;

const WatcherAddMe = (props) => {

  console.log({props});

  return (
    <WatcherMe {...props}>
      <Plus />
    </WatcherMe>
  );
}

const WatcherWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: inline-flex;
`;

const WatchSection = ({ watchers, watchMovie, unwatchMovie, watched, userId }) => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <>
      <WatcherWrapper>
        {watchers.map((watcher, index) => {
          const isMe = watcher.user.id === userId.current;
          return <Watcher key={index} user={watcher.user} me={isMe} onClick={isMe ? unwatchMovie : () => {}} />;
        })}
        {!watched && <WatcherAddMe user={user} onClick={watchMovie} />}
      </WatcherWrapper>
    </>
  );
};

export default WatchSection;
