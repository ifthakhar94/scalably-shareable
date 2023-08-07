import client from '@/GraphqlClient/client';
import { error403, error404, login_url } from '@/navCentralization/nav_url';
import { getTokenByRefreshTokenQuery } from '@/queries/queries';
import LSHelper from '@/utils/LSHelper';
import { MutationOptions, NextLink, Operation } from '@apollo/client';
import { default as Router, default as router } from 'next/router';

let refreshingPromise: Promise<any> | null = null;

export const myErrorHandler = (code: number, operation: Operation, forward: NextLink) => {
  if (code == 404) {
    Router.push(error404);
  } else if (code == 403) {
    Router.push(error403);
  } else if (code === 401) {
    const { refreshToken } = LSHelper.getAuthTokens();

    const context = operation.getContext();

    console.log('context :', context);

    const isMutation = context && context.isMutation;

    if (!refreshingPromise) {
      refreshingPromise = client
        .query({
          query: getTokenByRefreshTokenQuery,
          variables: {
            refreshToken: refreshToken
          }
        })
        .then((result): any => {
          console.log('here ?');
          const newAccessToken = result.data.getTokenByRefreshToken.token;
          console.log('newAccessToken', newAccessToken);

          LSHelper.setAuthTokens(newAccessToken, false);

          operation.setContext(({ headers = {} }) => ({
            headers: {
              ...headers,
              authorization: `Bearer ${newAccessToken}`
            }
          }));

          if (operation.getContext().useQuery) {
            // Refetch the original useQuery
            const useQueryContext = operation.getContext().useQuery;
            if (useQueryContext.queryId) {
              useQueryContext.refetch();
            }
          } else if (operation.getContext().useMutation) {
            // Refetch the original useMutation
            const useMutationContext = operation.getContext().useMutation;
            if (useMutationContext.queryId) {
              useMutationContext.refetch();
            }
          } else if (!isMutation) {
            // Refetch the original client.query
            return client.query(operation);
          } else if (isMutation) {
            // Refetch the original client.mutate
            const mutationOptions: MutationOptions = {
              mutation: operation.query,
              variables: operation.variables,
              context: operation.getContext()
            };
            client.mutate(mutationOptions);
          }

          // Return the forward operation to continue the execution
          return forward(operation);
        })
        .catch((error) => {
          console.error('refetching error', error);
          // Handle the error

          // remove auth token with user data and other credentials
          LSHelper.removeAuthTokensWithOptionalData(true, true);
          router.push(login_url);
        })
        .finally(() => {
          refreshingPromise = null;
        });
      // Return a promise that resolves when the new access token is obtained
      return refreshingPromise;
    } else {
      // If refreshingPromise is already active, return it instead of initiating a new request
      return refreshingPromise;
    }
  }

  // Continue with the original operation if the error is not 401
  return forward(operation);
};
