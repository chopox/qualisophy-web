import React from "react";
import { motion } from "framer-motion";
import { ParticleMeshBackground } from "../shared/ParticleMeshBackground";

// Importación de imágenes
import imgFran from "../../../assets/team-fran.png";
import imgElena from "../../../assets/team-elena.png";
import imgJuanpe from "../../../assets/team-juanpe.jpeg";
import imgPatricia from "../../../assets/team-patricia.jpeg";
import imgEnrique from "../../../assets/instructor/instructor-enrique.jpeg";
import imgJavi from "../../../assets/instructor/instructor-javi.jpeg";

const teamMembers = [
  {
    name: "Elena Martín",
    role: "CEO and Founder",
    image: imgElena.src,
    position: "object-top",
    scale: "scale-100",
    highlights: [
      "Operaciones y Cultura",
      "Gestión de talento y personas",
      "Alianzas de impacto social",
    ],
  },

  {
    name: "Francisco Guerrero",
    role: "Instructor Tech",
    image: imgFran.src,
    position: "object-top",
    scale: "scale-100",
    highlights: [
      "Estrategia y Liderazgo Tech",
      "Docencia especializada sector TI",
      "Visión global de la plataforma",
    ],
  },
  {
    name: "Patricia Beyet",
    role: "Project Manager & Agile Coach",
    image: imgPatricia.src,
    position: "object-top",
    scale: "scale-125",
    hoverScale: "group-hover:scale-[1.35]",
    highlights: [
      "Gestión de proyectos y Scrum",
      "Formación especializada en TI",
      "Metodologías ágiles",
    ],
  },
  {
    name: "Juan Pedro Gómez",
    role: "Desarrollo Web Fullstack",
    image: imgJuanpe.src,
    position: "object-center",
    scale: "scale-80",
    highlights: [
      "Arquitectura de la plataforma",
      "Desarrollo Fullstack (Web)",
      "Experiencia de Usuario (UX/UI)",
    ],
  },
  {
    name: "Javier Flores",
    role: "INSTRUCTOR TECH · AUTOMATIZACIÓN QA",
    image: imgJavi.src,
    position: "object-center",
    scale: "scale-80",
    highlights: [
      "Cypress Ambassador (2026)",
      "Automatización eficiente",
      "Frameworks mantenibles",
    ],
  },
  {
    name: "Enrique Román",
    role: "INSTRUCTOR TECH · POWER BI & ANALÍTICA",
    image: imgEnrique.src,
    position: "object-center",
    scale: "scale-80",
    highlights: [
      "Modelado de datos",
      "Analítica de negocio",
      "Toma de decisiones",
    ],
  },
];

export const TeamGrid = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <ParticleMeshBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-4">
            Las personas detrás del cambio
          </h2>
          <div className="w-20 h-1 bg-primary"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col w-full sm:w-72 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-b-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden mb-6 bg-gray-50">
                <img
                  src={member.image}
                  alt={member.name}
                  // CAMBIO AQUÍ: Ahora usa member.hoverScale si existe, si no usa el 110 por defecto
                  className={`w-full h-full object-cover ${member.position} ${member.scale || ""} transition-transform duration-700 ${member.hoverScale || "group-hover:scale-110"}`}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />
              </div>

              <div className="flex flex-col flex-grow px-5 pb-6">
                <h3 className="text-xl font-bold text-secondary mb-1 font-heading group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <span className="text-secondary font-bold text-xs uppercase tracking-wider mb-4 block">
                  {member.role}
                </span>
                <ul className="space-y-2 mt-auto">
                  {member.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-gray-600 leading-relaxed font-primary"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
