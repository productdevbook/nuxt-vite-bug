export const validEmail = (value: string) => {
  const isValid =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    )
  return !isValid ? 'Enter a valid email' : ''
}

export const required = (value: string) => {
  const isValid = (value && (value.toString() as string)).trim().length > 0
  return !isValid ? 'This field is required' : ''
}

export const validCpf = (value: string) => {
  const isValid = /[0-9]{3}.[0-9]{3}\.?[0-9]{3}-[0-9]{2}/i.test(value)
  return !isValid ? 'Enter a valid CPF' : ''
}

export const validPhone = (value: string) => {
  const isValid = /\(\d{2,}\) \d{4,}-\d{4}/.test(value)
  return !isValid ? 'Enter a valid phone number' : ''
}

export const isSame = (value: string, valueToCompare: string) => {
  const isValid = value === valueToCompare
  return !isValid ? 'Fields do not match' : ''
}

export const validDate = (value: string) => {
  const isValid =
    /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test(
      value,
    )
  return !isValid ? 'Please provide a valid date' : ''
}

export const isObjectEmpty = (obj: object) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}
