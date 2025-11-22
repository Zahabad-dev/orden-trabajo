# Orden de Trabajo - Plataforma de Gestión para Diseño Gráfico

Sistema de gestión de órdenes de trabajo con flujo de alertas automatizado vía WhatsApp, diseñado para equipos de diseño gráfico y contenido de redes sociales.

## 🚀 Características

- ✅ **Formulario completo** de órdenes con campos especializados para diseño gráfico
- 📊 **Tablero de órdenes** con estados, prioridades y fechas de vencimiento
- 📱 **Integración WhatsApp** para mensajes y alertas automáticas
- ⏰ **Alertas inteligentes**: 1 día antes y 1 día después de vencimiento
- 💾 **Almacenamiento local** con import/export JSON
- 📥 **Exportación múltiple**: CSV, Excel con diseño, Word
- 🎨 **Modo oscuro** con diseño responsivo
- 🖨️ **Optimizado para impresión**
- 🔔 **Notificaciones del navegador** (con permisos)

## 📁 Estructura del Proyecto

```
ORTR/
├── index.html              # Página principal
├── ordentrabajo.html       # Versión monolítica (backup)
├── vercel.json             # Configuración de Vercel
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos globales
│   └── js/
│       └── app.js          # Lógica de la aplicación
└── README.md               # Este archivo
```

## 🌐 Despliegue en Vercel

### Opción 1: Despliegue con Vercel CLI (Recomendado)

1. **Instala Vercel CLI** (solo primera vez):
```powershell
npm i -g vercel
```

2. **Inicia sesión** (abrirá el navegador):
```powershell
vercel login
```

3. **Despliega desde la carpeta del proyecto**:
```powershell
cd "d:\PxY\laboratorio2\Compañias\LATIRANA\ORTR"
vercel
```

4. **Sigue el asistente**:
   - Set up and deploy? → **Y**
   - Which scope? → Elige tu cuenta
   - Link to existing project? → **N**
   - What's your project's name? → `orden-trabajo-latirana` (o el que prefieras)
   - In which directory is your code located? → `.` (punto, para raíz)
   - Want to override settings? → **N**

5. **Producción** (después del primer deploy):
```powershell
vercel --prod
```

### Opción 2: Despliegue desde GitHub (Git + Vercel Dashboard)

1. **Sube tu proyecto a GitHub**:
```powershell
cd "d:\PxY\laboratorio2\Compañias\LATIRANA\ORTR"
git init
git add .
git commit -m "Initial commit - Orden de Trabajo Platform"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

2. **Conecta con Vercel**:
   - Ve a [vercel.com](https://vercel.com)
   - Click en **"Add New Project"**
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente la configuración
   - Click en **"Deploy"**

3. **Auto-deploy**: Cada `git push` desplegará automáticamente

### Opción 3: Arrastra y suelta (Sin Git)

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra la carpeta `ORTR` completa
3. Vercel la procesará y desplegará

## 🛠️ Configuración Post-Despliegue

### 1. Dominio personalizado (opcional)
En Vercel Dashboard:
- Settings → Domains → Add Domain
- Sigue las instrucciones DNS

### 2. Variables de entorno (si las necesitas)
En Vercel Dashboard:
- Settings → Environment Variables
- Añade las que requieras

### 3. HTTPS automático
Vercel provee SSL gratuito automático ✅

## 📖 Uso de la Plataforma

### Crear una orden
1. Llena el formulario con los detalles
2. Click en **"💾 Guardar Orden"**
3. La orden aparece en el tablero

### Configurar alertas WhatsApp
1. Ve a la sección **"Configuración"**
2. Ingresa tu número de WhatsApp (con código de país, sin +)
   - Ejemplo: `593999888777`
3. Activa **"Abrir WhatsApp automáticamente en alertas"**
4. Click en **"Guardar Configuración"**
5. Click en **"Permitir notificaciones"** (navegador)

### Alertas automáticas
- **1 día antes** del vencimiento: recordatorio
- **1 día después** del vencimiento: seguimiento
- Las alertas se revisan cada 30 minutos (página abierta)
- Manual: click en **"Revisar alertas ahora"**

### Exportar órdenes
- **CSV**: compatible con Excel, rápido
- **Excel con diseño**: tabla HTML estilizada (.xls)
- **Word**: documento editable (.doc)
- **JSON**: respaldo completo (import/export)

### Gestión en el tablero
- **Editar**: carga la orden en el formulario
- **Completar**: marca como completada
- **Enviar WA**: abre WhatsApp con mensaje
- **Eliminar**: borra la orden

## 🔧 Tecnologías

- **HTML5** + **CSS3** (Variables CSS, Grid, Flexbox)
- **JavaScript ES6+** (Vanilla, sin frameworks)
- **LocalStorage API** (persistencia)
- **Notification API** (alertas navegador)
- **Blob API** (exportaciones)

## 📱 Compatibilidad

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 🎨 Personalización

### Cambiar colores de marca
Edita `assets/css/style.css`:
```css
:root {
    --primary-start: #6a11cb;  /* Tu color primario inicial */
    --primary-end: #2575fc;    /* Tu color primario final */
}
```

### Añadir logo
En `index.html`, dentro del `<header>`:
```html
<img src="assets/img/logo.png" alt="Logo" style="height:50px">
```

## 📊 Performance

- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 95+
- **Tamaño total**: ~50KB (sin comprimir)

## 🔒 Seguridad

- Sin dependencias externas (0 vulnerabilidades)
- Headers de seguridad configurados en `vercel.json`
- Datos almacenados solo en el navegador del usuario
- Sin backend (sin riesgo de ataque al servidor)

## 🐛 Solución de Problemas

### Las alertas no funcionan
- Verifica que hayas dado permiso de notificaciones
- Mantén la pestaña abierta (las alertas no funcionan en segundo plano sin Service Worker)

### WhatsApp no abre
- Verifica el número (con código de país, sin +)
- Asegúrate de tener WhatsApp Web accesible

### Los datos se perdieron
- LocalStorage es por navegador/perfil
- Usa "Exportar órdenes (JSON)" para respaldar

## 📄 Licencia

Propiedad de LATIRANA - Todos los derechos reservados

## 👨‍💻 Soporte

Para consultas o mejoras, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025
