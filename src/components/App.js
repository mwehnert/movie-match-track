import React, { useState } from 'react';
import Loading from '@kiwicom/orbit-components/lib/Loading';
import styled from 'styled-components';

// for authentication using auth0

// for routing
import { Switch, Route } from 'react-router-dom';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { useAuth0 } from '../auth/auth0-wrapper';
import SecuredRoute from './SecuredRoute';
import Movies from './Movies';
import Lists from './Lists';
import Header from './Header';
import Home from './Home';

const LayoutWrapper = styled.main`
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(100vw - 50px);
  width: 900px;
`;

function App() {
  // for apollo client
  const httpLink = new HttpLink({
    uri: 'https://movie-match-track.herokuapp.com/v1/graphql',
  });

  // used state to get accessToken through getTokenSilently(), the component re-renders when state changes, thus we have
  // our accessToken in apollo client instance.
  const [accessToken, setAccessToken] = useState('');

  const { getTokenSilently, loading } = useAuth0();
  if (loading) {
    return <Loading />;
  }

  // get access token
  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
      // console.log(token);
    } catch (e) {
      console.log(e);
    }
  };
  getAccessToken();

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      };
    }
    return {
      headers: {
        ...headers,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <Switch>
        <LayoutWrapper>
          <SecuredRoute exact path="/" component={Lists} />
          <SecuredRoute exact path="/list/:id" component={Movies} />
        </LayoutWrapper>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
