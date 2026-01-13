// src/components/react/shared/NotFound.tsx

import { useEffect, useState } from "react";
import { getCurrentLanguage, getTranslations } from "@/i18n/ui";
import { Button } from "./Button";
import logoQ from "@/assets/logo-q.png";

export const NotFound = () => {
  const [buttonText, setButtonText] = useState("Volver al inicio");

  useEffect(() => {
    const updateTranslations = () => {
      const lang = getCurrentLanguage();
      const t = getTranslations(lang);
      setButtonText(t["button.404"]);
    };

    updateTranslations();
    window.addEventListener("languageChanged", updateTranslations);

    return () => {
      window.removeEventListener("languageChanged", updateTranslations);
    };
  }, []);

  return (
<section 
      className="relative flex flex-col items-center justify-center text-center min-h-screen w-full 
                 bg-[url('/assets/pattern.svg')] bg-repeat-x bg-cover bg-[center_100%]"
    >      
    <div className="relative z-10 flex flex-col items-center gap-4 px-4">
        {/* 404 Title */}
        <h1 className="flex items-center font-[Lexend-SemiBold] text-white leading-none text-[8rem] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]">
          4
          <span className="relative inline-block align-middle">
            <img
              src={logoQ. src}
              alt="Q"
              className="inline-block align-middle h-[0.7em] max-h-[14rem] w-auto object-contain mb-4"
            />
          </span>
          4
        </h1>

        {/* Heading */}
        <h2 className="font-[Lexend-SemiBold] text-white/75 leading-snug text-center text-[2.5rem] sm:text-[4rem] md:text-[5rem]">
          PAGE NOT<br />
          FOUND
        </h2>

        {/* Back to home button - TRANSLATED */}
        <a href="/">
          <Button variant="primary" size="sm">
            {buttonText}
          </Button>
        </a>
      </div>
    </section>
  );
};