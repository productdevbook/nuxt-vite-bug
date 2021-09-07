import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, setInteractionMode } from 'vee-validate'
import {
  required,
  min,
  email,
  regex,
  max,
  max_value,
  confirmed,
  min_value,
} from 'vee-validate/dist/rules'
setInteractionMode('eager')

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', required)

extend('min', min)
extend('required', required)
extend('email', email)
extend('regex', regex)
extend('max', max)
extend('max_value', max_value)
extend('min_value', min_value)
extend('password', {
  params: ['target'],
  validate: (value, { target }: any) => value === target,
  message: 'Password confirmation does not match.',
})

const verifyPassword = {
  getMessage: (field: any) =>
    `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)`,
  validate: (value: any) => {
    console.log(value);
    const strongRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    console.log(strongRegex.test(value));
    return strongRegex.test(value)
  },
}

extend('verify_password', verifyPassword)

extend('confirmed', confirmed)
