import type { APIRoute } from "astro";

/**
 * API: Qualisophy Smart Assistant
 * Model: Google Gemini 2.0 Flash (via OpenRouter)
 * Estado: GRATUITO / Low Cost
 * Capacidad: Contexto masivo (no olvida datos).
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
    console.error("❌ ERROR: Falta OPENROUTER_API_KEY en .env");
    return new Response(
      JSON.stringify({ reply: "Error de configuración del servidor." }),
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

  // --- 🧠 CONTEXTO CEREBRAL (Extraído de tus archivos) ---
  const websiteContent = `
INFORMACIÓN CORPORATIVA:
- Empresa: Qualisophy.
- Misión: Formación tecnológica práctica e inclusión laboral.
- Ubicación: Calle Esteban Salazar Chapela 11, Málaga.
- Contacto: hello@qualisophy.com | (+34) 912 345 678.

--- 1. LOS 4 PILARES DE INCLUSIÓN DE QUALISOPHY ---
(Si preguntan por inclusión, explica estos 4 puntos):
1. TALENTO NEURODIVERGENTE:
   - Foco: Personas con Autismo (TEA) y TDAH.
   - Dato: 85% de desempleo en este colectivo.
   - Estrategia: Formación Dual (Teoría + Práctica) y adaptación de puestos para potenciar su foco y lógica.
   
2. TALENTO MIGRANTE:
   - Foco: Profesionales extranjeros cualificados.
   - Problema: "Brain Waste" (54% sobrecualificación).
   - Estrategia: Formación Puente para homologar competencias y validar experiencia previa en el mercado local.

3. RIESGO DE EXCLUSIÓN (IMPACTO SOCIAL):
   - Foco: Colectivos vulnerables y parados de larga duración.
   - Estrategia: Capacitación digital intensiva y alfabetización tecnológica para recuperar la autonomía económica.

4. RECICLAJE LABORAL (RESKILLING / SENIOR +45):
   - Foco: Profesionales de otros sectores (Finanzas, Marketing, Hostelería) que quieren pasar a Tech.
   - Valor: Aprovechamos sus "Soft Skills" previas (gestión, liderazgo) y les enseñamos la tecnología.

--- 2. CATÁLOGO DE CURSOS 2025 (Datos Reales) ---

[ÁREA QA & TESTING]
- "Testing y Calidad del Software" (Principiante): 17 Feb | 40h | 497€ (Oferta 447€). Instructor: Fran Guerrero.
- "BDD y Automatización E2E" (Intermedio): 10 Mar | 30h | 420€ (Oferta 380€). Stack: Cucumber, Cypress.
- "Coding and DevOps for Testers" (Avanzado): 3 Mar | 48h | 540€ (Oferta 490€). Stack: JS, Git, Jenkins/GitLab.
- "Automatización QA" (Enterprise): 17 Feb | 45h | 547€ (Oferta 497€). Stack: Selenium, Playwright.
- "Gestión de Calidad (TQM)" (Management): 24 Mar | 25h | 450€ (Oferta 395€).

[ÁREA DESARROLLO]
- "Fullstack Developer (MERN)" (Bootcamp): 3 Mar | 120h | 1.200€ (Oferta 995€).
- "Frontend con React" (Intermedio): 10 Mar | 60h | 650€ (Oferta 595€).
- "Backend con Node.js" (Intermedio): 24 Mar | 50h | 550€ (Oferta 495€).
- "Java & Spring Boot" (Avanzado): 7 Abr | 60h | 695€ (Oferta 625€).

[ÁREA MICROSOFT & DATA]
- "Power BI Dashboards": 10 Mar | 30h | 450€ (Oferta 395€).
- "Data Analytics & SQL": 17 Mar | 40h | 495€ (Oferta 450€).
- "Excel Avanzado": A demanda | 25h | 350€ (Oferta 299€).
- "Power Automate": A demanda | 15h | 295€ (Oferta 250€).

[ÁREA PROJECT MANAGEMENT]
- "Certificación Scrum Master": 22 Mar | 16h (Fin de semana) | 350€ (Oferta 299€).
- "Product Owner": 5 Abr | 20h | 395€ (Oferta 350€).
- "Gestión Ágil (Kanban)": A demanda | 12h | 295€ (Oferta 250€).
- "Liderazgo de Equipos": A demanda | 20h | 450€ (Oferta 395€).

--- 3. SERVICIOS PARA EMPRESAS (PARTNERSHIP) ---
- Hiring Partner: Acceso prioritario a bolsa de talento validado (Junior/Mid) con "fit cultural" asegurado.
- Upskilling Ad-hoc: Formación a medida (In-Company) para actualizar equipos.
- Voluntariado Corporativo: Empleados senior de la empresa mentorizan a alumnos (RSC).
- Sponsoring: Becas para colectivos vulnerables.
`;

  // --- PERSONALIDAD DEL BOT ---
  const systemPrompt = `
Eres el Asistente Virtual Experto de Qualisophy.
Tu objetivo es informar con precisión y profesionalidad.

INSTRUCCIONES DE COMPORTAMIENTO:
1. PRECISIÓN EN DATOS: Si preguntan por un curso, da SIEMPRE: Fecha de inicio, Precio y Duración. (Usa los datos de arriba).
2. PILARES DE INCLUSIÓN: Si preguntan "qué hacéis en inclusión" o "pilares", menciona los 4 (Neurodivergencia, Migrante, Exclusión Social y Reskilling) con una breve frase de cada uno.
3. ESTILO: Usa listas con viñetas (•) para enumerar cursos o servicios. Es más fácil de leer.
4. LÍMITES: Si te preguntan algo que NO está en el texto (ej: "¿Tenéis cursos de cocina?"), di amablemente que no dispones de esa formación.
5. CIERRE: Invita siempre a "Agendar una reunión" o "Escribir a contacto" si el usuario parece interesado.

CONTEXTO:
${websiteContent}
`;

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
          // MODELO: Gemini 2.0 Flash (Gratuito en OpenRouter actualmente, muy inteligente y rápido)
          // Si este dejara de ser gratis, cambia a "mistralai/mistral-7b-instruct"
          model: "google/gemini-2.0-flash-001",
          temperature: 0.1, // Baja temperatura = Máxima fidelidad a los datos
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
            "Lo siento, mi servicio de IA está temporalmente no disponible. Por favor, contáctanos por email.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = await response.json();
    let reply =
      data.choices?.[0]?.message?.content ||
      "No he podido generar una respuesta.";

    // Limpieza de formato
    reply = reply
      .replace(/\*\*/g, "")
      .replace(/#{1,6} /g, "")
      .trim();

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error CRÍTICO:", error);
    return new Response(
      JSON.stringify({ reply: "Error interno del sistema." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
