import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import { useMainModule } from '~/store'

export default function useUserLibrary(username?: string) {
  const { $auth } = useContext()
  const auth = computed(() => $auth)

  return {

  }
}
