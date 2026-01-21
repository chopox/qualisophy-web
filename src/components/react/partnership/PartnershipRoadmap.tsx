import React from "react";
import { ProgramCurriculum } from "../programs/ProgramCurriculum";

const partnershipProcess = [
  {
    stepNumber: 1,
    title: "Diagnóstico y Cultura",
    description:
      "Nos reunimos para entender no solo tus vacantes técnicas, sino tu cultura de equipo y objetivos de negocio. Analizamos dónde el talento diverso aporta más valor.",
  },
  {
    stepNumber: 2,
    title: "Diseño de la Propuesta",
    description:
      "Definimos el modelo de colaboración ideal (Hiring directo, Formación o Voluntariado) y establecemos los KPIs de éxito y el cronograma de incorporación.",
  },
  {
    stepNumber: 3,
    title: "Selección y Acompañamiento",
    description:
      "Presentamos candidatos finalistas. Durante los primeros 3 meses, nuestros psicólogos acompañan tanto al talento como a tus managers para asegurar la integración.",
  },
];

export const PartnershipRoadmap: React.FC = () => {
  return (
    <ProgramCurriculum
      title="Roadmap de la Alianza"
      subtitle="Un proceso estructurado, sencillo y eficaz para garantizar el éxito de la colaboración."
      steps={partnershipProcess}
      variant="white"
    />
  );
};
