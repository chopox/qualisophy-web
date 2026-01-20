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
  layout?: "cards" | "zigzag" | "list" | "grid4";
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

  // --- LAYOUT 1: ZIG-ZAG (CORREGIDO) ---
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

                {/* Contenedor del Icono: Adaptado para Dark Mode */}
                <div
                  className={`
                    relative size-48 lg:size-64 rounded-3xl flex items-center justify-center transform group-hover:-rotate-2 transition-all duration-300 shadow-xl
                    ${
                      isDark
                        ? "bg-white/5 border border-white/10 backdrop-blur-sm" // Dark Mode: Glassmorphism
                        : "bg-white border border-gray-100" // Light Mode: Tarjeta blanca
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

              {/* Título Corregido para Dark Mode */}
              <h3
                className={`
                  text-2xl md:text-4xl font-bold font-heading
                  ${isDark ? "text-white" : "text-secondary"}
                `}
              >
                {feature.title}
              </h3>

              {/* Descripción Corregida para Dark Mode */}
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
            flex flex-col items-start gap-5 p-6 rounded-2xl transition-all duration-300 border h-full
            ${
              isGray
                ? "bg-white border-gray-100 shadow-sm hover:shadow-lg hover:border-primary/20 "
                : isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-gray-50 border-transparent hover:bg-white hover:shadow-lg"
            }
          `}
        >
          <div
            className={`size-14 rounded-xl flex items-center justify-center ${
              isDark
                ? "bg-primary/20 text-primary"
                : "bg-primary/10 text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[32px]">
              {feature.icon}
            </span>
          </div>

          <div className="flex flex-col gap-3 text-left">
            <h3
              className={`text-lg font-bold font-heading leading-tight ${
                isDark ? "text-white" : "text-secondary"
              }`}
            >
              {feature.title}
            </h3>
            <p
              className={`text-sm leading-relaxed font-primary ${
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
        {/* Fallback */}
        {layout === "cards" && renderList()}
      </div>
    </section>
  );
};
