// LiqenInsight SEIA — Generador del informe preliminar (15 secciones). Recibe una evaluación guardada (instantánea) y devuelve secciones y páginas.
// Sin DOM: la interfaz decide cómo dibujarlo. Incluye exportación a documento editable (HTML compatible con Word).
import { explain, runArt11, OUTCOME, versionText } from './seia-engine.js';

const fmtDT = s => s ? new Date(s).toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' }) : '—';
const ANS = { si: 'Sí', no: 'No', ns: 'Sin determinar', desconocido: 'Sin información', dentro: 'Presente', colindante: 'Próximo', fuera: 'No presente' };
const QUAL = { confirmado: 'confirmado', estimado: 'estimado', desconocido: 'desconocido', na: 'no aplica' };
export const TIERS = { DET: 'Determinado', PRE: 'Preliminar', PEN: 'Pendiente' };

function tierOf(r) {
  if (['INFO_INSUFICIENTE', 'REVISION', 'SIN_VERSION_VIGENTE'].includes(r.status)) return 'PEN';
  const est = (r.trace || []).some(t => t.quality === 'estimado');
  return !est && r.validation_status === 'TEXTO_OFICIAL_CONTRASTADO' ? 'DET' : 'PRE';
}

export function buildReport(ev, C) {
  const P = ev.snapshot;
  // Normaliza evaluaciones guardadas con versiones anteriores del motor (sin outcome, rationale, uncertainty o needs).
  const R = { ...ev.seia, results: ev.seia.results.map(x => x.outcome ? x : { ...x, outcome: OUTCOME[x.status] || 'INDETERMINADO' }) };
  const A11 = ev.art11 && ev.art11.rationale && ev.art11.criteria.every(c => c.uncertainty && c.needs) ? ev.art11 : runArt11(P, R.global);
  const X = explain(R, A11);
  const row = (a, b, code, tier) => ({ a, b, code: code || null, tier: tier || null });
  const det = R.results.filter(r => r.role !== 'insumo_modificacion' || true);
  const evaluated = det.filter(r => r.status !== 'DESCARTADA');
  const descartadas = det.filter(r => r.status === 'DESCARTADA');
  const activated = det.filter(r => r.status === 'ACTIVADA');
  const actLabel = id => (C.ACTIVITIES.find(x => x.id === id) || {}).label || id;
  const isMod = (P.nature || []).includes('modificacion');
  const noIngreso = A11.global === 'NO_APLICA_SIN_INGRESO';
  const pasShown = ev.pas.filter(x => x.status !== 'DESCARTADO');
  const normShown = ev.norm.filter(x => x.status !== 'DESCARTADO');
  const hasSrcSnap = [...pasShown, ...normShown].some(x => Array.isArray(x.sources));
  const sectSrc = [...new Map([...pasShown, ...normShown].flatMap(x => x.sources || []).filter(Boolean).map(s => [s.id, s])).values()];
  const sectRows = !hasSrcSnap ? ((pasShown.length || normShown.length) ? [row('Fuentes sectoriales', 'Evaluación emitida antes del registro de versiones de normas sectoriales. Vuelve a ejecutarla para incluirlas.', 'PENDIENTE_VERIFICACION', 'PEN')] : [])
    : sectSrc.map(s => row(`Fuente · ${s.cite}`, `${s.title}. ${versionText(s)}${s.url ? '. ' + s.url : ''}`, s.status === 'VERIFICADA' ? 'VERIFICADA' : 'PENDIENTE_VERIFICACION', s.status === 'VERIFICADA' ? 'DET' : 'PEN'));
  const srcPendN = sectSrc.filter(s => s.status !== 'VERIFICADA').length;
  const tierCount = { DET: 0, PRE: 0, PEN: 0 }; evaluated.forEach(r => tierCount[tierOf(r)]++);

  const params = C.INPUTS.filter(i => P.inputs && P.inputs[i.id] && (P.inputs[i.id].value !== '' && P.inputs[i.id].value != null || P.inputs[i.id].quality)).map(i => {
    const x = P.inputs[i.id];
    const v = x.quality === 'na' ? 'No aplica' : x.value === true ? 'Sí' : x.value === false ? 'No' : i.type === 'enum' ? ((i.options || []).find(o => o[0] === x.value) || [x.value, x.value])[1] : `${x.value} ${x.unit || i.unit || ''}`.trim();
    return row(i.label, `${v} · ${x.quality ? 'dato ' + QUAL[x.quality] : 'dato confirmado'} · ${x.source || 'sin fuente declarada'}${x.date ? ' · ' + x.date : ''}`, null, x.quality === 'estimado' ? 'PRE' : x.quality === 'desconocido' ? 'PEN' : 'DET');
  });
  const calcs = evaluated.flatMap(r => (r.trace || []).filter(t => t.kind === 'cmp').map(t => row(`${r.literal} · ${t.label}`, `Informado ${t.provided}${t.converted ? ' (' + t.converted + ')' : ''}; condición ${t.op} ${t.threshold}.${t.calc ? ' ' + t.calc + '.' : ''}${t.note ? ' ' + t.note + '.' : ''}`, t.result, t.result === 'UNKNOWN' || t.result === 'REVIEW' ? 'PEN' : t.quality === 'estimado' ? 'PRE' : 'DET')));
  const missing = [...new Set(R.results.flatMap(r => r.missing || []))];
  const plan = [];
  X.steps.forEach(s => plan.push(row('Siguiente paso', s)));
  missing.forEach(m => plan.push(row('Completar antecedente', m)));
  R.results.filter(r => r.status === 'REVISION').forEach(r => plan.push(row('Revisión especializada', `${r.literal} · ${r.explanation}`)));
  activated.forEach(r => plan.push(row('Validación jurídica', `Validar la regla ${r.rule_id} (${r.literal}) antes de usar la conclusión.`)));
  ev.pas.filter(x => x.status === 'PENDIENTE_ANTECEDENTES').slice(0, 10).forEach(x => plan.push(row('Definir obra', `Confirmar si el proyecto contempla la obra asociada al PAS ${x.articulo}.`)));
  const srcIds = new Set(evaluated.map(r => { const ru = C.RULES.find(x => x.rule_id === r.rule_id); const v = ru && ru.versions.find(x => x.version_id === r.version_id); return v && v.source_id; }).filter(Boolean));
  const sources = C.LEGAL_SOURCES.filter(s => srcIds.has(s.id) || ['DS40-BCN', 'RSEIA-18-19'].includes(s.id)).map(s => row(`${s.id} · ${C.KNOWLEDGE_LAYERS[s.kind] || s.kind}`, `${s.title}. ${s.url}`));
  const notes = evaluated.map(r => { const ru = C.RULES.find(x => x.rule_id === r.rule_id); const v = ru && ru.versions.find(x => x.version_id === r.version_id); return v && v.notes ? row(`${r.literal} · interpretación del motor`, v.notes, v.validation_status) : null; }).filter(Boolean);
  const modRules = R.results.filter(r => r.rule_type === 'modificacion' || r.rule_type === 'fraccionamiento');

  const sections = [
    { n: '01', title: 'Portada e identificación del proyecto', lead: '', rows: [
      row('Proyecto', P.name), row('Titular', P.titular || '—'), row('Sector', P.sector || '—'), row('Ubicación', [P.comuna, P.region].filter(Boolean).join(', ') || '—'),
      row('Coordenadas', P.lat && P.lon ? `WGS84 ${P.lat}, ${P.lon}` + (P.utm && P.utm.e !== '' ? ` · UTM huso ${P.utm.zone}S E ${P.utm.e} N ${P.utm.n}` : '') : '—'), row('Etapa', P.etapa || '—')] },
    { n: '02', title: 'Fecha de análisis y versión normativa', lead: 'La actualización del catálogo no modifica este informe: se reproduce con la instantánea, la fecha normativa y las versiones indicadas.', rows: [
      row('Fecha normativa de corte', R.date), row('Emitido', fmtDT(ev.created_at)), row('Catálogo normativo', R.catalog_version), row('Motor', R.engine_version), row('Identificador de evaluación', ev.id),
      row('Versiones de reglas aplicadas', R.rule_versions.length + ' versiones (ver sección 11)')] },
    { n: '03', title: 'Descripción y alcance', lead: P.descripcion || 'Sin descripción.', rows: [
      row('Naturaleza', (P.nature || []).map(n => (C.NATURE.find(x => x.id === n) || {}).label).filter(Boolean).join(', ') || 'Sin declarar'),
      row('Actividades', ((P.activities || []).map(actLabel).join('; ') || 'ninguna') + (P.activitiesConfirmed ? ' (confirmadas)' : ' (sin confirmar)'), null, P.activitiesConfirmed ? 'DET' : 'PEN'),
      ...C.LOCATION_ELEMENTS.filter(l => (P.location || {})[l.id] && P.location[l.id] !== 'fuera').map(l => row(l.label, ANS[P.location[l.id]] || 'Sin información', null, P.location[l.id] === 'desconocido' ? 'PEN' : P.location[l.id] === 'colindante' ? 'PRE' : 'DET'))] },
    { n: '04', title: 'Resumen ejecutivo', lead: `${R.global_label}. ${activated.length ? 'Tipologías que aplican: ' + activated.map(r => r.literal).join(', ') + '. ' : ''}${noIngreso ? '' : 'Vía preliminar: ' + A11.rationale + ' '}Se evaluaron ${evaluated.length} reglas: ${tierCount.DET} determinadas con datos confirmados y texto oficial, ${tierCount.PRE} preliminares y ${tierCount.PEN} pendientes. Ninguna regla tiene validación jurídica.`, rows: [] },
    { n: '05', title: 'Resultado de ingreso al SEIA (Motor A)', lead: '¿Por qué se obtuvo este resultado? ' + (X.basis.length ? 'Lo determinan las reglas siguientes.' : 'No hay reglas que activen el ingreso; el resultado depende de las reglas descartadas y de la información disponible.'), rows: [
      row('Resultado global', R.global_label, R.global),
      ...X.basis.map(b => row(`${b.literal} · ${b.name}`, `${b.ref} · ${b.version}. ${b.explanation} Condiciones: ${b.conditions.map(k => `${k.label}: ${k.provided}${k.threshold ? ' (' + k.threshold + ')' : ''}`).join('; ')}.`, b.validation)),
      ...X.uncertainties.map(u => row('Incertidumbre', u, null, 'PEN'))] },
    { n: '06', title: 'Matriz completa de tipologías evaluadas', lead: `${evaluated.length} reglas evaluadas de ${R.results.length}. ${descartadas.length} descartadas por no declararse la actividad (lista al final).`, rows: [
      ...evaluated.map(r => row(`${r.literal} · ${r.rule_name}`, `${r.outcome || ''} · ${r.explanation}`, r.status, tierOf(r))),
      ...(descartadas.length ? [row('Descartadas por actividad no declarada', descartadas.map(r => r.literal).join(', '))] : [])] },
    { n: '07', title: 'Detalle de umbrales y cálculos', lead: calcs.length ? 'Cada comparación registra el dato informado, la conversión de unidades y la condición normativa.' : 'No hubo comparaciones numéricas en las reglas evaluadas.', rows: calcs },
    { n: '08', title: 'Análisis de modificación y fraccionamiento', lead: isMod ? 'La calificación recae sobre la modificación; la evaluación considera la suma de impactos con el proyecto existente (Ley 19.300 art. 11 ter).' : 'El proyecto no se declaró como modificación.', rows: [
      ...(P.rca && P.rca.list || []).map(r => row('RCA ' + (r.numero || 's/n'), `${r.anio || ''} · tipologías de calificación: ${(r.tipologias || []).join(', ') || 'no registradas'}`)),
      ...modRules.filter(r => r.status !== 'DESCARTADA').map(r => row(`${r.literal} · ${r.rule_name}`, r.explanation, r.status, tierOf(r)))] },
    { n: '09', title: 'Matriz de los seis efectos, características o circunstancias (art. 11)', lead: noIngreso ? 'No corresponde: no se identificó obligación de ingreso.' : 'Cada criterio se evalúa por separado. No se promedian ni compensan.', rows: noIngreso ? [] : A11.criteria.map(c => row(`${c.id}) ${c.title}`, `${c.reason} Incertidumbre ${String(c.uncertainty || 'alta').toLowerCase()}.${c.fundamento ? ' Fundamento: ' + c.fundamento + '.' : ''}${c.evidence ? ' Evidencia: ' + c.evidence + '.' : ''}`, c.status, c.status === 'EFECTO_SIGNIFICATIVO' || c.status === 'SIN_EFECTO_FUNDADO' ? 'DET' : c.status === 'SIN_EFECTO_INDICADO' ? 'PRE' : 'PEN')) },
    { n: '10', title: 'Determinación DIA / EIA (Motor B)', guidesNote: true, lead: noIngreso ? 'No corresponde.' : A11.rationale + ' Contenidos mínimos: EIA según el art. 18 y DIA según el art. 19 del D.S. 40/2012.', rows: noIngreso ? [] : [row('Vía preliminar', '', A11.global, A11.global === 'VIA_NO_DETERMINADA' ? 'PEN' : 'PRE'), ...(A11.notes || []).map(n => row('Nota', n)), ...C.ART11.flatMap(c => (c.guides || []).map(g => row(`Guía SEA · criterio ${c.id})`, `${g.title} (${g.edicion}). ${g.url}`)))] },
    { n: '11', title: 'Normativa, permisos y fuentes oficiales', lead: `Versiones aplicadas: ${R.rule_versions.join(', ') || 'ninguna'}.` + (sectSrc.length ? ` Normas sectoriales citadas: ${sectSrc.length}, ${srcPendN === sectSrc.length ? 'todas' : srcPendN} con versión pendiente de verificación.` : ''), rows: [
      ...sources,
      ...sectRows,
      ...pasShown.map(x => row(`PAS ${x.articulo} · ${x.organismo}`, x.nombre + (x.guia ? ` · Guía SEA: ${x.guia.edicion} (${x.guia.fecha}), ${x.guia.url}` : ' · Sin guía trámite del SEA'), x.status, x.status === 'APLICABLE_CONFIRMADO' || x.status === 'NO_APLICA_CONFIRMADO' ? 'DET' : x.status === 'POTENCIALMENTE_APLICABLE' ? 'PRE' : 'PEN')),
      ...normShown.map(n => row(n.materia, `${n.norma}${n.articulo && n.articulo !== 'Por precisar' ? ', ' + n.articulo : ''}: ${n.obligacion} (resumen no verificado)`, n.status, 'PRE'))] },
    { n: '12', title: 'Evidencias y antecedentes revisados', lead: `${(P.documents || []).length} documento(s) registrados. Los archivos no se almacenan en servidor en esta versión.`, rows: [...(P.documents || []).map(d => row(d.name, `${d.type || ''} · registrado ${String(d.date || '').slice(0, 10)}`)), ...params] },
    { n: '13', title: 'Información pendiente', lead: missing.length ? '' : 'No se registraron antecedentes faltantes en las reglas evaluadas.', rows: [...missing.map(m => row(m, 'Requerido por al menos una regla', 'UNKNOWN', 'PEN')), ...(noIngreso ? [] : A11.criteria.filter(c => (c.needs || []).length && c.status !== 'EFECTO_SIGNIFICATIVO').map(c => row(`Art. 11 ${c.id})`, (c.needs || []).join('; '), null, 'PEN')))] },
    { n: '14', title: 'Alertas y limitaciones', lead: 'Análisis preliminar. No es una resolución del SEA, una consulta de pertinencia ni una autorización administrativa. Ninguna regla está validada jurídicamente. La localización es declarada por el usuario, sin cruce cartográfico.', rows: [...R.warnings.map(w => row('Advertencia', w)), ...notes] },
    { n: '15', title: 'Recomendaciones de acciones siguientes', lead: plan.length ? '' : 'Sin acciones pendientes.', rows: plan }
  ];

  const CAP = 930, COVER = 400;
  const lines = (s, cpl) => Math.max(1, Math.ceil(String(s || '').length / cpl));
  const rowH = r => 10 + 15 * Math.max(lines(r.a, 28), lines(r.b, 52));
  const pages = []; let cur = { items: [] }, used = COVER;
  const push = () => { pages.push(cur); cur = { items: [] }; used = 0; };
  sections.forEach(s => {
    const head = 44 + (s.lead ? 18 * lines(s.lead, 95) + 8 : 0);
    if (used + head + (s.rows[0] ? rowH(s.rows[0]) : 0) > CAP && cur.items.length) push();
    let part = { ...s, rows: [], cont: false }; used += head;
    s.rows.forEach(r => {
      const h = rowH(r);
      if (used + h > CAP && (part.rows.length || cur.items.length)) { cur.items.push(part); push(); part = { ...s, lead: '', rows: [], cont: true }; used += 44; }
      part.rows.push(r); used += h;
    });
    cur.items.push(part); used += 18;
  });
  if (cur.items.length) pages.push(cur);

  return {
    id: ev.id, name: P.name, titular: P.titular || '—', ubicacion: [P.comuna, P.region].filter(Boolean).join(', ') || '—',
    date: R.date, created: fmtDT(ev.created_at), catalog: R.catalog_version, engine: R.engine_version,
    global: R.global, global_label: R.global_label, via: A11.global,
    kpis: [['Reglas evaluadas', evaluated.length], ['Tipologías que aplican', activated.length], ['Antecedentes faltantes', missing.length], ['PAS no descartados', pasShown.length]],
    tiers: [['DET', TIERS.DET, tierCount.DET, 'Texto oficial contrastado y datos confirmados'], ['PRE', TIERS.PRE, tierCount.PRE, 'Datos estimados, fuente secundaria o sugerencias'], ['PEN', TIERS.PEN, tierCount.PEN, 'Faltan antecedentes o requiere revisión']],
    sections, pages
  };
}

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function buildDoc(r, labelOf) {
  const L = labelOf || (x => x);
  const sec = r.sections.map(s => `<h2>${esc(s.n)}. ${esc(s.title)}</h2>${s.lead ? `<p>${esc(s.lead)}</p>` : ''}${s.rows.length ? `<table><tr><th>Elemento</th><th>Detalle</th><th>Estado</th><th>Nivel</th></tr>${s.rows.map(x => `<tr><td>${esc(x.a)}</td><td>${esc(x.b)}</td><td>${esc(x.code ? L(x.code) : '')}</td><td>${esc(x.tier ? TIERS[x.tier] : '')}</td></tr>`).join('')}</table>` : ''}`).join('');
  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(r.id)}</title><style>body{font-family:Calibri,Arial,sans-serif;font-size:10.5pt;color:#0B1F2A}h1{font-size:20pt;font-weight:normal}h2{font-size:13pt;margin-top:16pt;border-bottom:1px solid #0B1F2A}table{border-collapse:collapse;width:100%}td,th{border:1px solid #CCCCCC;padding:3pt 5pt;vertical-align:top;font-size:9.5pt}th{background:#EEEEEA;text-align:left}</style></head><body><p>LiqenInsight SEIA · Informe preliminar · ${esc(r.id)}</p><h1>${esc(r.name)}</h1><p>${esc(r.titular)} · ${esc(r.ubicacion)}</p><p><b>Resultado global:</b> ${esc(r.global_label)}<br><b>Vía preliminar:</b> ${esc(L(r.via))}<br>Fecha normativa ${esc(r.date)} · emitido ${esc(r.created)} · ${esc(r.catalog)} · motor ${esc(r.engine)}</p><p><i>Análisis preliminar. No constituye resolución del SEA, consulta de pertinencia ni autorización administrativa.</i></p>${sec}</body></html>`;
}
