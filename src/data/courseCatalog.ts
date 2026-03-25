// ==========================================
// IMPORTACIÓN DE IMÁGENES LOCALES
// ==========================================

// QA
import imgQaSoftware from "@/assets/imagenes-cursos/qa/qa-curso.jpeg";
import imgQaApi from "@/assets/imagenes-cursos/qa/postman.jpeg";
import imgQaCypress from "@/assets/imagenes-cursos/qa/cypress-bootcamp.jpeg";
import imgQaJunit from "@/assets/imagenes-cursos/qa/junit.jpeg";
import imgQaAgile from "@/assets/imagenes-cursos/qa/agile-testing.jpeg";
import imgQaGenai from "@/assets/imagenes-cursos/qa/testing-ia.jpeg";

// DATA
import imgDataSql from "@/assets/imagenes-cursos/data/sql-powerbi.png";
import imgDataPowerbi from "@/assets/imagenes-cursos/data/powerbi.png";

// HERRAMIENTAS
import imgToolsExcel from "@/assets/imagenes-cursos/tools/excel.png";
import imgToolsOffice from "@/assets/imagenes-cursos/tools/ofimatica.png";
import imgToolsChatbots from "@/assets/imagenes-cursos/tools/chatbots.png";
import imgToolsMake from "@/assets/imagenes-cursos/tools/make.png";

// DEVOPS
import imgDevopsGitlab from "@/assets/imagenes-cursos/devops/gitlab.png";
import imgDevopsIntro from "@/assets/imagenes-cursos/devops/ci-cd.png";

// AGILE
import imgAgileScrum from "@/assets/imagenes-cursos/agile/agile-mastery.png";

// ==========================================
// CATÁLOGO DE CURSOS
// ==========================================
export const courseCategories = [
  {
    id: "qa",
    title: "QA & Automatización",
    subtitle: "ASEGURAMIENTO DE CALIDAD",
    icon: "bug_report",
    headerColor: "bg-[#6296CE]",
    textColor: "text-[#6296CE]",
    hoverBorder: "hover:border-[#6296CE]",
    hoverText: "group-hover:text-[#6296CE]",
    link: "/learning/qa",
    courses: [
      {
        id: "qa-software",
        title: "Calidad de Software (QA) y Testing",
        description:
          "Verifica que las aplicaciones funcionan correctamente y valida requerimientos.",
        image: imgQaSoftware.src,
        duration: "40h",
        level: "Principiante",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/software-quality",
      },
      {
        id: "qa-api",
        title: "API Testing con Postman",
        description:
          "Domina la validación del backend integrándola en procesos CI/CD.",
        image: imgQaApi.src,
        duration: "Por definir",
        level: "Intermedio",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/api-testing",
      },
      {
        id: "qa-cypress",
        title: "Cypress Automation Bootcamp",
        description:
          "Aprende automatización de pruebas web modernas con Cypress desde cero.",
        image: imgQaCypress.src,
        duration: "36h",
        level: "Intermedio",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/cypress-bootcamp",
      },
      {
        id: "qa-junit",
        title: "Test Unitarios con JUnit",
        description:
          "Creación de pruebas robustas usando el estándar de la industria para Java.",
        image: imgQaJunit.src,
        duration: "Por definir",
        level: "Avanzado",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/junit-testing",
      },
      {
        id: "qa-agile",
        title: "Agile Testing",
        description:
          "Técnicas y mentalidad para integrarse en equipos ágiles Scrum/Kanban.",
        image: imgQaAgile.src,
        duration: "Por definir",
        level: "Intermedio",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/agile-testing",
      },
      {
        id: "qa-genai",
        title: "Generative AI para Software Testing",
        description:
          "Acelera tus labores diarias de QA utilizando Inteligencia Artificial Generativa.",
        image: imgQaGenai.src,
        duration: "Por definir",
        level: "Avanzado",
        modality: "Online",
        categoryName: "QA",
        href: "/learning/qa/genai-testing",
      },
    ],
  },
  {
    id: "data",
    title: "Data & BI",
    subtitle: "BUSINESS INTELLIGENCE",
    icon: "bar_chart",
    headerColor: "bg-[#6296CE]",
    textColor: "text-[#6296CE]",
    hoverBorder: "hover:border-[#6296CE]",
    hoverText: "group-hover:text-[#6296CE]",
    link: "/learning/data",
    courses: [
      {
        id: "data-sql",
        title: "Introducción a SQL para Power BI",
        description:
          "Extrae, filtra y limpia datos en el origen optimizando el rendimiento.",
        image: imgDataSql.src,
        duration: "Por definir",
        level: "Principiante",
        modality: "Online",
        categoryName: "Data & BI",
        href: "/learning/data/sql-powerbi",
      },
      {
        id: "data-powerbi",
        title: "Analítica de Datos con Power BI",
        description:
          "Transforma, modela y visualiza datos para la toma de decisiones empresariales.",
        image: imgDataPowerbi.src,
        duration: "50h",
        level: "Intermedio",
        modality: "Online",
        categoryName: "Data & BI",
        href: "/learning/data/powerbi",
      },
    ],
  },
  {
    id: "tools",
    title: "Herramientas Empresariales",
    subtitle: "OFIMÁTICA Y AUTOMATIZACIÓN",
    icon: "business_center",
    headerColor: "bg-[#6296CE]",
    textColor: "text-[#6296CE]",
    hoverBorder: "hover:border-[#6296CE]",
    hoverText: "group-hover:text-[#6296CE]",
    link: "/learning/tools",
    courses: [
      {
        id: "tools-excel",
        title: "Microsoft Excel Expert",
        description: "Maneja grandes volúmenes de datos, macros y Power Pivot.",
        image: imgToolsExcel.src,
        duration: "Por definir",
        level: "Avanzado",
        modality: "Online",
        categoryName: "Herramientas",
        href: "/learning/tools/excel-expert",
      },
      {
        id: "tools-office",
        title: "Ofimática Integral",
        description:
          "Mejora radicalmente tu velocidad y organización corporativa diaria.",
        image: imgToolsOffice.src,
        duration: "Por definir",
        level: "Principiante",
        modality: "Online",
        categoryName: "Herramientas",
        href: "/learning/tools/office-tools",
      },
      {
        id: "tools-chatbots",
        title: "Chatbots para E-commerce",
        description:
          "Diseña e integra asistentes virtuales conversacionales automatizados.",
        image: imgToolsChatbots.src,
        duration: "Por definir",
        level: "Intermedio",
        modality: "Online",
        categoryName: "Herramientas",
        href: "/learning/tools/chatbots",
      },
      {
        id: "tools-make",
        title: "Productividad con Make",
        description:
          "Crea flujos de trabajo automatizados para gestionar correos e integrar IA.",
        image: imgToolsMake.src,
        duration: "Por definir",
        level: "Intermedio",
        modality: "Online",
        categoryName: "Herramientas",
        href: "/learning/tools/make-productivity",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Gestión",
    subtitle: "INTEGRACIÓN CONTINUA",
    icon: "terminal",
    headerColor: "bg-[#70A0D2]",
    textColor: "text-[#70A0D2]",
    hoverBorder: "hover:border-[#70A0D2]",
    hoverText: "group-hover:text-[#70A0D2]",
    link: "/learning/devops",
    courses: [
      {
        id: "devops-gitlab",
        title: "Gestión Avanzada y CI/CD con GitLab",
        description:
          "Configura tableros, automatiza pruebas y despliegues seguros.",
        image: imgDevopsGitlab.src,
        duration: "Por definir",
        level: "Avanzado",
        modality: "Online",
        categoryName: "DevOps",
        href: "/learning/devops/gitlab-cicd",
      },
      {
        id: "devops-intro",
        title: "DevOps, Continuous Testing y CI/CD",
        description:
          "Inmersión completa en la cultura, prácticas y herramientas de DevOps.",
        image: imgDevopsIntro.src,
        duration: "Por definir",
        level: "Principiante",
        modality: "Online",
        categoryName: "DevOps",
        href: "/learning/devops/intro-devops",
      },
    ],
  },
  {
    id: "agile",
    title: "Agile & Scrum",
    subtitle: "LIDERAZGO Y METODOLOGÍAS",
    icon: "groups",
    headerColor: "bg-[#8CAED8]",
    textColor: "text-[#8CAED8]",
    hoverBorder: "hover:border-[#8CAED8]",
    hoverText: "group-hover:text-[#8CAED8]",
    link: "/learning/agile",
    courses: [
      {
        id: "agile-scrum",
        title: "Agile Mastery: El Camino del Scrum Master",
        description:
          "Facilita, asesora y mentoriza a los equipos de desarrollo para maximizar valor.",
        image: imgAgileScrum.src,
        duration: "Por definir",
        level: "Intermedio",
        modality: "Online",
        categoryName: "Agile",
        href: "/learning/agile/scrum-master",
      },
    ],
  },
];

// Exportación plana para el buscador y el Grid
export const allCoursesList = courseCategories.flatMap((cat) => cat.courses);
