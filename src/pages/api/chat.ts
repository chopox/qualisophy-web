import type { APIRoute } from "astro";

// LA MAGIA: Importamos el markdown del conocimiento como texto plano
import knowledgeBase from "@/data/qualisophy-knowledge.md?raw";

/**
 * API: Qualisophy Smart Assistant
 * Model: Google Gemini 2.0 Flash (via OpenRouter)
 */
export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const API_KEY = import.meta.env.OPENROUTER_API_KEY;

  if (!API_KEY) {
    console.error("❌ ERROR: Falta OPENROUTER_API_KEY en el .env");
    return new Response(
      JSON.stringify({
        reply: "Error de configuración del servidor. Faltan credenciales.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!message) {
    return new Response(
      JSON.stringify({
        reply: "Hola, soy el asistente de Qualisophy. ¿En qué puedo ayudarte?",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  }

  // --- PERSONALIDAD Y REGLAS DEL BOT ---
  const systemPrompt = `
Eres el Asistente Virtual Oficial y Experto de Qualisophy.
Tu objetivo es informar, orientar a los alumnos y GUÍARLOS por la web.

INSTRUCCIONES DE COMPORTAMIENTO:
1. BASA TODAS TUS RESPUESTAS EXCLUSIVAMENTE en el "CONTEXTO DE CONOCIMIENTO" de abajo.
2. PRECISIÓN EN CURSOS: Si preguntan por un curso, da SIEMPRE: Fecha de inicio, Duración y Precio (destacando el descuento por pronto pago).
3. ENLACES OBLIGATORIOS (MUY IMPORTANTE): SIEMPRE que menciones un curso, un programa de inclusión, o el área de contacto, DEBES proporcionar un enlace directo usando EXACTAMENTE este formato Markdown: [Texto del enlace](URL). Las URLs están en tu base de conocimiento.
   - Ejemplo: "Lo tienes disponible aquí: [Curso Fullstack Development](/learning/dev/fullstack)".
   - Ejemplo: "Puedes leer más en nuestra sección de [Partnership](/partnership)".
4. ESTILO: Usa listas con viñetas (-) para enumerar. Sé directo, amable y profesional. NO escribas bloques gigantes de texto.
5. LÍMITES: Si te preguntan por cursos que NO están en el texto (ej: "¿Tenéis cursos de cocina?"), di amablemente que no dispones de esa formación e invita a contactar a hello@qualisophy.com.

================ CONTEXTO DE CONOCIMIENTO ================
${knowledgeBase}
==========================================================
`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://qualisophy.com", // Opcional, pero recomendado por OpenRouter
          "X-Title": "Qualisophy Chatbot", // Opcional, nombre de tu app en OpenRouter
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // MODELO: Gemini 2.0 Flash (Súper rápido y con contexto gigante)
          model: "google/gemini-2.0-flash-001",
          temperature: 0.1, // Temperatura súper baja para que NO INVENTE NADA y sea fiel al Markdown
          max_tokens: 800,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ Error OpenRouter (${response.status}):`, errorData);
      return new Response(
        JSON.stringify({
          reply:
            "Lo siento, mis sistemas de IA están actualizándose. Por favor, contáctanos en hello@qualisophy.com.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    let reply =
      data.choices?.[0]?.message?.content ||
      "No he podido procesar tu solicitud correctamente.";

    // Limpieza de formato: quitamos negritas y asteriscos, pero NUNCA modificamos corchetes ni paréntesis de los enlaces.
    reply = reply
      .replace(/\*\*/g, "") // Quita negritas si no se renderizan bien en tu chat frontend
      .replace(/#{1,6} /g, "") // Quita los # de los encabezados markdown en el output
      .trim();

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error CRÍTICO de conexión:", error);
    return new Response(
      JSON.stringify({ reply: "Error interno del sistema de chat." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
