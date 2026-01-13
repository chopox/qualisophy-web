import React, { useState } from "react";
import { validateContactForm } from "@/lib/validation";
import { Button } from "@/components/react/shared/Button";
import { Card } from "@/components/react/shared/Card";
import { AnimatedSection } from "@/components/react/shared/AnimatedSection";
import { useTranslations } from '@/hooks/useTranslations';

// Define Props to make the component reusable
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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // 1. Validation
    const validation = validateContactForm(formData);
    if (!validation.success) {
      setFormErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    // 2. Submit Form
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: source, // This is key for Make!
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
    general: errorData.message || t('contact.serverError'),
  });
}
    } catch (error) {
  setFormErrors({ general: t('contact.networkError') });
} finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection>
      <Card>
        {/* Success Message */}
        {formSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <span className="text-green-800 text-sm font-medium">
  {t('contact.successMessage')}
</span>
            </div>
          </div>
        )}

        {/* General Error Message */}
        {formErrors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <span className="text-red-800 text-sm font-medium">
                {formErrors.general}
              </span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
  htmlFor="name"
  className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
>
  {t('contact.nameLabel')} <span className="text-red-600">*</span>
</label>
              <input
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
                placeholder={t('contact.namePlaceholder')}
              />
              {formErrors.name && (
                <p className="text-red-600 text-xs mt-2">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label
  htmlFor="email"
  className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
>
  {t('contact.emailLabel')} <span className="text-red-600">*</span>
</label>
              <input
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
placeholder={t('contact.emailPlaceholder')}
              />
              {formErrors.email && (
                <p className="text-red-600 text-xs mt-2">{formErrors.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label
  htmlFor="message"
  className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
>
  {t('contact.messageLabel')} <span className="text-red-600">*</span>
</label>
            <textarea
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
placeholder={t('contact.messagePlaceholder')}
            />
            {formErrors.message && (
              <p className="text-red-600 text-xs">{formErrors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
  type="submit"
  variant="secondary"
  size="md"
  fullWidth
  loading={isSubmitting}
  disabled={isSubmitting}
>
  {t('contact.submitButton')}
</Button>
        </form>
      </Card>
    </AnimatedSection>
  );
};
