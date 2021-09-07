<template>
  <div class="flex relative flex-col justify-center items-center h-screen text-center">
    aaa
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  useRouter,
  computed,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { useMainModule } from '~/store'

export default defineComponent({
  props: {},
  setup() {
    const { app } = useContext()
    const router = useRouter()
    const mainStore = useMainModule()

    const user = computed(() => app.$auth.user)
    const login = computed(() => app.$auth.loggedIn)
    onMounted(() => {
      setTimeout(() => {
        router.push(
          app.localePath({
            name: 'username',
            params: {
              username: app.$auth.user ? (app.$auth.user.username as string) : '',
            },
          }),
        )
      }, 2000)
    })
    return { user, login }
  },
})
</script>
