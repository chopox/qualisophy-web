import React, { useState, useEffect } from "react";
import {
  languages,
  getCurrentLanguage,
  setLanguage,
  type Language,
} from "@/i18n/ui";

export const LanguageSelector: React. FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>("es");

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setCurrentLang(lang);
    window.location.reload();
  };

  return (
    <div className="relative group">
      {/* Current Language Button */}
      <button
        className="flex items-center space-x-1 transition-colors hover:text-primary focus:outline-none text-slate-300"
        aria-label="Select language"
      >
        {/* Globe Icon - Ultra Simple */}
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{languages[currentLang]}</span>
        <span className="transform transition-transform duration-300 group-hover:rotate-180 text-lg">
          ▾
        </span>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-40 bg-secondary rounded-lg shadow-2xl border border-white/10 py-1 z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
        {Object.entries(languages).map(([code, name]) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code as Language)}
            className={`w-full text-left px-4 py-2 text-sm text-white hover:bg-white/20 transition-colors rounded-lg ${
              currentLang === code ?  'font-semibold' : ''
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};