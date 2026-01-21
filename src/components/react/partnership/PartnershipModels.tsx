import React from "react";
import { ProgramFeatures } from "../programs/ProgramFeatures";

const collaborationModels = [
  {
    icon: "person_search",
    title: "Hiring Partner",
    description:
      "Acceso prioritario a nuestra bolsa de talento validado. Incorpora perfiles Junior/Mid con acompañamiento inicial incluido para garantizar el 'fit' cultural.",
  },
  {
    icon: "corporate_fare",
    title: "Upskilling Ad-hoc",
    description:
      "Diseñamos 'Bootcamps' a medida para tu stack tecnológico. Formamos a tus futuros empleados o reciclamos a tu plantilla actual según tus necesidades.",
  },
  {
    icon: "volunteer_activism",
    title: "Voluntariado Corporativo",
    description:
      "Involucra a tus equipos técnicos como mentores. Una potente herramienta de fidelización y 'team building' que conecta a tus seniors con nuestro propósito.",
  },
  {
    icon: "domain",
    title: "Sponsoring & Becas",
    description:
      "Financia becas para colectivos vulnerables o apadrina una promoción completa, posicionando tu marca empleadora como líder en impacto social.",
  },
];

export const PartnershipModels: React.FC = () => {
  return (
    <ProgramFeatures
      title="Modelos de Colaboración Flexible"
      subtitle="Adapta la alianza a tus necesidades de contratación, formación y estrategia de RSC."
      features={collaborationModels}
      variant="dark"
      layout="grid4"
    />
  );
};
