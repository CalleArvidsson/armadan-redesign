import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from } from '@apollo/client';
import authService from 'services/newAuth';

const httpLink = new HttpLink({ uri: 'http://localhost:5000/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: `Bearer ${authService.token}`,
    },
  });

  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
});

export default client;
