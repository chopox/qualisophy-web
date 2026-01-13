import type { APIRoute } from "astro";

/**
 * API: Qualisophy Virtual Assistant
 * Stable version - October 2025
 *
 * Features:
 *  - Connects to the OpenRouter API using the Mistral 7B Instruct model.
 *  - Uses a contextual prompt with real Qualisophy information.
 *  - Cleans up defective responses (<s>, [OST], Markdown, etc.).
 *  - Provides an alternative answer when the AI does not understand.
 *  - Avoids text truncation and maintains a natural, professional tone.
 */

export const POST: APIRoute = async ({ request }) => {
  let body: any;
  // --- Safe capture of the request body ---
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const API_KEY = import.meta.env.OPENROUTER_API_KEY;

  // --- Development mode (no key configured) ---
  if (!API_KEY) {
    return new Response(
      JSON.stringify({
        reply: `Modo desarrollo activo. Recibí el mensaje: "${message}".`,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }

  // --- Static website context ---

  const websiteContent = `
QUALISOPHY
Formación práctica, consultoría personalizada y oportunidades reales de crecimiento.

📘 CURSO: Testing y Calidad del Software
- Inicio: 17 de Febrero de 2025
- Duración: 40 horas (7 semanas)
- Horario: Lunes y Miércoles / 18:00 - 21:00
- Precio: 497 € (447 € con inscripción anticipada)
- Instructor: Fran Guerrero
- Modalidad: Online en directo
- Dirigido a: Profesionales o estudiantes interesados en garantizar la calidad del software y aplicar metodologías de testing modernas.

📚 Estructura del curso (4 módulos)
1. MÓDULO 1 - Introducción a la Calidad del Software
  Conoce los conceptos básicos del testing, roles y tipos de pruebas existentes.
  Fundamentos de Testing y Calidad del Software.
  Roles y responsabilidades en Testing.
  Tipos de pruebas: funcionales, no funcionales, de regresión.
  Metodologías de Testing: Waterfall, Agile, DevOps.
  Herramientas básicas de Testing.

2. MÓDULO 2 - Testing dentro del Ciclo de Vida de un Desarrollo
  Aprende a planificar, diseñar, ejecutar pruebas y reportar errores.
  Planificación de pruebas y estrategias de Testing.
  Diseño de casos de prueba y escenarios.
  Ejecución de pruebas y seguimiento de resultados.
  Reporte de errores y gestión de defectos.
  Integración de Testing en metodologías ágiles.

3. MÓDULO 3 - Automatización de Pruebas
  Profundiza en frameworks de automatización como Jest, Cypress y Postman.
  Fundamentos de Testing automatizado.
  Jest para Testing unitario en JavaScript.
  Cypress para Testing E2E.
  Postman para Testing de APIs.
  Estrategias de automatización y ROI.

4. MÓDULO 4 - DevOps y Testing Continuo
  Integra pruebas automáticas en sistemas de CI/CD y aprende sobre métricas y reportes. 
  Integración continua y Testing automatizado.
  CI/CD pipelines y Testing.
  Métricas de Testing y KPIs.
  Reportes y dashboards de calidad.
  Testing en entornos de producción.


📘 CURSO: BDD y Automatización E2E
- Inicio: 10 de Marzo de 2025
- Duración: 30 horas (6 semanas)
- Horario: Martes y Jueves / 18:00 - 20:30
- Precio: 420 € (380 € con inscripción anticipada)
- Instructor: Equipo QA
- Modalidad: Online en directo
- Dirigido a: Profesionales que buscan dominar BDD, Cucumber, Gherkin y Cypress.

📚 Estructura del curso (4 módulos)
1. MÓDULO 1 - Fundamentos de BDD
  Comprende los principios del Desarrollo Guiado por Comportamiento (BDD).
  Qué es BDD y sus beneficios.
  Ciclo de vida del BDD.
  Comunicación entre negocio y desarrollo.
  Buenas prácticas de colaboración.

2. MÓDULO 2 - Sintaxis Gherkin y Cucumber
  Aprende a escribir escenarios de prueba con Cucumber y Gherkin.
  Estructura Given/When/Then.
  Creación de Features y Steps.
  Buenas prácticas en la redacción de escenarios.
  Integración con repositorios de código.

3. MÓDULO 3 - Automatización E2E con Cypress
  Implementa pruebas de extremo a extremo con Cypress.
  Introducción a Cypress.
  Configuración del entorno de pruebas.
  Integración de Cucumber con Cypress.
  Ejecución de escenarios automatizados.

4. MÓDULO 4 - Integración Continua y Pruebas Automatizadas
  Integra tus pruebas automatizadas en flujos CI/CD.
  Integración en pipelines de CI.
  Gestión de reportes y métricas.
  Buenas prácticas de automatización continua.
  Monitoreo de pruebas automatizadas.

👩‍🏫 Instructor: Equipo QA
Curso impartido por especialistas en BDD y automatización con experiencia en entornos Agile y CI/CD.
Certificaciones: ISTQB Foundation Level, Cypress Automation, Continuous Integration (CI/CD).


📘 CURSO: Coding and DevOps for Testers
- Inicio: 3 de Marzo de 2025
- Duración: 48 horas (8 semanas)
- Horario: Martes y Jueves / 18:00 - 21:00
- Precio: 540 € (490 € con inscripción anticipada)
- Instructor: Laura Sánchez
- Modalidad: Online en directo
- Dirigido a: Testers que desean mejorar sus habilidades de programación y CI/CD.

📚 Estructura del curso (4 módulos)
1. MÓDULO 1 - Fundamentos de Programación para Testers
  Aprende los fundamentos de JavaScript y desarrollo para automatizar de forma eficaz.
  Conceptos básicos de programación.
  Estructuras de control y funciones.
  Manipulación del DOM con JavaScript.
  Buenas prácticas de codificación para testers.

2. MÓDULO 2 - Automatización con Herramientas Modernas
  Aprende a utilizar herramientas de automatización ampliamente usadas.
  Introducción a Cypress y Playwright.
  Testing de APIs con Postman.
  Creación de suites de pruebas automatizadas.
  Gestión de dependencias y entorno de pruebas.

3. MÓDULO 3 - Introducción a Git y Control de Versiones
  Gestiona y colabora en proyectos con Git y GitHub.
  Fundamentos de Git y ramas.
  Comandos esenciales.
  Pull Requests y revisiones de código.
  Buenas prácticas en control de versiones.

4. MÓDULO 4 - Integración Continua con GitLab CI/CD
  Configura pipelines automáticos de testing y despliegue.
  Conceptos de CI/CD.
  Configuración básica en GitLab.
  Ejecución automática de pruebas.
  Optimización y reportes de pipelines.

👩‍🏫 Instructor: Laura Sánchez
Ingeniera de Software y DevOps con más de 10 años de experiencia en desarrollo y entornos CI/CD.
Certificaciones: AWS Certified, GitLab CI/CD Professional.


💼 Consultoría y Formación para Empresas
Capacitación adaptada a las necesidades de tu equipo, asesoría técnica y programas personalizados para empresas que buscan mejorar sus procesos de calidad y productividad.

🤝 Programa de Colaboración
Oportunidad para empresas y organizaciones que deseen acceder a talento certificado, crear alianzas estratégicas y obtener visibilidad en la red de Qualisophy.

📩 Contacto
- Email: contact@qualisophy.com
- Teléfono: +1 234 567 890
- Web: https://qualisophy.com
`;

  const cleanReply = (text: string | undefined): string => {
    if (!text || typeof text !== "string") {
      return "No tengo esa información exacta. Puedes escribirnos a contact@qualisophy.com.";
    }

    let cleaned = text
      // Remove HTML tags or strange markers

      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/\*\*/g, "")
      .replace(/#{1,6}\s?/g, "")
      .replace(/<s>|<\/s>/gi, "")
      .replace(/\n{2,}/g, "\n")
      .replace(/\s{2,}/g, " ")
      .trim();

    // If the response is too short or empty

    if (!cleaned || cleaned.length < 5) {
      return "No tengo esa información exacta. Puedes escribirnos a contact@qualisophy.com.";
    }

    // If it ends with ellipsis, add a natural ending

    if (cleaned.endsWith("...")) {
      cleaned = cleaned.replace(
        /\.\.\.$/,
        ". Puedes escribirnos a contact@qualisophy.com para más información."
      );
    }

    // Limit length without cutting off sentences

    if (cleaned.length > 800) {
      const truncated = cleaned.slice(0, 780);
      const lastSentence = truncated.lastIndexOf(".");
      cleaned =
        (lastSentence > 200
          ? truncated.slice(0, lastSentence + 1)
          : truncated) +
        " Puedes escribirnos a contact@qualisophy.com para más información.";
    }

    return cleaned;
  };

  try {
    // --- Call to the OpenRouter model ---

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          temperature: 0.6,
          max_tokens: 800,
          messages: [
            {
              role: "system",
              content: `
Eres el asistente virtual oficial de Qualisophy.

Tu propósito es ayudar a los usuarios con información real y verificada sobre:
- Cursos disponibles.
- Consultoría y formación para empresas.
- Programa de colaboración.
- Información de contacto.

Reglas estrictas:
1. Usa únicamente la información contenida en el texto que se te proporciona.
2. No inventes datos, nombres ni detalles que no estén explícitos.
3. Si no dispones de la información, responde: "No tengo esa información exacta. Puedes escribirnos a contact@qualisophy.com."
4. Explica las cosas con naturalidad, claridad y tono profesional.
5. Usa entre 3 y 6 líneas, sin formato Markdown ni etiquetas.
6. Si el usuario pregunta por algo fuera del ámbito de Qualisophy, invítalo a visitar la web o escribirnos al correo.

Información disponible:
${websiteContent}
              `,
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    // --- Interpretation of the result ---

    const data = await response.json().catch(() => null);
    const rawReply = data?.choices?.[0]?.message?.content ?? "";
    const reply = cleanReply(rawReply);

    return new Response(JSON.stringify({ reply }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    return new Response(
      JSON.stringify({
        reply:
          "Ha ocurrido un error interno al procesar tu mensaje. Por favor, intenta nuevamente más tarde.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};
