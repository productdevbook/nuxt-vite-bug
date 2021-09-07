import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context'
import { Context } from '@nuxt/types';
import { ApolloLink } from "apollo-link";

import { isArray } from 'lodash'
export default function ({ $config, app, redirect, route }: Context) {
  const httpEndpoint = $config.graphQlEndpoint;

  // const ssrMiddleware = setContext((_, { headers }) => {
  //   if (process.client) return headers
  //   return {
  //     headers
  //   }
  // })


  const Errorlink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {

      graphQLErrors.forEach((err) => {
        if (err.extensions && isArray(err.extensions.errors)) {
          err.extensions.errors.forEach((err) => {
            app.$toast.show({
              type: 'danger',
              message: err,
              timeout: 2
            });
          });
        } else {
          console.log(err)
          if (err.message === 'Unauthorized') {
            if (route.name !== 'login') redirect('/login');
          }
          app.$toast.show({
            type: 'danger',
            message: err.message,
            timeout: 2
          });
        }
      });

    }

    if (networkError) {
      console.log(
        `[Network error ${operation.operationName}]: ${networkError.message}`
      );
    }
  });



  // const httpLink = new HttpLink({
  //   uri: httpEndpoint,
  // })
  // const link = ApolloLink.from([errorlink, ssrMiddleware, httpLink])
  // const cache = new InMemoryCache()



  return {
    link: Errorlink,
    httpEndpoint,
    inMemoryCacheOptions: {
      addTypename: false
    },
    connectToDevTools: process.env.NODE_ENV !== 'production'
  };
}