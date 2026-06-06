// Contenido del portfolio de Genaro García.
// Fuente: CV oficial + wiki del Cerebro. Clientes anonimizados por sector. Enfoque: empleo, no clientes.

export const profile = {
  name: "Genaro García",
  role: "Desarrollador IA",
  tagline:
    "Automatización de procesos con IA · Sistemas Agénticos · Computer Vision",
  location: "Gualeguaychú, Entre Ríos, Argentina",
  availability: "Open to Work — Presencial · Híbrido · Remoto",
  email: "genagarcia094@gmail.com",
  phone: "+54 9 341 273-9739",
  linkedin: "https://www.linkedin.com/in/genaro-garcia-46b36b331/",
  linkedinLabel: "in/genaro-garcia",
  cvEs: "/genaro_garcia_cv_es.pdf",
  cvEn: "/genaro_garcia_cv_en.pdf",
  intro:
    "Desarrollador especializado en inteligencia artificial aplicada: automatizo procesos completos de empresas con sistemas de agentes, integrados a sus herramientas reales. Llevo cada proyecto de punta a punta — del relevamiento y la arquitectura al desarrollo, las pruebas, el despliegue y el soporte en producción.",
};

export const stats = [
  {
    value: "6 áreas",
    label: "Procesos de empresa que automatizo",
    sub: "ventas, cobranzas, atención al cliente, soporte, administración y finanzas",
  },
  {
    value: "Procesos completos",
    label: "Automatización de punta a punta",
    sub: "del relevamiento al despliegue y el soporte en producción",
  },
  {
    value: "9 rubros",
    label: "Experiencia transversal",
    sub: "industrial, rastreo, inmobiliario, legal, contable, ecommerce y más",
  },
  {
    value: "Texto · voz · visión",
    label: "Inteligencia multimodal",
    sub: "del chat por WhatsApp a la visión por computadora en planta",
  },
];

export const about = [
  "Integro la célula de inteligencia artificial de HitoFusion (Odoo Gold Partner), donde diseño y construyo agentes y equipos agénticos que automatizan procesos reales de empresas de distintos rubros — y empiezo a ejercer como Project Manager en proyectos seleccionados. Mi foco no es un chatbot suelto: es automatizar un proceso completo, integrado a las herramientas que la empresa ya usa.",
  "Para trabajar mejor y más rápido construí mi propia biblioteca de herramientas y skills a medida: automatizaciones y utilidades que uso en mi día a día para elevar la calidad de lo que entrego y potenciar al equipo. Me apoyo en las mejores herramientas del mercado como una pieza más del conjunto, pero la diferencia la hacen los procesos y las herramientas propias que desarrollo. Si hasta para mi propio trabajo construyo agentes, imaginate para el tuyo.",
  "Soy autodidacta y miembro activo de la Tribu DivisualProject — una comunidad de práctica donde me mantengo al día en arquitectura, seguridad y novedades del ecosistema. El aprendizaje continuo no es un complemento: es parte central de cómo trabajo.",
];

export type Project = {
  title: string;
  sector: string;
  image: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

// Todos los agentes/sistemas en los que participó, anonimizados por sector/función.
export const projects: Project[] = [
  {
    title: "Visión por computadora en planta",
    sector: "Industrial",
    image: "/gen/proj-vision.webp",
    summary:
      "Automatización del control de calidad en una línea productiva: el sistema detecta piezas y mide desviaciones al instante, sin intervención humana.",
    highlights: [
      "Precisión sub-milimétrica (2–3 mm) con un umbral de una sola falla cada 10.000 piezas.",
      "Entrenamiento del modelo y base de conocimiento sobre un dataset propio.",
      "Del relevamiento al despliegue en planta, funcionando en condiciones reales.",
    ],
    stack: ["Computer Vision", "Detección de objetos", "Python", "Dataset propio"],
  },
  {
    title: "Equipo de IA para rastreo satelital",
    sector: "Rastreo GPS · Flotas",
    image: "/gen/proj-rastreo.webp",
    summary:
      "Un equipo de agentes que automatiza la operación comercial completa de una empresa de rastreo: atención, ventas y posventa por WhatsApp.",
    highlights: [
      "Orquestador central que coordina agentes especializados por área y canal.",
      "Atención y ventas automatizadas, integradas al ERP de la empresa.",
      "Respuesta automática de consultas en marketplace, 24/7.",
    ],
    stack: ["Sistemas Agénticos", "WhatsApp", "Odoo", "Marketplace", "VPS / Docker"],
  },
  {
    title: "Automatización de cobranzas",
    sector: "Finanzas · Cobranzas",
    image: "/gen/proj-cobranzas.webp",
    summary:
      "Agente que gestiona la cobranza de deuda por WhatsApp: informa el estado de cuenta, recibe comprobantes y registra los pagos contra el sistema de la empresa.",
    highlights: [
      "Conversación natural para reclamar deuda sin fricción ni planillas manuales.",
      "Integrado al ERP: lee saldos reales y deja todo registrado.",
      "Libera al equipo de la cobranza repetitiva y mejora la recuperación.",
    ],
    stack: ["Sistemas Agénticos", "WhatsApp", "Odoo", "Automatización"],
  },
  {
    title: "Asistente inmobiliario",
    sector: "Inmobiliario",
    image: "/gen/proj-inmobiliario.webp",
    summary:
      "Primer contacto automatizado para una comercializadora con +250 profesionales: califica leads y agenda reuniones con el comercial indicado.",
    highlights: [
      "Califica al interesado por WhatsApp y agenda en la agenda real del equipo.",
      "Back-office que procesa Excel y PDF y mantiene el CRM actualizado solo.",
      "Integrado al ERP y a la suite de calendario de la empresa.",
    ],
    stack: ["Sistemas Agénticos", "WhatsApp", "Odoo", "Calendly", "RAG"],
  },
  {
    title: "Agente de correo corporativo",
    sector: "Comunicación corporativa",
    image: "/gen/proj-email.webp",
    summary:
      "Automatiza la bandeja de entrada de un directivo: clasifica el correo, lo resume y deja borradores de respuesta listos para revisar (nunca envía solo).",
    highlights: [
      "Sincroniza, clasifica y prioriza el correo de forma automática.",
      "Redacta borradores con el contexto del negocio, listos para aprobar.",
      "Parte de un equipo que además carga información y genera reportes.",
    ],
    stack: ["Sistemas Agénticos", "Gmail", "Telegram", "Python"],
  },
  {
    title: "Mesa de ayuda y soporte técnico",
    sector: "Soporte · Servicios TI",
    image: "/gen/proj-soporte.webp",
    summary:
      "Equipo de agentes que automatiza la atención de soporte: recibe al cliente, crea los tickets y hace el diagnóstico técnico profundo de cada caso.",
    highlights: [
      "Primer contacto por WhatsApp que identifica al cliente y abre el ticket.",
      "Diagnóstico técnico avanzado sobre el sistema, con notas internas.",
      "Acelera la resolución y descarga al equipo humano de lo repetitivo.",
    ],
    stack: ["Sistemas Agénticos", "WhatsApp", "Odoo", "SSH / VPS"],
  },
  {
    title: "Administración y tesorería",
    sector: "Administración",
    image: "/gen/proj-administracion.webp",
    summary:
      "Agente que automatiza tareas administrativas: lee facturas, concilia movimientos bancarios y gestiona órdenes de compra y suscripciones.",
    highlights: [
      "Lectura automática de facturas con reconocimiento óptico (OCR).",
      "Conciliación de extractos bancarios y seguimiento de gastos.",
      "Menos carga manual, menos errores, todo trazable.",
    ],
    stack: ["Sistemas Agénticos", "OCR", "Odoo", "Automatización"],
  },
  {
    title: "Agente de voz e investigación",
    sector: "Voz · Research",
    image: "/gen/proj-voz.webp",
    summary:
      "Asistente que habla: recibe un pedido de investigación, busca en la web en tiempo real y responde por voz, con una locución natural.",
    highlights: [
      "Conversación por voz natural, no un menú ni un IVR.",
      "Búsqueda web en vivo y síntesis del resultado al instante.",
      "Pensado para sumar IA conversable a reuniones y flujos de trabajo.",
    ],
    stack: ["IA de voz", "Búsqueda web (MCP)", "Kimi / DeepSeek", "Sistemas Agénticos"],
  },
  {
    title: "Fábrica de agentes de IA",
    sector: "Ingeniería de IA",
    image: "/gen/proj-fabrica.webp",
    summary:
      "Un sistema que construye otros agentes: toma una necesidad de negocio y la convierte en un agente listo para producción, con control de calidad incorporado.",
    highlights: [
      "Convierte un requerimiento en un agente con arquitectura sólida y reglas duras.",
      "Revisión automática de seguridad, coherencia y costo antes de habilitarlo.",
      "Registro auditable de cada acción y prohibición de auto-desplegarse.",
    ],
    stack: ["Arquitectura Multi-Agente", "Seguridad", "Audit logs", "Python"],
  },
  {
    title: "Cerebro personal agéntico",
    sector: "IA · Productividad",
    image: "/gen/proj-sanai.webp",
    summary:
      "Un sistema multi-agente que centraliza toda la información de trabajo y la mantiene viva: un asistente que conoce todo y coordina agentes especializados.",
    highlights: [
      "Agentes de gestión, investigación y monitoreo, cada uno con su rol.",
      "Investigación y monitoreo de infraestructura corriendo de forma automática.",
      "Una sola fuente de verdad: nunca se pierde el contexto entre sesiones.",
    ],
    stack: ["Sistemas Agénticos", "Bases vectoriales", "Automatización", "MCP"],
  },
];

export type StackGroup = { label: string; items: string[] };

export const stackGroups: StackGroup[] = [
  {
    label: "IA, Agentes & LLMs",
    items: [
      "Sistemas Multi-Agente",
      "Arquitecturas con orquestador",
      "RAG",
      "Bases de datos vectoriales",
      "Model Context Protocol (MCP)",
      "Tool Use",
      "Memoria a largo plazo",
      "LLMs (Claude · GPT · Gemini · DeepSeek · Kimi)",
    ],
  },
  {
    label: "Automatización & Orquestación",
    items: [
      "Automatización de procesos",
      "OpenClaw",
      "n8n",
      "Integraciones ERP / CRM",
      "APIs & Webhooks",
      "Tareas programadas",
    ],
  },
  {
    label: "Computer Vision & Datos no estructurados",
    items: ["Computer Vision", "Detección de objetos", "OCR de documentos", "Transcripción de audio"],
  },
  {
    label: "Producto & Gestión",
    items: [
      "Project Management",
      "Relevamiento de procesos",
      "Casos de uso",
      "Matrices de riesgo",
      "Documentación técnica",
      "Trato con stakeholders",
    ],
  },
  {
    label: "Infraestructura, Deploy & Seguridad",
    items: [
      "Docker",
      "Linux / VPS",
      "Servidores",
      "Plataformas de despliegue",
      "Ciberseguridad",
      "Control de accesos",
      "Audit logs & secretos",
    ],
  },
  {
    label: "Backend & Frontend",
    items: ["Python", "Node.js", "TypeScript", "APIs REST", "PostgreSQL", "Supabase", "React", "Next.js"],
  },
];

// Narración del agente anfitrión (audio en /public/voice/*.mp3, generado con ElevenLabs).
// El texto calza con el audio para los subtítulos.
export const narration: Record<string, { clip: string; text: string }> = {
  welcome: {
    clip: "/voice/welcome.mp3",
    text: "Bienvenido. Soy el asistente de inteligencia artificial de este portfolio. Lo que estás viendo no es una página común: es una muestra de lo que la automatización con IA puede hacer. Te presento a Genaro García, especialista en automatizar procesos completos de empresas con sistemas de inteligencia artificial. Pasá, y entrá al futuro de la automatización.",
  },
  proyectos: {
    clip: "/voice/proyectos.mp3",
    text: "Estos son los proyectos. Sistemas de inteligencia artificial que automatizan procesos reales de empresas, funcionando en producción. En varios Genaro fue el creador a cargo; en otros participó de forma activa dentro del equipo de inteligencia artificial.",
  },
  stack: {
    clip: "/voice/stack.mp3",
    text: "Esta es la caja de herramientas. Arquitecturas multi-agente, automatización de procesos, visión por computadora y todo lo que Genaro domina para diseñar, construir y desplegar inteligencia artificial en serio.",
  },
  "sobre-mi": {
    clip: "/voice/sobre-mi.mp3",
    text: "Detrás de cada agente hay una persona. Genaro García, desarrollador enfocado en inteligencia artificial aplicada. Tan obsesionado con hacer las cosas bien que hasta construye sus propias herramientas para trabajar mejor.",
  },
  contacto: {
    clip: "/voice/contacto.mp3",
    text: "Hasta acá llegó el recorrido. Si en tu empresa hay procesos para automatizar, o buscás a alguien que sume inteligencia artificial a tu equipo, este es el momento de hablar.",
  },
};

export const education = [
  {
    title: "Tecnicatura Superior en Desarrollo de Software",
    place: "Complejo Educativo Brigadier General Estanislao López",
    date: "Egreso: Diciembre 2025",
  },
  {
    title: "Miembro activo — Tribu DivisualProject",
    place: "Comunidad de práctica en IA y arquitectura · Remoto",
    date: "Actualidad",
  },
];
