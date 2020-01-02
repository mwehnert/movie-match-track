import React, { useState } from 'react';
import Layout, { LayoutColumn } from '@kiwicom/orbit-components/lib/Layout';

// for authentication using auth0

// for routing
import { Switch, Route } from 'react-router-dom';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { useAuth0 } from '../auth/auth0-wrapper';
import Movies from './Movies.js';
import Lists from './Lists.js';
import Header from './Header.js';

function App() {
  // for apollo client
  const httpLink = new HttpLink({
    uri: 'https://movie-match-track.herokuapp.com/v1/graphql',
  });
  const { isAuthenticated, user } = useAuth0();

  // used state to get accessToken through getTokenSilently(), the component re-renders when state changes, thus we have
  // our accessToken in apollo client instance.
  const [accessToken, setAccessToken] = useState('');

  const { getTokenSilently, loading } = useAuth0();
  if (loading) {
    return 'Loading...';
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
      <div style={{ height: 60 }} />
      <Switch>
        <Layout type="MMB">
          <LayoutColumn>
            <Route exact path="/" component={Lists} />
            <Route exact path="/list/:id" component={Movies} />
          </LayoutColumn>
        </Layout>
      </Switch>
    </ApolloProvider>
  );
}

export default App;