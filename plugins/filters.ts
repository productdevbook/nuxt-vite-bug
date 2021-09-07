import Vue from 'vue'
import dayJs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/en';
import 'dayjs/locale/tr';

dayJs.extend(relativeTime)

export default () => {
  Vue.filter('formatDate', (value: string, format: string = 'HH:mm D MMM YYYY') => {
    return dayJs(value).format(format)
  })

  Vue.filter('toDate', (value: string) => {
    return dayJs(value).format('D MMM YYYY')
  })

  Vue.filter('toTime', (value: string) => {
    return dayJs(value).format('HH:mm')
  })

  Vue.filter('toDateTime', (value: string) => {
    return dayJs(value).format('D MMM YYYY HH:mm')
  })

  Vue.filter('toTimeDate', (value: string) => {
    return dayJs(value).format('HH:mm D MMM YYYY')
  })

  Vue.filter('toTimeDate', (value: string) => {
    return dayJs(value).format('HH:mm D MMM YYYY')
  })


  Vue.filter('fromNow', (value: string) => {
    return dayJs(value).fromNow()
  })
}

