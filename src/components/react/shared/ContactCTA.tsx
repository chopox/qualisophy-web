import { Button } from "./Button";
import { useTranslations } from "@/hooks/useTranslations";

export const ContactCTA = () => {
  const t = useTranslations();
  return (
    <section className="relative w-screen left-1/2 -translate-x-1/2 bg-white ">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-heading md:text-4xl font-bold text-secondary mb-4">
          ¿Tienes alguna pregunta?
        </h2>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Estamos aquí para guiarte. Puedes consultar nuestras preguntas frecuentes o escribirnos directamente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/faq">
            <Button variant="primary" size="md">
              {t('button.faq')}
            </Button>
          </a>
          <a href="/contact">
            <Button variant="primary" size="md">
              {t('button.contact')}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
