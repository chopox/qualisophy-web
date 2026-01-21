import React from "react";
import { ProgramMethodology } from "../programs/ProgramMethodology";

const valuePropData = {
  title: "Más que Selección: Integración Estratégica",
  description: [
    "Las empresas líderes ya no buscan solo cubrir vacantes; buscan talento que aporte diversidad cognitiva y resiliencia. Qualisophy actúa como tu socio estratégico, no como un proveedor transaccional.",
    "Te conectamos con perfiles altamente motivados y formados en las tecnologías que realmente necesitas, reduciendo drásticamente la rotación y mejorando el clima laboral.",
  ],
  checks: [
    "Reducción del Coste de Rotación (Churn Rate)",
    "Impacto Directo en Objetivos ESG y RSC",
    "Talento con Soft Skills de Alta Resiliencia",
  ],
  imageSrc:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
};

export const PartnershipValueProp: React.FC = () => {
  return (
    <ProgramMethodology {...valuePropData} reverse={false} variant="white" />
  );
};
