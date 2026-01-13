import { Button } from "@/components/react/shared/Button";
import { Card } from "@/components/react/shared/Card";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { PartnershipSteps } from "@/components/react/partnership/PartnershipSteps";
import { useTranslations } from "@/hooks/useTranslations";

export const PartnershipProgram = () => {
  const t = useTranslations();
  const advantages = [
    {
      title: "Talento Certificado",
      description:
        "Candidatos formados y evaluados en metodologías ágiles, testing y automatización.",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Acceso Prioritario",
      description: "Accede antes que nadie a los perfiles más prometedores.",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Alianzas Estratégicas",
      description:
        "Refuerza tu equipo con talento alineado a tus valores y visión.",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      title: "Visibilidad",
      description:
        "Aparece como empresa colaboradora en nuestra web y canales.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Banner */}
      <section
        className="
          relative left-1/2 right-1/2 -mx-[50vw] w-screen
          text-white overflow-hidden py-32 sm:py-40
          -mt-[var(--navbar-height,4rem)]
        "
      >
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1600&q=80')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 drop-shadow-lg">
            Programa de{" "}
            <span className="text-primary font-heading drop-shadow-md">Colaboración</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed text-gray-100 font-primary drop-shadow-md">
            Conecta con el mejor talento de nuestros cursos para cubrir tus
            vacantes y potencia tu equipo con profesionales formados en las
            tecnologías más demandadas.
          </p>
        </motion.div>
      </section>

      {/* 👇 REACT BREADCRUMBS
         Placed immediately after the banner to maintain layout flow
      */}
      <div className="max-w-6xl mx-auto px-4 -mt-10">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="list-none p-0 inline-flex items-center flex-wrap gap-2">
            {/* Home Icon */}
            <li className="flex items-center">
              <a
                href="/"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </a>
            </li>
            {/* Separator & Current Page */}
            <li className="flex items-center">
              <span className="text-slate-400 mx-2">/</span>
              <span className="text-secondary font-medium">Partnership</span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Enterprise advantages */}
      <AnimatedSection>
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-heading sm:text-4xl font-bold text-slate-800 text-center mb-8 sm:mb-12">
            Ventajas para Empresas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {advantages.map((advantage, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl shadow-md group"
              >
                <img
                  src={advantage.image}
                  alt={advantage.title}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                  <h3 className="text-2xl font-semibold font-heading mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-200 text-sm leading-relaxed opacity-90">
                    {advantage.description}
                  </p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-black"></div>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Partnership Steps */}
      <PartnershipSteps />

      {/* Join Section */}
      <AnimatedSection>
        <Card className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-secondary mb-6 font-heading">
            ¿Quieres unirte?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Escríbenos a <strong>colaboraciones@qualisophy.com</strong> o agenda
            una reunión con nuestro equipo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:colaboraciones@qualisophy.com">
              <Button variant="primary" size="sm" className="min-w-[200px]">
                {t('button.collaborate')}
              </Button>
            </a>

            <a
              href="https://calendar.app.google/6TZSzsQn4q9kATzMA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="min-w-[200px]">
                {t('button.scheduleMeeting')}
              </Button>
            </a>
          </div>
        </Card>
      </AnimatedSection>
    </div>
  );
};
