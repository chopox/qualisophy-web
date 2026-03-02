import React, { useState, useEffect } from "react";
import { Button } from "@/components/react/shared/Button";
import { Cookie } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Comprobamos si el usuario ya ha tomado una decisión
    const consent = localStorage.getItem("qualisophy_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("qualisophy_cookie_consent", "accepted");
    setIsVisible(false);
    // Recargamos la página o disparamos un evento para que los scripts (como Analytics) arranquen
    window.dispatchEvent(new Event("cookiesAccepted"));
  };

  const handleReject = () => {
    localStorage.setItem("qualisophy_cookie_consent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-100 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] p-6 animate-in slide-in-from-bottom-full duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Texto e Icono */}
        <div className="flex items-start gap-4 flex-1">
          <div className="bg-primary/10 p-2.5 rounded-full shrink-0 hidden sm:block">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="text-secondary font-bold mb-1">
              Valoramos tu privacidad
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Utilizamos cookies propias y de terceros para analizar el tráfico
              de nuestra web y personalizar el contenido. Puedes obtener más
              información en nuestra{" "}
              <a
                href="/politica-cookies"
                className="text-primary hover:underline font-medium"
              >
                Política de Cookies
              </a>
              . Puedes aceptar todas las cookies pulsando "Aceptar" o
              rechazarlas pulsando "Rechazar".
            </p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReject}
            className="w-full sm:w-auto"
          >
            Rechazar
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAccept}
            className="w-full sm:w-auto"
          >
            Aceptar Cookies
          </Button>
        </div>
      </div>
    </div>
  );
};
