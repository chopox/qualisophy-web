import React, { useState, useEffect } from "react";
import { validateContactForm } from "@/lib/validation";
import { Button } from "@/components/react/shared/Button";
import { Card } from "@/components/react/shared/Card";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { useTranslations } from "@/hooks/useTranslations";

interface ContactFormProps {
  source?: string;
  endpoint?: string;
}

export const ContactForm = ({
  source = "Contacto General",
  endpoint = "/api/send-email",
}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [currentSource, setCurrentSource] = useState(source);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations();

  // EFECTO: Detectar parámetros en la URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const paramValue = params.get("subject") || params.get("type");

      if (paramValue) {
        // 1. Lógica específica para Partnership
        if (paramValue === "partnership") {
          setCurrentSource("Solicitud de Alianza Corporativa");
          setFormData((prev) => ({
            ...prev,
            message:
              "Hola, represento a [Nombre de tu Empresa] y estamos interesados en explorar una alianza con Qualisophy para...",
          }));
        }
        // 2. Lógica para 'company' general (pilares)
        else if (paramValue === "company") {
          setCurrentSource("Interés Corporativo (Desde Pilares)");
          setFormData((prev) => ({
            ...prev,
            message:
              "Hola, nos gustaría recibir más información sobre vuestros programas de inclusión para empresas.",
          }));
        }
        // 3. Lógica para Empresa Rural ('company-rural')
        else if (paramValue === "company-rural") {
          setCurrentSource("Interés Corporativo (Talento Rural)");
          setFormData((prev) => ({
            ...prev,
            message:
              "Hola, nos gustaría recibir información sobre cómo podemos colaborar y contratar talento cualificado del entorno rural.",
          }));
        }
        // 4. Lógica para Candidato Rural ('candidate-rural')
        else if (paramValue === "candidate-rural") {
          setCurrentSource("Inscripción Programa (Talento Rural)");
          setFormData((prev) => ({
            ...prev,
            message:
              "Hola, me gustaría apuntarme al programa Talento Rural Tech para construir mi futuro digital sin moverme de mi entorno. ¿Me podéis dar más información?",
          }));
        }
        // 5. NUEVO: Lógica para Candidato General ('candidate') (Neurodivergencia, Migrante, Exclusión)
        else if (paramValue === "candidate") {
          setCurrentSource("Inscripción Programa (Candidato)");
          setFormData((prev) => ({
            ...prev,
            message:
              "Hola, me gustaría apuntarme a vuestros programas de formación inclusiva y descubrir cómo podéis ayudarme a impulsar mi carrera profesional.",
          }));
        }
        // 6. Lógica genérica (fallback)
        else {
          setCurrentSource(`Landing: ${paramValue}`);
          if (!formData.message) {
            setFormData((prev) => ({
              ...prev,
              message: `Hola, me interesa saber más sobre: ${paramValue}.`,
            }));
          }
        }
      }
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setFormSuccess(false);

    // ------------------------------------------------------------------
    // VALIDACIÓN BASE Y EXTRA: Bloquear números/caracteres en Nombre
    // ------------------------------------------------------------------
    const validation = validateContactForm(formData);
    let finalErrors: Record<string, string> = validation.success
      ? {}
      : validation.errors || {};
    let hasCustomErrors = false;

    // Regex para nombre: Letras (con acentos/ñ), espacios y guiones
    const textOnlyRegex = /^[a-zA-ZÀ-ÿ\s\-]+$/;

    if (formData.name && !textOnlyRegex.test(formData.name)) {
      finalErrors.name = "Este campo no puede contener números.";
      hasCustomErrors = true;
    }

    if (!validation.success || hasCustomErrors) {
      setFormErrors(finalErrors);
      setIsSubmitting(false);
      return; // Detenemos la ejecución y mostramos errores
    }
    // ------------------------------------------------------------------

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // Aquí enviamos el origen dinámico para que Make sepa de dónde viene
          source: currentSource,
          // Enviamos un tipo explícito para ayudar al Router de Make
          type: currentSource.includes("Alianza") ? "partnership" : "contact",
        }),
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        const errorData = await response.json();
        setFormErrors({
          general: errorData.message || t("contact.serverError"),
        });
      }
    } catch (error) {
      setFormErrors({ general: t("contact.networkError") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection>
      <Card>
        {formSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <span data-test="contact-success-message" className="text-green-800 text-sm font-medium">
                {t("contact.successMessage")}
              </span>
            </div>
          </div>
        )}

        {formErrors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <span data-test="contact-error-message" className="text-red-800 text-sm font-medium">
                {formErrors.general}
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {/* Mostramos el contexto si existe */}
          {currentSource !== "Contacto General" && (
            <div data-test="contact-title-subject" className="bg-blue-50 text-blue-800 text-xs px-3 py-2 rounded border border-blue-100 mb-4 font-medium">
              📋 Asunto: {currentSource}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                data-test="contact-title-name"
                htmlFor="name"
                className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
              >
                {t("contact.nameLabel")} <span className="text-red-600">*</span>
              </label>
              <input
                data-test="contact-input-name"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm bg-white ${
                  formErrors.name
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300"
                }`}
                placeholder={t("contact.namePlaceholder")}
              />
              {formErrors.name && (
                <p className="text-red-600 text-xs mt-2">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label
                data-test="contact-title-email"
                htmlFor="email"
                className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
              >
                {t("contact.emailLabel")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                data-test="contact-input-email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm bg-white ${
                  formErrors.email
                    ? "border-red-300 focus:ring-red-500"
                    : "border-slate-300"
                }`}
                placeholder={t("contact.emailPlaceholder")}
              />
              {formErrors.email && (
                <p className="text-red-600 text-xs mt-2">{formErrors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              data-test="contact-title-message"
              htmlFor="message"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("contact.messageLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              data-test="contact-input-message"
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 resize-none text-sm bg-white ${
                formErrors.message
                  ? "border-red-300 focus:ring-red-500"
                  : "border-slate-300"
              }`}
              placeholder={t("contact.messagePlaceholder")}
            />
            {formErrors.message && (
              <p className="text-red-600 text-xs mt-2">{formErrors.message}</p>
            )}
          </div>

          <Button
            data-test="contact-submit-button"
            type="submit"
            variant="secondary"
            size="md"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {t("contact.submitButton")}
          </Button>
        </form>
      </Card>
    </AnimatedSection>
  );
};
