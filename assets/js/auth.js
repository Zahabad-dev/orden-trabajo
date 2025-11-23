// ============================================
// SISTEMA DE AUTENTICACIÓN CON SUPABASE
// ============================================

let currentUser = null;

// Elementos del DOM
const loginScreen = document.getElementById('loginScreen');
const registerScreen = document.getElementById('registerScreen');
const appScreen = document.getElementById('appScreen');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
// Nota: el botón de logout puede no estar listo al cargar el script en algunos navegadores
// Por eso adjuntamos el listener de forma segura cuando la app se muestra
const userInfo = document.getElementById('userInfo');

// ============================================
// INICIALIZACIÓN
// ============================================

async function initAuth() {
  // Verificar si hay sesión activa
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    currentUser = session.user;
    showApp();
  } else {
    showLogin();
  }

  // Escuchar cambios en la autenticación
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      currentUser = session.user;
      showApp();
    } else if (event === 'SIGNED_OUT') {
      currentUser = null;
      showLogin();
    }
  });
}

// ============================================
// NAVEGACIÓN ENTRE PANTALLAS
// ============================================

function showLogin() {
  loginScreen.style.display = 'flex';
  registerScreen.style.display = 'none';
  appScreen.style.display = 'none';
}

function showRegister() {
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'flex';
  appScreen.style.display = 'none';
}

function showApp() {
  loginScreen.style.display = 'none';
  registerScreen.style.display = 'none';
  appScreen.style.display = 'block';
  
  // Mostrar información del usuario
  if (currentUser) {
    userInfo.textContent = `👤 ${currentUser.email}`;
  }
  
  // Asegurar que el botón de logout tenga su listener
  attachLogoutHandler();
  
  // Cargar datos de la aplicación
  if (typeof loadOrders === 'function') {
    loadOrders();
  }
}

// ============================================
// MANEJO DE FORMULARIOS
// ============================================

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    notify('¡Bienvenido! Sesión iniciada correctamente', 'success');
  } catch (error) {
    notify('Error al iniciar sesión: ' + error.message, 'error');
  }
});

// Registro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const name = document.getElementById('registerName').value;
  
  if (password.length < 6) {
    notify('La contraseña debe tener al menos 6 caracteres', 'error');
    return;
  }
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });
    
    if (error) throw error;
    
    notify('¡Cuenta creada! Revisa tu email para confirmar (o inicia sesión directamente)', 'success');
    
    // Limpiar formulario
    registerForm.reset();
    
    // Mostrar login después de 2 segundos
    setTimeout(() => showLogin(), 2000);
  } catch (error) {
    notify('Error al crear cuenta: ' + error.message, 'error');
  }
});

// Cerrar sesión (seguro en móviles y navegadores con carga diferida)
function attachLogoutHandler() {
  const btn = document.getElementById('logoutBtn');
  if (!btn || btn._listenerAttached) return;

  // Limpia artefactos locales de auth (resiliente en navegadores móviles)
  const cleanupLocalAuthArtifacts = () => {
    try {
      // Borrar claves de Supabase en local/session storage
      const patterns = ['sb-', 'supabase', 'auth'];
      for (let store of [localStorage, sessionStorage]) {
        try {
          const keys = Object.keys(store);
          for (const k of keys) {
            if (patterns.some(p => k.toLowerCase().includes(p))) {
              store.removeItem(k);
            }
          }
        } catch (_) { /* ignorar store inaccesible (modo privado) */ }
      }
    } catch (_) { /* noop */ }
  };

  btn.addEventListener('click', async () => {
    btn.disabled = true;
    let signoutError = null;
    try {
      // Intento 1: cerrar solo la sesión local (más seguro en multi-pestaña)
      const res1 = await supabase.auth.signOut({ scope: 'local' });
      if (res1?.error) throw res1.error;
    } catch (err1) {
      signoutError = err1;
      // Intento 2: fallback a cierre global si la local falla (revoca refresh token)
      try {
        const res2 = await supabase.auth.signOut({ scope: 'global' });
        if (res2?.error) throw res2.error;
        signoutError = null; // éxito en fallback
      } catch (err2) {
        // Si ambas fallan, no bloquear: haremos limpieza local y continuamos
        signoutError = err2 || err1;
      }
    }

    if (signoutError) {
      console.warn('SignOut no limpio, aplicando limpieza local:', signoutError);
    }

    // Limpieza local y redirección forzada para evitar estados residuales
    cleanupLocalAuthArtifacts();
    notify(signoutError ? 'Sesión finalizada localmente' : 'Sesión cerrada correctamente', signoutError ? 'warning' : 'success');

    // Usar replace para evitar volver con back; asegurar origen raíz
    const target = window.location.origin + '/';
    setTimeout(() => { window.location.replace(target); }, 150);

    btn.disabled = false;
  });
  btn._listenerAttached = true;
}

// Cambiar entre pantallas
showRegisterLink.addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});

showLoginLink.addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});

// ============================================
// HELPER: Obtener usuario actual
// ============================================

function getCurrentUser() {
  return currentUser;
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAuth);
document.addEventListener('DOMContentLoaded', attachLogoutHandler);
