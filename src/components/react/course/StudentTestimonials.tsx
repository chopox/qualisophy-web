import React from "react";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { Star, Quote, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Emiliano Aquilani",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "El curso superó mis expectativas. Aprendí de forma práctica y ahora uso las herramientas en mi trabajo diario.",
    role: "QA Engineer",
    course: "Testing y Calidad del Software", 
    rating: 5, 
  },
  {
    name: "Anna Iturbe",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    text: "Excelente equipo docente, contenidos actualizados y metodología ágil. ¡Muy recomendable!",
    role: "Developer",
    course: "Full Stack Development", 
    rating: 5, 
  },
  {
    name: "Lara Atkinson",
    image:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=200&q=80",
    text: "Gracias a este programa conseguí mi primer empleo como analista de datos. La formación fue clave.",
    role: "Data Analyst",
    course: "Power BI y Análisis de Datos", 
    rating: 5, 
  },
];

const StudentTestimonials: React.FC = () => {
  return (
    <AnimatedSection className="container mx-auto px-6">
      <h2 className="font-heading text-4xl font-bold text-secondary-DEFAULT text-center mb-4">
        Lo que dicen nuestros alumnos
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Testimonios reales de estudiantes que han transformado su carrera
        profesional
      </p>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-2xl p-4 text-center h-full transition-all duration-300 hover:-translate-y-2 border-l-4 border-transparent hover:border-primary/30"
          >
            {/* 🆕 1. Rating stars */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <blockquote className="relative mb-6 pt-7 pl-7">
              {/* Quote queda en su sitio */}
              <Quote className="absolute -top-2 -left-2 w-12 h-12 text-primary/10" />

              <p className="text-lg italic text-gray-700 relative z-10 leading-relaxed">
                "{testimonial.text}"
              </p>
            </blockquote>

            <figcaption className="mt-auto">
              {/* 🆕 4. Avatar with colored border and verified badge */}
              <div className="relative inline-block mb-4">
                <img
                  className="w-20 h-20 rounded-full mx-auto object-cover border-4 border-primary/20 shadow-lg"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                {/* Verified badge */}
                <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1 border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="font-heading font-bold text-lg text-secondary-DEFAULT">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-600 mb-2">
                {testimonial.role}
              </div>
              {/* 🆕 5. Course completed */}
              <div className="text-xs text-primary font-medium bg-primary/5 rounded-full px-3 py-1 inline-block">
                {testimonial.course}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </AnimatedSection>
  );
};

export default StudentTestimonials;
