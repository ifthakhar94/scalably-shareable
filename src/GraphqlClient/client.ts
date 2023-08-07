import LSHelper from '@/utils/LSHelper';
import { myErrorHandler } from '@/utils/myErrorHandler';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GraphQLError } from 'graphql/error/GraphQLError';
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface getErrorTypes extends GraphQLError {
  code?: number;
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  // const router = useRouter();

  if (graphQLErrors && graphQLErrors.length > 0) {
    const { message, code }: getErrorTypes = graphQLErrors[0];

    myErrorHandler(code as number, operation, forward);
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the initial access token from local storage
  const { token } = LSHelper.getAuthTokens();

  // Use the setContext method to set the HTTP headers.
  if (token) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${token}`
      }
    }));
  }

  // Call the next link in the middleware chain.
  return forward(operation);
});

const languageLink = new ApolloLink((operation, forward) => {
  const language = LSHelper.getLanguage();

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers
      // 'Accept-Language': language
    }
  }));

  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, languageLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache()
});

export default client;
