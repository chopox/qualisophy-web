import React from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Qualisophy no solo validó mis habilidades técnicas, sino que me dio la confianza para navegar en un nuevo mercado laboral. Hoy lidero un equipo de desarrollo.",
    name: "Maria Gonzalez",
    role: "Senior Frontend Dev",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote:
      "El proceso de 'Formación Puente' fue clave. Aprendí las herramientas locales específicas que me faltaban y conseguí trabajo en menos de 2 meses.",
    name: "Carlos Mendez",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    quote:
      "La red de networking es invaluable. Me conectaron con mentores que entendían mi background y me guiaron en cada paso legal y profesional.",
    name: "John Doe",
    role: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
];

export const ProgramTestimonials: React.FC = () => {
  return (
    <section className="bg-white py-20 lg:py-28 px-6 lg:px-12 w-full border-t border-gray-100">
      <div className="max-w-7xl mx-auto w-full">
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-secondary text-3xl md:text-5xl font-bold mb-6 font-heading">
              Historias de Éxito
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg md:text-xl font-primary">
              Conoce a los profesionales que han impulsado su carrera con
              nosotros.
            </p>
          </div>

          {/* Botones decorativos */}
          <div className="hidden md:flex gap-3">
            <button className="size-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-secondary transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button className="size-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 transition-colors shadow-lg">
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Grid de Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 relative group"
            >
              <span className="material-symbols-outlined text-5xl text-primary/10 absolute top-6 right-6 group-hover:text-primary/20 transition-colors">
                format_quote
              </span>

              <p className="text-gray-600 mb-8 relative z-10 italic font-primary leading-relaxed text-lg">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="size-14 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-secondary text-base font-heading">
                    {item.name}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
