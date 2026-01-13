import { z } from "zod";
import { getCurrentLanguage, ui } from '@/i18n/ui';

// Get current translations object
function getValidationMessages() {
  const lang = getCurrentLanguage();
  return ui[lang];
}

// Contact form validation schema
export function getContactFormSchema() {
  const t = getValidationMessages();
  
  return z.object({
    name: z
      .string()
      .min(2, t['validation.nameMin'])
      .max(100, t['validation.nameMax']),

    email: z
      .string()
      .email(t['validation.emailInvalid'])
      .min(5, t['validation.emailMin'])
      .max(100, t['validation.emailMax']),

    message: z
      .string()
      .min(10, t['validation.messageMin'])
      .max(1000, t['validation.messageMax'])
      .regex(/^[^<>]*$/, t['validation.messageInvalidChars']),
  });
}

// Enrollment form validation schema
export function getEnrollmentFormSchema() {
  const lang = getCurrentLanguage();
  const t = ui[lang];

  // Province validation must be required for Spanish, optional for French.
  // Use preprocess to trim strings and treat empty string as undefined when optional (common with HTML forms).
  const provinceSchema = (() => {
    if (lang === 'fr') {
      // French: optional field
      return z.preprocess((val) => {
        if (typeof val === 'string') {
          const trimmed = val.trim();
          return trimmed === '' ? undefined : trimmed;
        }
        return val;
      }, z.string().optional());
    }

    // Default (e.g. 'es'): required with minimum length
    return z.preprocess((val) => {
      if (typeof val === 'string') return val.trim();
      return val;
    }, z.string().min(2, t['validation.provinceMin']));
  })();

  return z.object({
    // Personal Details
    firstName: z
      .string()
      .min(2, t['validation.firstNameMin'])
      .max(100, t['validation.firstNameMax']),
    lastName: z
      .string()
      .min(2, t['validation.lastNameMin'])
      .max(100, t['validation.lastNameMax']),
    email: z
      .string()
      .email(t['validation.emailInvalid'])
      .min(5, t['validation.emailMin'])
      .max(100, t['validation.emailMax']),
    phone: z
      .string()
      .min(9, t['validation.phoneMin'])
      .max(13, t['validation.phoneMax']),
    dni: z
      .string()
      .min(8, t['validation.dniMin'])
      .max(10, t['validation.dniMax']),

    // Address Details
    address: z
      .string()
      .min(5, t['validation.addressMin']),
    zipCode: z.string().length(5, t['validation.zipCode']),
    city: z.string().min(2, t['validation.cityMin']),
    province: provinceSchema,

    // Course Selection
    course: z.string().min(1, t['validation.courseRequired']),
  });
}

// Types
export type ContactFormData = z.infer<ReturnType<typeof getContactFormSchema>>;
export type EnrollmentFormData = z.infer<ReturnType<typeof getEnrollmentFormSchema>>;

// Validation function for contact form
export function validateContactForm(
  data: unknown
):
  | { success: true; data: ContactFormData }
  | { success: false; errors: Record<string, string> } {
  try {
    const schema = getContactFormSchema();
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      (error as z.ZodError).errors.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    const t = getValidationMessages();
    return {
      success: false,
      errors: { general: t['validation.unknownError'] },
    };
  }
}

// Validation function for enrollment form
export function validateEnrollmentForm(
  data: unknown
):
  | { success: true; data: EnrollmentFormData }
  | { success: false; errors: Record<string, string> } {
  try {
    const schema = getEnrollmentFormSchema();
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      (error as z.ZodError).errors.forEach((err: z.ZodIssue) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      return { success: false, errors };
    }
    const t = getValidationMessages();
    return {
      success: false,
      errors: { general: t['validation.unknownError'] },
    };
  }
}