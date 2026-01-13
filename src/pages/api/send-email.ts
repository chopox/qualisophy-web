import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // 1. Get the data (now including 'source')
    // If 'source' is not provided, use a default value.
    const { name, email, message, source } = data;

    // 2. Simple Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ message: "Faltan campos requeridos." }),
        { status: 400 }
      );
    }

    // 3. Get environment url
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      console.error("Error: MAKE_WEBHOOK_URL no está configurada.");
      return new Response(
        JSON.stringify({ message: "Error de configuración del servidor." }),
        { status: 500 }
      );
    }

    // 4. Send to Make (Including the source)
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        source: source || "Formulario General", // Fallback
        date: new Date().toISOString(), // Useful for logs
      }),
    });

    if (!response.ok) {
      throw new Error(`Error de Make.com: ${response.statusText}`);
    }

    return new Response(
      JSON.stringify({ message: "Mensaje enviado con éxito." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al enviar a Make.com:", error);
    return new Response(
      JSON.stringify({ message: "Error al procesar la solicitud." }),
      { status: 500 }
    );
  }
};
