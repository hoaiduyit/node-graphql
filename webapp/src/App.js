import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import 'antd/dist/antd.css';
import Layout from './pages/Layout';
import './assets/styles/index.scss';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const apollo = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={apollo}>
      <Layout />
    </ApolloProvider>
  );
}

export default App;
