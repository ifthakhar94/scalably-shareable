import { ApolloClient, InMemoryCache } from '@apollo/client';
const server_client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_SERVER_URL,
  cache: new InMemoryCache()
});

export default server_client;
