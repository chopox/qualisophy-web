import { useState, useEffect } from 'react';
import { getCurrentLanguage, useTranslations as getTranslations, type Language } from '@/i18n/ui';

export function useTranslations() {
  const [lang, setLang] = useState<Language>('es');
  const [t, setT] = useState(() => getTranslations('es'));

  useEffect(() => {
    // Update language on mount
    const updateLanguage = () => {
      const currentLang = getCurrentLanguage();
      setLang(currentLang);
      setT(() => getTranslations(currentLang));
    };

    updateLanguage();

    // Listen for language changes
    const handleLanguageChange = () => {
      updateLanguage();
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  return t;
}