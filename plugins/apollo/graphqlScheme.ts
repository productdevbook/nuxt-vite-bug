import { RefreshScheme, RefreshController, Auth } from '~auth/runtime'


import type {
  TokenableScheme,
  HTTPRequest,
  HTTPResponse,
  SchemePartialOptions,
  CookieSchemeOptions,
  SchemeCheck,
} from '@nuxtjs/auth-next'

import { ApolloClient } from 'apollo-client';
import consolaGlobalInstance from 'consola';

import login from '~/graphql/apollo/login.graphql';
import logout from '~/graphql/apollo/logout.graphql';
import refresh_token from '~/graphql/apollo/refresh_token.graphql';



export default class GraphqlScheme extends RefreshScheme {
  $apollo: ApolloClient<any>
  constructor(auth: Auth, options: any) {
    super(auth, options);

    this.$apollo = auth.ctx.app.apolloProvider.defaultClient;
    this.refreshController = new RefreshController(this);
  }

  // TODO Test refresh token
  async refreshTokens(): Promise<HTTPResponse | void> {
    console.log(this.$auth.$storage.getCookie('auth._refresh_token.okuStrategy'), 'test');
    try {
      const {
        data
      } = await this.$apollo.mutate<Mutation, MutationRefreshTokenArgs>({
        mutation: refresh_token,
        variables: {
          token: String(this.$auth.$storage.getCookie('auth._refresh_token.okuStrategy')) || ''
        }
      });
      if (data && data.refreshToken.accessToken) {
        await this.$auth.ctx.$apolloHelpers.onLogin(data.refreshToken.accessToken);
        await this.setUserToken(data.refreshToken.accessToken, data.refreshToken.refreshToken);
        return {
          status: 200
        } as HTTPResponse;
      }
    } catch (e) {
      consolaGlobalInstance.debug(e);
    }

    this.$auth.ctx.$toast.warning('There was an issue. We will have to log you out, sorry.');
    await this.logout();
  }

  async login(request: HTTPRequest, { reset = true } = {}): Promise<HTTPResponse> {

    // Ditch any leftover local tokens before attempting to log in
    if (reset) {
      this.$auth.reset({ resetInterceptor: false })
    }

    console.log(request.data)
    try {
      const {
        data, context
      } = await this.$apollo.mutate<Mutation, SignInInput>({
        mutation: login,
        variables: {
          email: request.data.email,
          password: request.data.password
        }
      });
      console.log(data);
      if (data) {
        const user = {
          email: request.data.email
        };
        if (data.signIn.accessToken) {
          this.$auth.$storage.setUniversal('user', user);
          await this.$auth.ctx.$apolloHelpers.onLogin(data.signIn.accessToken);
          await this.setUserToken(data.signIn.accessToken, data.signIn.refreshToken);
          this.$auth.ctx.$toast.success('Login');
          return {
            status: 200
          } as HTTPResponse;
        }
      }
    } catch (e) {
      console.debug(e);
    }
    this.$auth.ctx.$toast.warning('There was an issue. We will have to log you out, sorry.');
    // @ts-ignore: Unreachable code error
    this.$auth.callOnError(undefined, { method: 'login' });
    return { status: 500 } as HTTPResponse;
  }

  async fetchUser(endpoint?: HTTPRequest): Promise<HTTPResponse | void> {
    console.log('asdas');
    // Token is required but not available
    if (!this.check().valid) {
      if (this.$auth.loggedIn) {
        return this.logout();
      }
      return Promise.resolve();
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      this.$auth.setUser({})
      return
    }

    try {
      const {
        data: {
          me
        }
      } = await this.$apollo.query<Query, User>({
        query: get_user,
      })

      if (!me) {
        const error = new Error(
          `User Data response does not contain field ${this.options.user.property}`
        )
        return Promise.reject(error)
      }


      if (me) {
        this.$auth.setUser(me)
        return { status: 200 } as HTTPResponse;
      }
    } catch (error) {
      // @ts-ignore: Unreachable code error
      this.$auth.callOnError(e, { method: 'fetchUser' });
      return Promise.reject(error)
    }

  }

  async logout(endpoint: HTTPRequest = {}): Promise<void> {
    if (this.$auth.loggedIn) {
      consolaGlobalInstance.debug('Logging out user', this.$auth.user);
      const {
        data
      } = await this.$apollo.mutate<Mutation, Boolean>({
        mutation: logout
      })
      if (data) {
        this.$auth.ctx.$toast.success('You have been successfully logged out! See you next time.');
      } else {
        this.$auth.ctx.$toast.warning('There was an issue but you will still be logged out. Bye!');
      }
      this.$auth.$storage.removeUniversal('user');
      await this.$auth.ctx.$apolloHelpers.onLogout();
      await super.logout();
      super.reset();
    }
  }
}
