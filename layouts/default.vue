<template>
  <div class="relative bg-warnGray-100 scrollbar">
    <div class="fixed bottom-5 left-5 z-50 space-y-5">
      <a
        class="bg-yellow-400 px-3"
        href="#"
        v-for="locale in availableLocales"
        :key="locale.code"
        @click.prevent.stop="$i18n.setLocale(locale.code)"
      >{{ locale.code }}</a>
      <DarkToggle />
    </div>
    <nuxt />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  useContext
} from '@nuxtjs/composition-api'

export default defineComponent({

  setup() {
    const { i18n } = useContext()
    const availableLocales = computed(() => {
      //@ts-ignore
      return i18n.locales.filter((i: any) => i.code !== i18n.locale)
    })
    return { availableLocales }
  }
})
</script>
