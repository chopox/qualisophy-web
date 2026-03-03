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
    const body = await request.json();

    // 1. URL de tu Webhook de Make
    const MAKE_WEBHOOK_URL = import.meta.env.MAKE_WEBHOOK_URL;

    if (!MAKE_WEBHOOK_URL) {
      console.error("Error: MAKE_WEBHOOK_URL is not set.");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor." }),
        { status: 500 },
      );
    }

    // 2. Sanitizamos y preparamos
    const payload = {
      type: "partnership",
      name: escapeHTML(body.name || ""),
      email: escapeHTML(body.email || ""),
      company: escapeHTML(body.company || ""),
      position: escapeHTML(body.position || ""),
      interest: escapeHTML(body.interest || ""),
      message: escapeHTML(body.message || ""),
      date: new Date().toISOString(),
    };

    if (!payload.name || !payload.email) {
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
          `https://emailreputation.abstractapi.com/v1/?api_key=${abstractApiKey}&email=${encodeURIComponent(payload.email)}`,
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
                "Por favor, introduce un correo electrónico corporativo o válido.",
            }),
            { status: 400 },
          );
        }
      } catch (validationError) {
        console.error("Fallo silencioso en Abstract API:", validationError);
      }
    }

    // 4. Enviamos a Make
    const response = await fetch(MAKE_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ message: "Enviado con éxito" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Error en Make" }), {
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error del servidor" }), {
      status: 500,
    });
  }
};
