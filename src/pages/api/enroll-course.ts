import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // 1. Get the key data from the form
    const { firstName, email, course } = data;

    // 2. Server-side validation
    if (!firstName || !email || !course) {
      return new Response(
        JSON.stringify({
          message: "First name, email, and course are required.",
        }),
        { status: 400 },
      );
    }

    // 3. Get the MASTER webhook URL (Same as contact form for Routing)
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

    // 4. Send ALL form data to Make.com with the 'enrollment' type
    const response = await fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "enrollment", // CLAVE: Esto enviará los datos por la rama de Inscripciones
        ...data, // Spread all form fields (firstName, lastName, dni, address, etc.)
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Make.com Error: ${response.statusText}`);
    }

    // 5. Return success to the frontend
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
