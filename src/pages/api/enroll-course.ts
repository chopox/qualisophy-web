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
        sanitizedData[key] =
          typeof data[key] === "string" ? escapeHTML(data[key]) : data[key];
      }
    }

    // 2. Get the key data from the form (ahora sacados de los datos limpios)
    const { firstName, email, course } = sanitizedData;

    // 3. Server-side validation
    if (!firstName || !email || !course) {
      return new Response(
        JSON.stringify({
          message: "First name, email, and course are required.",
        }),
        { status: 400 },
      );
    }

    // 4. Get the MASTER webhook URL (Same as contact form for Routing)
    const makeWebhookUrl = import.meta.env.MAKE_WEBHOOK_URL;

    if (!makeWebhookUrl) {
      console.error("Error: MAKE_WEBHOOK_URL is not set.");
      return new Response(
        JSON.stringify({ message: "Internal server error." }),
        {
          status: 500,
        },
      );
    }

    // 5. Send ALL form data to Make.com with the 'enrollment' type
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "enrollment", // CLAVE: Esto enviará los datos por la rama de Inscripciones
        ...sanitizedData, // Spread all sanitized form fields
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Make.com Error: ${response.statusText}`);
    }

    // 6. Return success to the frontend
    return new Response(
      JSON.stringify({ message: "Enrollment sent successfully!" }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending to Make.com:", error);
    return new Response(
      JSON.stringify({ message: "Error processing enrollment." }),
      { status: 500 },
    );
  }
};
