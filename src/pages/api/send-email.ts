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

    // 1. Obtenemos los datos y los SANITIZAMOS inmediatamente
    const name = escapeHTML(data.name || "");
    const email = escapeHTML(data.email || "");
    const message = escapeHTML(data.message || "");
    const source = escapeHTML(data.source || "");
    const type = escapeHTML(data.type || "");

    // 2. Validación Simple
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Faltan campos requeridos." }),
        { status: 400 },
      );
    }

    // 3. Validación de Email con Abstract API (REPUTATION API)
    const abstractApiKey = import.meta.env.ABSTRACT_API_KEY;

    if (abstractApiKey) {
      try {
        const validationResponse = await fetch(
          `https://emailreputation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=${encodeURIComponent(email)}`,
        );
        const validationData = await validationResponse.json();

        // === CHIVATO PARA LA TERMINAL ===
        console.log(
          "🔍 Respuesta de Abstract REPUTATION API para el email:",
          email,
        );
        console.log(validationData);
        // ================================

        if (validationData.error) {
          console.error(
            "❌ Error interno de Abstract API:",
            validationData.error.message,
          );
        }
        // NUEVO ESCUDO ADAPTADO AL JSON DE REPUTATION API
        else if (
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
        console.error(
          "❌ Fallo de conexión con Abstract API:",
          validationError,
        );
      }
    }

    // 4. Obtener URL del entorno
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      console.error("Error: MAKE_WEBHOOK_URL no está configurada.");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor." }),
        { status: 500 },
      );
    }

    // 5. Enviar a Make
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type || "contact",
        name,
        email,
        message,
        source: source || "Formulario General",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Error de Make.com: ${response.statusText}`);
    }

    return new Response(
      JSON.stringify({ message: "Mensaje enviado con éxito." }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al enviar a Make.com:", error);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud." }),
      { status: 500 },
    );
  }
};
