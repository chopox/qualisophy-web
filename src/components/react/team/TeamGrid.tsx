import React from "react";
import { motion } from "framer-motion";
import { ParticleMeshBackground } from "../shared/ParticleMeshBackground";

const teamMembers = [
  {
    name: "Francisco Guerrero",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Liderazgo estratégico + Desarrollo tech",
      "Docencia especializada sector tech",
      'Visión y supervisión plataforma "Re-Tech"',
    ],
  },
  {
    name: "Sergio Jara",
    role: "Marketing",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Marketing y comercialización tech",
      "Docencia y formación como profesor",
      "Estrategias comerciales EdTech",
    ],
  },
  {
    name: "Elena Martín",
    role: "COO",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    highlights: [
      "Operaciones y administración",
      "Gestión de personas y cultura",
      "Proyectos de impacto social",
      "Relaciones corporativas",
    ],
  },
];

export const TeamGrid = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* --- FONDO MESH ANIMADO --- */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <ParticleMeshBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Intro */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary font-heading mb-4">
            Las personas detrás del cambio
          </h2>
          <div className="w-20 h-1 bg-primary"></div>
        </div>

        {/* Grid: 3 columnas con espacio amplio (gap-10) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              // Añadimos backdrop-blur y un fondo blanco semitransparente para que el texto se lea bien sobre las partículas
              className="group flex flex-col h-full bg-white/80 backdrop-blur-sm border border-white/50 rounded-b-2xl"
            >
              {/* IMAGEN: Aspecto Cuadrado (1:1) + Efecto Marco */}
              <div className="relative aspect-square overflow-hidden mb-6 bg-gray-100">
                {/* Imagen */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* MARCO INTERIOR (Estilo Atria) */}

                {/* Overlay sutil al hover */}
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors duration-300" />
              </div>

              {/* TEXTO */}
              <div className="flex flex-col flex-grow px-4 pb-6">
                <h3 className="text-2xl font-bold text-secondary mb-1 font-heading group-hover:text-primary transition-colors">
                  {member.name}
                </h3>

                <span className="text-secondary font-bold text-sm uppercase tracking-wider mb-4 block">
                  {member.role}
                </span>

                <ul className="space-y-2 mt-auto">
                  {member.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-600 leading-relaxed font-primary"
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
