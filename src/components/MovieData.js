import React, {useRef} from "react";
import {gql} from "apollo-boost";

import {useAuth0} from "../auth/auth0-wrapper";
import useMovie from "../hooks/useMovie";

export const MOVIE_INFO = gql`
  query($id: Int!) {
    movie(where: {id: {_eq: $id}}) {
      id
      name
      year
      imdb_url
      user {
        avatar
        id
        name
      }
    }
  }
`;

function MovieData(props) {
  const {isAuthenticated, user} = useAuth0();

  const userId = useRef(null);

  if (isAuthenticated) {
    userId.current = user.sub;
  } else {
    userId.current = "none";
  }
  const movieId = props.id ? props.id : props.match.params.id;
  const [loading, error, data, watchMovie, unwatchMovie] = useMovie(
    movieId,
    userId
  );
  const RenderComponent = props.renderer ? props.renderer : null;

  const isMovieWatched = movie => {
    return movie.watches
      .map(watch => {
        return watch.user.id;
      })
      .includes(userId.current);
  };

  if (loading) return "";
  if (error) return `Movie Error! ${error.message}`;

  return (
    <>
      {data.movie.map((movie, index) => {
        return (
          <RenderComponent
            watchMovie={watchMovie}
            userId={userId}
            unwatchMovie={unwatchMovie}
            watched={isMovieWatched(movie)}
            movie={movie}
            key={index}
          />
        );
      })}
    </>
  );
}

export default MovieData;
