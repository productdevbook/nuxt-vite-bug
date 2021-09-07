import {  useContext } from '@nuxtjs/composition-api'
import {NuxtError} from '@nuxt/types'

export default function emitError(err : NuxtError) {
  const {error} = useContext()
  error(err)
}
