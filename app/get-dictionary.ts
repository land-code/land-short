import 'server-only'
import type { Locale } from './i18n-config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: async () => await import('./dictionaries/en.json').then((module) => module.default),
  es: async () => await import('./dictionaries/es.json').then((module) => module.default),
  gl: async () => await import('./dictionaries/es.json').then((module) => module.default)
}

type Dictionary = ReturnType<typeof dictionaries.en>

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  await (dictionaries[locale]?.() ?? dictionaries.en())
