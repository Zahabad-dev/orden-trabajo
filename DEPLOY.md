# Guía Rápida de Despliegue en Vercel

## ⚡ Opción más rápida (3 pasos)

### 1. Instala Vercel CLI
```powershell
npm i -g vercel
```

### 2. Ve a la carpeta del proyecto
```powershell
cd "d:\PxY\laboratorio2\Compañias\LATIRANA\ORTR"
```

### 3. Despliega
```powershell
vercel
```

Sigue el asistente (acepta los valores por defecto).

### 4. Producción (opcional)
```powershell
vercel --prod
```

---

## 🔗 URLs después del deploy

Vercel te dará:
- **Preview**: `https://orden-trabajo-latirana-xxxxx.vercel.app`
- **Producción**: `https://orden-trabajo-latirana.vercel.app`

---

## ✅ Verificación

1. Abre la URL en tu navegador
2. Prueba crear una orden
3. Verifica las alertas (Config → Permitir notificaciones)
4. Exporta a Excel/CSV/Word

---

## 🎯 Ventajas de Vercel

- ✅ HTTPS automático (gratis)
- ✅ CDN global (carga rápida en todo el mundo)
- ✅ Deploy en < 30 segundos
- ✅ 100 GB bandwidth gratis/mes
- ✅ Dominios personalizados (gratis)
- ✅ Analytics y logs incluidos

---

## 🆘 Si tienes problemas

```powershell
# Login de nuevo
vercel login

# Ver proyectos
vercel list

# Eliminar deploy anterior
vercel remove orden-trabajo-latirana
```

---

**¿Prefieres GitHub?** Lee `README.md` → Opción 2
