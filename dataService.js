/**
 * dataService.js
 * Capa de abstracción de datos para el portafolio de Oriol Casaponsa Prat.
 * 
 * NOTA DE ARQUITECTURA:
 * Este servicio simula un backend real retornando Promesas (async/await).
 * Actualmente utiliza localStorage para persistir los datos en el navegador del usuario.
 * Para conectar a un servicio real (como Supabase o Firebase), solo es necesario
 * reemplazar las implementaciones de estos métodos por llamadas a la API correspondiente.
 */

// Datos por defecto para inicializar la base de datos local
const DEFAULT_DATA = {
  profile: {
    nombre: "Oriol Casaponsa Prat",
    subtitulo: "Técnico de Sistemas | ASIR | DevOps Junior | Automatización e IA aplicada",
    heroText: "Soy un perfil técnico orientado a sistemas, infraestructura, cloud y automatización. Me interesa entender cómo funcionan las aplicaciones modernas desde la parte de sistemas: despliegue, configuración, contenedores, pipelines, seguridad básica, documentación y mantenimiento. Utilizo herramientas de inteligencia artificial para acelerar la creación de prototipos y proyectos reales, siempre revisando, probando y documentando el resultado.",
    sobreMiText: "Soy técnico de sistemas formado en ASIR, con interés en DevOps, cloud computing, automatización, ciberseguridad básica y uso práctico de inteligencia artificial. Mi perfil está más orientado a sistemas que a programación tradicional, pero me gusta crear proyectos digitales funcionales para aprender cómo se conectan todas las piezas: servidores, bases de datos, despliegues, repositorios, contenedores, pipelines y servicios cloud.\n\nMi forma de trabajar combina análisis, pruebas, documentación y uso de herramientas de IA para construir soluciones útiles. No busco presentarme como programador senior, sino como un perfil técnico capaz de entender un proyecto, estructurarlo, probarlo, desplegarlo y mejorarlo."
  },
  contacto: {
    email: "tuemail@email.com",
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    cvLink: "#"
  },
  proyectos: [
    {
      id: "proj-1",
      nombre: "Smite Tournament Hub",
      descripcion: "Plataforma web creada con apoyo de herramientas de IA para organizar torneos online del videojuego Smite. El proyecto incluye ideas como inscripción de jugadores, equipos, brackets, panel de administración, sistema de tickets, premios, bans y gestión de torneos.",
      papel: "Definición de la idea, estructura funcional, revisión de errores, pruebas de uso, mejora mediante prompts, organización de funcionalidades y validación del comportamiento de la web.",
      tecnologias: "IA aplicada, React, TypeScript, Supabase, Tailwind, GitHub, diseño de producto, pruebas funcionales",
      aprendido: "He practicado la definición de requisitos, la organización de una aplicación web compleja, la gestión de usuarios, la lógica de torneos, el uso de bases de datos y la importancia de probar cada flujo antes de dar una funcionalidad por terminada.",
      demoLink: "#",
      githubLink: "#",
      imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj-2",
      nombre: "Proyecto DevOps & Cloud Computing",
      descripcion: "Proyecto académico/práctico centrado en el ciclo completo de despliegue de una aplicación. El objetivo es simular cómo se prepararía una web para funcionar en un entorno más parecido al de una empresa real.",
      papel: "Configuración y comprensión del flujo de despliegue, uso de GitHub, contenedores Docker, pipeline con Jenkins, despliegue en entorno cloud, copias de seguridad y monitorización básica.",
      tecnologias: "GitHub, Docker, Jenkins, AWS EC2, Kubernetes / Minikube, Linux, CI/CD, backups, monitorización",
      aprendido: "He entendido mejor la diferencia entre desarrollar una aplicación y prepararla para funcionar en producción. También he trabajado conceptos como integración continua, despliegue continuo, contenedores, infraestructura cloud y automatización.",
      demoLink: "#",
      githubLink: "#",
      imagen: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj-3",
      nombre: "Pokédex / Proyecto Frontend",
      descripcion: "Proyecto web visual creado con ayuda de IA para practicar la estructura de una aplicación frontend, gestión de componentes, rutas, imágenes, vídeos y publicación web.",
      papel: "Personalización de una plantilla, modificación de contenido, revisión de errores, adaptación de imágenes, pruebas de navegación y publicación del proyecto.",
      tecnologias: "HTML, CSS, JavaScript, React, TypeScript, assets multimedia, GitHub, IA aplicada",
      aprendido: "He practicado cómo se organiza una aplicación frontend moderna, cómo se gestionan imágenes y vídeos dentro de un proyecto, cómo detectar errores al modificar archivos y cómo publicar una web para que pueda verla otra persona.",
      demoLink: "#",
      githubLink: "#",
      imagen: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "proj-4",
      nombre: "Digitalización de negocio real",
      descripcion: "Proyecto relacionado con la digitalización de un negocio real mediante web, carta digital, pedidos online, contenidos, organización de productos y estrategia de presencia digital.",
      papel: "Organización de necesidades reales del negocio, definición de contenidos, estructura de la web, revisión de textos, propuesta de funcionalidades y coordinación de la parte digital.",
      tecnologias: "WordPress, tienda online, contenidos web, estrategia digital, organización de productos, documentación, IA aplicada",
      aprendido: "He aprendido a conectar la tecnología con necesidades reales de un negocio: claridad para el usuario, facilidad de actualización, estructura de productos, comunicación online y mantenimiento de una web viva.",
      demoLink: "#",
      githubLink: "#",
      imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ],
  tecnologias: [
    // Sistemas
    { id: "tech-1", nombre: "Windows", categoria: "sistemas" },
    { id: "tech-2", nombre: "Linux básico", categoria: "sistemas" },
    { id: "tech-3", nombre: "Redes", categoria: "sistemas" },
    { id: "tech-4", nombre: "Firewall", categoria: "sistemas" },
    { id: "tech-5", nombre: "Copias de seguridad", categoria: "sistemas" },
    { id: "tech-6", nombre: "Monitorización", categoria: "sistemas" },
    { id: "tech-7", nombre: "Seguridad básica", categoria: "sistemas" },
    // DevOps
    { id: "tech-8", nombre: "GitHub", categoria: "devops" },
    { id: "tech-9", nombre: "Docker", categoria: "devops" },
    { id: "tech-10", nombre: "Jenkins", categoria: "devops" },
    { id: "tech-11", nombre: "AWS / EC2", categoria: "devops" },
    { id: "tech-12", nombre: "Kubernetes / Minikube", categoria: "devops" },
    { id: "tech-13", nombre: "CI/CD", categoria: "devops" },
    { id: "tech-14", nombre: "Automatización de despliegues", categoria: "devops" },
    // Web
    { id: "tech-15", nombre: "HTML", categoria: "web" },
    { id: "tech-16", nombre: "CSS", categoria: "web" },
    { id: "tech-17", nombre: "JavaScript básico", categoria: "web" },
    { id: "tech-18", nombre: "React con apoyo de IA", categoria: "web" },
    { id: "tech-19", nombre: "TypeScript con apoyo de IA", categoria: "web" },
    { id: "tech-20", nombre: "Supabase", categoria: "web" },
    { id: "tech-21", nombre: "WordPress", categoria: "web" },
    // IA aplicada
    { id: "tech-22", nombre: "Prompting técnico", categoria: "ia" },
    { id: "tech-23", nombre: "Creación de prototipos", categoria: "ia" },
    { id: "tech-24", nombre: "Depuración asistida", categoria: "ia" },
    { id: "tech-25", nombre: "Documentación técnica", categoria: "ia" },
    { id: "tech-26", nombre: "Generación y mejora de funcionalidades", categoria: "ia" },
    { id: "tech-27", nombre: "Análisis de errores", categoria: "ia" }
  ],
  formacion: [
    { id: "edu-1", titulo: "ASIR / Administración de Sistemas Informáticos en Red" },
    { id: "edu-2", titulo: "Formación en DevOps y Cloud Computing" },
    { id: "edu-3", titulo: "Prácticas con Docker, Jenkins, AWS, Kubernetes y GitHub" },
    { id: "edu-4", titulo: "Conocimientos de seguridad, redes, sistemas y automatización" },
    { id: "edu-5", titulo: "Uso de inteligencia artificial aplicada a proyectos técnicos" }
  ]
};

const STORAGE_KEY = "oriol_portfolio_data";

// Helper para leer del localStorage o inicializar si está vacío
function _getData() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return DEFAULT_DATA;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error leyendo localStorage, restableciendo valores por defecto.", e);
    return DEFAULT_DATA;
  }
}

// Helper para guardar en localStorage
function _saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Retorna un delay aleatorio para simular latencia de red
function _delay(ms = 200) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const dataService = {
  // --- PERFIL ---
  async getProfile() {
    await _delay();
    const data = _getData();
    return data.profile;
  },

  async updateProfile(profileUpdates) {
    await _delay();
    const data = _getData();
    data.profile = { ...data.profile, ...profileUpdates };
    _saveData(data);
    return data.profile;
  },

  // --- CONTACTO ---
  async getContacto() {
    await _delay();
    const data = _getData();
    return data.contacto;
  },

  async updateContacto(contactoUpdates) {
    await _delay();
    const data = _getData();
    data.contacto = { ...data.contacto, ...contactoUpdates };
    _saveData(data);
    return data.contacto;
  },

  // --- PROYECTOS ---
  async getProjects() {
    await _delay();
    const data = _getData();
    return data.proyectos || [];
  },

  async saveProject(project) {
    await _delay();
    const data = _getData();
    if (!data.proyectos) data.proyectos = [];

    if (project.id) {
      // Editar existente
      const idx = data.proyectos.findIndex(p => p.id === project.id);
      if (idx !== -1) {
        data.proyectos[idx] = { ...data.proyectos[idx], ...project };
      }
    } else {
      // Nuevo proyecto
      project.id = "proj-" + Date.now();
      data.proyectos.push(project);
    }
    _saveData(data);
    return project;
  },

  async deleteProject(id) {
    await _delay();
    const data = _getData();
    data.proyectos = (data.proyectos || []).filter(p => p.id !== id);
    _saveData(data);
    return true;
  },

  async reorderProjects(orderedIds) {
    await _delay();
    const data = _getData();
    const map = new Map(data.proyectos.map(p => [p.id, p]));
    data.proyectos = orderedIds.map(id => map.get(id)).filter(Boolean);
    _saveData(data);
    return data.proyectos;
  },

  // --- TECNOLOGÍAS ---
  async getTechnologies() {
    await _delay();
    const data = _getData();
    return data.tecnologias || [];
  },

  async saveTechnology(tech) {
    await _delay();
    const data = _getData();
    if (!data.tecnologias) data.tecnologias = [];

    if (tech.id) {
      const idx = data.tecnologias.findIndex(t => t.id === tech.id);
      if (idx !== -1) {
        data.tecnologias[idx] = { ...data.tecnologias[idx], ...tech };
      }
    } else {
      tech.id = "tech-" + Date.now();
      data.tecnologias.push(tech);
    }
    _saveData(data);
    return tech;
  },

  async deleteTechnology(id) {
    await _delay();
    const data = _getData();
    data.tecnologias = (data.tecnologias || []).filter(t => t.id !== id);
    _saveData(data);
    return true;
  },

  // --- FORMACIÓN ---
  async getEducation() {
    await _delay();
    const data = _getData();
    return data.formacion || [];
  },

  async saveEducation(edu) {
    await _delay();
    const data = _getData();
    if (!data.formacion) data.formacion = [];

    if (edu.id) {
      const idx = data.formacion.findIndex(e => e.id === edu.id);
      if (idx !== -1) {
        data.formacion[idx] = { ...data.formacion[idx], ...edu };
      }
    } else {
      edu.id = "edu-" + Date.now();
      data.formacion.push(edu);
    }
    _saveData(data);
    return edu;
  },

  async deleteEducation(id) {
    await _delay();
    const data = _getData();
    data.formacion = (data.formacion || []).filter(e => e.id !== id);
    _saveData(data);
    return true;
  },

  // --- RESTABLECER ---
  async resetToDefault() {
    await _delay();
    _saveData(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
};

export default dataService;
