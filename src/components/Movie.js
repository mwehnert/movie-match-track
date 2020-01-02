import React from 'react';
import styled from 'styled-components';

import Stack from '@kiwicom/orbit-components/lib/Stack';
import Truncate from '@kiwicom/orbit-components/lib/Truncate';
import Badge from '@kiwicom/orbit-components/lib/Badge';
import WatchSection from './WatchSection';

const MovieCard = styled.article`
  padding: 16px;
  display: block;
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Roboto', -apple-system, '.SFNSText-Regular', 'San Francisco', 'Segoe UI', 'Helvetica Neue',
    'Lucida Grande', sans-serif;
  text-decoration: none;
  background: ${props => {
    return props.suggestion ? 'rgba(255,255,255,0.5)' : '#ffffff';
  }};
  &:hover,
  &:focus {
    background: #ffffff;
  }
  margin-bottom: ${props => {
    return props.suggestion ? '0' : '5px';
  }};
  border-radius: 3px;
  box-shadow: 0px 0px 2px 0px rgba(37, 42, 49, 0.16), 0px 1px 4px 0px rgba(37, 42, 49, 0.12);
  transition: box-shadow 0.15s ease-in-out;
`;

function Movie({ movie, watchMovie, unwatchMovie, watched, onClickHandler, suggestion, add, userId }) {
  return (
    <MovieCard suggestion={suggestion} add={add} onClick={onClickHandler || (() => {})}>
      <Stack wrap flex align="center">
        <Stack shrink inline direction={suggestion ? 'row' : 'column'} align={suggestion ? 'center' : null}>
          <h2 style={{ wordBreak: 'break-word' }}>{movie.name}</h2>
          <Stack wrap inline>
            <Badge>{movie.year}</Badge>
            <Badge>
              <a href={movie.imdb_url}>IMDB</a>
            </Badge>
          </Stack>
        </Stack>
        {!suggestion && !add && (
          <WatchSection
            watchMovie={watchMovie}
            unwatchMovie={unwatchMovie}
            watched={watched}
            watchers={movie.watches}
            userId={userId}
          />
        )}
      </Stack>
    </MovieCard>
  );
}

export { Movie };
