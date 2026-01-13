import { CheckCircle, Code, Workflow } from "lucide-react";

import { AnimatedSection } from "@/components/react/shared/AnimatedSection";

export const CustomTrainingProgram = () => {
  return (
    <div>
      {/* Block 1: Custom Programs */}
      <AnimatedSection>
        <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-16">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 font-heading">
              Programas Adaptados a tus Necesidades
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Diseñamos{" "}
              <strong>
                formaciones personalizadas, talleres prácticos y mentorías
                especializadas
              </strong>{" "}
              que fortalecen el rendimiento de tus equipos técnicos. Puedes
              elegir entre nuestros programas ya preparados o solicitar una
              propuesta totalmente a medida, enfocada en las herramientas y
              metodologías más demandadas del sector.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Trabajamos con un enfoque claro: resultados reales. Impulsamos la
              productividad, reducimos errores y fomentamos la colaboración
              mediante proyectos reales, aprendizaje activo y acompañamiento
              experto.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1470&q=80"
            alt="Formación personalizada para empresas"
            className="rounded-2xl shadow-lg w-full h-[380px] object-cover object-center"
          />
        </section>
      </AnimatedSection>

      {/* Block 2: Icons + Inspirational message */}
      <AnimatedSection>
        <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6 py-16 bg-white rounded-2xl">
          {/* Icons on the left */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <CheckCircle className="text-primary w-8 h-8" />
              <p className="text-slate-700 text-lg font-medium">
                Auditoría de Calidad del Software
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Workflow className="text-primary w-8 h-8" />
              <p className="text-slate-700 text-lg font-medium">
                Implementación de BDD y Automatización
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Code className="text-primary w-8 h-8" />
              <p className="text-slate-700 text-lg font-medium">
                Coding & DevOps para Testers
              </p>
            </div>
          </div>

          {/* Right text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 font-heading">
              Talento más preparado, equipos más eficientes
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Nuestros programas{" "}
              <strong>
                potencian la productividad, reducir errores y fomentar la
                colaboración técnica
              </strong>
              . Formamos a tus profesionales en tecnologías y metodologías
              actuales, combinando práctica y estrategia para generar un impacto
              directo en el negocio.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              El resultado es claro: equipos más capaces, procesos más ágiles y
              una cultura de excelencia que se nota en cada proyecto y en cada
              entrega.
            </p>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};
