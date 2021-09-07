import dayjs from 'dayjs';

import { Context } from '@nuxt/types';

export default ({ app }: Context): void => {
  const { locale } = app.i18n;

  dayjs.locale(locale);

  app.i18n.onLanguageSwitched = (_: string, newLocale: string): void => {
    dayjs.locale(newLocale);
  };
};