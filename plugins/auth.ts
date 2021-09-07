import type { Context } from '@nuxt/types'

export default function (context: Context) {
  const { app, $auth } = context
  $auth.options.redirect = {
    login: app.localePath({ name: 'login' }),
    home: app.localePath({
      name: 'logged',
    }),
    logout: app.localePath({
      name: 'index',
    }),
    callback: '',
  }
}
