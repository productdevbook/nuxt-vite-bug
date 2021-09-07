import type { Plugin, Context } from '@nuxt/types'

type Debounces = (func: any, wait: number, immediate?: boolean) => any

declare module '@nuxt/types' {
  interface Context {
    $debounce: Debounces
  }
}

function debounce(func: any, wait: number, immediate?: boolean) {
  let timeout: any | null
  return function (this: any) {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) {
        func.apply(context, args)
      }
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) {
      func.apply(context, args)
    }
  }
}

const debouncePlugin: Plugin = (context: Context, inject: any) => {
  inject('debounce', debounce)
}
export default debouncePlugin
