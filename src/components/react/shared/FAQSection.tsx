import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Award,
  CheckCircle2,
  CreditCard,
  Briefcase,
  GraduationCap,
  Mail,
  MessageCircle,
  Phone,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  icon: any;
  popular?: boolean;
}

interface FAQSectionProps {
  alwaysExpanded?: boolean;
}

export const FAQSection = ({ alwaysExpanded = false }: FAQSectionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    alwaysExpanded ? 0 : null
  );

  const faqs: FAQ[] = [
    {
      question: "¿Los cursos son en vivo o grabados?",
      answer:
        "Todos nuestros cursos son EN VIVO con instructores certificados. Tendrás sesiones interactivas donde podrás hacer preguntas en tiempo real.  Además, todas las clases quedan grabadas y disponibles durante 6 meses para que puedas repasarlas cuando quieras.",
      icon: Clock,
      popular: true,
    },
    {
      question: "¿Obtengo certificación al finalizar?",
      answer:
        "Sí, al completar el curso recibes un certificado oficial reconocido por empresas tech. Además, el programa incluye proyectos prácticos que podrás añadir a tu portfolio profesional.",
      icon: Award,
      popular: true,
    },
    {
      question: "¿Qué pasa si no puedo asistir a una clase en vivo?",
      answer:
        "No te preocupes.  Todas las sesiones quedan grabadas y las tienes disponibles en menos de 24 horas. También ofrecemos tutorías de recuperación semanales sin coste adicional para resolver dudas.",
      icon: CheckCircle2,
    },
    {
      question: "¿Ofrecen facilidades de pago?",
      answer:
        "Sí, ofrecemos planes de pago a plazos sin intereses. También tenemos descuentos por pronto pago (hasta 20% OFF) y packs para empresas con condiciones especiales.",
      icon: CreditCard,
    },
    {
      question: "¿El curso incluye prácticas en empresas?",
      answer:
        "Nuestros cursos incluyen proyectos basados en casos reales de empresas.  Además, tenemos un programa de partnerships donde conectamos a nuestros mejores alumnos con empresas que buscan talento tech.",
      icon: Briefcase,
    },
    {
      question: "¿Necesito conocimientos previos? ",
      answer:
        "Depende del curso.  Los cursos de nivel básico no requieren experiencia previa. Para cursos avanzados, te indicamos los requisitos específicos en la página de cada curso.  Si tienes dudas, contáctanos y te asesoramos.",
      icon: GraduationCap,
    },
  ];

  const toggleFAQ = (index: number) => {
    if (! alwaysExpanded) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Title section with multiple small icons */}
        <div className="text-center mb-12">
          {/* Multiple small icons in a row */}
          <div className="flex justify-center gap-3 mb-6">
            <div className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-300">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-300">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <div className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-300">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Resolvemos tus dudas antes de que nos contactes.  Si no encuentras lo
            que buscas, estamos a un clic de distancia.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-700">
                <span className="font-semibold text-secondary">500+</span>{" "}
                consultas resueltas
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-sm text-gray-700">
                Respuesta en{" "}
                <span className="font-semibold text-secondary">&lt;24h</span>
              </span>
            </div>
          </div>
        </div>

        {/* FAQs Container */}
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 md:p-12 mb-12">
          {/* FAQs List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <div
                  key={index}
                  className={`bg-white border-2 rounded-xl transition-all duration-300 ${
                    openIndex === index
                      ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                      : "border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center gap-4 hover:bg-gray-50/50 transition-colors rounded-xl group"
                  >
                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30"
                          : "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-105"
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Question text with popular badge */}
                    <div className="flex-1 pr-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-lg text-secondary">
                          {faq.question}
                        </span>
                        {faq.popular && (
                          <span className="bg-gradient-to-r from-primary to-blue-400 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Chevron */}
                    <ChevronDown
                      className={`w-6 h-6 text-primary flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ?  "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4 ml-16">
                      {faq. answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🆕 NEW: White CTA with gradient border and strong shadow */}
        <div className="relative">
          {/* Gradient border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-400 to-primary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          
          {/* Main CTA card */}
          <div className="relative bg-white rounded-2xl border-2 border-primary/20 shadow-2xl p-8 md:p-10 hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300">
            {/* Icon badge */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-primary to-blue-400 p-4 rounded-2xl shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3 text-center">
              ¿No encuentras tu respuesta?
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 mb-8 text-lg max-w-xl mx-auto text-center">
              Nuestro equipo está listo para ayudarte. Contacta con nosotros y te
              responderemos en <span className="font-semibold text-primary">menos de 24 horas</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 transform group"
              >
                <Mail className="w-5 h-5" />
                Contacta con Nosotros
              </a>
              <a
                href="mailto:info@qualisophy.com"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-secondary border-2 border-gray-200 hover:border-primary/30 font-semibold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg hover:scale-105 transform"
              >
                <Mail className="w-5 h-5" />
                info@qualisophy.com
              </a>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-white">o llámanos directamente</span>
              </div>
            </div>

            {/* Phone contact */}
            <div className="flex justify-center">
              <a
                href="tel:+34123456789"
                className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors font-medium group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-lg">+34 123 456 789</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};