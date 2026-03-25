import React from "react";
import { ProgramHero } from "../programs/ProgramHero";

export const PartnershipHero: React.FC = () => {
  return (
    <ProgramHero
      title="Talento que Transforma:"
      highlight="Alianzas Corporativas"
      subtitle="Ayudamos a empresas visionarias a integrar diversidad real en sus equipos tecnológicos, impulsando la innovación y el impacto social."
      backgroundImage="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80"
      ctaText="Agendar Reunión"
      onCtaClick={() =>
        window.open(
          "https://calendar.app.google/CJSbUs95RLyvXCJZ7",
          "_blank",
          "noopener,noreferrer",
        )
      }
    />
  );
};
