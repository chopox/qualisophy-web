import React from "react";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const valuesData: ValueItem[] = [
  {
    id: "cognitive-diversity",
    title: "Diversidad Cognitiva",
    description:
      "No vemos la inclusión como caridad, sino como ventaja competitiva. Las mentes diferentes aportan soluciones disruptivas a problemas complejos.",
    icon: "psychology_alt",
  },
  {
    id: "pragmatic-excellence",
    title: "Excelencia Pragmática",
    description:
      "Formamos con el máximo rigor técnico. Garantizamos que nuestro talento no solo se integre, sino que eleve el estándar de los equipos de desarrollo.",
    icon: "engineering",
  },
  {
    id: "integral-connection",
    title: "Conexión Integral",
    description:
      "Somos el nexo de confianza. Acompañamos en todo el ciclo, asegurando que la cultura corporativa y el profesional crezcan juntos.",
    icon: "handshake",
  },
  {
    id: "sustainable-impact",
    title: "Impacto Sostenible",
    description:
      "Buscamos resultados a largo plazo. No solo cubrimos vacantes, construimos trayectorias sólidas que generan un retorno social y económico medible.",
    icon: "trending_up",
  },
];

export const ValuesSection: React.FC = () => {
  return (
    <section className="bg-gray-50/50 py-20 md:py-28 w-full border-y border-gray-100">
      <div className="flex justify-center w-full">
        <div className="w-full md:max-w-[96%] px-4 md:px-8 lg:px-12 max-w-7xl">
          {/* 1. Cabecera */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-secondary text-3xl md:text-5xl font-bold mb-6 font-heading">
              Nuestra Filosofía
            </h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl font-primary leading-relaxed">
              Más allá de la formación técnica, cultivamos un ecosistema donde
              la{" "}
              <span className="text-secondary font-bold">
                calidad profesional
              </span>{" "}
              y el{" "}
              <span className="text-secondary font-bold">valor humano</span>{" "}
              convergen para redefinir el sector tecnológico.
            </p>
          </div>

          {/* 2. Ecosistema Horizontal (Línea Temporal) */}
          <div className="relative pt-4">
            {/* CORRECCIÓN 1: Línea horizontal de fondo CENTRADA (solo visible en lg) */}
            {/* top es 16px (pt-4) + 40px (centro de md:size-20 que es 80px) = 56px */}
            {/* left y right están al 12.5% para conectar de centro a centro de 4 columnas */}
            <div className="hidden lg:block absolute top-[56px] left-[12.5%] right-[12.5%] h-px bg-gray-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
              {valuesData.map((value) => (
                <div
                  key={value.id}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="size-16 md:size-20 rounded-full bg-white border border-gray-200 text-gray-400 group-hover:text-primary group-hover:border-primary/40 flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-[32px] md:text-[40px] transition-transform duration-300 group-hover:scale-110">
                      {value.icon}
                    </span>
                  </div>
                  <h3 className="text-secondary text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-primary text-sm md:text-base px-2">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Banner de Compromiso - CORRECCIÓN 2: Tono ligero y diseño refinado */}
          {/* Se ha cambiado bg-secondary por bg-white y text-white por text-secondary, añadiendo borde y sombra */}
          <div className="mt-20 md:mt-28 bg-white text-secondary rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative overflow-hidden border border-gray-100 shadow-sm transition-shadow hover:shadow-lg">
            <div className="relative z-10 md:w-2/3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4 lg:mb-6">
                El Compromiso Qualisophy
              </h3>
              {/* Se ha cambiado text-gray-300 por text-gray-600 */}
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-primary">
                No nos conformamos con llenar vacantes. Nuestro objetivo es
                elevar los estándares de la industria, demostrando que los
                equipos diversos e inclusivos no solo son éticamente necesarios,
                sino técnicamente superiores.
              </p>
            </div>

            <div className="relative z-10 md:w-1/3 flex justify-center md:justify-end">
              {/* Se ha cambiado el contenedor del icono de bg-white/10 a bg-gray-50 con borde para integrarse perfectamente */}
              <div className="size-24 md:size-28 rounded-[2rem] bg-gray-50 flex items-center justify-center border border-gray-100 shadow-inner group transition-transform duration-500 hover:scale-105 cursor-default">
                <span className="material-symbols-outlined text-[48px] md:text-[56px] text-primary">
                  workspace_premium
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
