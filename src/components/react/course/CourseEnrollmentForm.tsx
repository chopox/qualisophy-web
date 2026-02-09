import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";

// Import the validation function and the new FormData type
import {
  validateEnrollmentForm,
  type EnrollmentFormData,
} from "@/lib/validation";
import { Button } from "@/components/react/shared/Button";
import { Card } from "@/components/react/shared/Card";

interface Course {
  id: string;
  name: string;
}

interface CourseEnrollmentFormProps {
  courses: Course[];
  initialCourseId?: string; // NUEVA PROP: Recibe el ID del curso desde Astro
}

const initialFormDataBase = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dni: "",
  address: "",
  zipCode: "",
  city: "",
  province: "",
  course: "",
};

export const CourseEnrollmentForm = ({
  courses,
  initialCourseId = "",
}: CourseEnrollmentFormProps) => {
  // Inicializamos el estado usando la prop 'initialCourseId' si existe
  const [formData, setFormData] = useState<EnrollmentFormData>({
    ...initialFormDataBase,
    course: initialCourseId || "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Establecemos 'isPreSelected' a true si viene un ID válido
  const [isPreSelected, setIsPreselected] = useState(
    !!initialCourseId && courses.some((c) => c.id === initialCourseId),
  );

  const t = useTranslations();

  // useEffect se mantiene como respaldo para navegación en el cliente puro
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const courseFromUrl = urlParams.get("course");

    // Solo actualizamos si es diferente al inicial y es válido
    if (
      courseFromUrl &&
      courseFromUrl !== initialCourseId &&
      courses.some((c) => c.id === courseFromUrl)
    ) {
      setFormData((prev) => ({ ...prev, course: courseFromUrl }));
      setIsPreselected(true);
    }
  }, [courses, initialCourseId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});
    setFormSuccess(false);

    try {
      // 1. Validate form data
      const validation = validateEnrollmentForm(formData);

      if (validation.success) {
        // 2. Send data to API
        const response = await fetch("/api/enroll-course", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Server error");
        }

        // 3. Handle success
        setFormSuccess(true);
        // Reset form but keep the course if preselected
        setFormData({
          ...initialFormDataBase,
          course: isPreSelected ? formData.course : "",
        });

        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormErrors(validation.errors || { general: "Validation error" });
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setFormErrors({ general: error.message || "Error processing the form" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = (fieldName: keyof EnrollmentFormData | string) => {
    const baseClasses =
      "w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 text-sm bg-white";
    const errorClasses = "border-red-300 focus:ring-red-500";
    const normalClasses = "border-slate-300";

    const hasError = Object.prototype.hasOwnProperty.call(
      formErrors,
      fieldName,
    );

    return `${baseClasses} ${hasError ? errorClasses : normalClasses}`;
  };

  return (
    <Card>
      {/* Success Message */}
      {formSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="text-green-800 text-sm font-medium">
              {t("enrollment.successMessage")}
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

      {/* Enrollment Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.firstNameLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={getInputClasses("firstName")}
              placeholder={t("enrollment.firstNamePlaceholder")}
            />
            {formErrors.firstName && (
              <p className="text-red-600 text-xs mt-2">
                {formErrors.firstName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.lastNameLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={getInputClasses("lastName")}
              placeholder={t("enrollment.lastNamePlaceholder")}
            />
            {formErrors.lastName && (
              <p className="text-red-600 text-xs mt-2">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.emailLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={getInputClasses("email")}
              placeholder={t("enrollment.emailPlaceholder")}
            />
            {formErrors.email && (
              <p className="text-red-600 text-xs mt-2">{formErrors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.phoneLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={getInputClasses("phone")}
              placeholder={t("enrollment.phonePlaceholder")}
            />
            {formErrors.phone && (
              <p className="text-red-600 text-xs mt-2">{formErrors.phone}</p>
            )}
          </div>
        </div>

        {/* Row 3: DNI & Zip Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dni"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.dniLabel")} <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className={getInputClasses("dni")}
              placeholder={t("enrollment.dniPlaceholder")}
            />
            {formErrors.dni && (
              <p className="text-red-600 text-xs mt-2">{formErrors.dni}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.zipCodeLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={getInputClasses("zipCode")}
              placeholder={t("enrollment.zipCodePlaceholder")}
              maxLength={5}
            />
            {formErrors.zipCode && (
              <p className="text-red-600 text-xs mt-2">{formErrors.zipCode}</p>
            )}
          </div>
        </div>

        {/* Row 4: Address */}
        <div>
          <label
            htmlFor="address"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            {t("enrollment.addressLabel")}{" "}
            <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={getInputClasses("address")}
            placeholder={t("enrollment.addressPlaceholder")}
          />
          {formErrors.address && (
            <p className="text-red-600 text-xs mt-2">{formErrors.address}</p>
          )}
        </div>

        {/* Row 5: City & Province */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.cityLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={getInputClasses("city")}
              placeholder={t("enrollment.cityPlaceholder")}
            />
            {formErrors.city && (
              <p className="text-red-600 text-xs mt-2">{formErrors.city}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="province"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              {t("enrollment.provinceLabel")}{" "}
              <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className={getInputClasses("province")}
              placeholder={t("enrollment.provincePlaceholder")}
            />
            {formErrors.province && (
              <p className="text-red-600 text-xs mt-2">{formErrors.province}</p>
            )}
          </div>
        </div>

        {/* Row 6: Course Selection */}
        <div>
          <label
            htmlFor="course"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            {t("enrollment.courseLabel")}{" "}
            <span className="text-red-600">*</span>
          </label>

          {isPreSelected ? (
            // Display as static text if pre-selected
            <>
              <div className="w-full px-3 py-2 border border-slate-300 rounded-md bg-gray-50 text-sm text-slate-700">
                {courses.find((c) => c.id === formData.course)?.name ||
                  t("enrollment.coursePreselected")}
              </div>
              <input type="hidden" name="course" value={formData.course} />
            </>
          ) : (
            // Display as dropdown if not pre-selected
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className={getInputClasses("course")}
            >
              <option value="">{t("enrollment.courseSelectDefault")}</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          )}

          {formErrors.course && (
            <p className="text-red-600 text-xs mt-2">{formErrors.course}</p>
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
          {t("enrollment.submitButton")}
        </Button>
      </form>
    </Card>
  );
};
