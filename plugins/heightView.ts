import { onGlobalSetup, provide, onMounted } from '@nuxtjs/composition-api'

export default () => {
  onGlobalSetup(() => {
    const setViewHeight = () => {
      if (process.client) {
        let vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }

    onMounted(() => {
      setViewHeight()
      if (process.client) {
        window.addEventListener('resize', () => {
          setViewHeight()
        })
      }
    })
  })
}
