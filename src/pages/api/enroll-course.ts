import type { APIRoute } from "astro";

// FUNCIÓN DE SEGURIDAD: Transforma caracteres peligrosos en texto inofensivo (Previene XSS)
const escapeHTML = (str: string) => {
  if (typeof str !== "string") return str;
  return str.replace(/[&<>"'/]/g, (match) => {
    const escapeMap: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;",
    };
    return escapeMap[match];
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // 1. SANITIZACIÓN AUTOMÁTICA DE TODOS LOS CAMPOS
    // Recorremos todo el objeto y limpiamos cualquier texto malicioso
    const sanitizedData: Record<string, any> = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        // No sanitizamos booleanos como privacyAccepted
        sanitizedData[key] =
          typeof data[key] === "string" ? escapeHTML(data[key]) : data[key];
      }
    }

    // 2. Extraemos los campos requeridos para validación del servidor
    const { firstName, email, course, privacyAccepted } = sanitizedData;

    // 3. Validación del lado del servidor
    if (!firstName || !email || !course) {
      return new Response(
        JSON.stringify({
          message: "Nombre, Email y Curso son campos obligatorios.",
        }),
        { status: 400 },
      );
    }

    if (!privacyAccepted) {
      return new Response(
        JSON.stringify({
          message: "Debes aceptar la política de privacidad.",
        }),
        { status: 400 },
      );
    }

    // 4. Validación de Email con Abstract API (REPUTATION API)
    const abstractApiKey = import.meta.env.ABSTRACT_API_KEY;
    if (abstractApiKey) {
      try {
        const validationResponse = await fetch(
          `https://emailreputation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=${encodeURIComponent(email)}`,
        );
        const validationData = await validationResponse.json();

        if (
          validationData.email_deliverability?.status === "undeliverable" ||
          validationData.email_quality?.is_disposable === true ||
          validationData.email_deliverability?.is_format_valid === false
        ) {
          return new Response(
            JSON.stringify({
              message:
                "Por favor, introduce un correo electrónico válido y real.",
            }),
            { status: 400 },
          );
        }
      } catch (validationError) {
        console.error("Fallo silencioso en Abstract API:", validationError);
        // Si la API falla, dejamos continuar el proceso para no bloquear al usuario
      }
    }

    // 5. Obtener la URL MASTER del Webhook de Make
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      console.error("Error: MAKE_WEBHOOK_URL is not set.");
      return new Response(
        JSON.stringify({ message: "Error interno del servidor." }),
        {
          status: 500,
        },
      );
    }

    // 6. Enviar TODOS los datos sanitizados a Make.com
    // Ya no forzamos el type="enrollment" aquí, porque el frontend ya nos manda el type correcto (interest o enrollment)
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...sanitizedData, // Extendemos todo, incluyendo el type dinámico y el nuevo courseName
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Make.com Error: ${response.statusText}`);
    }

    // 7. Retornar éxito al frontend
    return new Response(
      JSON.stringify({ message: "Inscripción enviada correctamente." }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending to Make.com:", error);
    return new Response(
      JSON.stringify({ message: "Error al procesar la inscripción." }),
      { status: 500 },
    );
  }
};
