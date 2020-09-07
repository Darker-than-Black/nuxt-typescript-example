import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import INFO_TEXTS from '~/assets/js/glossary/info-texts.json'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  validate: (value) => {
    return {
      required: true,
      valid: !['', null, undefined].includes(value)
    }
  },
  computesRequired: true,
  message: INFO_TEXTS.valid.required
})

extend('min', {
  validate: (value, args) => {
    return value.length >= args.length
  },
  params: ['length'],
  message: INFO_TEXTS.valid.min
})
