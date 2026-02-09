import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleMeshBackground } from "./ParticleMeshBackground"; // Asegúrate de importar esto

const testimonials = [
  {
    id: 1,
    quote:
      "Qualisophy ha transformado nuestra forma de captar talento. La calidad técnica de los perfiles junior que hemos incorporado es excepcional.",
    author: "Rodrigo de Burgos",
    role: "Socio Director, Vector ITC",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "Gracias al programa de Neurodivergencia, hemos integrado a dos desarrolladores brillantes que han aportado una perspectiva única al equipo.",
    author: "Marta Sánchez",
    role: "CTO, Innova Tech",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote:
      "La formación a medida para nuestro equipo de QA superó nuestras expectativas. Práctica, directa y muy alineada con el mercado.",
    author: "Javier Ruiz",
    role: "Head of Engineering, StartUp X",
    image: "https://randomuser.me/api/portraits/men/86.jpg",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-20 relative overflow-hidden border-t border-gray-100">
      {/* FONDO MESH ANIMADO */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <ParticleMeshBackground />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm uppercase tracking-wider mb-2">
            Confianza
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-secondary">
            ¿Qué dicen nuestros clientes?
          </h2>
        </div>

        <div className="max-w-4xl mx-auto h-[350px] flex flex-col justify-center items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full px-4"
            >
              <div className="mb-8 relative">
                <span className="text-6xl text-primary/20 font-serif leading-none absolute -top-8 left-1/2 -translate-x-1/2">
                  “
                </span>
                {/* Texto oscuro para fondo blanco */}
                <p className="text-xl md:text-2xl font-light italic leading-relaxed relative z-10 text-slate-700">
                  {testimonials[currentIndex].quote}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 p-1 shadow-sm bg-white">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].author}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-secondary">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-primary text-sm font-medium">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots de navegación (Color gris) */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "bg-primary w-8"
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                aria-label={`Ir al testimonio ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
