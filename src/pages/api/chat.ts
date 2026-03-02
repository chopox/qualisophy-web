import type { APIRoute } from "astro";
import knowledgeBase from "@/data/qualisophy-knowledge.md?raw";

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const history = Array.isArray(body.history) ? body.history : [];
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

  if (history.length === 0) {
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
Tu objetivo es informar, orientar a los alumnos y GUÍARLOS por la web. Tienes memoria de la conversación.

INSTRUCCIONES CRÍTICAS:
1. PERSONALIZACIÓN: Si el usuario te dice su nombre en algún momento de la conversación, recuérdalo y llámale por su nombre de forma natural y cercana.
2. BASA TODAS TUS RESPUESTAS EXCLUSIVAMENTE en el "CONTEXTO DE CONOCIMIENTO" de abajo.
3. RUTAS B2C vs B2B: Fíjate bien si el usuario pregunta por cursos para PARTICULARES o para EMPRESAS (In-Company), ya que tienen precios y URLs distintas.
4. ENLACES (REGLA DE ORO): SIEMPRE que menciones un curso, página o recomiendes contactar, DEBES incluir su enlace. 
   - El formato Markdown OBLIGATORIO es: [Texto visible](URL).
   - EJEMPLO CORRECTO: "Puedes ir a la [página de contacto](/contact)".
   - EJEMPLO CORRECTO: "Conoce nuestro pilar de [Neurodivergencia](/neurodivergence)".
   - PROHIBIDO: Nunca escribas enlaces rotos o sueltos como [/contact], (/contact) o [/neurodivergence]. Tienen que llevar SIEMPRE texto entre los corchetes y la URL entre paréntesis.
5. ESTILO: Usa listas con viñetas (-) para enumerar. Sé directo, amable y profesional. NO escribas bloques gigantes de texto.
6. PRECIOS: Si en la base de datos el precio dice "Consultar", dile al usuario que depende de la empresa y dirígelo a la [página de contacto](/contact). Si pone un precio exacto, dáselo.
7. CERO ALUCINACIONES: Tienes PROHIBIDO inventar información. Si el usuario te pregunta por la dirección física, dásela exactamente como aparece en el contexto (Calle Esteban Salazar Chapela 11, Málaga). Si te pregunta algo que no está en el contexto, di "No dispongo de esa información" y ofrécele el enlace a la [página de contacto](/contact).
8. PROMOCIONA EL BLOG Y LA NEWSLETTER: Si el usuario busca información general, quiere aprender por su cuenta, no está seguro de qué curso hacer, o simplemente le interesa nuestra labor, invítale a suscribirse a nuestra Newsletter (disponible en la web) o a leer nuestros artículos en el [Blog de Qualisophy](/blog).

================ CONTEXTO DE CONOCIMIENTO ================
${knowledgeBase}
==========================================================
`;

  const apiMessages = [{ role: "system", content: systemPrompt }, ...history];

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "HTTP-Referer": "https://qualisophy.com",
          "X-Title": "Qualisophy Chatbot",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          temperature: 0.15,
          max_tokens: 800,
          messages: apiMessages,
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

    // 1. Limpieza de formato base
    reply = reply
      .replace(/\*\*/g, "")
      .replace(/#{1,6} /g, "")
      .trim();

    // 2. SALVAVIDAS ANTI-ENLACES ROTOS:
    // Si la IA escribe [/neurodivergence], lo forzamos a [Ver más detalles](/neurodivergence)
    reply = reply.replace(
      /\[(\/[a-zA-Z0-9-_\/]+)\](?!\()/g,
      "[Ver más detalles]($1)",
    );

    // Si la IA escribe (/neurodivergence) suelto, lo forzamos a [Ver más detalles](/neurodivergence)
    reply = reply.replace(
      /(?<!\])\((\/[a-zA-Z0-9-_\/]+)\)/g,
      "[Ver más detalles]($1)",
    );

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
