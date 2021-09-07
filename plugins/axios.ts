import { Plugin } from '@nuxt/types'
import { isArray } from 'lodash'
import { initializeAxios } from '~/utils/axios'
const plugin: Plugin = ({ $axios, app, $auth }) => {
  /**
   * Attaches $axios to the Nuxt axios instance.
   */
  initializeAxios($axios)
  /**
   * Ensures that the token in the state is used
   * in each Axios request, or is removed when gone.
   */
  $axios.onRequest((config) => {

    if (app.$auth.loggedIn) {
      config.headers.common.Authorization = `${app.$auth.$storage.getCookie('_token.local')}`
    } else {
      delete config.headers.Authorization
    }

    return config
  })


  $axios.interceptors.response.use(response => Promise.resolve(response), error => {
    if (!error.config) {
      return
    }

    if (process.env.NODE_ENV == 'development')
      console.error(error.response, 'in axios')

    if (
      error.response?.status === 400 ||
      error.response?.status === 409 ||
      error.response?.status === 401 ||
      error.response?.status === 500
    ) {

      if (isArray(error.response.data.message)) {
        app.$toast.show({type : 'danger',message:error.response.data.message[0], timeout:3})
      } else {
        app.$toast.show({type : 'danger',message:error.response.data.message, timeout:3})
      }
    }

    return Promise.reject(error)
  })
}

export default plugin
