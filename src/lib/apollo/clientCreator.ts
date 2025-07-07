import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const createClient = (service: string) => {
  const httpLink = createHttpLink({
    uri: `http://localhost:8080/${service}`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('accessToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};
