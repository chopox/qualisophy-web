import { useState, useEffect } from "react";
import { useTranslations } from "@/hooks/useTranslations";
import { validateEnrollmentForm } from "@/lib/validation";
import { Button } from "@/components/react/shared/Button";
import { Card } from "@/components/react/shared/Card";

interface Course {
  id: string;
  name: string;
}

interface CourseEnrollmentFormProps {
  courses: Course[];
  initialCourseId?: string;
  enrollmentType?: string;
}

export interface EnrollmentFormDataExtended {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  address: string;
  zipCode: string;
  city: string;
  province: string;
  course: string;
  courseName: string; // AÑADIDO: Para enviar el nombre bonito a Make
  privacyAccepted: boolean;
  type: string;
}

const initialFormDataBase: Omit<EnrollmentFormDataExtended, "type"> = {
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
  courseName: "", // Inicializado vacío
  privacyAccepted: false,
};

export const CourseEnrollmentForm = ({
  courses,
  initialCourseId = "",
  enrollmentType = "enrollment",
}: CourseEnrollmentFormProps) => {
  // Encontrar el nombre inicial si hay un curso preseleccionado
  const initialCourseName = initialCourseId
    ? courses.find((c) => c.id === initialCourseId)?.name || ""
    : "";

  const [formData, setFormData] = useState<EnrollmentFormDataExtended>({
    ...initialFormDataBase,
    course: initialCourseId || "",
    courseName: initialCourseName,
    type: enrollmentType,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isPreSelected, setIsPreselected] = useState(
    !!initialCourseId && courses.some((c) => c.id === initialCourseId),
  );

  const t = useTranslations();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const courseFromUrl = urlParams.get("course");
    const typeFromUrl = urlParams.get("type") || "enrollment";

    if (
      courseFromUrl &&
      courseFromUrl !== initialCourseId &&
      courses.some((c) => c.id === courseFromUrl)
    ) {
      const courseNameFromUrl =
        courses.find((c) => c.id === courseFromUrl)?.name || "";
      setFormData((prev) => ({
        ...prev,
        course: courseFromUrl,
        courseName: courseNameFromUrl,
        type: typeFromUrl,
      }));
      setIsPreselected(true);
    }
  }, [courses, initialCourseId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Si el campo modificado es el select de cursos, actualizamos también el courseName
      if (name === "course") {
        const selectedCourseObj = courses.find((c) => c.id === value);
        newData.courseName = selectedCourseObj ? selectedCourseObj.name : "";
      }

      return newData;
    });

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.privacyAccepted) {
      setFormErrors({
        general: "Debes aceptar la Política de Privacidad de Qualisophy.",
      });
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});
    setFormSuccess(false);

    try {
      const validation = validateEnrollmentForm({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dni: formData.dni,
        address: formData.address,
        zipCode: formData.zipCode,
        city: formData.city,
        province: formData.province,
        course: formData.course,
      });

      if (validation.success) {
        const response = await fetch("/api/enroll-course", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error del servidor");
        }

        setFormSuccess(true);
        setFormData({
          ...initialFormDataBase,
          course: isPreSelected ? formData.course : "",
          courseName: isPreSelected ? formData.courseName : "",
          type: enrollmentType,
        });

        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        setFormErrors(
          validation.errors || {
            general: "Error de validación en el formulario.",
          },
        );
      }
    } catch (error: any) {
      console.error("Submission error:", error);
      setFormErrors({
        general: error.message || "Hubo un error procesando tu solicitud.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClasses = (
    fieldName: keyof EnrollmentFormDataExtended | string,
  ) => {
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
      {formSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="text-green-800 text-sm font-medium">
              {enrollmentType === "interest"
                ? "¡Genial! Hemos anotado tu interés. Te avisaremos en cuanto haya novedades."
                : t("enrollment.successMessage")}
            </span>
          </div>
        </div>
      )}

      {formErrors.general && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <div className="flex items-center">
            <span className="text-red-800 text-sm font-medium">
              {formErrors.general}
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              Nombre <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={getInputClasses("firstName")}
              placeholder="Introduce tu nombre"
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
              Apellidos <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={getInputClasses("lastName")}
              placeholder="Introduce tus apellidos"
            />
            {formErrors.lastName && (
              <p className="text-red-600 text-xs mt-2">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={getInputClasses("email")}
              placeholder="tu@email.com"
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
              Teléfono <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={getInputClasses("phone")}
              placeholder="Ej: 600111222"
            />
            {formErrors.phone && (
              <p className="text-red-600 text-xs mt-2">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dni"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              DNI / NIE <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className={getInputClasses("dni")}
              placeholder="Ej: 12345678X"
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
              Código Postal <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={getInputClasses("zipCode")}
              placeholder="Ej: 29001"
              maxLength={5}
            />
            {formErrors.zipCode && (
              <p className="text-red-600 text-xs mt-2">{formErrors.zipCode}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            Dirección <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className={getInputClasses("address")}
            placeholder="Ej: Calle Principal, 2, 1A"
          />
          {formErrors.address && (
            <p className="text-red-600 text-xs mt-2">{formErrors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
            >
              Municipio <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={getInputClasses("city")}
              placeholder="Ej: Málaga"
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
              Provincia <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className={getInputClasses("province")}
              placeholder="Ej: Málaga"
            />
            {formErrors.province && (
              <p className="text-red-600 text-xs mt-2">{formErrors.province}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="course"
            className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5"
          >
            Curso <span className="text-red-600">*</span>
          </label>
          {isPreSelected ? (
            <>
              <div className="w-full px-3 py-2 border border-slate-300 rounded-md bg-gray-50 text-sm text-slate-700">
                {formData.courseName || "Curso Seleccionado"}
              </div>
              <input type="hidden" name="course" value={formData.course} />
              {/* Enviamos también el nombre bonito oculto */}
              <input
                type="hidden"
                name="courseName"
                value={formData.courseName}
              />
            </>
          ) : (
            <>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className={getInputClasses("course")}
              >
                <option value="" disabled>
                  Selecciona un curso
                </option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
              {/* Enviamos también el nombre bonito oculto */}
              <input
                type="hidden"
                name="courseName"
                value={formData.courseName}
              />
            </>
          )}
          {formErrors.course && (
            <p className="text-red-600 text-xs mt-2">{formErrors.course}</p>
          )}
        </div>

        <div className="flex items-start space-x-3 pt-4">
          <div className="flex h-5 items-center">
            <input
              type="checkbox"
              id="privacyAccepted"
              name="privacyAccepted"
              required
              checked={formData.privacyAccepted}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
            />
          </div>
          <label
            htmlFor="privacyAccepted"
            className="text-sm leading-5 text-slate-600 cursor-pointer select-none"
          >
            He leído y acepto la Política de protección de datos de Qualisophy.{" "}
            <span className="text-red-600">*</span>
          </label>
        </div>

        <Button
          type="submit"
          variant={enrollmentType === "interest" ? "secondary" : "primary"}
          size="md"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting || !formData.privacyAccepted}
          className="mt-2"
        >
          {isSubmitting
            ? "Enviando..."
            : enrollmentType === "interest"
              ? "Avísame de novedades"
              : "Inscríbete"}
        </Button>

        <p className="font-bold border-b border-slate-100 pb-1 mb-2 text-slate-800">
          Política de Protección de Datos
        </p>
        <p className="text-justify text-[11px] leading-relaxed text-slate-500 mb-2">
          Los datos de carácter personal facilitados serán tratados por{" "}
          <strong>Qualisophy SL con CIF B16444960</strong> de acuerdo con lo
          dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del
          Consejo, de 27 de abril de 2016, relativo a la protección de las
          personas físicas en lo que respecta al tratamiento de datos personales
          y a la libre circulación de los mismos.
        </p>
        <p className="text-justify text-[11px] leading-relaxed text-slate-500 mb-2">
          Los datos facilitados serán tratados por el tiempo necesario para el
          cumplimiento de las finalidades objeto de tratamiento, mientras no se
          oponga al mismo y por el tiempo necesario para el cumplimiento de las
          obligaciones legales del responsable.
        </p>
        <p className="text-justify text-[11px] leading-relaxed text-slate-500">
          Le recordamos que tiene derecho a ejercer los derechos de acceso,
          rectificación, cancelación, limitación, oposición y portabilidad de
          manera gratuita mediante correo electrónico a:{" "}
          <strong>hello@qualisophy.com</strong> y de solicitar la tutela de la
          Agencia Española de Protección de Datos en{" "}
          <strong>www.aepd.es</strong>.
        </p>
      </form>
    </Card>
  );
};
