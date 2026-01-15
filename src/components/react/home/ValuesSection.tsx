import React from "react";

interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string; // Material Symbols name
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
    <section className="bg-white py-16 md:py-28 w-full">
      <div className="flex justify-center w-full">
        {/* CORRECCIÓN DE ANCHO:
            - Igualamos exactamente al contenedor de InclusionPillars.
            - Antes: max-w-5xl (muy estrecho).
            - Ahora: md:max-w-[96%] (ocupa casi toda la pantalla).
        */}
        <div className="w-full md:max-w-[96%] px-4 md:px-8 lg:px-12">
          {/* Cabecera de la Sección */}
          <div className="text-center mb-16 md:mb-24">
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

          {/* Grid de Cuadrícula 2x2
              - Mantenemos md:grid-cols-2 para la estética de cuadrícula.
              - Al ser el contenedor más ancho (96%), las tarjetas serán más grandes
                y respirarán mejor, alineándose con los pilares de arriba.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {valuesData.map((value) => (
              <div
                key={value.id}
                className="group flex flex-col items-center text-center p-8 lg:p-12 rounded-[2rem] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 hover:border-primary/30 bg-white relative z-10"
              >
                {/* Fondo sutil al hacer hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2rem] -z-10"></div>

                {/* Círculo del Icono */}
                <div className="mb-8 relative">
                  <div className="size-24 rounded-2xl bg-primary/5 group-hover:bg-primary text-primary group-hover:text-white flex items-center justify-center transition-all duration-500 ease-out transform group-hover:rotate-3 group-hover:scale-110 shadow-sm group-hover:shadow-lg ring-1 ring-primary/10 group-hover:ring-primary/0">
                    <span className="material-symbols-outlined text-[40px] md:text-[48px] transition-colors duration-300">
                      {value.icon}
                    </span>
                  </div>
                </div>

                {/* Contenido de Texto */}
                <h3 className="text-secondary text-xl md:text-2xl font-bold mb-4 font-heading group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>

                {/* Separador */}
                <div className="w-12 h-1 bg-gray-100 group-hover:bg-primary/30 rounded-full mb-6 transition-colors duration-300"></div>

                <p className="text-gray-500 leading-relaxed font-primary text-base md:text-lg group-hover:text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
