import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    // 1. URL de tu Webhook de Make (LA MISMA QUE USASTE PARA CONTACTO)
    // Pégala aquí abajo
    const MAKE_WEBHOOK_URL = "AQUI_PEGA_TU_WEBHOOK_URL_DE_MAKE";

    // 2. Preparamos los datos para Make
    // Añadimos type: 'partnership' para que el Router sepa qué hacer
    const payload = {
      type: "partnership",
      name: body.name,
      email: body.email,
      company: body.company,
      position: body.position,
      interest: body.interest,
      message: body.message,
      date: new Date().toISOString(),
    };

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
