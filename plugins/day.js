import { locales } from '~/assets/js/modules/i18n'

import day from 'dayjs'

import 'dayjs/locale/es'
import 'dayjs/locale/it'

export default defineNuxtPlugin(nuxtApp => {
  day.locale('en')
  // const { onBeforeLanguageSwitch } = useI18n()
  // onBeforeLanguageSwitch = (_oldLocale, newLocale, _isInitialSetup) => {
  //   dayjlocale(newLocale)
  //   console.log(day.locale)
  // }
  return {
    provide: {
      day,
    }
  }
})

