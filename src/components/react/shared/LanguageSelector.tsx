import React, { useState, useEffect } from "react";
import {
  languages,
  getCurrentLanguage,
  setLanguage,
  type Language,
} from "@/i18n/ui";

export const LanguageSelector: React.FC = () => {
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
    <div className="relative group h-full flex items-center">
      {/* Current Language Button */}
      <button
        className="flex items-center space-x-1 transition-colors hover:text-primary focus:outline-none text-secondary h-full"
        aria-label="Select language"
      >
        {/* Globe Icon */}
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

        {/* Flecha unificada con el resto del Header */}
        <span className="transform transition-transform duration-300 group-hover:rotate-180 text-xs mt-0.5">
          ▼
        </span>
      </button>

      {/* Dropdown Menu Unificado */}
      <div className="absolute top-full right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 p-2 z-50 mt-0">
        <div className="flex flex-col gap-1">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                currentLang === code
                  ? "text-primary  bg-blue-50"
                  : "text-gray-700 hover:text-primary hover:bg-gray-50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
