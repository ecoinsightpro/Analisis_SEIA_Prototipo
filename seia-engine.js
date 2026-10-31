// LiqenInsight SEIA — Motor de reglas. Independiente de la interfaz: sin DOM, sin eval.
import { RULES, UNITS, CATALOG_VERSION, ART10_LETTERS, ART11, LOCATION_ELEMENTS, PAS_CATALOG, NORMATIVA, INPUTS, REGIONS, ACTIVITIES, OBRAS, PROJECT_TYPES, PRESELECT_LOC_RULES, PRESELECT_REGION_RULES, inputVisible } from './seia-catalog.js';

export const ENGINE_VERSION = '0.5.0';
export const PROXIMITY_MARGIN = 0.10; // un dato estimado a ±10 % del umbral no permite concluir
const T = 'TRUE', F = 'FALSE', U = 'UNKNOWN', R = 'REVIEW';
const and3 = v => v.includes(F) ? F : v.includes(U) ? U : v.includes(R) ? R : T;
const or3 = v => v.includes(T) ? T : v.includes(U) ? U : v.includes(R) ? R : F;
const not3 = v => v === T ? F : v === F ? T : v;
const OPS = { '>': (a, b) => a > b, '>=': (a, b) => a >= b, '<': (a, b) => a < b, '<=': (a, b) => a <= b, '==': (a, b) => a === b };
const round = x => Math.round(x * 1e9) / 1e9;
const fmt = n => Number(n).toLocaleString('es-CL', { maximumFractionDigits: 6 });
const norm = s => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/^region (de |del )?/, '').trim();

export function regionCode(project) {
  const raw = norm(project.region);
  if (!raw) return null;
  const hit = REGIONS.find(r => r.code.toLowerCase() === raw || norm(r.name) === raw || r.aliases.some(a => raw === a || (a.length > 3 && raw.includes(a))));
  return hit ? hit.code : null;
}

// Formato es-CL: punto como separador de miles y coma decimal. «7.500» = 7500; «4,5» = 4.5; «4.2» = 4.2.
export function parseNum(raw) {
  if (typeof raw === 'number') return { n: raw, note: null };
  const s = String(raw).trim().replace(/\s/g, '');
  if (s.includes(',')) return { n: Number(s.replace(/\./g, '').replace(',', '.')), note: s.includes('.') ? 'Punto leído como separador de miles y coma como decimal' : null };
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return { n: Number(s.replace(/\./g, '')), note: 'Punto leído como separador de miles' };
  return { n: Number(s), note: null };
}

export function convert(value, from, to) {
  const a = UNITS[from], b = UNITS[to];
  if (!a) return { ok: false, reason: `Unidad no reconocida: ${from || '(vacía)'}` };
  if (!b) return { ok: false, reason: `Unidad de umbral no reconocida: ${to}` };
  if (a[0] !== b[0]) return { ok: false, reason: `Unidades incompatibles: ${from} no es convertible a ${to} sin un supuesto de operación` };
  return { ok: true, value: round(value * a[1] / b[1]) };
}

export function selectVersion(rule, date) {
  return rule.versions.find(v => v.effective_from <= date && (!v.effective_to || date <= v.effective_to)) || null;
}
const isModification = p => (p.nature || []).includes('modificacion');
const labelOf = id => { const i = INPUTS.find(x => x.id === id); return i ? i.label : id; };
const actsOf = r => r.activity == null ? null : [].concat(r.activity);

function evalNode(node, ctx, trace) {
  if (node.all) return and3(node.all.map(n => evalNode(n, ctx, trace)));
  if (node.any) return or3(node.any.map(n => evalNode(n, ctx, trace)));
  if (node.not) return not3(evalNode(node.not, ctx, trace));
  if (node.const) { trace.push({ kind: 'const', label: node.label || 'Condición declarada', provided: '—', result: node.const }); return node.const; }
  if (node.cmp) {
    const { input, op, value, unit } = node.cmp;
    const p = (ctx.project.inputs || {})[input];
    const base = { kind: 'cmp', input, label: labelOf(input), op, threshold: `${fmt(value)} ${unit}` };
    if (p && p.quality === 'na') { trace.push({ ...base, provided: 'No aplica', result: F, note: 'Declarado no aplicable por el usuario' + (p.source ? ' · ' + p.source : '') + '. Distinto de un dato faltante.', layer: 'supuesto' }); return F; }
    if (p && p.quality === 'desconocido') { trace.push({ ...base, provided: 'Desconocido', result: U, note: 'Declarado desconocido por el usuario' }); return U; }
    if (!p || p.value === '' || p.value == null) { trace.push({ ...base, provided: '—', result: U, note: 'Dato no informado' }); return U; }
    const pn = parseNum(p.value), n = pn.n;
    if (!Number.isFinite(n)) { trace.push({ ...base, provided: String(p.value), result: U, note: 'Valor no numérico' }); return U; }
    if (n < 0) { trace.push({ ...base, provided: `${p.value} ${p.unit || ''}`, result: U, note: 'Valor negativo no admitido' }); return U; }
    const from = p.unit || (INPUTS.find(i => i.id === input) || {}).unit;
    const c = convert(n, from, unit);
    if (!c.ok) { trace.push({ ...base, provided: `${fmt(n)} ${from}`, result: U, note: c.reason }); return U; }
    let res = OPS[op](c.value, value) ? T : F;
    const est = p.quality === 'estimado';
    const near = value !== 0 && Math.abs(c.value - value) / Math.abs(value) <= PROXIMITY_MARGIN;
    if (est && near) res = R;
    trace.push({ ...base, provided: `${fmt(n)} ${from}`, converted: from !== unit ? `${fmt(c.value)} ${unit}` : null, calc: (from !== unit ? `${fmt(n)} ${from} = ${fmt(c.value)} ${unit}; ` : '') + `${fmt(c.value)} ${op} ${fmt(value)} → ${OPS[op](c.value, value) ? 'se cumple' : 'no se cumple'}`, quality: est ? 'estimado' : 'confirmado', near, result: res, layer: 'dato',
      note: [est ? 'Dato estimado' : 'Dato confirmado', pn.note, p.source ? `Fuente: ${p.source}` : 'Sin fuente declarada', near ? (est ? `a menos de ${PROXIMITY_MARGIN * 100} % del umbral: la estimación no permite concluir` : `a menos de ${PROXIMITY_MARGIN * 100} % del umbral`) : ''].filter(Boolean).join(' · ') });
    return res;
  }
  if (node.flag) {
    const { input, equals } = node.flag;
    const pf = (ctx.project.inputs || {})[input] || {};
    if (pf.quality === 'na') { trace.push({ kind: 'flag', input, label: labelOf(input), op: '=', threshold: equals ? 'Sí' : 'No', provided: 'No aplica', result: F, note: 'Declarado no aplicable por el usuario', layer: 'supuesto' }); return F; }
    const v = pf.value;
    const base = { kind: 'flag', input, label: labelOf(input), op: '=', threshold: equals ? 'Sí' : 'No' };
    if (v !== true && v !== false) { trace.push({ ...base, provided: 'Sin respuesta', result: U, note: 'Dato no informado' }); return U; }
    const res = v === equals ? T : F;
    trace.push({ ...base, provided: v ? 'Sí' : 'No', result: res });
    return res;
  }
  if (node.enum) {
    const { input } = node.enum;
    const v = ((ctx.project.inputs || {})[input] || {}).value;
    const def = INPUTS.find(i => i.id === input) || {};
    const lab = x => ((def.options || []).find(o => o[0] === x) || [x, x])[1];
    const base = { kind: 'enum', input, label: labelOf(input), op: '∈', threshold: node.enum.in.map(lab).join(' / ') };
    if (!v) { trace.push({ ...base, provided: 'Sin respuesta', result: U, note: 'Dato no informado' }); return U; }
    const res = node.enum.in.includes(v) ? T : F;
    trace.push({ ...base, provided: lab(v), result: res });
    return res;
  }
  if (node.prof) {
    const p = (ctx.project.inputs || {})[node.prof.input] || {};
    const base = { kind: 'prof', input: node.prof.input, label: node.prof.label || labelOf(node.prof.input), op: '=', threshold: 'Sí' };
    if (p.value === 'si') { trace.push({ ...base, provided: 'Sí', result: T, note: p.source ? `Fundamento: ${p.source}` : 'Sin fundamento escrito' }); return T; }
    if (p.value === 'no' && p.source && p.source.trim()) { trace.push({ ...base, provided: 'No', result: F, note: `Fundamento: ${p.source}` }); return F; }
    if (p.value === 'no') { trace.push({ ...base, provided: 'No, sin fundamento', result: R, note: 'Una respuesta negativa requiere fundamento profesional escrito' }); return R; }
    trace.push({ ...base, provided: 'Sin determinar', result: U, note: 'Requiere determinación profesional' }); return U;
  }
  if (node.geo) {
    const v = (ctx.project.location || {})[node.geo.input] || 'desconocido';
    const el = LOCATION_ELEMENTS.find(e => e.id === node.geo.input);
    const base = { kind: 'geo', input: node.geo.input, label: el ? el.label : node.geo.input, op: 'en', threshold: 'Presente' };
    const map = { dentro: [T, 'Declarado presente en el área del proyecto'], fuera: [F, 'Declarado no presente'], colindante: [R, 'Proximidad declarada: la cercanía no constituye por sí sola la condición; verificar límites oficiales'], desconocido: [U, 'Sin información de localización'] };
    const [res, note] = map[v] || map.desconocido;
    trace.push({ ...base, provided: v, result: res, note });
    return res;
  }
  if (node.region) {
    const code = regionCode(ctx.project);
    const base = { kind: 'region', input: 'region', label: 'Región del proyecto (tramo territorial)', op: 'en', threshold: 'tramo aplicable' };
    if (!code) { trace.push({ ...base, provided: ctx.project.region || '—', result: U, note: ctx.project.region ? 'Región no reconocida' : 'Región no informada' }); return U; }
    const c = node.region.cases.find(x => x.in.includes(code));
    if (!c) {
      const res = node.region.outside === 'FALSE' ? F : R;
      trace.push({ ...base, provided: code, result: res, note: res === F ? 'La región no está comprendida en este supuesto' : 'La región no está expresamente comprendida en los tramos del texto' });
      return res;
    }
    trace.push({ ...base, provided: code, result: T, note: 'Tramo: ' + c.in.join(', ') });
    return evalNode(c.node, ctx, trace);
  }
  if (node.rule) {
    const dep = ctx.results[node.rule.id];
    const st = dep ? dep.status : 'NO_EVALUADA';
    const res = st === 'ACTIVADA' ? T : st === 'INFO_INSUFICIENTE' ? U : st === 'REVISION' ? R : F;
    trace.push({ kind: 'dep', input: node.rule.id, label: `Resultado de ${node.rule.id}`, op: '=', threshold: 'ACTIVADA', provided: st, result: res });
    return res;
  }
  if (node.review) {
    const r = evalNode(node.review, ctx, trace);
    if (r === T) trace.push({ kind: 'review', label: 'Derivación a revisión', provided: '—', result: R, note: node.reason });
    return r === T ? R : r;
  }
  if (node.pending) { trace.push({ kind: 'pending', label: node.pending.label, provided: '—', result: node.pending.truth, note: 'Condición no automatizada' }); return node.pending.truth; }
  if (node.unverified) { trace.push({ kind: 'pending', label: 'Excepción no verificable', provided: '—', result: U, note: node.unverified.reason }); return U; }
  if (node.modificacion) {
    const original = new Set((ctx.project.rca?.list || []).flatMap(r => r.tipologias || []));
    const art3 = Object.values(ctx.results).filter(r => r.rule_type === 'tipologia_art3');
    const act = art3.filter(r => r.status === 'ACTIVADA');
    const excluded = node.modificacion.excludeOriginal ? act.filter(r => original.has(r.literal)) : [];
    const remaining = act.filter(r => !excluded.includes(r));
    excluded.forEach(r => trace.push({ kind: 'exception', label: `Excepción g.1: tipología original ${r.literal}`, provided: 'En RCA original', result: F, note: 'Excluida de g.1; se atiende al resto de los literales del art. 2 g)' }));
    const suma = ((ctx.project.inputs || {}).g2_suma_incluida || {}).value;
    if (remaining.length) { trace.push({ kind: 'mod', label: 'g.1/g.2 — la modificación constituye una tipología del art. 3', provided: remaining.map(r => r.literal).join(', '), result: T }); return T; }
    const unk = art3.filter(r => r.status === 'INFO_INSUFICIENTE' || r.status === 'REVISION');
    if (unk.length) { const onlyRev = unk.every(r => r.status === 'REVISION'); trace.push({ kind: 'mod', label: 'g.1 — tipologías sin resolver en la modificación', provided: unk.map(r => r.literal + (r.status === 'REVISION' ? ' (revisión)' : '')).join(', '), result: onlyRev ? R : U, note: onlyRev ? 'Las tipologías de la modificación requieren revisión especializada' : 'Faltan antecedentes de la modificación' }); return onlyRev ? R : U; }
    if (suma !== true) { trace.push({ kind: 'mod', label: 'g.2 — suma de partes no calificadas', provided: suma === false ? 'No incluida' : 'Sin respuesta', result: U, note: 'Para descartar g.2 los parámetros deben incluir la suma de partes, obras y acciones no calificadas' }); return U; }
    trace.push({ kind: 'mod', label: 'g.1/g.2 — la modificación, sumada a partes no calificadas, no constituye una tipología', provided: '—', result: F });
    return F;
  }
  throw new Error('Nodo de condición no admitido: ' + JSON.stringify(Object.keys(node)));
}

function orderRules(rules) {
  const out = [], seen = new Set();
  const visit = r => { if (seen.has(r.rule_id)) return; seen.add(r.rule_id); (r.depends_on || []).forEach(d => { const x = rules.find(y => y.rule_id === d); if (x) visit(x); }); out.push(r); };
  rules.filter(r => r.rule_type !== 'modificacion').forEach(visit);
  rules.filter(r => r.rule_type === 'modificacion').forEach(visit);
  return out;
}

function evaluateRule(rule, project, date, results) {
  const base = { rule_id: rule.rule_id, rule_name: rule.rule_name, rule_type: rule.rule_type, literal: rule.literal, trace: [], missing: [] };
  const done = (status, explanation, v, extra = {}) => ({ ...base, status, explanation, version_id: v?.version_id || null, legal_reference: v?.legal_reference || null, source_url: v?.source_url || null, validation_status: v?.validation_status || null, effective_from: v?.effective_from || null, effective_to: v?.effective_to || null, ...extra });
  if (rule.scope === 'fraccionamiento') {
    const fv = ((project.inputs || {}).frac_relacionado || {}).value;
    const need = ['etapas', 'complementarias', 'modificacion'].some(n => (project.nature || []).includes(n));
    if (fv === false) return done('NO_ACTIVADA', 'Se declaró que no existen proyectos, fases u obras relacionadas.', rule.versions[0], { trace: [{ kind: 'flag', label: 'Proyectos o fases relacionadas', provided: 'No', result: 'FALSE', layer: 'dato' }] });
    if (fv !== true && !need) return done('DESCARTADA', 'Sin proyectos relacionados declarados. Responda la pregunta de la etapa de historial para descartarlo expresamente.', null);
  }
  if (rule.scope === 'modificacion' && !isModification(project)) return done('DESCARTADA', 'No aplica: el proyecto no se declaró como modificación.', null);
  const acts = actsOf(rule);
  if (acts) {
    if (!project.activitiesConfirmed) return done('INFO_INSUFICIENTE', 'No se han confirmado las actividades del proyecto; no es posible descartar esta tipología.', null, { missing: ['Confirmación de actividades'] });
    if (!acts.some(a => (project.activities || []).includes(a))) return done('DESCARTADA', 'Actividad no declarada por el usuario.', null);
  }
  const v = selectVersion(rule, date);
  if (!v) {
    const fut = rule.versions.filter(x => x.effective_from > date).sort((a, b) => a.effective_from.localeCompare(b.effective_from))[0];
    const past = rule.versions.filter(x => x.effective_to && x.effective_to < date);
    const why = fut ? `Regla con vigencia desde ${fut.effective_from}; no se aplica a la fecha ${date}.` : past.length ? `La vigencia de la regla terminó el ${past[past.length - 1].effective_to} (derogada o reemplazada sin versión cargada).` : 'Sin versión cargada para la fecha.';
    return done('SIN_VERSION_VIGENTE', why, null, { gap: !!fut && !past.length });
  }
  if (rule.scope === 'modificacion' && !(project.rca?.list || []).length) return done('INFO_INSUFICIENTE', 'El proyecto se declaró como modificación, pero no se registró la RCA original ni sus tipologías.', v, { missing: ['RCA original y tipologías de calificación'] });
  const trace = [];
  const ctx = { project, results };
  const trig = evalNode(v.logic, ctx, trace);
  const missing = [...new Set(trace.filter(t => t.result === U).map(t => t.label))];
  let status, explanation;
  if (trig === T) {
    const exTrace = [];
    const exRes = (v.exceptions || []).map(ex => ({ ex, r: evalNode(ex.logic, ctx, exTrace) }));
    trace.push(...exTrace.map(t => ({ ...t, exception: true })));
    const applied = exRes.find(x => x.r === T && x.ex.verified);
    const appliedUnv = exRes.find(x => x.r === T && !x.ex.verified);
    const unresolved = exRes.find(x => x.r === U || x.r === R);
    if (applied) { status = 'EXCEPCION_APLICADA'; explanation = `Se cumplen las condiciones de activación, pero aplica la excepción: ${applied.ex.description}.`; }
    else if (appliedUnv) { status = 'REVISION'; explanation = `Se cumplen las condiciones de activación y concurrirían los supuestos de una excepción cuyo texto oficial no se ha cotejado: ${appliedUnv.ex.description}.`; }
    else if (unresolved && unresolved.r === U) { status = 'INFO_INSUFICIENTE'; explanation = `Se cumplen las condiciones de activación, pero faltan antecedentes para descartar la excepción: ${unresolved.ex.description}.`; missing.push(...exTrace.filter(t => t.result === U).map(t => t.label)); }
    else if (unresolved) { status = 'REVISION'; explanation = `Se cumplen las condiciones de activación; no es posible descartar la excepción: ${unresolved.ex.description}.`; missing.push(...exTrace.filter(t => t.result === U).map(t => t.label)); }
    else if (v.interpretive) { status = 'REVISION'; explanation = 'Concurren antecedentes de un posible fraccionamiento. El motor no puede determinar la intención ni el vínculo: requiere revisión jurídica.'; }
    else if (v.validation_status === 'PENDIENTE_VALIDACION') { status = 'REVISION'; explanation = 'Se cumplen las condiciones, pero el texto oficial de la regla está pendiente de validación: no se usa para una conclusión definitiva.'; }
    else { status = 'ACTIVADA'; explanation = 'Se cumplen las condiciones de activación con los antecedentes informados.'; }
  } else if (trig === F) { status = 'NO_ACTIVADA'; explanation = 'Con los antecedentes informados, no se cumplen las condiciones de activación.'; }
  else if (trig === U) { status = 'INFO_INSUFICIENTE'; explanation = 'Faltan antecedentes o no son comparables con el umbral; no es posible concluir.'; }
  else { status = 'REVISION'; explanation = 'La regla requiere análisis especializado para concluir.'; }
  return done(status, explanation, v, { trace, missing: [...new Set(missing)] });
}

export const GLOBAL_LABELS = {
  INGRESO_OBLIGATORIO_IDENTIFICADO: 'Ingreso obligatorio al SEIA',
  INGRESO_NO_IDENTIFICADO_CON_ANTECEDENTES_DISPONIBLES: 'No se identifica obligación de ingreso al SEIA según los antecedentes analizados',
  REVISION_ESPECIALIZADA_NECESARIA: 'Revisión jurídica o técnica requerida',
  INFORMACION_INSUFICIENTE: 'Análisis indeterminado: faltan antecedentes'
};
export const OUTCOME = { ACTIVADA: 'APLICA', NO_ACTIVADA: 'NO_APLICA', EXCEPCION_APLICADA: 'NO_APLICA', DESCARTADA: 'NO_APLICA', INFO_INSUFICIENTE: 'INDETERMINADO', REVISION: 'INDETERMINADO', SIN_VERSION_VIGENTE: 'INDETERMINADO' };

export function runSeia(project, opts = {}) {
  const date = opts.date || new Date().toISOString().slice(0, 10);
  const rules = orderRules(opts.rules || RULES);
  const results = {};
  for (const r of rules) results[r.rule_id] = evaluateRule(r, project, date, results);
  const list = rules.map(r => results[r.rule_id]);
  const mod = isModification(project);
  list.forEach(r => { r.role = mod && r.rule_type === 'tipologia_art3' ? 'insumo_modificacion' : 'determinante'; r.outcome = OUTCOME[r.status] || 'INDETERMINADO'; });
  const det = list.filter(r => r.role === 'determinante');
  const by = s => det.filter(r => r.status === s);
  const warnings = [];
  let global;
  if (by('ACTIVADA').length) global = 'INGRESO_OBLIGATORIO_IDENTIFICADO';
  else if (by('REVISION').length || det.some(r => r.status === 'SIN_VERSION_VIGENTE' && r.gap)) global = 'REVISION_ESPECIALIZADA_NECESARIA';
  else if (by('INFO_INSUFICIENTE').length) global = 'INFORMACION_INSUFICIENTE';
  else global = 'INGRESO_NO_IDENTIFICADO_CON_ANTECEDENTES_DISPONIBLES';
  if ((project.activities || []).includes('otra') && global === 'INGRESO_NO_IDENTIFICADO_CON_ANTECEDENTES_DISPONIBLES') {
    global = 'REVISION_ESPECIALIZADA_NECESARIA';
    warnings.push('Se declaró una actividad no catalogada; verifique si alguna parte, obra o acción encuadra en el art. 3.');
  }
  if (project.region && !regionCode(project)) warnings.push(`La región «${project.region}» no fue reconocida; las reglas con tramos regionales quedan sin resolver.`);
  const pendingInfo = by('INFO_INSUFICIENTE').length + by('REVISION').length;
  if (global === 'INGRESO_OBLIGATORIO_IDENTIFICADO' && pendingInfo) warnings.push(`${pendingInfo} regla(s) quedan sin resolver. No alteran la obligación de ingreso, pero pueden agregar tipologías que deben declararse en la DIA o el EIA (art. 60 d.7 tras el D.S. 17/2025).`);
  if (global === 'INGRESO_NO_IDENTIFICADO_CON_ANTECEDENTES_DISPONIBLES') warnings.push('Resultado basado en los antecedentes declarados. No constituye garantía de que el proyecto no deba ingresar al SEIA; considere una consulta de pertinencia (art. 26 RSEIA).');
  const unvalidated = by('ACTIVADA').filter(r => r.validation_status !== 'VALIDADA_JURIDICAMENTE');
  if (unvalidated.length) warnings.push(`La conclusión se apoya en ${unvalidated.length} regla(s) sin validación jurídica: ${unvalidated.map(r => r.rule_id).join(', ')}.`);
  const est = det.filter(r => (r.trace || []).some(t => t.quality === 'estimado'));
  if (est.length) warnings.push(`${est.length} regla(s) usan datos estimados (${est.map(r => r.literal).join(', ')}). Confírmelos antes de emitir conclusiones.`);
  const secondary = by('ACTIVADA').filter(r => r.validation_status === 'FUENTE_SECUNDARIA');
  if (secondary.length) warnings.push(`${secondary.map(r => r.rule_id).join(', ')}: versión basada en fuentes secundarias del D.S. 17/2025.`);
  const gaps = det.filter(r => r.status === 'SIN_VERSION_VIGENTE' && r.gap);
  if (gaps.length) warnings.push(`${gaps.length} regla(s) sin versión cargada para la fecha ${date} (${gaps.map(r => r.literal).join(', ')}): se requiere revisar el texto vigente a esa fecha.`);
  const derog = det.filter(r => r.status === 'SIN_VERSION_VIGENTE' && !r.gap);
  if (derog.length) warnings.push(`Sin vigencia a la fecha (derogadas o reemplazadas): ${derog.map(r => r.literal).join(', ')}. No se consideran en el resultado.`);
  if (mod) warnings.push('Proyecto declarado como modificación: los resultados del art. 3 se usan como insumo del art. 2 g). La calificación recae sobre la modificación, pero la evaluación considera la suma de sus impactos y los del proyecto existente (Ley 19.300 art. 11 ter; RSEIA art. 12).');
  return {
    engine_version: ENGINE_VERSION, catalog_version: CATALOG_VERSION, date, global, global_label: GLOBAL_LABELS[global], region_code: regionCode(project),
    results: list, warnings, notImplemented: ART10_LETTERS.filter(l => !l.rules.length).map(l => `${l.letter}) ${l.name}`),
    rule_versions: list.filter(r => r.version_id).map(r => `${r.rule_id}@${r.version_id}`),
    counts: ['ACTIVADA', 'NO_ACTIVADA', 'INFO_INSUFICIENTE', 'REVISION', 'EXCEPCION_APLICADA', 'DESCARTADA', 'SIN_VERSION_VIGENTE'].reduce((o, s) => (o[s] = list.filter(r => r.status === s).length, o), {})
  };
}

export function runArt11(project, seiaGlobal) {
  const loc = project.location || {};
  const criteria = ART11.map(c => {
    const a = (project.art11 || {})[c.id] || {};
    const answers = c.questions.map((q, i) => (a.q || [])[i] || 'ns');
    const related = LOCATION_ELEMENTS.filter(e => e.criteria.includes(c.id));
    const locPresent = related.filter(e => loc[e.id] === 'dentro' || loc[e.id] === 'colindante').map(e => e.label);
    const locUnknown = related.filter(e => !loc[e.id] || loc[e.id] === 'desconocido').map(e => e.label);
    const hasEvidence = !!(a.evidence && a.evidence.trim());
    let status, reason;
    if (a.det === 'significativo' && a.fundamento?.trim()) { status = 'EFECTO_SIGNIFICATIVO'; reason = 'Determinación profesional fundada: efecto significativo.'; }
    else if (a.det === 'significativo') { status = 'REQUIERE_EVALUACION'; reason = 'Se marcó efecto significativo sin fundamento escrito: registre el fundamento para concluir.'; }
    else if (a.det === 'no_significativo' && a.fundamento?.trim() && hasEvidence) { status = 'SIN_EFECTO_FUNDADO'; reason = 'Determinación profesional fundada y con evidencia.'; }
    else if (a.det === 'no_significativo') { status = 'INFORMACION_INSUFICIENTE'; reason = 'La determinación de no significancia requiere fundamento y evidencia.'; }
    else if (answers.includes('si') || locPresent.length) { status = 'REQUIERE_EVALUACION'; reason = 'Existen circunstancias que exigen evaluar la significancia' + (locPresent.length ? ` (${locPresent.join(', ')})` : '') + '.'; }
    else if (answers.every(x => x === 'no') && hasEvidence && !locUnknown.length) { status = 'SIN_EFECTO_INDICADO'; reason = 'Respuestas negativas con evidencia declarada. Falta la determinación profesional fundada para descartar el efecto.'; }
    else if (answers.every(x => x === 'no') && !hasEvidence) { status = 'INFORMACION_INSUFICIENTE'; reason = 'Una respuesta negativa sin evidencia no demuestra la inexistencia del efecto.'; }
    else { status = 'INFORMACION_INSUFICIENTE'; reason = locUnknown.length ? `Sin información de localización: ${locUnknown.join(', ')}.` : 'Circunstancias sin responder.'; }
    const uncertainty = status === 'EFECTO_SIGNIFICATIVO' || status === 'SIN_EFECTO_FUNDADO' ? (hasEvidence ? 'BAJA' : 'MEDIA') : status === 'SIN_EFECTO_INDICADO' ? 'MEDIA' : 'ALTA';
    const needs = [!hasEvidence ? 'Evidencia documental: ' + c.evidence : '', !a.fundamento?.trim() ? 'Fundamento profesional escrito' : '', ...locUnknown.map(l => 'Localización: ' + l), answers.includes('ns') ? answers.filter(x => x === 'ns').length + ' circunstancia(s) sin responder' : ''].filter(Boolean);
    return { ...c, answers, status, reason, uncertainty, needs, locPresent, locUnknown, evidence: a.evidence || '', det: a.det || '', fundamento: a.fundamento || '' };
  });
  let global;
  if (seiaGlobal !== 'INGRESO_OBLIGATORIO_IDENTIFICADO') global = 'NO_APLICA_SIN_INGRESO';
  else if (criteria.some(c => c.status === 'EFECTO_SIGNIFICATIVO')) global = 'EIA_PROCEDENTE_SEGUN_ANALISIS_PRELIMINAR';
  else if (criteria.every(c => c.status === 'SIN_EFECTO_FUNDADO')) global = 'DIA_POSIBLE_CON_ANTECEDENTES_SUFICIENTES';
  else global = 'VIA_NO_DETERMINADA';
  const decisive = criteria.filter(c => c.status === 'EFECTO_SIGNIFICATIVO').map(c => c.id);
  const blocking = criteria.filter(c => !['EFECTO_SIGNIFICATIVO', 'SIN_EFECTO_FUNDADO'].includes(c.status)).map(c => c.id);
  const isMod = (project.nature || []).includes('modificacion');
  const indig = ['dentro', 'colindante'].includes(loc.pueblos_indigenas);
  const consulta = indig && criteria.some(c => ['c', 'd', 'f'].includes(c.id) && c.status === 'EFECTO_SIGNIFICATIVO');
  return { global, criteria, decisive, blocking, rationale: global === 'EIA_PROCEDENTE_SEGUN_ANALISIS_PRELIMINAR' ? `Se identifica fundadamente al menos un efecto del art. 11 (letras ${decisive.join(', ')}). No se promedian criterios: un solo efecto basta para el EIA.` : global === 'DIA_POSIBLE_CON_ANTECEDENTES_SUFICIENTES' ? 'Se evaluaron los seis criterios y una determinación profesional fundada y con evidencia descarta cada uno.' : global === 'VIA_NO_DETERMINADA' ? `Faltan antecedentes o determinaciones en los criterios ${blocking.join(', ')}; pueden cambiar la conclusión.` : 'No aplica: no se identificó obligación de ingreso.', notes: [isMod ? 'Modificación: los efectos del art. 11 se evalúan considerando la suma de los impactos de la modificación y del proyecto existente (Ley 19.300 art. 11 ter).' : '', indig ? 'Presencia de grupos humanos indígenas: si concurren efectos de los arts. 7, 8 o 10 procede consulta indígena (art. 85 RSEIA); en DIA, reuniones del art. 86.' : '', consulta ? 'Consulta indígena (art. 85) probable.' : ''].filter(Boolean) };
}

export function runPas(project, seiaGlobal, seia) {
  const obras = project.obras || {};
  const conf = project.pasConfirm || {};
  const noap = project.pasNoAplica || {};
  const code = regionCode(project);
  const statusOf = id => seia ? (seia.results.find(r => r.rule_id === id) || {}).status : null;
  return PAS_CATALOG.map(p => {
    const v = obras[p.trigger] || 'desconocido';
    let status, reason;
    if (v === 'no') { status = 'DESCARTADO'; reason = 'El usuario declaró que el proyecto no contempla la obra que activa el permiso.'; }
    else if (p.regions && code && !p.regions.includes(code)) { status = 'DESCARTADO'; reason = 'Fuera del ámbito territorial del permiso (Arica y Parinacota, Tarapacá y Antofagasta).'; }
    else if (p.excludeIfRule && statusOf(p.excludeIfRule) === 'ACTIVADA') { status = 'DESCARTADO'; reason = `El permiso excluye los proyectos de la letra m.1, que resultó activada.`; }
    else if (v === 'si' && noap[p.id] && (noap[p.id].fundamento || '').trim()) { status = 'NO_APLICA_CONFIRMADO'; reason = `No aplicabilidad confirmada por ${noap[p.id].por}: ${noap[p.id].fundamento}`; }
    else if (v === 'si' && conf[p.id]) { status = 'APLICABLE_CONFIRMADO'; reason = `Confirmado por ${conf[p.id]}.`; }
    else if (v === 'si') { status = 'POTENCIALMENTE_APLICABLE'; reason = 'Obra declarada. La aplicabilidad requiere contrastar las condiciones del permiso.' + (p.regions && !code ? ' Región no reconocida.' : ''); }
    else { status = 'PENDIENTE_ANTECEDENTES'; reason = 'Sin respuesta sobre la obra que activa el permiso.'; }
    if (p.notas && status !== 'DESCARTADO' && status !== 'NO_APLICA_CONFIRMADO') reason += ' ' + p.notas;
    return { ...p, status, reason, ctxNote: seiaGlobal === 'INGRESO_OBLIGATORIO_IDENTIFICADO' ? 'Se tramitaría en el SEIA (art. 107).' : 'Sin ingreso al SEIA, se tramita directamente ante el organismo sectorial.', triggerValue: v };
  });
}

export function runNormativa(project) {
  const obras = project.obras || {}, loc = project.location || {};
  return NORMATIVA.map(n => {
    let v;
    if (n.triggerActivity) v = !project.activitiesConfirmed ? 'desconocido' : (project.activities || []).includes(n.triggerActivity) ? 'si' : 'no';
    else v = obras[n.trigger] || 'desconocido';
    if (n.triggerLoc && (loc[n.triggerLoc] === 'dentro' || loc[n.triggerLoc] === 'colindante')) v = 'si';
    return { ...n, status: v === 'si' ? 'POTENCIALMENTE_APLICABLE' : v === 'no' ? 'DESCARTADO' : 'PENDIENTE_ANTECEDENTES', triggerValue: v };
  });
}

export function validateProject(project) {
  const issues = [];
  if (!project.region) issues.push({ level: 'aviso', field: 'Región', msg: 'Sin región: las reglas con tramos regionales no se pueden resolver' });
  else if (!regionCode(project)) issues.push({ level: 'error', field: 'Región', msg: `«${project.region}» no corresponde a una región reconocida` });
  else if (regionCode(project) === 'NB') issues.push({ level: 'aviso', field: 'Región', msg: 'Ñuble no figura en algunos tramos regionales del texto (p. ej. a.2.4); esas reglas se derivan a revisión' });
  for (const i of INPUTS) {
    if (!inputVisible(i, project)) continue;
    const p = (project.inputs || {})[i.id];
    if ((i.type === 'number' || i.type === 'count') && p && p.value !== '' && p.value != null) {
      const pn = parseNum(p.value), n = pn.n;
      if (pn.note && Number.isFinite(n)) issues.push({ level: 'aviso', field: i.label, msg: `${pn.note}: se usará ${n.toLocaleString('es-CL')}` });
      if (!Number.isFinite(n)) issues.push({ level: 'error', field: i.label, msg: 'Valor no numérico' });
      else if (n < 0) issues.push({ level: 'error', field: i.label, msg: 'Valor negativo' });
      const u = p.unit || i.unit;
      if (!UNITS[u]) issues.push({ level: 'error', field: i.label, msg: 'Unidad no reconocida' });
      else if (UNITS[u][0] !== UNITS[i.unit][0]) issues.push({ level: 'aviso', field: i.label, msg: `La unidad ${u} no es comparable con el umbral en ${i.unit}` });
      if (!p.source) issues.push({ level: 'aviso', field: i.label, msg: 'Parámetro sin fuente' });
    }
    if (i.type === 'enum' && i.when === 'mod' && p && p.value === 'no' && !(p.source || '').trim()) issues.push({ level: 'aviso', field: i.label, msg: 'Respuesta negativa sin fundamento' });
  }
  return issues;
}

export function compareRuns(a, b) {
  const diffs = [];
  if (a.global !== b.global) diffs.push(`Resultado global: ${a.global} → ${b.global}`);
  const mb = Object.fromEntries(b.results.map(r => [r.rule_id, r]));
  a.results.forEach(r => { const x = mb[r.rule_id]; if (!x) diffs.push(`${r.rule_id}: ausente`); else if (x.status !== r.status || x.version_id !== r.version_id) diffs.push(`${r.rule_id}: ${r.status}@${r.version_id} → ${x.status}@${x.version_id}`); });
  return diffs;
}

// Selección preliminar: reúne lo que probablemente aplica según el tipo de proyecto, lo declarado, la localización y la región.
// Cada elemento conserva su origen. No modifica la ficha ni reemplaza la evaluación.
export function preselect(project) {
  const t = PROJECT_TYPES.find(x => x.id === project.tipo) || null;
  const code = regionCode(project), reg = REGIONS.find(r => r.code === code);
  const loc = project.location || {}, obrasDecl = project.obras || {};
  const near = id => loc[id] === 'dentro' || loc[id] === 'colindante';
  const M = () => new Map();
  const act = M(), tip = M(), obras = M(), pas = M(), norm = M(), locs = M();
  const add = (m, id, label, origin, extra) => { const x = m.get(id) || { id, label, origins: [], ...extra }; if (origin && !x.origins.includes(origin)) x.origins.push(origin); m.set(id, x); };
  const actLabel = id => (ACTIVITIES.find(a => a.id === id) || {}).label || id;
  const obraLabel = id => ((OBRAS.find(o => o.id === id) || {}).label || id).replace(/^[^·]+· /, '');
  const locLabel = id => (LOCATION_ELEMENTS.find(l => l.id === id) || {}).label || id;
  const tl = t ? 'Tipo: ' + t.label : null;
  if (t) { t.activities.forEach(a => add(act, a, actLabel(a), tl)); t.obras.forEach(o => add(obras, o, obraLabel(o), tl)); t.loc.forEach(l => add(locs, l, locLabel(l), tl)); }
  (project.activities || []).forEach(a => add(act, a, actLabel(a), 'Actividad declarada'));
  Object.entries(obrasDecl).filter(([, v]) => v === 'si').forEach(([o]) => add(obras, o, obraLabel(o), 'Obra declarada'));
  PRESELECT_LOC_RULES.forEach(r => {
    if (!r.loc.some(near)) return;
    if (r.regions && !(code && r.regions.includes(code))) return;
    const o = 'Localización: ' + r.why;
    r.rules.forEach(id => { const ru = RULES.find(x => x.rule_id === id); if (ru) add(tip, id, ru.literal + ' · ' + ru.rule_name, o); });
    r.obras.forEach(id => add(obras, id, obraLabel(id), o));
  });
  PRESELECT_REGION_RULES.forEach(r => {
    if (!code || !r.regions.includes(code) || !r.ifActivity.some(a => act.has(a))) return;
    const o = 'Región ' + (reg ? reg.name : code) + ': ' + r.why;
    r.loc.forEach(l => add(locs, l, locLabel(l), o)); r.obras.forEach(id => add(obras, id, obraLabel(id), o));
  });
  RULES.filter(r => r.rule_type === 'tipologia_art3' && r.activity).forEach(r => {
    [].concat(r.activity).forEach(a => { const x = act.get(a); if (x) x.origins.forEach(o => add(tip, r.rule_id, r.literal + ' · ' + r.rule_name, o)); });
  });
  RULES.filter(r => r.rule_type === 'tipologia_art3' && !r.activity && !tip.has(r.rule_id)).forEach(r => add(tip, r.rule_id, r.literal + ' · ' + r.rule_name, 'Se evalúa siempre según localización'));
  obras.forEach((o, id) => {
    o.answer = obrasDecl[id] || 'desconocido';
    if (o.answer === 'no') return;
    PAS_CATALOG.filter(p => p.trigger === id).forEach(p => {
      if (p.regions && code && !p.regions.includes(code)) return;
      add(pas, p.id, 'PAS ' + p.articulo + ' · ' + p.nombre, 'Obra: ' + o.label, { organismo: p.organismo });
    });
    NORMATIVA.filter(n => n.trigger === id).forEach(n => add(norm, n.id, n.norma + ' · ' + n.materia, 'Obra: ' + o.label));
  });
  NORMATIVA.filter(n => n.triggerActivity && act.has(n.triggerActivity)).forEach(n => add(norm, n.id, n.norma + ' · ' + n.materia, 'Actividad: ' + actLabel(n.triggerActivity)));
  NORMATIVA.filter(n => n.triggerLoc && near(n.triggerLoc)).forEach(n => add(norm, n.id, n.norma + ' · ' + n.materia, 'Localización: ' + locLabel(n.triggerLoc)));
  locs.forEach((l, id) => { l.answer = loc[id] || 'desconocido'; });
  const arr = m => [...m.values()];
  return { type: t, region: code, activities: arr(act).map(a => ({ ...a, declared: (project.activities || []).includes(a.id) })), tipologias: arr(tip), obras: arr(obras), pas: arr(pas), normativa: arr(norm), locs: arr(locs),
    pendingObras: arr(obras).filter(o => o.answer === 'desconocido').length, pendingLocs: arr(locs).filter(l => l.answer === 'desconocido').length,
    missingActivities: t ? t.activities.filter(a => !(project.activities || []).includes(a)) : [] };
}

// "¿Por qué se obtuvo este resultado?": explicación estructurada y determinista a partir de los resultados.
export function explain(seia, art11) {
  const det = seia.results.filter(r => r.role === 'determinante');
  const pick = st => det.filter(r => r.status === st);
  const cond = r => (r.trace || []).filter(t => t.kind !== 'region' || t.result !== 'TRUE').map(t => ({ label: t.label, provided: t.provided, threshold: t.threshold ? (t.op ? t.op + ' ' : '') + t.threshold : '', calc: t.calc || '', result: t.result, layer: t.layer || (['review', 'pending', 'mod'].includes(t.kind) ? 'interpretacion' : t.kind === 'dep' ? 'motor' : 'dato'), note: t.note || '' }));
  const main = seia.global === 'INGRESO_OBLIGATORIO_IDENTIFICADO' ? pick('ACTIVADA') : seia.global === 'REVISION_ESPECIALIZADA_NECESARIA' ? pick('REVISION') : seia.global === 'INFORMACION_INSUFICIENTE' ? pick('INFO_INSUFICIENTE') : [];
  const missing = [...new Set(seia.results.flatMap(r => r.missing || []))];
  const steps = [];
  if (missing.length) steps.push('Completar ' + missing.length + ' antecedente(s) faltante(s) y volver a ejecutar.');
  if (pick('REVISION').length) steps.push('Someter a revisión jurídica o técnica: ' + pick('REVISION').map(r => r.literal).join(', ') + '.');
  if (seia.global === 'INGRESO_OBLIGATORIO_IDENTIFICADO') steps.push(art11 && art11.global === 'VIA_NO_DETERMINADA' ? 'Completar el análisis del art. 11 en los criterios ' + (art11.blocking || []).join(', ') + '.' : 'Preparar la ' + (art11 && art11.global === 'EIA_PROCEDENTE_SEGUN_ANALISIS_PRELIMINAR' ? 'línea de base y el EIA' : 'DIA con los antecedentes que justifican la inexistencia de los efectos del art. 11') + '.');
  if (seia.global === 'INGRESO_NO_IDENTIFICADO_CON_ANTECEDENTES_DISPONIBLES') steps.push('Evaluar una consulta de pertinencia ante el SEA (art. 26 RSEIA) si existen dudas.');
  return {
    global: seia.global, label: seia.global_label,
    basis: main.map(r => ({ id: r.rule_id, literal: r.literal, name: r.rule_name, ref: r.legal_reference, version: r.version_id, validation: r.validation_status, source: r.source_url, outcome: r.outcome, explanation: r.explanation, conditions: cond(r) })),
    discarded: det.filter(r => r.status === 'NO_ACTIVADA' || r.status === 'EXCEPCION_APLICADA').map(r => ({ literal: r.literal, name: r.rule_name, why: r.explanation })),
    notDeclared: det.filter(r => r.status === 'DESCARTADA').length,
    missing, uncertainties: [...pick('REVISION').map(r => r.literal + ': ' + r.explanation), ...det.filter(r => (r.trace || []).some(t => t.near)).map(r => r.literal + ': dato próximo al umbral')],
    art11: art11 ? (art11.rationale || '') : '', steps
  };
}
