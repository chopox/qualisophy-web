import React from "react";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

interface ProgramFeaturesProps {
  title: string;
  subtitle: string;
  features: FeatureItem[];
  variant?: "light" | "gray" | "dark";
  // AÑADIDO: "pillars" a la definición de tipos
  layout?: "cards" | "zigzag" | "list" | "grid4" | "pillars";
}

export const ProgramFeatures: React.FC<ProgramFeaturesProps> = ({
  title,
  subtitle,
  features,
  variant = "light",
  layout = "cards",
}) => {
  const isDark = variant === "dark";
  const isGray = variant === "gray";

  // Definir fondo de la sección
  let sectionBg = "bg-white";
  if (isGray) sectionBg = "bg-gray-50";
  if (isDark) sectionBg = "bg-secondary";

  // --- LAYOUT 1: ZIG-ZAG ---
  const renderZigZag = () => (
    <div className="flex flex-col gap-16 lg:gap-24">
      {features.map((feature, index) => {
        const isEven = index % 2 === 0;
        return (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-8 lg:gap-16"
          >
            {/* COLUMNA ICONO */}
            <div
              className={`w-full md:w-1/2 flex justify-center ${
                isEven ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="relative group">
                {/* Efecto de brillo detrás */}
                <div
                  className={`
                    absolute inset-0 rounded-full blur-2xl transform group-hover:scale-110 transition-transform duration-500
                    ${isDark ? "bg-primary/20" : "bg-primary/10"}
                  `}
                ></div>

                {/* Contenedor del Icono */}
                <div
                  className={`
                    relative size-48 lg:size-64 rounded-3xl flex items-center justify-center transform group-hover:-rotate-2 transition-all duration-300 shadow-xl
                    ${
                      isDark
                        ? "bg-white/5 border border-white/10 backdrop-blur-sm"
                        : "bg-white border border-gray-100"
                    }
                  `}
                >
                  <div
                    className={`
                      size-20 lg:size-24 rounded-2xl flex items-center justify-center
                      ${isDark ? "bg-primary/20 text-white" : "bg-primary/5 text-primary"}
                    `}
                  >
                    <span className="material-symbols-outlined text-[64px] lg:text-[80px]">
                      {feature.icon}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA TEXTO */}
            <div
              className={`w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left ${
                isEven ? "md:order-1" : "md:order-2"
              }`}
            >
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <span className="flex items-center justify-center size-8 rounded-full bg-primary text-white font-bold text-sm">
                  {index + 1}
                </span>
                <span
                  className={`h-px w-12 ${isDark ? "bg-white/20" : "bg-gray-200"}`}
                ></span>
              </div>

              <h3
                className={`
                  text-2xl md:text-4xl font-bold font-heading
                  ${isDark ? "text-white" : "text-secondary"}
                `}
              >
                {feature.title}
              </h3>

              <p
                className={`
                  text-lg leading-relaxed font-primary
                  ${isDark ? "text-gray-300" : "text-gray-600"}
                `}
              >
                {feature.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );

  // --- LAYOUT 2: LISTA ---
  const renderList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`
            flex items-start gap-5 p-8 rounded-2xl transition-all duration-300 border
            ${
              isGray
                ? "bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20"
                : isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"
            }
          `}
        >
          <div
            className={`shrink-0 size-14 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-primary/20 text-primary"
                : "bg-primary/10 text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[32px]">
              {feature.icon}
            </span>
          </div>
          <div className="flex flex-col gap-2 text-left">
            <h3
              className={`text-xl font-bold font-heading ${
                isDark ? "text-white" : "text-secondary"
              }`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-base leading-relaxed font-primary ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // --- LAYOUT 3: GRID 4 COLUMNAS ---
  const renderGrid4 = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`
            group flex flex-col items-start gap-6 p-8 rounded-3xl transition-all duration-300 border h-full relative overflow-hidden
            ${
              isDark
                ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1"
                : "bg-white border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/20"
            }
          `}
        >
          {/* Fondo degradado sutil al hacer hover en modo claro */}
          {!isDark && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          )}

          {/* Contenedor del Icono */}
          <div
            className={`
              relative z-10 size-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
              ${
                isDark
                  ? "bg-white/10 text-white group-hover:bg-primary group-hover:text-white"
                  : "bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-md"
              }
            `}
          >
            <span className="material-symbols-outlined text-[36px]">
              {feature.icon}
            </span>
          </div>

          {/* Contenido de Texto */}
          <div className="relative z-10 flex flex-col gap-3 text-left">
            <h3
              className={`text-xl font-bold font-heading leading-tight transition-colors ${
                isDark
                  ? "text-white"
                  : "text-secondary group-hover:text-primary"
              }`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-sm leading-relaxed font-primary ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  // --- LAYOUT 4: PILARES FLOTANTES (NUEVO) ---
  const renderPillars = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 lg:gap-x-24 max-w-5xl mx-auto">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center md:items-start text-center md:text-left gap-6 group"
        >
          {/* Contenedor del Icono: Grande, sin borde, forma orgánica */}
          <div className="relative size-32 lg:size-40 shrink-0">
            {/* Blob de fondo */}
            <div
              className={`
                absolute inset-0 bg-primary/10 rounded-[3rem] rotate-3 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105
                ${index % 2 === 0 ? "rounded-bl-[4rem]" : "rounded-tr-[4rem] -rotate-3"}
             `}
            ></div>

            {/* Icono central */}
            <div className="absolute inset-0 flex items-center justify-center text-primary transition-transform duration-300 group-hover:scale-110">
              <span className="material-symbols-outlined text-[64px] lg:text-[80px]">
                {feature.icon}
              </span>
            </div>
          </div>

          {/* Textos: Limpios, sin contenedores */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold font-heading leading-tight text-secondary group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
            <p className="text-base lg:text-lg leading-relaxed font-primary text-gray-600 max-w-md">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section
      className={`px-6 py-20 lg:px-12 lg:py-28 flex justify-center w-full relative overflow-hidden ${sectionBg}`}
    >
      <div className="w-full md:max-w-7xl relative z-10">
        <div className="text-center mb-16 md:mb-20 px-4 max-w-4xl mx-auto">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-6 font-heading ${
              isDark ? "text-white" : "text-secondary"
            }`}
          >
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-8"></div>
          <p
            className={`text-lg md:text-xl font-primary leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {subtitle}
          </p>
        </div>

        {layout === "zigzag" && renderZigZag()}
        {layout === "list" && renderList()}
        {layout === "grid4" && renderGrid4()}
        {/* AÑADIDO: Renderizado de Pilares */}
        {layout === "pillars" && renderPillars()}
        {/* Fallback */}
        {layout === "cards" && renderList()}
      </div>
    </section>
  );
};
