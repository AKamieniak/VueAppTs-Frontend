import { environment } from '@/services/environment.service';
import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
    },
  },
  pl: {
    currency: {
      style: 'currency',
      currency: 'PLN',
      currencyDisplay: 'code',
    },
  },
};

const setDateTimeFormats = {
  short: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
  long: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
  },
};

const dateTimeFormats = {
  en: setDateTimeFormats,
  pl: setDateTimeFormats,
};

function loadLocaleMessages(): { [key: string]: any } {
  const dictionaries = require.context('./languages', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: { [key: string]: any } = {};

  dictionaries.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);

    if (matched && matched.length > 1) {
      const locale = matched[1];

      messages[locale] = dictionaries(key);
    }
  });

  return messages;
}

export default new VueI18n({
  locale: environment.VUE_APP_I18N_LOCALE,
  fallbackLocale: environment.VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages(),
  dateTimeFormats,
  numberFormats,
});
