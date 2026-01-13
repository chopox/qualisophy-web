// Language configuration
export const languages = {
  es: 'Español',
  fr: 'Français',
} as const;

export const defaultLang = 'es';

// Import translations
import es from './translations/es';
import fr from './translations/fr';

export const ui = {
  es,
  fr,
} as const;

export type Language = keyof typeof ui;
export type TranslationKeys = keyof typeof es;

// Helper function to get translations
export function useTranslations(lang: Language) {
  return function t(key: TranslationKeys): string {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

// Helper to get current language from localStorage (client-side only)
export function getCurrentLanguage(): Language {
  // In SSR (server-side), always return default language
  if (typeof window === 'undefined') return defaultLang;
  
  const stored = localStorage.getItem('language');
  return (stored === 'es' || stored === 'fr') ? stored : defaultLang;
}

// Helper to set language
export function setLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('language', lang);
}

// NEW: Get translations object for client-side use
export function getTranslations(lang: Language) {
  return ui[lang];
}

export function getLangFromUrl(url: URL): Language {
  // 1. Try to find the ?lang=fr parameter in the URL
  const lang = url.searchParams.get('lang');
  
  // 2. If it exists and is a valid language ('es' or 'fr'), return it
  if (lang && lang in ui) {
    return lang as Language;
  }
  
  // 3. If not default language ('es')
  return defaultLang;
}