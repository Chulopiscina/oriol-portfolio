/**
 * admin.js
 * Controlador del Panel de Administración y Seguridad.
 * 
 * NOTA DE SEGURIDAD IMPORTANTE:
 * Ocultar el enlace de acceso ("admin") con opacidad baja y comprobar la contraseña en el
 * navegador es una solución provisional y discreta para portafolios estáticos. No proporciona
 * seguridad a nivel de servidor.
 * 
 * MIGRACIÓN A PRODUCCIÓN:
 * Para asegurar este panel de manera real en el futuro:
 * 1. Utiliza un servicio de Backend-as-a-Service como Supabase Auth o Firebase Auth.
 * 2. Protege los endpoints o reglas de escritura de la base de datos para que solo usuarios
 *    autenticados con un rol 'admin' puedan realizar operaciones de POST/PUT/DELETE.
 * 3. En dataService.js, realiza las peticiones HTTP pasando el token de sesión JWT obtenido.
 */

import dataService from './dataService.js';
import { renderPublicPortfolio } from './app.js';

// Configuración de Seguridad
const ADMIN_PASSWORD = "Pelota.1";

// Selectores del DOM
const DOM = {
  // Triggers y Modales de login
  adminTrigger: document.getElementById('admin-trigger'),
  loginModal: document.getElementById('admin-login-modal'),
  loginForm: document.getElementById('admin-login-form'),
  loginPasswordInput: document.getElementById('admin-password'),
  loginErrorMsg: document.getElementById('login-error-msg'),
  btnCancelLogin: document.getElementById('btn-cancel-login'),
  
  // Dashboard principal
  dashboard: document.getElementById('admin-dashboard'),
  btnLogout: document.getElementById('btn-logout'),
  btnResetData: document.getElementById('btn-reset-data'),
  adminMenuTabs: document.querySelectorAll('.admin-menu-item'),
  adminTabContents: document.querySelectorAll('.admin-tab-content'),
  adminSectionTitle: document.getElementById('admin-section-title'),
  toast: document.getElementById('toast'),
  
  // Formulario Perfil
  profileForm: document.getElementById('form-profile-admin'),
  profileName: document.getElementById('profile-name'),
  profileSubtitle: document.getElementById('profile-subtitle'),
  profileHero: document.getElementById('profile-hero'),
  profileAbout: document.getElementById('profile-about'),
  
  // Gestión de Proyectos
  projectsListView: document.getElementById('projects-list-view'),
  projectFormView: document.getElementById('project-form-view'),
  projectsAdminList: document.getElementById('projects-admin-list'),
  projectForm: document.getElementById('form-project-editor'),
  projectFormTitle: document.getElementById('project-form-title'),
  btnAddProject: document.getElementById('btn-add-project'),
  btnCancelProject: document.getElementById('btn-cancel-project'),
  
  // Campos del Formulario de Proyectos
  projId: document.getElementById('project-id'),
  projName: document.getElementById('project-name'),
  projImageUrl: document.getElementById('project-image-url'),
  projDesc: document.getElementById('project-desc'),
  projRole: document.getElementById('project-role'),
  projTech: document.getElementById('project-tech'),
  projLearned: document.getElementById('project-learned'),
  projDemo: document.getElementById('project-demo'),
  projCode: document.getElementById('project-code'),

  // Gestión de Tecnologías
  techAdminList: document.getElementById('tech-admin-list'),
  techFormView: document.getElementById('tech-form-view'),
  techForm: document.getElementById('form-tech-editor'),
  techFormTitle: document.getElementById('tech-form-title'),
  btnAddTech: document.getElementById('btn-add-tech'),
  btnCancelTech: document.getElementById('btn-cancel-tech'),
  techId: document.getElementById('tech-id'),
  techName: document.getElementById('tech-name'),
  techCategory: document.getElementById('tech-category'),

  // Gestión de Formación
  eduAdminList: document.getElementById('edu-admin-list'),
  eduFormView: document.getElementById('edu-form-view'),
  eduForm: document.getElementById('form-edu-editor'),
  eduFormTitle: document.getElementById('edu-form-title'),
  btnAddEdu: document.getElementById('btn-add-edu'),
  btnCancelEdu: document.getElementById('btn-cancel-edu'),
  eduId: document.getElementById('edu-id'),
  eduTitle: document.getElementById('edu-title'),

  // Formulario Contacto
  contactoForm: document.getElementById('form-contacto-admin'),
  contactEmail: document.getElementById('contact-email'),
  contactGithub: document.getElementById('contact-github'),
  contactLinkedin: document.getElementById('contact-linkedin'),
  contactCv: document.getElementById('contact-cv')
};

// --- GESTIÓN DE NOTIFICACIONES (TOAST) ---
function showToast(message, isError = false) {
  DOM.toast.textContent = message;
  DOM.toast.className = "toast"; // Reset
  if (isError) {
    DOM.toast.classList.add('error');
  }
  DOM.toast.classList.add('show');
  setTimeout(() => {
    DOM.toast.classList.remove('show');
  }, 3000);
}

// --- AUTENTICACIÓN ---

// Comprobar estado de autenticación al arrancar
function checkSession() {
  const isAuth = sessionStorage.getItem('admin_authenticated') === 'true';
  if (isAuth) {
    openDashboard();
  }
}

// Abrir Modal de Login
DOM.adminTrigger.addEventListener('click', () => {
  DOM.loginModal.classList.add('active');
  DOM.loginPasswordInput.value = '';
  DOM.loginErrorMsg.style.display = 'none';
  DOM.loginPasswordInput.focus();
});

// Cancelar Login
DOM.btnCancelLogin.addEventListener('click', () => {
  DOM.loginModal.classList.remove('active');
});

// Enviar Formulario de Login
DOM.loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = DOM.loginPasswordInput.value;
  
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('admin_authenticated', 'true');
    DOM.loginModal.classList.remove('active');
    openDashboard();
    showToast("Sesión iniciada correctamente.");
  } else {
    DOM.loginErrorMsg.style.display = 'block';
    DOM.loginPasswordInput.focus();
    DOM.loginPasswordInput.select();
  }
});

// Cerrar Sesión
DOM.btnLogout.addEventListener('click', () => {
  sessionStorage.removeItem('admin_authenticated');
  closeDashboard();
  showToast("Sesión cerrada.");
});

// Abrir e Inicializar Dashboard
function openDashboard() {
  DOM.dashboard.classList.add('active');
  document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  
  // Cargar pestañas por defecto
  switchTab('perfil');
  loadProfileData();
  
  // Recargar iconos en el dashboard
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Cerrar Dashboard
function closeDashboard() {
  DOM.dashboard.classList.remove('active');
  document.body.style.overflow = ''; // Restaurar scroll
}

// --- CONMUTADOR DE PESTAÑAS ---
DOM.adminMenuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabName = tab.getAttribute('data-tab');
    switchTab(tabName);
  });
});

function switchTab(tabName) {
  // Desactivar todas las pestañas y contenidos
  DOM.adminMenuTabs.forEach(t => t.classList.remove('active'));
  DOM.adminTabContents.forEach(c => c.classList.remove('active'));
  
  // Activar seleccionada
  const selectedTab = Array.from(DOM.adminMenuTabs).find(t => t.getAttribute('data-tab') === tabName);
  if (selectedTab) selectedTab.classList.add('active');
  
  const selectedContent = document.getElementById(`tab-${tabName}`);
  if (selectedContent) selectedContent.classList.add('active');

  // Actualizar título de cabecera del panel
  let title = "Panel de Control";
  switch (tabName) {
    case 'perfil':
      title = "Perfil Personal";
      loadProfileData();
      break;
    case 'proyectos-admin':
      title = "Gestión de Proyectos";
      loadProjectsList();
      break;
    case 'tecnologias-admin':
      title = "Gestión de Tecnologías";
      loadTechnologiesList();
      break;
    case 'formacion-admin':
      title = "Gestión de Formación";
      loadEducationList();
      break;
    case 'contacto-admin':
      title = "Enlaces de Contacto";
      loadContactoData();
      break;
  }
  DOM.adminSectionTitle.textContent = title;
}

// --- PESTAÑA: PERFIL ---
async function loadProfileData() {
  const profile = await dataService.getProfile();
  DOM.profileName.value = profile.nombre;
  DOM.profileSubtitle.value = profile.subtitulo;
  DOM.profileHero.value = profile.heroText;
  DOM.profileAbout.value = profile.sobreMiText;
}

DOM.profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const updates = {
    nombre: DOM.profileName.value,
    subtitulo: DOM.profileSubtitle.value,
    heroText: DOM.profileHero.value,
    sobreMiText: DOM.profileAbout.value
  };
  await dataService.updateProfile(updates);
  await renderPublicPortfolio(); // Actualiza web pública
  showToast("Perfil guardado con éxito.");
});

// --- PESTAÑA: CONTACTO ---
async function loadContactoData() {
  const contacto = await dataService.getContacto();
  DOM.contactEmail.value = contacto.email;
  DOM.contactGithub.value = contacto.github;
  DOM.contactLinkedin.value = contacto.linkedin;
  DOM.contactCv.value = contacto.cvLink;
}

DOM.contactoForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const updates = {
    email: DOM.contactEmail.value,
    github: DOM.contactGithub.value,
    linkedin: DOM.contactLinkedin.value,
    cvLink: DOM.contactCv.value
  };
  await dataService.updateContacto(updates);
  await renderPublicPortfolio();
  showToast("Enlaces de contacto guardados.");
});

// --- PESTAÑA: PROYECTOS ---
async function loadProjectsList() {
  const projects = await dataService.getProjects();
  
  if (projects.length === 0) {
    DOM.projectsAdminList.innerHTML = '<p style="color:var(--text-muted);padding:10px;">No hay proyectos. Añade uno nuevo.</p>';
    return;
  }

  DOM.projectsAdminList.innerHTML = projects.map((proj, index) => {
    const isFirst = index === 0;
    const isLast = index === projects.length - 1;
    
    return `
      <div class="admin-item-row" data-id="${proj.id}">
        <div class="admin-item-info">
          <span class="admin-item-title">${proj.nombre}</span>
          <span class="admin-item-subtitle">${proj.tecnologias}</span>
        </div>
        <div class="admin-item-actions">
          <button class="icon-btn btn-move-up" data-id="${proj.id}" ${isFirst ? 'disabled style="opacity:0.2;cursor:not-allowed;"' : ''} title="Subir orden">
            <i data-lucide="arrow-up" style="width:14px;height:14px;"></i>
          </button>
          <button class="icon-btn btn-move-down" data-id="${proj.id}" ${isLast ? 'disabled style="opacity:0.2;cursor:not-allowed;"' : ''} title="Bajar orden">
            <i data-lucide="arrow-down" style="width:14px;height:14px;"></i>
          </button>
          <button class="icon-btn btn-edit-project" data-id="${proj.id}" title="Editar proyecto">
            <i data-lucide="edit" style="width:14px;height:14px;"></i>
          </button>
          <button class="icon-btn delete btn-delete-project" data-id="${proj.id}" title="Eliminar proyecto">
            <i data-lucide="trash" style="width:14px;height:14px;"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Registrar eventos para la lista de proyectos
  DOM.projectsAdminList.querySelectorAll('.btn-edit-project').forEach(btn => {
    btn.addEventListener('click', () => openProjectEditor(btn.getAttribute('data-id')));
  });

  DOM.projectsAdminList.querySelectorAll('.btn-delete-project').forEach(btn => {
    btn.addEventListener('click', () => deleteProject(btn.getAttribute('data-id')));
  });

  DOM.projectsAdminList.querySelectorAll('.btn-move-up').forEach(btn => {
    btn.addEventListener('click', () => moveProjectOrder(btn.getAttribute('data-id'), 'up'));
  });

  DOM.projectsAdminList.querySelectorAll('.btn-move-down').forEach(btn => {
    btn.addEventListener('click', () => moveProjectOrder(btn.getAttribute('data-id'), 'down'));
  });
}

// Abrir formulario para Añadir
DOM.btnAddProject.addEventListener('click', () => {
  DOM.projectFormTitle.textContent = "Añadir Proyecto";
  DOM.projectForm.reset();
  DOM.projId.value = "";
  DOM.projectsListView.style.display = 'none';
  DOM.projectFormView.style.display = 'block';
});

// Cancelar formulario
DOM.btnCancelProject.addEventListener('click', () => {
  DOM.projectsListView.style.display = 'block';
  DOM.projectFormView.style.display = 'none';
});

// Abrir formulario para Editar
async function openProjectEditor(id) {
  const projects = await dataService.getProjects();
  const proj = projects.find(p => p.id === id);
  if (!proj) return;

  DOM.projectFormTitle.textContent = "Editar Proyecto";
  DOM.projId.value = proj.id;
  DOM.projName.value = proj.nombre;
  DOM.projImageUrl.value = proj.imagen || "";
  DOM.projDesc.value = proj.descripcion;
  DOM.projRole.value = proj.papel;
  DOM.projTech.value = proj.tecnologias;
  DOM.projLearned.value = proj.aprendido;
  DOM.projDemo.value = proj.demoLink || "#";
  DOM.projCode.value = proj.githubLink || "#";

  DOM.projectsListView.style.display = 'none';
  DOM.projectFormView.style.display = 'block';
}

// Guardar Proyecto (Añadir o Editar)
DOM.projectForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const projectObj = {
    id: DOM.projId.value || undefined,
    nombre: DOM.projName.value,
    descripcion: DOM.projDesc.value,
    papel: DOM.projRole.value,
    tecnologias: DOM.projTech.value,
    aprendido: DOM.projLearned.value,
    demoLink: DOM.projDemo.value || "#",
    githubLink: DOM.projCode.value || "#",
    imagen: DOM.projImageUrl.value || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  };

  await dataService.saveProject(projectObj);
  await renderPublicPortfolio();
  
  DOM.projectsListView.style.display = 'block';
  DOM.projectFormView.style.display = 'none';
  
  loadProjectsList();
  showToast("Proyecto guardado con éxito.");
});

// Eliminar Proyecto
async function deleteProject(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este proyecto?")) {
    await dataService.deleteProject(id);
    await renderPublicPortfolio();
    loadProjectsList();
    showToast("Proyecto eliminado.");
  }
}

// Ordenar Proyectos
async function moveProjectOrder(id, direction) {
  const projects = await dataService.getProjects();
  const idx = projects.findIndex(p => p.id === id);
  if (idx === -1) return;

  const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= projects.length) return;

  // Intercambiar
  const temp = projects[idx];
  projects[idx] = projects[targetIdx];
  projects[targetIdx] = temp;

  const orderedIds = projects.map(p => p.id);
  await dataService.reorderProjects(orderedIds);
  await renderPublicPortfolio();
  loadProjectsList();
  showToast("Orden de proyectos actualizado.");
}

// --- PESTAÑA: TECNOLOGÍAS ---
async function loadTechnologiesList() {
  const technologies = await dataService.getTechnologies();
  
  const categories = {
    sistemas: "Sistemas y administración",
    devops: "DevOps y cloud",
    web: "Web y bases de datos",
    ia: "IA aplicada"
  };

  let html = "";
  
  Object.keys(categories).forEach(catKey => {
    const catTitle = categories[catKey];
    const catItems = technologies.filter(t => t.categoria === catKey);

    html += `
      <div style="margin-bottom: 24px;">
        <h4 style="font-size: 0.9rem; text-transform: uppercase; color: var(--accent-blue); margin-bottom:12px; font-weight: 600;">
          ${catTitle}
        </h4>
        <div style="display: flex; flex-direction: column; gap: 8px;">
    `;

    if (catItems.length === 0) {
      html += `<p style="font-size:0.85rem; color:var(--text-dark); padding-left: 10px;">Sin tecnologías en esta categoría.</p>`;
    } else {
      catItems.forEach(tech => {
        html += `
          <div class="admin-item-row" style="padding: 10px 16px; margin-bottom: 0;">
            <div class="admin-item-info">
              <span class="admin-item-title">${tech.nombre}</span>
            </div>
            <div class="admin-item-actions">
              <button class="icon-btn delete btn-delete-tech" data-id="${tech.id}" title="Eliminar">
                <i data-lucide="trash" style="width:12px;height:12px;"></i>
              </button>
            </div>
          </div>
        `;
      });
    }

    html += `
        </div>
      </div>
    `;
  });

  DOM.techAdminList.innerHTML = html;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  DOM.techAdminList.querySelectorAll('.btn-delete-tech').forEach(btn => {
    btn.addEventListener('click', () => deleteTech(btn.getAttribute('data-id')));
  });
}

// Añadir Tecnología
DOM.btnAddTech.addEventListener('click', () => {
  DOM.techFormTitle.textContent = "Añadir Tecnología";
  DOM.techForm.reset();
  DOM.techId.value = "";
  DOM.techFormView.style.display = 'block';
  DOM.techName.focus();
});

DOM.btnCancelTech.addEventListener('click', () => {
  DOM.techFormView.style.display = 'none';
});

DOM.techForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const techObj = {
    id: DOM.techId.value || undefined,
    nombre: DOM.techName.value,
    categoria: DOM.techCategory.value
  };
  
  await dataService.saveTechnology(techObj);
  await renderPublicPortfolio();
  DOM.techFormView.style.display = 'none';
  loadTechnologiesList();
  showToast("Tecnología guardada.");
});

async function deleteTech(id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta tecnología?")) {
    await dataService.deleteTechnology(id);
    await renderPublicPortfolio();
    loadTechnologiesList();
    showToast("Tecnología eliminada.");
  }
}

// --- PESTAÑA: FORMACIÓN ---
async function loadEducationList() {
  const education = await dataService.getEducation();

  if (education.length === 0) {
    DOM.eduAdminList.innerHTML = '<p style="color:var(--text-muted);padding:10px;">Sin registros de formación.</p>';
    return;
  }

  DOM.eduAdminList.innerHTML = education.map(edu => `
    <div class="admin-item-row" data-id="${edu.id}">
      <div class="admin-item-info">
        <span class="admin-item-title">${edu.titulo}</span>
      </div>
      <div class="admin-item-actions">
        <button class="icon-btn btn-edit-edu" data-id="${edu.id}" title="Editar">
          <i data-lucide="edit" style="width:14px;height:14px;"></i>
        </button>
        <button class="icon-btn delete btn-delete-edu" data-id="${edu.id}" title="Eliminar">
          <i data-lucide="trash" style="width:14px;height:14px;"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  DOM.eduAdminList.querySelectorAll('.btn-edit-edu').forEach(btn => {
    btn.addEventListener('click', () => editEdu(btn.getAttribute('data-id')));
  });

  DOM.eduAdminList.querySelectorAll('.btn-delete-edu').forEach(btn => {
    btn.addEventListener('click', () => deleteEdu(btn.getAttribute('data-id')));
  });
}

DOM.btnAddEdu.addEventListener('click', () => {
  DOM.eduFormTitle.textContent = "Añadir Formación";
  DOM.eduForm.reset();
  DOM.eduId.value = "";
  DOM.eduFormView.style.display = 'block';
  DOM.eduTitle.focus();
});

DOM.btnCancelEdu.addEventListener('click', () => {
  DOM.eduFormView.style.display = 'none';
});

async function editEdu(id) {
  const education = await dataService.getEducation();
  const edu = education.find(e => e.id === id);
  if (!edu) return;

  DOM.eduFormTitle.textContent = "Editar Formación";
  DOM.eduId.value = edu.id;
  DOM.eduTitle.value = edu.titulo;
  DOM.eduFormView.style.display = 'block';
  DOM.eduTitle.focus();
}

DOM.eduForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const eduObj = {
    id: DOM.eduId.value || undefined,
    titulo: DOM.eduTitle.value
  };

  await dataService.saveEducation(eduObj);
  await renderPublicPortfolio();
  DOM.eduFormView.style.display = 'none';
  loadEducationList();
  showToast("Elemento de formación guardado.");
});

async function deleteEdu(id) {
  if (confirm("¿Estás seguro de que quieres eliminar este elemento de formación?")) {
    await dataService.deleteEducation(id);
    await renderPublicPortfolio();
    loadEducationList();
    showToast("Formación eliminada.");
  }
}

// --- RESTABLECER DATOS POR DEFECTO ---
DOM.btnResetData.addEventListener('click', async () => {
  if (confirm("¿Estás seguro de que deseas restablecer TODOS los datos del portafolio a los valores por defecto? Se perderán todos tus cambios.")) {
    await dataService.resetToDefault();
    await renderPublicPortfolio();
    
    // Recargar pestaña activa
    const activeTab = Array.from(DOM.adminMenuTabs).find(t => t.classList.contains('active'));
    if (activeTab) {
      switchTab(activeTab.getAttribute('data-tab'));
    }
    
    showToast("Datos restablecidos con éxito.");
  }
});

// Comprobar sesión al inicio
document.addEventListener('DOMContentLoaded', checkSession);
