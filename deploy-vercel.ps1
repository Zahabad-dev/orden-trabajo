# Script de despliegue automatizado para Vercel
# Ejecutar con: .\deploy-vercel.ps1

Write-Host "🚀 Desplegando Orden de Trabajo en Vercel..." -ForegroundColor Cyan
Write-Host ""

# Verificar si Vercel CLI está instalado
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue

if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI no está instalado." -ForegroundColor Red
    Write-Host "📦 Instalando Vercel CLI globalmente..." -ForegroundColor Yellow
    npm install -g vercel
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar Vercel CLI. Verifica que Node.js esté instalado." -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Vercel CLI instalado correctamente" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Opciones de despliegue:" -ForegroundColor Yellow
Write-Host "  1. Preview (desarrollo/pruebas)"
Write-Host "  2. Producción (sitio final)"
Write-Host ""

$choice = Read-Host "Selecciona una opción (1 o 2)"

if ($choice -eq "2") {
    Write-Host ""
    Write-Host "🌐 Desplegando a PRODUCCIÓN..." -ForegroundColor Magenta
    vercel --prod
} else {
    Write-Host ""
    Write-Host "🔍 Desplegando PREVIEW..." -ForegroundColor Cyan
    vercel
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡Despliegue exitoso!" -ForegroundColor Green
    Write-Host "🌍 Tu sitio está en línea. Vercel te mostró la URL arriba ☝️" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "💡 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "   • Abre la URL en tu navegador"
    Write-Host "   • Configura tu número de WhatsApp"
    Write-Host "   • Habilita notificaciones"
    Write-Host "   • ¡Empieza a gestionar órdenes!"
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Hubo un error en el despliegue." -ForegroundColor Red
    Write-Host "💡 Verifica que hayas iniciado sesión: vercel login" -ForegroundColor Yellow
}
