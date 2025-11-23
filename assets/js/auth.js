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
const logoutBtn = document.getElementById('logoutBtn');
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

// Cerrar sesión
logoutBtn.addEventListener('click', async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    notify('Sesión cerrada correctamente', 'success');
  } catch (error) {
    notify('Error al cerrar sesión: ' + error.message, 'error');
  }
});

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
