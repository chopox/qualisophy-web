import React from "react";
import { Button } from "@/components/react/shared/Button";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

interface Module {
  title: string;
  description: string;
}

interface CourseDetails {
  title: string;
  description: string;
  modules: Module[];
}

interface CorporateTrainingProps {
  courseDetails?: CourseDetails;
}

export const CorporateTraining: React.FC<CorporateTrainingProps> = ({
  courseDetails,
}) => {
  return (
    // Replace the root <div> with <AnimatedSection>
    <AnimatedSection>
      {courseDetails && (
        <>
          <section className="text-center">
            <h1 className="text-3xl font-bold mb-4">{courseDetails.title}</h1>
            <p className="text-slate-600 mb-4">{courseDetails.description}</p>
            <Button variant="primary">Solicita espacio</Button>
          </section>

          <section className="grid md:grid-cols-2 gap-8 mt-8">
            {courseDetails.modules.map((module, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">{module.title}</h2>
                <p className="text-slate-600">{module.description}</p>
              </div>
            ))}
          </section>
        </>
      )}

      {/* Keep the default content if no props are provided */}
      {!courseDetails && (
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 font-heading">
            Formación de Alto Impacto
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6 mx-auto max-w-3xl">
            Nuestros programas corporativos están pensados para transformar el
            aprendizaje en acción desde el primer día. Todo el contenido es 100%
            práctico y se aplica directamente a los retos reales de tu
            organización, asegurando una mejora inmediata y medible.
          </p>
        </div>
      )}
    </AnimatedSection>
  );
};
