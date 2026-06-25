/**
 * dataService.js
 * Capa de datos conectada a Supabase.
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Ve a tu panel de Supabase: https://supabase.com/dashboard
 * 2. Ve a Project Settings (icono de engranaje) -> API.
 * 3. Copia la URL del proyecto ("Project URL") y colócala en SUPABASE_URL.
 * 4. Copia la Anon Key ("anon public") y colócala en SUPABASE_ANON_KEY.
 */

// REEMPLAZA ESTOS VALORES CON LOS DE TU PROYECTO SUPABASE
const SUPABASE_URL = "https://piwkzftpfcuohkcewtlj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_p4crYRGKzs-lH2Fsim86pg_d77u459I";

// Inicializar el cliente Supabase usando la librería importada via CDN
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Datos semilla locales para restablecer si se solicita
const DEFAULT_SEEDS = {
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
    { id: "tech-1", nombre: "Windows", categoria: "sistemas" },
    { id: "tech-2", nombre: "Linux básico", categoria: "sistemas" },
    { id: "tech-3", nombre: "Redes", categoria: "sistemas" },
    { id: "tech-4", nombre: "Firewall", categoria: "sistemas" },
    { id: "tech-5", nombre: "Copias de seguridad", categoria: "sistemas" },
    { id: "tech-6", nombre: "Monitorización", categoria: "sistemas" },
    { id: "tech-7", nombre: "Seguridad básica", categoria: "sistemas" },
    { id: "tech-8", nombre: "GitHub", categoria: "devops" },
    { id: "tech-9", nombre: "Docker", categoria: "devops" },
    { id: "tech-10", nombre: "Jenkins", categoria: "devops" },
    { id: "tech-11", nombre: "AWS / EC2", categoria: "devops" },
    { id: "tech-12", nombre: "Kubernetes / Minikube", categoria: "devops" },
    { id: "tech-13", nombre: "CI/CD", categoria: "devops" },
    { id: "tech-14", nombre: "Automatización de despliegues", categoria: "devops" },
    { id: "tech-15", nombre: "HTML", categoria: "web" },
    { id: "tech-16", nombre: "CSS", categoria: "web" },
    { id: "tech-17", nombre: "JavaScript básico", categoria: "web" },
    { id: "tech-18", nombre: "React con apoyo de IA", categoria: "web" },
    { id: "tech-19", nombre: "TypeScript con apoyo de IA", categoria: "web" },
    { id: "tech-20", nombre: "Supabase", categoria: "web" },
    { id: "tech-21", nombre: "WordPress", categoria: "web" },
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

const dataService = {
  // --- PERFIL ---
  async getProfile() {
    const { data, error } = await supabase
      .from('perfil')
      .select('*')
      .eq('id', 1)
      .single();
    if (error) {
      console.error("Error al obtener perfil, usando local:", error);
      return DEFAULT_SEEDS.profile;
    }
    return {
      nombre: data.nombre,
      subtitulo: data.subtitulo,
      heroText: data.hero_text,
      sobreMiText: data.sobre_mi_text
    };
  },

  async updateProfile(profileUpdates) {
    const { data, error } = await supabase
      .from('perfil')
      .update({
        nombre: profileUpdates.nombre,
        subtitulo: profileUpdates.subtitulo,
        hero_text: profileUpdates.heroText,
        sobre_mi_text: profileUpdates.sobreMiText
      })
      .eq('id', 1)
      .select()
      .single();
    if (error) throw error;
    return {
      nombre: data.nombre,
      subtitulo: data.subtitulo,
      heroText: data.hero_text,
      sobreMiText: data.sobre_mi_text
    };
  },

  // --- CONTACTO ---
  async getContacto() {
    const { data, error } = await supabase
      .from('perfil')
      .select('email, github, linkedin, cv_link')
      .eq('id', 1)
      .single();
    if (error) {
      console.error("Error al obtener contacto, usando local:", error);
      return DEFAULT_SEEDS.contacto;
    }
    return {
      email: data.email,
      github: data.github,
      linkedin: data.linkedin,
      cvLink: data.cv_link
    };
  },

  async updateContacto(contactoUpdates) {
    const { data, error } = await supabase
      .from('perfil')
      .update({
        email: contactoUpdates.email,
        github: contactoUpdates.github,
        linkedin: contactoUpdates.linkedin,
        cv_link: contactoUpdates.cv_link
      })
      .eq('id', 1)
      .select()
      .single();
    if (error) throw error;
    return {
      email: data.email,
      github: data.github,
      linkedin: data.linkedin,
      cvLink: data.cv_link
    };
  },

  // --- PROYECTOS ---
  async getProjects() {
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .order('orden', { ascending: true });
    if (error) {
      console.error("Error al obtener proyectos:", error);
      return [];
    }
    return data.map(p => ({
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      papel: p.papel,
      tecnologias: p.tecnologias,
      aprendido: p.aprendido,
      demoLink: p.demo_link,
      githubLink: p.github_link,
      imagen: p.imagen
    }));
  },

  async saveProject(project) {
    const projData = {
      nombre: project.nombre,
      descripcion: project.descripcion,
      papel: project.papel,
      tecnologias: project.tecnologias,
      aprendido: project.aprendido,
      demo_link: project.demoLink,
      github_link: project.githubLink,
      imagen: project.imagen
    };

    if (project.id) {
      // Editar existente
      const { error } = await supabase
        .from('proyectos')
        .update(projData)
        .eq('id', project.id);
      if (error) throw error;
    } else {
      // Nuevo proyecto
      const id = "proj-" + Date.now();
      
      // Obtener el orden máximo actual
      const { data: ordData } = await supabase
        .from('proyectos')
        .select('orden')
        .order('orden', { ascending: false })
        .limit(1);
      
      const maxOrden = ordData && ordData.length > 0 ? ordData[0].orden : 0;
      
      const { error } = await supabase
        .from('proyectos')
        .insert({
          id,
          ...projData,
          orden: maxOrden + 1
        });
      if (error) throw error;
    }
    return project;
  },

  async deleteProject(id) {
    const { error } = await supabase
      .from('proyectos')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  async reorderProjects(orderedIds) {
    for (let i = 0; i < orderedIds.length; i++) {
      const { error } = await supabase
        .from('proyectos')
        .update({ orden: i + 1 })
        .eq('id', orderedIds[i]);
      if (error) throw error;
    }
    return this.getProjects();
  },

  // --- TECNOLOGÍAS ---
  async getTechnologies() {
    const { data, error } = await supabase
      .from('tecnologias')
      .select('*');
    if (error) {
      console.error("Error al obtener tecnologías:", error);
      return [];
    }
    return data;
  },

  async saveTechnology(tech) {
    const techData = {
      nombre: tech.nombre,
      categoria: tech.categoria
    };

    if (tech.id) {
      const { error } = await supabase
        .from('tecnologias')
        .update(techData)
        .eq('id', tech.id);
      if (error) throw error;
    } else {
      const id = "tech-" + Date.now();
      const { error } = await supabase
        .from('tecnologias')
        .insert({ id, ...techData });
      if (error) throw error;
    }
    return tech;
  },

  async deleteTechnology(id) {
    const { error } = await supabase
      .from('tecnologias')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  // --- FORMACIÓN ---
  async getEducation() {
    const { data, error } = await supabase
      .from('formacion')
      .select('*');
    if (error) {
      console.error("Error al obtener formación:", error);
      return [];
    }
    return data;
  },

  async saveEducation(edu) {
    const eduData = {
      titulo: edu.titulo
    };

    if (edu.id) {
      const { error } = await supabase
        .from('formacion')
        .update(eduData)
        .eq('id', edu.id);
      if (error) throw error;
    } else {
      const id = "edu-" + Date.now();
      const { error } = await supabase
        .from('formacion')
        .insert({ id, ...eduData });
      if (error) throw error;
    }
    return edu;
  },

  async deleteEducation(id) {
    const { error } = await supabase
      .from('formacion')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  },

  // --- RESTABLECER ---
  async resetToDefault() {
    // 1. Borrar todas las filas actuales
    await supabase.from('proyectos').delete().neq('id', 'placeholder');
    await supabase.from('tecnologias').delete().neq('id', 'placeholder');
    await supabase.from('formacion').delete().neq('id', 'placeholder');
    
    // 2. Restaurar Perfil e información de contacto
    await supabase.from('perfil').update({
      nombre: DEFAULT_SEEDS.profile.nombre,
      subtitulo: DEFAULT_SEEDS.profile.subtitulo,
      hero_text: DEFAULT_SEEDS.profile.heroText,
      sobre_mi_text: DEFAULT_SEEDS.profile.sobreMiText,
      email: DEFAULT_SEEDS.contacto.email,
      github: DEFAULT_SEEDS.contacto.github,
      linkedin: DEFAULT_SEEDS.contacto.linkedin,
      cv_link: DEFAULT_SEEDS.contacto.cvLink
    }).eq('id', 1);

    // 3. Re-insertar proyectos
    for (let i = 0; i < DEFAULT_SEEDS.proyectos.length; i++) {
      const p = DEFAULT_SEEDS.proyectos[i];
      await supabase.from('proyectos').insert({
        id: p.id,
        nombre: p.nombre,
        descripcion: p.descripcion,
        papel: p.papel,
        tecnologias: p.tecnologias,
        aprendido: p.aprendido,
        demo_link: p.demoLink,
        github_link: p.githubLink,
        imagen: p.imagen,
        orden: i + 1
      });
    }

    // 4. Re-insertar tecnologías
    for (const t of DEFAULT_SEEDS.tecnologias) {
      await supabase.from('tecnologias').insert({
        id: t.id,
        nombre: t.nombre,
        categoria: t.categoria
      });
    }

    // 5. Re-insertar formación
    for (const e of DEFAULT_SEEDS.formacion) {
      await supabase.from('formacion').insert({
        id: e.id,
        titulo: e.titulo
      });
    }
  }
};

export default dataService;
