const fs = require('fs');
const path = require('path');

const LOCALES = ['en', 'ru'];
const DEFAULT_LOCALE = 'en';

function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}_${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

function loadLocale(locale) {
  const filePath = path.join(__dirname, `${locale}.json`);
  return flatten(JSON.parse(fs.readFileSync(filePath, 'utf8')));
}

function buildContext(locale) {
  const strings = loadLocale(locale);
  const localePrefix = locale === DEFAULT_LOCALE ? '' : `/${locale}`;

  return {
    locale,
    htmlLang: locale === 'ru' ? 'ru' : 'en',
    localePrefix,
    ...strings,
  };
}

module.exports = {
  LOCALES,
  DEFAULT_LOCALE,
  buildContext,
  loadLocale,
};
