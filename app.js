/**
 * app.js
 * Controlador de la página pública del portafolio.
 * Carga los datos dinámicamente y gestiona eventos del DOM.
 */

import dataService from './dataService.js';

// Caché de secciones para optimizar el rendimiento del scroll
let sections = [];

// Elementos del DOM a actualizar
const DOM = {
  header: document.getElementById('header'),
  navMenu: document.getElementById('nav-menu'),
  navToggle: document.getElementById('nav-toggle'),
  navLinks: document.querySelectorAll('.nav-link'),
  
  // Hero
  heroTitle: document.getElementById('hero-title'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  heroText: document.getElementById('hero-text'),
  
  // Sobre mí
  aboutContainer: document.getElementById('about-text-container'),
  
  // Contenedores de renderizado dinámico
  projectsContainer: document.getElementById('projects-render-container'),
  techContainer: document.getElementById('tech-render-container'),
  educationContainer: document.getElementById('education-render-container'),
  
  // Contacto
  contactEmailBtn: document.getElementById('contact-email-btn'),
  contactGithubBtn: document.getElementById('contact-github-btn'),
  contactLinkedinBtn: document.getElementById('contact-linkedin-btn'),
  contactCvBtn: document.getElementById('contact-cv-btn')
};

// Cargar y renderizar todo el contenido público
export async function renderPublicPortfolio() {
  try {
    // 1. Cargar Perfil
    const profile = await dataService.getProfile();
    DOM.heroTitle.textContent = profile.nombre;
    DOM.heroSubtitle.textContent = profile.subtitulo;
    DOM.heroText.textContent = profile.heroText;
    
    // Renderizar Sobre Mí (procesando saltos de línea)
    DOM.aboutContainer.innerHTML = profile.sobreMiText
      .split('\n\n')
      .map(p => `<p>${p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`)
      .join('');

    // 2. Cargar Contacto
    const contacto = await dataService.getContacto();
    DOM.contactEmailBtn.href = `mailto:${contacto.email}`;
    DOM.contactGithubBtn.href = contacto.github;
    DOM.contactLinkedinBtn.href = contacto.linkedin;
    DOM.contactCvBtn.href = contacto.cvLink;

    // 3. Cargar Proyectos
    const projects = await dataService.getProjects();
    renderProjects(projects);

    // 4. Cargar Tecnologías
    const technologies = await dataService.getTechnologies();
    renderTechnologies(technologies);

    // 5. Cargar Formación
    const education = await dataService.getEducation();
    renderEducation(education);

    // Inicializar o refrescar iconos de Lucide
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Almacenar secciones para evitar consultas repetidas en el scroll
    sections = document.querySelectorAll('section');

  } catch (error) {
    console.error("Error renderizando el portafolio público:", error);
  }
}

// Renderizador de Tarjetas de Proyectos
function renderProjects(projects) {
  if (!projects || projects.length === 0) {
    DOM.projectsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
        <p>No hay proyectos cargados por el momento.</p>
      </div>
    `;
    return;
  }

  DOM.projectsContainer.innerHTML = projects.map(proj => {
    // Formatear tecnologías en badges
    const techBadges = proj.tecnologias
      ? proj.tecnologias.split(',').map(t => `<span class="tag-badge">${t.trim()}</span>`).join('')
      : '';

    // Gestión de links opcionales
    const showDemo = proj.demoLink && proj.demoLink !== '#';
    const showCode = proj.githubLink && proj.githubLink !== '#';
    
    const demoBtn = showDemo 
      ? `<a href="${proj.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Ver proyecto</a>`
      : '';
    const codeBtn = showCode
      ? `<a href="${proj.githubLink}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i data-lucide="github" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> Código</a>`
      : '';

    const imageElement = proj.imagen && proj.imagen.startsWith('http')
      ? `<img src="${proj.imagen}" alt="${proj.nombre}" loading="lazy">`
      : `<div class="project-image-placeholder"><span>[Imagen: ${proj.nombre}]</span></div>`;

    return `
      <div class="project-card glass" id="${proj.id}">
        <div class="project-image">
          ${imageElement}
        </div>
        <div class="project-content">
          <h3 class="project-title">${proj.nombre}</h3>
          <p class="project-description">${proj.descripcion}</p>
          
          <div class="project-info-block">
            <div class="info-label">Mi papel:</div>
            <div class="info-val">${proj.papel}</div>
          </div>
          
          <div class="project-info-block">
            <div class="info-label">Qué he aprendido:</div>
            <div class="info-val" style="font-size:0.88rem; color:var(--text-muted); font-weight:300;">${proj.aprendido}</div>
          </div>

          <div class="project-info-block" style="margin-top:10px;">
            <div class="info-label">Herramientas:</div>
            <div class="project-tags" style="margin-top:6px; margin-bottom:0;">
              ${techBadges}
            </div>
          </div>

          <div class="project-links">
            ${demoBtn}
            ${codeBtn}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Renderizador de Tecnologías categorizadas
function renderTechnologies(technologies) {
  const categories = {
    sistemas: { title: "Sistemas y administración", icon: "server", class: "sistemas", items: [] },
    devops: { title: "DevOps y cloud", icon: "git-branch", class: "devops", items: [] },
    web: { title: "Web y bases de datos", icon: "database", class: "web", items: [] },
    ia: { title: "IA aplicada", icon: "cpu", class: "ia", items: [] }
  };

  // Clasificar tecnologías en sus categorías
  technologies.forEach(tech => {
    if (categories[tech.categoria]) {
      categories[tech.categoria].items.push(tech);
    }
  });

  DOM.techContainer.innerHTML = Object.keys(categories).map(catKey => {
    const cat = categories[catKey];
    
    if (cat.items.length === 0) return '';

    const itemsHTML = cat.items.map(tech => `
      <span class="tech-item">
        <span class="tech-dot ${cat.class}"></span>
        ${tech.nombre}
      </span>
    `).join('');

    return `
      <div class="tech-category-card glass">
        <div class="tech-category-header">
          <div class="tech-category-icon ${cat.class}">
            <i data-lucide="${cat.icon}" style="width: 18px; height: 18px; color: #fff;"></i>
          </div>
          <h3 class="tech-category-title">${cat.title}</h3>
        </div>
        <div class="tech-list">
          ${itemsHTML}
        </div>
      </div>
    `;
  }).join('');
}

// Renderizador de Formación (Línea de tiempo)
function renderEducation(education) {
  if (!education || education.length === 0) {
    DOM.educationContainer.innerHTML = '<p style="text-align:center;color:var(--text-muted);">Sin elementos de formación.</p>';
    return;
  }

  DOM.educationContainer.innerHTML = education.map(edu => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card glass">
        <h3 class="timeline-title">${edu.titulo}</h3>
      </div>
    </div>
  `).join('');
}

/* --- INTERACCIONES DEL MENU Y SCROLL --- */

// Toggle Menú Móvil
DOM.navToggle.addEventListener('click', () => {
  DOM.navToggle.classList.toggle('active');
  DOM.navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en enlaces
DOM.navLinks.forEach(link => {
  link.addEventListener('click', () => {
    DOM.navToggle.classList.remove('active');
    DOM.navMenu.classList.remove('active');
  });
});

// Mostrar notificación tipo Toast en la web pública
function showPublicToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = "toast"; // Reset
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Copiar correo al portapapeles al hacer clic (soluciona cuando mailto no responde por no tener cliente de correo)
DOM.contactEmailBtn.addEventListener('click', (e) => {
  const emailHref = DOM.contactEmailBtn.getAttribute('href');
  if (emailHref && emailHref.startsWith('mailto:')) {
    const email = emailHref.replace('mailto:', '');
    navigator.clipboard.writeText(email)
      .then(() => {
        showPublicToast(`¡Email copiado al portapapeles! (${email})`);
      })
      .catch(err => {
        console.error("Error al copiar correo al portapapeles:", err);
      });
  }
});

// Estilo de Header en Scroll e Indicador Activo de Menú (Optimizado con requestAnimationFrame)
let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
});

function handleScroll() {
  if (!DOM.header) return;

  // Cambio de altura y fondo del menú superior
  if (window.scrollY > 50) {
    DOM.header.classList.add('scrolled');
  } else {
    DOM.header.classList.remove('scrolled');
  }

  // Enlace activo según la sección visible
  if (sections.length === 0) return;
  
  let currentSectionId = 'inicio';
  const scrollPosition = window.scrollY + 120; // Offset de la cabecera
  
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      currentSectionId = sec.getAttribute('id');
    }
  });

  DOM.navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Cargar página al inicio e inicializar caché de secciones
document.addEventListener('DOMContentLoaded', async () => {
  await renderPublicPortfolio();
  sections = document.querySelectorAll('section');
});
