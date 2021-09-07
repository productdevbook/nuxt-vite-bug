import { joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image' // '@nuxt/image'

type size = 'sm' | 'base' | 'md' | 'lg'
export const getImage: ProviderGetImage = (src, { modifiers = {}, baseURL = '/' } = {}) => {
  const operationsString = `{modifiers.width}`
  return {
    url: joinURL(baseURL, src),
  }
}
