import type { Context } from '@nuxt/types'
import createPersistedState from 'vuex-persistedstate'

export default ({ store }: Context) => {
  createPersistedState({
    key: 'a',
    paths: ['newBookModule'],
  })(store)
}
