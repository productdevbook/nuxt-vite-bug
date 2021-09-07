export const sanitize = (input: string, trim: string | RegExp) => {
  if (input) {
    const val = input || ''
    const expression = new RegExp(trim, 'gi')
    return val.replace(expression, '').trim()
  }
  return ''
}

export const camelcase = (text: string) => {
  if (!text) {
    return ''
  }

  const result = text.replace(/([A-Z])/g, ' $1')
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1)
  return finalResult
}

export const getId = (text: string) => {
  if (!text) {
    return ''
  }

  return text.replace(' ', '')
}

export function removeElement(el: any) {
  if (typeof el.remove !== 'undefined') el.remove()
  else el.parentNode.removeChild(el)
}
