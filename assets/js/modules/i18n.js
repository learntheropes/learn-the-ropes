import find from 'lodash.find'

export const locales = [
  {
    code: 'en',
    iso: 'en-US',
    file: 'en.js',
    name: 'English',
    isCatchallLocale: true
  }, 
  {
    code: 'it',
    iso: 'it-IT',
    file: 'it.js',
    name: 'Italiano',
  }, 
  {
    code: 'es',
    iso: 'es-ES',
    file: 'es.js',
    name: 'Español',
  }, 
]

export const localeCodes = locales.map(locale => locale.code)

export const defaultLocale = find(locales, { isCatchallLocale: true }).code