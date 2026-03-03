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

    // 1. URL de tu Webhook de Make (Usamos la variable de entorno por seguridad)
    const MAKE_WEBHOOK_URL = import.meta.env.MAKE_WEBHOOK_URL;

    if (!MAKE_WEBHOOK_URL) {
      console.error("Error: MAKE_WEBHOOK_URL is not set.");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor." }),
        { status: 500 },
      );
    }

    // 2. Preparamos los datos para Make y SANITIZAMOS para evitar ataques XSS
    // Añadimos type: 'partnership' para que el Router sepa qué hacer
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

    // Validación básica para evitar envíos vacíos
    if (!payload.name || !payload.email) {
      return new Response(
        JSON.stringify({ message: "Faltan campos requeridos." }),
        { status: 400 },
      );
    }

    // 3. Enviamos a Make
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
    return new Response(JSON.stringify({ message: "Error del servidor" }), {
      status: 500,
    });
  }
};
