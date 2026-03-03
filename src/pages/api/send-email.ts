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
    // Esto asegura que ningún código malicioso pase a nuestro sistema o correos
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

    // 3. Obtener URL del entorno
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      console.error("Error: MAKE_WEBHOOK_URL no está configurada.");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor." }),
        { status: 500 },
      );
    }

    // 4. Enviar a Make (Incluyendo el tipo específico para el enrutamiento)
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // Usamos el 'type' que viene del formulario (ej: 'partnership').
        // Si no viene nada, usamos 'contact' por defecto.
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
