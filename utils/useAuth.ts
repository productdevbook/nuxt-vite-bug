import { computed, defineComponent, useContext, useRoute } from '@nuxtjs/composition-api'
import { useMainModule } from '~/store'

export default function useAuth(username?: string) {

  const route = useRoute()
  const { $auth } = useContext()


  const auth = computed(() => $auth)
  const fullName = computed(() =>
    auth.value.loggedIn
      ? `${auth.value.user.population.name} ${auth.value.user.population.surname}`
      : '',
  )
  const isMe = computed(() => {
    if  (auth.value.loggedIn) {
      if(username) // if we have provided username, compare it to authanticated user
        return auth.value.user.username === username
       else // unless compare it to username param in the url
        return auth.value.user.username === route.value.params.username
    } else { //there is authenticate so nothing to compare, return false
      return false
    }
  })
  
  return {
    auth,
    fullName,
    isMe,
  }
}
