import Vue from 'vue'
// @ts-ignore
import VTooltip from 'v-tooltip'
import 'v-tooltip/dist/v-tooltip.css'
Vue.use(VTooltip, {
  themes: {
    'info-tooltip': {
      $extend: 'menu',
      $resetCss: true,
    },
    'read-status': {
      $extend: 'dropdown',
      $resetCss: true,
    },
  },
})
