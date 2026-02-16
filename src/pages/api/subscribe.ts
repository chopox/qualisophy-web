import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const API_KEY = import.meta.env.BREVO_API_KEY;
  const LIST_ID = Number(import.meta.env.BREVO_LIST_ID);

  if (!API_KEY || !LIST_ID) {
    return new Response(
      JSON.stringify({
        message: "Error de configuración del servidor (Faltan credenciales).",
      }),
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ message: "Por favor, introduce un email válido." }),
        { status: 400 },
      );
    }

    // Llamada a la API de Brevo
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID],
        updateEnabled: true, // Si ya existe, actualiza sus datos en lugar de dar error
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Manejar errores específicos de Brevo
      return new Response(
        JSON.stringify({
          message:
            data.message || "Hubo un error al suscribirte. Inténtalo de nuevo.",
        }),
        { status: response.status },
      );
    }

    return new Response(
      JSON.stringify({
        message: "¡Suscripción exitosa! Gracias por unirte.",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Error interno del servidor." }),
      { status: 500 },
    );
  }
};
