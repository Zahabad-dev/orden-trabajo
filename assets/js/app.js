// JS extraído de ordentrabajo.html

// Utilidad: notificación
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Exportación CSV (compatible con Excel)
function downloadExcel() {
    try {
        const orderNumber = document.getElementById('orderNumber').value || 'Sin número';
        const orderDate = document.getElementById('orderDate').value || 'No especificada';
        const dueDate = document.getElementById('dueDate').value || 'No especificada';
        const projectName = document.getElementById('projectName').value || 'Sin nombre';
        const designer = document.getElementById('designer').value || 'No asignado';
        const priority = document.getElementById('priority').value || 'No especificada';

        const contentTypes = [];
        if (document.getElementById('reels').checked) contentTypes.push('Reels');
        if (document.getElementById('posts').checked) contentTypes.push('Posts Instagram');
        if (document.getElementById('stories').checked) contentTypes.push('Historias');
        if (document.getElementById('carousel').checked) contentTypes.push('Carousel');
        if (document.getElementById('facebook').checked) contentTypes.push('Facebook Posts');
        if (document.getElementById('other').checked) contentTypes.push('Otro');

        const contentTitle = document.getElementById('contentTitle').value || 'No especificado';
        const contentText = document.getElementById('contentText').value || 'No especificado';
        const cta = document.getElementById('cta').value || 'No especificado';
        const hashtags = document.getElementById('hashtags').value || 'No especificados';
        const mentions = document.getElementById('mentions').value || 'No especificadas';

        const brandColors = document.getElementById('brandColors').value || 'No especificados';
        const fonts = document.getElementById('fonts').value || 'No especificadas';
        const logoUsage = document.getElementById('logoUsage').value || 'No especificado';
        const style = document.getElementById('style').value || 'No especificado';

        const resources = [];
        if (document.getElementById('logos').checked) resources.push('Logotipos');
        if (document.getElementById('images').checked) resources.push('Imágenes');
        if (document.getElementById('videos').checked) resources.push('Videos');
        if (document.getElementById('brandGuide').checked) resources.push('Guía de Marca');
        if (document.getElementById('copy').checked) resources.push('Textos/Copy');

        const resourceLinks = document.getElementById('resourceLinks').value || 'No proporcionados';
        const additionalNotes = document.getElementById('additionalNotes').value || 'No hay notas adicionales';

        const ref1 = document.getElementById('ref1').value || 'No proporcionada';
        const ref2 = document.getElementById('ref2').value || 'No proporcionada';
        const ref3 = document.getElementById('ref3').value || 'No proporcionada';

        const rows = [
            ['ORDEN DE TRABAJO - DISEÑO GRÁFICO'],
            [''],
            ['INFORMACIÓN BÁSICA'],
            ['Número de Orden', orderNumber],
            ['Fecha de Solicitud', orderDate],
            ['Fecha de Entrega', dueDate],
            ['Proyecto/Cliente', projectName],
            ['Diseñador Asignado', designer],
            ['Prioridad', priority],
            [''],
            ['TIPO DE CONTENIDO'],
            ['Contenidos Solicitados', contentTypes.join(', ')],
            [''],
            ['ESPECIFICACIONES DE CONTENIDO'],
            ['Título/Headline', contentTitle],
            ['Texto Principal', contentText],
            ['Llamado a la Acción (CTA)', cta],
            ['Hashtags', hashtags],
            ['Menciones/Etiquetas', mentions],
            [''],
            ['REFERENCIAS VISUALES'],
            ['Referencia 1', ref1],
            ['Referencia 2', ref2],
            ['Referencia 3', ref3],
            [''],
            ['ESPECIFICACIONES TÉCNICAS'],
            ['Colores de Marca', brandColors],
            ['Fuentes Tipográficas', fonts],
            ['Uso de Logo', logoUsage],
            ['Estilo de Diseño', style],
            [''],
            ['RECURSOS DISPONIBLES'],
            ['Recursos', resources.join(', ')],
            ['Enlaces a Recursos', resourceLinks],
            [''],
            ['NOTAS ADICIONALES'],
            ['Notas', additionalNotes],
            [''],
            ['INFORMACIÓN DE SEGUIMIENTO'],
            ['Estado', 'Pendiente'],
            ['Fecha de Inicio', ''],
            ['Fecha de Finalización', ''],
            ['Comentarios del Diseñador', '']
        ];

        const csvEscape = (val) => {
            const v = String(val ?? '');
            if (/[",\n\r]/.test(v)) return '"' + v.replace(/"/g, '""') + '"';
            return v;
        };
        const csv = rows.map(r => r.map(csvEscape).join(',')).join('\r\n');
        const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        const fileName = `Orden_Trabajo_${orderNumber.replace(/\s+/g, '_')}.csv`;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showNotification('¡Archivo CSV generado correctamente!');
    } catch (error) {
        console.error('Error al generar CSV:', error);
        showNotification('Error al descargar el archivo CSV');
    }
}

function generateWhatsAppMessage() {
    const project = document.getElementById('projectName').value || '[Nombre del Proyecto]';
    const dueDate = document.getElementById('dueDate').value || '[Fecha de Entrega]';
    const designer = document.getElementById('designer').value || '[Diseñador]';
    let contentTypes = [];
    if (document.getElementById('reels').checked) contentTypes.push('Reels');
    if (document.getElementById('posts').checked) contentTypes.push('Posts Instagram');
    if (document.getElementById('stories').checked) contentTypes.push('Historias');
    if (document.getElementById('carousel').checked) contentTypes.push('Carousel');
    if (document.getElementById('facebook').checked) contentTypes.push('Posts Facebook');
    const title = document.getElementById('contentTitle').value || '[Título]';
    const cta = document.getElementById('cta').value || '[CTA]';
    const resourceLinks = document.getElementById('resourceLinks').value || '';
    let message = `¡Hola! Tengo una nueva orden de trabajo para ti:\n\n`;
    message += `*Proyecto:* ${project}\n`;
    message += `*Fecha de entrega:* ${dueDate}\n`;
    message += `*Diseñador asignado:* ${designer}\n\n`;
    message += `*CONTENIDOS SOLICITADOS:*\n`;
    contentTypes.forEach(type => { message += `✅ ${type}\n`; });
    message += `\n*DETALLES DEL CONTENIDO:*\n`;
    message += `Título: ${title}\n`;
    message += `CTA: ${cta}\n\n`;
    message += `*REFERENCIAS VISUALES:*\n`;
    const ref1 = document.getElementById('ref1').value;
    const ref2 = document.getElementById('ref2').value;
    const ref3 = document.getElementById('ref3').value;
    if (ref1) message += `📷 Ref 1: ${ref1}\n`;
    if (ref2) message += `🎨 Ref 2: ${ref2}\n`;
    if (ref3) message += `📱 Ref 3: ${ref3}\n`;
    if (resourceLinks) {
        message += `\n*📎 ENLACES A RECURSOS:*\n`;
        const linksArray = resourceLinks.split('\n');
        linksArray.forEach(link => { if (link.trim()) message += `🔗 ${link.trim()}\n`; });
    }
    message += `\n*📂 RECURSOS DISPONIBLES:*\n`;
    if (document.getElementById('logos').checked) message += `✅ Logotipos\n`;
    if (document.getElementById('images').checked) message += `✅ Imágenes\n`;
    if (document.getElementById('videos').checked) message += `✅ Videos\n`;
    if (document.getElementById('brandGuide').checked) message += `✅ Guía de Marca\n`;
    if (document.getElementById('copy').checked) message += `✅ Textos/Copy\n`;
    message += `\nRevisa la orden completa para más detalles. ¡Gracias!`;
    alert("Mensaje de WhatsApp generado. Puedes copiarlo y enviarlo.");
    console.log(message);
    return message;
}

function copyWhatsApp() {
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message).then(() => showNotification("Texto copiado al portapapeles"));
}

function downloadWord() {
    const getVal = (id) => document.getElementById(id)?.value || '';
    const checked = (id) => document.getElementById(id)?.checked;
    const blocks = [
        ['INFORMACIÓN BÁSICA', [
            ['Número de Orden', getVal('orderNumber')],
            ['Fecha de Solicitud', getVal('orderDate')],
            ['Fecha de Entrega', getVal('dueDate')],
            ['Proyecto/Cliente', getVal('projectName')],
            ['Diseñador Asignado', getVal('designer')],
            ['Prioridad', document.getElementById('priority').value]
        ]],
        ['TIPO DE CONTENIDO', [[
            'Contenidos Solicitados',
            [checked('reels')&&'Reels', checked('posts')&&'Posts Instagram', checked('stories')&&'Historias', checked('carousel')&&'Carousel', checked('facebook')&&'Facebook Posts', checked('other')&&'Otro'].filter(Boolean).join(', ')
        ]]],
        ['ESPECIFICACIONES DE CONTENIDO', [
            ['Título/Headline', getVal('contentTitle')],
            ['Texto Principal', getVal('contentText')],
            ['Llamado a la Acción (CTA)', getVal('cta')],
            ['Hashtags', getVal('hashtags')],
            ['Menciones/Etiquetas', getVal('mentions')]
        ]],
        ['REFERENCIAS VISUALES', [
            ['Referencia 1', getVal('ref1')],
            ['Referencia 2', getVal('ref2')],
            ['Referencia 3', getVal('ref3')]
        ]],
        ['ESPECIFICACIONES TÉCNICAS', [
            ['Colores de Marca', getVal('brandColors')],
            ['Fuentes Tipográficas', getVal('fonts')],
            ['Uso de Logo', document.getElementById('logoUsage').value],
            ['Estilo de Diseño', document.getElementById('style').value]
        ]],
        ['RECURSOS DISPONIBLES', [
            ['Recursos', [checked('logos')&&'Logotipos', checked('images')&&'Imágenes', checked('videos')&&'Videos', checked('brandGuide')&&'Guía de Marca', checked('copy')&&'Textos/Copy'].filter(Boolean).join(', ')],
            ['Enlaces a Recursos', getVal('resourceLinks')]
        ]],
        ['NOTAS ADICIONALES', [[ 'Notas', getVal('additionalNotes') ]]]
    ];
    let html = '<html><head><meta charset="utf-8"><style>body{font-family:Segoe UI,Arial,sans-serif}h1{font-size:20pt}h2{font-size:14pt;margin:16px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px}table{width:100%;border-collapse:collapse;margin-bottom:8px}td{border:1px solid #ddd;padding:6px;vertical-align:top}</style></head><body>';
    html += '<h1>Orden de Trabajo - Diseño Gráfico</h1>';
    blocks.forEach(([title, rows]) => {
        html += `<h2>${title}</h2><table>`;
        rows.forEach(([k,v]) => { html += `<tr><td style="width:30%"><b>${k}</b></td><td>${(v||'').toString().replace(/\n/g,'<br>')}</td></tr>`; });
        html += '</table>';
    });
    html += '</body></html>';
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const orderNumber = document.getElementById('orderNumber').value || 'Sin_numero';
    a.href = url; a.download = `Orden_Trabajo_${orderNumber.replace(/\s+/g,'_')}.doc`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    showNotification('Documento Word generado');
}

function downloadExcelStyled() {
    const getVal = (id) => document.getElementById(id)?.value || '';
    const checked = (id) => document.getElementById(id)?.checked;
    const orderNumber = getVal('orderNumber') || 'Sin número';
    const orderDate = getVal('orderDate') || 'No especificada';
    const dueDate = getVal('dueDate') || 'No especificada';
    const projectName = getVal('projectName') || 'Sin nombre';
    const designer = getVal('designer') || 'No asignado';
    const priority = document.getElementById('priority')?.value || 'No especificada';
    const contentTypes = [checked('reels')&&'Reels', checked('posts')&&'Posts Instagram', checked('stories')&&'Historias', checked('carousel')&&'Carousel', checked('facebook')&&'Facebook Posts', checked('other')&&'Otro'].filter(Boolean).join(', ');
    const contentTitle = getVal('contentTitle');
    const contentText = getVal('contentText');
    const cta = getVal('cta');
    const hashtags = getVal('hashtags');
    const mentions = getVal('mentions');
    const ref1 = getVal('ref1');
    const ref2 = getVal('ref2');
    const ref3 = getVal('ref3');
    const brandColors = getVal('brandColors');
    const fonts = getVal('fonts');
    const logoUsage = document.getElementById('logoUsage')?.value || '';
    const styleSel = document.getElementById('style')?.value || '';
    const resources = [checked('logos')&&'Logotipos', checked('images')&&'Imágenes', checked('videos')&&'Videos', checked('brandGuide')&&'Guía de Marca', checked('copy')&&'Textos/Copy'].filter(Boolean).join(', ');
    const resourceLinks = getVal('resourceLinks');
    const additionalNotes = getVal('additionalNotes');
    const esc = (s) => (s || '').toString().replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
    const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>Orden de Trabajo</title><style>body{font-family:Segoe UI, Arial, sans-serif;color:#111827}.sheet{width:100%;border-collapse:collapse}.title{background:linear-gradient(135deg,#6a11cb,#2575fc);color:#fff;font-size:20pt;font-weight:700;text-align:left}.subtitle{color:#E5E7EB;font-size:10pt}.section{background:#EEF2FF;color:#1F2937;font-weight:700}.label{background:#F8FAFC;color:#111827;font-weight:600;width:32%}.value{background:#FFFFFF;color:#111827}td{border:1px solid #E5E7EB;padding:8px;vertical-align:top}.meta{background:#F1F5F9;color:#0F172A}.pill{display:inline-block;background:#DBEAFE;color:#1E40AF;padding:2px 8px;border-radius:999px;font-size:10pt}.right{text-align:right}</style></head><body><table class="sheet"><tr><td class="title" colspan="2">📄 Orden de Trabajo - Diseño Gráfico<br><span class="subtitle">Generado desde formulario</span></td></tr><tr><td class="meta"><b>Proyecto/Cliente</b></td><td class="meta">${esc(projectName)}</td></tr><tr><td class="meta"><b>Fecha de Solicitud</b></td><td class="meta">${esc(orderDate)} &nbsp;&nbsp; <span class="pill">Prioridad: ${esc(priority)}</span></td></tr><tr><td class="meta"><b>Fecha de Entrega</b></td><td class="meta">${esc(dueDate)} &nbsp;&nbsp; <b>Diseñador:</b> ${esc(designer)}</td></tr><tr><td class="section" colspan="2">📋 Información Básica</td></tr><tr><td class="label">Número de Orden</td><td class="value">${esc(orderNumber)}</td></tr><tr><td class="section" colspan="2">🎯 Tipo de Contenido</td></tr><tr><td class="label">Contenidos Solicitados</td><td class="value">${esc(contentTypes)}</td></tr><tr><td class="section" colspan="2">✍️ Especificaciones de Contenido</td></tr><tr><td class="label">Título/Headline</td><td class="value">${esc(contentTitle)}</td></tr><tr><td class="label">Texto/Copy Principal</td><td class="value">${esc(contentText)}</td></tr><tr><td class="label">Llamado a la Acción (CTA)</td><td class="value">${esc(cta)}</td></tr><tr><td class="label">Hashtags</td><td class="value">${esc(hashtags)}</td></tr><tr><td class="label">Menciones/Etiquetas</td><td class="value">${esc(mentions)}</td></tr><tr><td class="section" colspan="2">🖼️ Referencias Visuales</td></tr><tr><td class="label">Referencia 1</td><td class="value">${esc(ref1)}</td></tr><tr><td class="label">Referencia 2</td><td class="value">${esc(ref2)}</td></tr><tr><td class="label">Referencia 3</td><td class="value">${esc(ref3)}</td></tr><tr><td class="section" colspan="2">⚙️ Especificaciones Técnicas</td></tr><tr><td class="label">Colores de Marca</td><td class="value">${esc(brandColors)}</td></tr><tr><td class="label">Fuentes Tipográficas</td><td class="value">${esc(fonts)}</td></tr><tr><td class="label">Uso de Logo</td><td class="value">${esc(logoUsage)}</td></tr><tr><td class="label">Estilo de Diseño</td><td class="value">${esc(styleSel)}</td></tr><tr><td class="section" colspan="2">📂 Recursos Disponibles</td></tr><tr><td class="label">Recursos</td><td class="value">${esc(resources)}</td></tr><tr><td class="label">Enlaces a Recursos</td><td class="value">${esc(resourceLinks)}</td></tr><tr><td class="section" colspan="2">📝 Notas Adicionales</td></tr><tr><td class="label">Notas</td><td class="value">${esc(additionalNotes)}</td></tr></table></body></html>`;
    try {
        const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `Orden_Trabajo_${orderNumber.replace(/\s+/g,'_')}.xls`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showNotification('¡Excel con diseño generado!');
    } catch (e) {
        console.error('Error al generar Excel con diseño:', e);
        showNotification('Error al generar Excel con diseño');
    }
}

function saveOrder() {
    const fields = Array.from(document.querySelectorAll('input, select, textarea'));
    const data = {};
    fields.forEach(el => { if (!el.id) return; if (el.type === 'checkbox') data[el.id] = el.checked; else data[el.id] = el.value; });
    localStorage.setItem('ordentrabajo_data', JSON.stringify(data));
    const order = buildOrderFromForm();
    addOrUpdateOrder(order); renderOrdersTable();
    showNotification('Orden guardada y registrada en el tablero');
}

function loadOrder() {
    const raw = localStorage.getItem('ordentrabajo_data');
    if (!raw) return false;
    try {
        const data = JSON.parse(raw);
        Object.entries(data).forEach(([id, val]) => { const el = document.getElementById(id); if (!el) return; if (el.type === 'checkbox') el.checked = !!val; else el.value = val; });
        return true;
    } catch(e) { console.warn('No se pudo cargar datos guardados', e); return false; }
}

function clearOrder() {
    if (!confirm('¿Deseas limpiar todos los campos?')) return;
    document.querySelectorAll('input, select, textarea').forEach(el => { if (el.type === 'checkbox') el.checked = false; else el.value = ''; });
    localStorage.removeItem('ordentrabajo_data'); setDefaultDates(); showNotification('Campos limpiados');
}

function setDefaultDates() {
    const now = new Date();
    const orderDateEl = document.getElementById('orderDate');
    const dueDateEl = document.getElementById('dueDate');
    if (orderDateEl && !orderDateEl.value) orderDateEl.valueAsDate = now;
    if (dueDateEl && !dueDateEl.value) { const due = new Date(); due.setDate(due.getDate() + 3); dueDateEl.valueAsDate = due; }
}

function printOrder() { window.print(); }

// Tema oscuro
const themeToggleBtn = document.getElementById('themeToggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggleBtn.textContent = document.body.classList.contains('dark') ? '🌞 Modo claro' : '🌗 Modo oscuro';
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadOrder(); setDefaultDates(); loadConfig(); renderOrdersTable();
    setInterval(checkAlerts, 30 * 60 * 1000); // cada 30 min
    setTimeout(() => checkAlerts(), 3000);
});

// ===== Gestión de órdenes (workflow) =====
function buildOrderFromForm() {
    const getVal = (id) => document.getElementById(id)?.value || '';
    const checked = (id) => document.getElementById(id)?.checked;
    const orderNumber = getVal('orderNumber').trim();
    const id = orderNumber || ('tmp-' + Date.now());
    return {
        id,
        orderNumber,
        orderDate: getVal('orderDate'),
        dueDate: getVal('dueDate'),
        projectName: getVal('projectName'),
        designer: getVal('designer'),
        priority: getVal('priority') || 'medium',
        status: getVal('status') || 'pendiente',
        waPhone: getVal('waPhone'),
        content: { reels: checked('reels'), posts: checked('posts'), stories: checked('stories'), carousel: checked('carousel'), facebook: checked('facebook'), other: checked('other') },
        contentTitle: getVal('contentTitle'), contentText: getVal('contentText'), cta: getVal('cta'), hashtags: getVal('hashtags'), mentions: getVal('mentions'),
        refs: { ref1: getVal('ref1'), ref2: getVal('ref2'), ref3: getVal('ref3') },
        tech: { brandColors: getVal('brandColors'), fonts: getVal('fonts'), logoUsage: getVal('logoUsage'), style: getVal('style') },
        resources: { logos: checked('logos'), images: checked('images'), videos: checked('videos'), brandGuide: checked('brandGuide'), copy: checked('copy'), links: getVal('resourceLinks') },
        notes: getVal('additionalNotes'),
        _meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), lastPreAlert: null, lastPostAlert: null }
    };
}

function getOrders() { try { return JSON.parse(localStorage.getItem('ordentrabajo_orders') || '[]'); } catch { return []; } }
function setOrders(list) { localStorage.setItem('ordentrabajo_orders', JSON.stringify(list)); }
function addOrUpdateOrder(order) {
    const list = getOrders();
    const idx = list.findIndex(o => (o.orderNumber && o.orderNumber === order.orderNumber) || o.id === order.id);
    if (idx >= 0) { order._meta = { ...(list[idx]._meta||{}), updatedAt: new Date().toISOString() }; list[idx] = order; }
    else { list.push(order); }
    setOrders(list);
}
function updateOrderPartial(id, patch) {
    const list = getOrders();
    const i = list.findIndex(o => o.id === id);
    if (i >= 0) { list[i] = { ...list[i], ...patch, _meta: { ...(list[i]._meta||{}), updatedAt: new Date().toISOString() } }; setOrders(list); }
}
function deleteOrder(id) { const list = getOrders().filter(o => o.id !== id); setOrders(list); }

function daysDiffFromToday(dateStr) {
    if (!dateStr) return null; const d = new Date(dateStr + 'T12:00:00');
    const today = new Date(); const t = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0, 0);
    return Math.round((d - t) / (1000*60*60*24));
}

function statusChip(status) {
    switch (status) { case 'completado': return '<span class="chip success">Completado</span>'; case 'en_progreso': return '<span class="chip info">En progreso</span>'; default: return '<span class="chip warn">Pendiente</span>'; }
}

function dueBadge(dueDate) {
    const d = daysDiffFromToday(dueDate);
    if (d === null) return '<span class="muted">Sin fecha</span>';
    if (d > 1) return `<span class="chip info">Faltan ${d} días</span>`;
    if (d === 1) return '<span class="chip warn">Mañana</span>';
    if (d === 0) return '<span class="chip warn">Hoy</span>';
    return `<span class="chip danger">Vencido hace ${Math.abs(d)} d</span>`;
}

function renderOrdersTable() {
    const tbody = document.querySelector('#ordersTable tbody'); if (!tbody) return;
    const list = getOrders();
    tbody.innerHTML = list.map(o => {
        const actions = [
            `<button class="btn btn-secondary" onclick=\"editOrder('${o.id}')\">Editar</button>`,
            `<button class="btn btn-success" onclick=\"markDone('${o.id}')\">Completar</button>`,
            `<button class="btn btn-primary" onclick=\"sendWhatsAppFor('${o.id}')\">Enviar WA</button>`,
            `<button class="btn btn-danger" onclick=\"removeOrder('${o.id}')\">Eliminar</button>`
        ].join(' ');
        return `<tr>
            <td>${(o.orderNumber||o.id)}</td>
            <td>${(o.projectName||'')}</td>
            <td>${(o.dueDate||'')}</td>
            <td>${statusChip(o.status)}</td>
            <td>${dueBadge(o.dueDate)}</td>
            <td>${actions}</td>
        </tr>`;
    }).join('');
}

function editOrder(id) {
    const o = getOrders().find(x => x.id === id); if (!o) return;
    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v ?? ''; };
    const setChk = (id, v) => { const el = document.getElementById(id); if (el) el.checked = !!v; };
    setVal('orderNumber', o.orderNumber);
    setVal('orderDate', o.orderDate);
    setVal('dueDate', o.dueDate);
    setVal('projectName', o.projectName);
    setVal('designer', o.designer);
    setVal('priority', o.priority);
    setVal('status', o.status);
    setVal('waPhone', o.waPhone);
    setChk('reels', o.content?.reels);
    setChk('posts', o.content?.posts);
    setChk('stories', o.content?.stories);
    setChk('carousel', o.content?.carousel);
    setChk('facebook', o.content?.facebook);
    setChk('other', o.content?.other);
    setVal('contentTitle', o.contentTitle);
    setVal('contentText', o.contentText);
    setVal('cta', o.cta);
    setVal('hashtags', o.hashtags);
    setVal('mentions', o.mentions);
    setVal('ref1', o.refs?.ref1);
    setVal('ref2', o.refs?.ref2);
    setVal('ref3', o.refs?.ref3);
    setVal('brandColors', o.tech?.brandColors);
    setVal('fonts', o.tech?.fonts);
    setVal('logoUsage', o.tech?.logoUsage);
    setVal('style', o.tech?.style);
    setChk('logos', o.resources?.logos);
    setChk('images', o.resources?.images);
    setChk('videos', o.resources?.videos);
    setChk('brandGuide', o.resources?.brandGuide);
    setChk('copy', o.resources?.copy);
    setVal('resourceLinks', o.resources?.links);
    setVal('additionalNotes', o.notes);
    showNotification('Orden cargada para edición'); window.scrollTo({ top: 0, behavior: 'smooth' });
}

function markDone(id) { updateOrderPartial(id, { status: 'completado' }); renderOrdersTable(); showNotification('Orden marcada como completada'); }
function removeOrder(id) { if (!confirm('¿Eliminar esta orden?')) return; deleteOrder(id); renderOrdersTable(); showNotification('Orden eliminada'); }

// ===== Configuración =====
function loadConfig() {
    try {
        const cfg = JSON.parse(localStorage.getItem('ordentrabajo_config') || '{}');
        const phone = document.getElementById('configPhone');
        const auto = document.getElementById('configAutoOpenWa');
        if (phone) phone.value = cfg.phone || '';
        if (auto) auto.checked = !!cfg.autoOpenWa;
        const file = document.getElementById('importFile');
        if (file && !file._listenerAttached) { file.addEventListener('change', importOrders); file._listenerAttached = true; }
    } catch {}
}
function saveConfig() {
    const phone = document.getElementById('configPhone')?.value || '';
    const autoOpenWa = document.getElementById('configAutoOpenWa')?.checked || false;
    localStorage.setItem('ordentrabajo_config', JSON.stringify({ phone, autoOpenWa }));
    showNotification('Configuración guardada');
}
function getConfig() { try { return JSON.parse(localStorage.getItem('ordentrabajo_config') || '{}'); } catch { return {}; } }
function requestNotificationPermission() {
    if (!('Notification' in window)) { showNotification('Notificaciones no disponibles'); return; }
    Notification.requestPermission().then(res => { showNotification(res === 'granted' ? 'Permiso de notificaciones concedido' : 'Permiso de notificaciones denegado'); });
}

// ===== WhatsApp helpers =====
function buildWhatsAppMessageFromOrder(o) {
    const types = [];
    if (o.content?.reels) types.push('Reels');
    if (o.content?.posts) types.push('Posts Instagram');
    if (o.content?.stories) types.push('Historias');
    if (o.content?.carousel) types.push('Carousel');
    if (o.content?.facebook) types.push('Posts Facebook');
    if (o.content?.other) types.push('Otro');
    let msg = `Orden de trabajo ${o.orderNumber || ''}\n`;
    msg += `Proyecto: ${o.projectName || ''}\n`;
    msg += `Entrega: ${o.dueDate || ''}\n`;
    msg += `Prioridad: ${o.priority || ''}\n`;
    msg += `Estado: ${o.status || ''}\n\n`;
    if (types.length) msg += `Contenidos: ${types.join(', ')}\n`;
    if (o.contentTitle) msg += `Título: ${o.contentTitle}\n`;
    if (o.cta) msg += `CTA: ${o.cta}\n`;
    if (o.resources?.links) msg += `Recursos:\n${o.resources.links}\n`;
    return msg + `\nGracias.`;
}
function openWhatsApp(phone, text) { if (!phone) { showNotification('Falta número de WhatsApp'); return; } const url = `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(text)}`; window.open(url, '_blank'); }
function sendWhatsAppFor(id) { const o = getOrders().find(x => x.id === id); if (!o) return; const cfg = getConfig(); const phone = (o.waPhone && o.waPhone.trim()) || (cfg.phone || '').trim(); const text = buildWhatsAppMessageFromOrder(o); openWhatsApp(phone, text); }

// ===== Alertas =====
function todayISODate() { const t = new Date(); return t.toISOString().slice(0,10); }
function notify(title, body) {
    try { if ('Notification' in window && Notification.permission === 'granted') new Notification(title, { body }); } catch {}
    showNotification(body);
}
function checkAlerts(manual=false) {
    const list = getOrders(); const cfg = getConfig(); const todayStr = todayISODate();
    list.forEach(o => {
        if (!o.dueDate) return; const d = daysDiffFromToday(o.dueDate);
        if (d === 1 && (o.status !== 'completado')) { // 1 día antes
            if (o._meta?.lastPreAlert !== todayStr) {
                const text = `Recordatorio: mañana vence la orden ${o.orderNumber || ''} (${o.projectName || ''}).`;
                notify('Recordatorio de entrega (mañana)', text);
                if (cfg.autoOpenWa) { const phone = (o.waPhone && o.waPhone.trim()) || (cfg.phone || '').trim(); const waText = 'Recordatorio: Mañana vence esta orden.\n\n' + buildWhatsAppMessageFromOrder(o); openWhatsApp(phone, waText); }
                o._meta = { ...(o._meta||{}), lastPreAlert: todayStr };
            }
        }
        if (d === -1 && (o.status !== 'completado')) { // 1 día después
            if (o._meta?.lastPostAlert !== todayStr) {
                const text = `Seguimiento: ayer venció la orden ${o.orderNumber || ''} (${o.projectName || ''}).`;
                notify('Seguimiento de entrega (ayer)', text);
                if (cfg.autoOpenWa) { const phone = (o.waPhone && o.waPhone.trim()) || (cfg.phone || '').trim(); const waText = 'Seguimiento: Ayer venció esta orden.\n\n' + buildWhatsAppMessageFromOrder(o); openWhatsApp(phone, waText); }
                o._meta = { ...(o._meta||{}), lastPostAlert: todayStr };
            }
        }
    });
    setOrders(list); if (manual) showNotification('Revisión de alertas completada');
}

// ===== Import/Export Órdenes =====
function exportOrders() {
    const list = getOrders(); const blob = new Blob([JSON.stringify(list, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob); const a = document.createElement('a');
    a.href = url; a.download = 'ordenes_trabajo.json'; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}
function importOrders(evt) {
    const file = evt.target.files?.[0]; if (!file) return; const reader = new FileReader();
    reader.onload = () => { try { const arr = JSON.parse(reader.result); if (Array.isArray(arr)) { setOrders(arr); renderOrdersTable(); showNotification('Órdenes importadas'); } else { showNotification('Archivo inválido'); } } catch(e) { showNotification('No se pudo importar'); } };
    reader.readAsText(file);
}
