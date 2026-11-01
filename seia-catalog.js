// LiqenInsight SEIA — Catálogo normativo versionado (solo datos y constructores de reglas; sin lógica de evaluación).
// Estados de validación:
//  TEXTO_OFICIAL_CONTRASTADO: condición codificada a partir del texto consolidado oficial (LeyChile/BCN). Sin revisión jurídica.
//  FUENTE_SECUNDARIA: cambio del D.S. 17/2025 descrito de forma concordante por fuentes secundarias; texto oficial no cotejado.
//  PENDIENTE_VALIDACION: texto no cotejado o condición con interpretación abierta.
//  VALIDADA_JURIDICAMENTE: revisada por profesional habilitado (ninguna en esta versión).

export const CATALOG_VERSION = 'CAT-2026.10-dev.4';
export const CATALOG_CONSULTED_AT = '2026-10-19';
const DS40_URL = 'https://www.bcn.cl/leychile/navegar?idNorma=1053563';
const DS40_PDF = 'https://faolex.fao.org/docs/pdf/chi127211.pdf';
const DS17_URL = 'https://bcn.cl/A1K4dP';
export const DS40_FROM = '2013-12-24';
export const DS17_FROM = '2026-01-21';
const DS8_FROM = '2014-03-27', DS63_FROM = '2014-10-06';

export const LEGAL_SOURCES = [
  { id: 'DS40-LEYCHILE-2024', title: 'D.S. N.º 40/2012 MMA — texto consolidado LeyChile, última modificación D.S. 30 (D.O. 01-02-2024)', kind: 'reglamento', url: DS40_PDF, status: 'oficial_consultado', note: 'Documento generado por BCN el 22-02-2024, 124 páginas. Fuente de arts. 2 g), 3, 5–10 y 111–161. No incluye el D.S. 17/2025.' },
  { id: 'DS40-BCN', title: 'D.S. N.º 40/2012 MMA — ficha LeyChile', kind: 'reglamento', url: DS40_URL, status: 'oficial', note: 'Ficha de la norma con versiones. Debe usarse para obtener la versión consolidada que ya incorpora el D.S. 17/2025.' },
  { id: 'DS17-2025', title: 'D.S. N.º 17/2025 MMA, modifica el Reglamento del SEIA (D.O. 21-01-2026)', kind: 'modificacion', url: DS17_URL, status: 'oficial_consultado', published: '2026-01-21', note: 'Texto oficial LeyChile, versión única de 21-01-2026 (documento generado el 18-10-2026). Modifica art. 2 g.1; art. 3 b.1, e.6, g.1.2, g.2, i), i.1, i.6, n.1, n.2, ñ.1–ñ.5, o), o.3, o.4, o.5, o.7, o.8, o.9, o.10; y agrega art. 60 d.7. No modifica h.2 ni f.3: esas propuestas del anteproyecto fueron desacumuladas (Res. Ex. 2.955/2025).' },
  { id: 'SEC-MONTT-DS17', title: 'Montt Group — Modificación al RSEIA (D.S. 17/2025)', kind: 'secundaria', url: 'https://monttgroup.com/en/alerta/modificacion-al-reglamento-del-sistema-deevaluacion-de-impacto-ambiental-2/', status: 'reemplazada', note: 'Reemplazada por el texto oficial. Su referencia a h.2 (5 % → 2 %) corresponde al anteproyecto y no fue aprobada.' },
  { id: 'SEC-SUBPESCA-DS17', title: 'Subpesca — Manual explicativo D.S. 17/2025 (acuicultura)', kind: 'secundaria_oficial', url: 'https://www.subpesca.cl/portal/618/articles-129207_documento.pdf', status: 'secundaria', note: 'n.1 macroalgas y n.2 moluscos filtradores: producción de 500 y 300 t a 1.000 t; superficies sin cambio.' },
  { id: 'SEC-REPORTEMINERO-DS17', title: 'Reporte Minero — Resumen de cambios D.S. 17/2025', kind: 'secundaria', url: 'https://www.reporteminero.cl/noticia/noticias/2026/01/modificacion-reglamento-seia-nuevos-umbrales-excepciones', status: 'secundaria', note: 'b.1 longitud mínima de 2 km; e.6 a 850.000 L; vigencia inmediata.' },
  { id: 'MMA-MINUTA-ANTEPROYECTO', title: 'MMA — Minuta del anteproyecto de reforma al RSEIA', kind: 'anteproyecto', url: 'https://expedientes.mma.gob.cl/storage/2025/07/29/expedientes/pdf/doc_11_20250729135110.pdf', status: 'no_vinculante', note: 'Documento de proceso. No se usa como fuente de obligaciones.' },
  { id: 'LEY-21455', title: 'Ley N.º 21.455, Ley Marco de Cambio Climático', kind: 'ley', url: 'https://www.bcn.cl/leychile/', status: 'no_incorporado', note: 'Pendiente de validación: no se han cotejado sus modificaciones a la Ley 19.300 ni su efecto en el contenido de DIA y EIA. No se usa en ninguna regla.' },
  { id: 'RSEIA-18-19', title: 'D.S. 40 arts. 18 y 19 — contenidos mínimos del EIA y de la DIA', kind: 'reglamento', url: 'https://faolex.fao.org/docs/pdf/chi127211.pdf', status: 'referencia', note: 'Se citan en el informe como contenidos exigibles según la vía. No generan reglas de ingreso.' },
  { id: 'LEY-19300', title: 'Ley N.º 19.300 sobre Bases Generales del Medio Ambiente', kind: 'ley', url: 'https://www.bcn.cl/leychile/', status: 'vigente_texto_no_cotejado', note: 'Art. 10 s) (humedales urbanos, Ley 21.202) codificado sin cotejo del texto consolidado.' },
  { id: 'SEA-GUIAS-PAS', title: 'SEA — Guías para los Permisos Ambientales Sectoriales', kind: 'guia', url: 'https://www.sea.gob.cl/guias-para-los-permisos-ambientales-sectoriales-pas', status: 'indice_consultado', note: 'Índice consultado el 21-10-2026: 16 guías trámite (PAS 116, 131, 132, 133, 135, 136, 137, 138, 140, 146, 148, 149, 155, 156, 157 y 160), con edición, resolución y enlace asociados a cada permiso. El contenido de cada guía no se ha incorporado como regla.' },
  { id: 'SEA-GUIAS-EIA', title: 'SEA — Guías relacionadas al artículo 11 de la Ley 19.300', kind: 'guia', url: 'https://www.sea.gob.cl/guias-relacionadas-al-articulo-11-de-la-ley-ndeg19300', status: 'indice_consultado', note: 'Índice consultado el 21-10-2026: 13 guías asociadas a los criterios a) a f) del art. 11 (salud, recursos naturales, ecosistemas terrestres y marinos, humedales, sistemas de vida, reasentamiento, paisaje, turismo, patrimonio, ruido, olor, compensación). Se muestran en cada criterio; la significancia sigue siendo determinación profesional.' }
];

// Regiones de norte a sur. Ñuble (creada en 2018) no figura en los tramos del texto de 2013.
export const REGIONS = [
  ['AP', 'Arica y Parinacota', ['arica', 'parinacota', 'xv']], ['TA', 'Tarapacá', ['tarapaca', 'i']], ['AN', 'Antofagasta', ['antofagasta', 'ii']],
  ['AT', 'Atacama', ['atacama', 'iii']], ['CO', 'Coquimbo', ['coquimbo', 'iv']], ['VA', 'Valparaíso', ['valparaiso', 'v']],
  ['RM', 'Metropolitana de Santiago', ['metropolitana', 'santiago', 'rm']], ['OH', "Libertador General Bernardo O'Higgins", ['ohiggins', "o'higgins", 'libertador', 'vi']],
  ['ML', 'Maule', ['maule', 'vii']], ['NB', 'Ñuble', ['nuble', 'xvi']], ['BI', 'Biobío', ['biobio', 'bio bio', 'bio-bio', 'viii']],
  ['AR', 'La Araucanía', ['araucania', 'ix']], ['LR', 'Los Ríos', ['los rios', 'xiv']], ['LL', 'Los Lagos', ['los lagos', 'x']],
  ['AY', 'Aysén', ['aysen', 'aisen', 'xi']], ['MA', 'Magallanes y Antártica Chilena', ['magallanes', 'xii']]
].map(([code, name, aliases]) => ({ code, name, aliases }));
const Z = { AP_CO: ['AP', 'TA', 'AN', 'AT', 'CO'], AP_AT: ['AP', 'TA', 'AN', 'AT'], VA_ML: ['VA', 'RM', 'OH', 'ML'], BI_MA: ['BI', 'AR', 'LR', 'LL', 'AY', 'MA'], CO_MA: ['CO', 'VA', 'RM', 'OH', 'ML', 'NB', 'BI', 'AR', 'LR', 'LL', 'AY', 'MA'], VA_MA: ['VA', 'RM', 'OH', 'ML', 'NB', 'BI', 'AR', 'LR', 'LL', 'AY', 'MA'], NORTE: ['AP', 'TA', 'AN'], VA_RM: ['VA', 'RM'], OH_AY: ['OH', 'ML', 'NB', 'BI', 'AR', 'LR', 'LL', 'AY'], MA: ['MA'] };

export const UNITS = {
  'W': ['potencia', 1e-6], 'kW': ['potencia', 1e-3], 'MW': ['potencia', 1], 'GW': ['potencia', 1e3],
  'kVA': ['pot_aparente', 1], 'MVA': ['pot_aparente', 1e3],
  'V': ['tension', 1e-3], 'kV': ['tension', 1],
  'm': ['longitud', 1e-3], 'km': ['longitud', 1],
  'm²': ['superficie', 1], 'ha': ['superficie', 1e4], 'km²': ['superficie', 1e6],
  'ha/año': ['sup_anual', 1],
  'L': ['volumen', 1e-3], 'm³': ['volumen', 1], 'hm³': ['volumen', 1e6],
  'm³/mes': ['vol_mes', 1], 'm³/día': ['vol_dia', 1], 'L/s': ['vol_dia', 86.4], 'm³ ssc/h': ['madera_h', 1],
  'kg': ['masa', 1e-3], 't': ['masa', 1], 'kt': ['masa', 1e3],
  'kg/día': ['masa_dia', 1e-3], 't/día': ['masa_dia', 1], 'kg/h': ['masa_hora', 1e-3], 't/h': ['masa_hora', 1],
  'kg/mes': ['masa_mes', 1e-3], 't/mes': ['masa_mes', 1], 'kt/mes': ['masa_mes', 1e3], 't/año': ['masa_anio', 1],
  'm²/día': ['sup_dia', 1], '%': ['porcentaje', 1], 'km/h': ['velocidad', 1],
  'viviendas': ['viviendas', 1], 'personas': ['personas', 1], 'habitantes': ['habitantes', 1], 'sitios': ['sitios', 1],
  'camas': ['camas', 1], 'naves': ['naves', 1], 'plataformas': ['plataformas', 1], 'UA': ['ua', 1], 'animales': ['animales', 1]
};
// Las bases temporales distintas (t/día frente a t/mes) nunca se convierten: requieren un supuesto de operación.

export const NATURE = [
  { id: 'nuevo', label: 'Proyecto nuevo' }, { id: 'modificacion', label: 'Modificación de proyecto existente' },
  { id: 'ampliacion', label: 'Ampliación de capacidad' }, { id: 'cambio_proceso', label: 'Cambio de proceso' },
  { id: 'continuidad', label: 'Continuidad operacional' }, { id: 'valorizacion', label: 'Reprocesamiento o valorización' },
  { id: 'complementarias', label: 'Obras complementarias' }, { id: 'etapas', label: 'Ejecución por etapas' },
  { id: 'con_rca', label: 'Proyecto con RCA previa' }, { id: 'sin_rca', label: 'Proyecto sin RCA conocida' }
];

export const ACTIVITIES = [
  ['hid', 'a · Presas, drenaje, dragado, defensa o alteración de cuerpos o cursos de agua'], ['glac', 'a.5 · Obras que alteren glaciares'],
  ['lt', 'b · Líneas de transmisión eléctrica o subestaciones'], ['gen', 'c · Centrales generadoras de energía'], ['nuc', 'd · Reactores o establecimientos nucleares'],
  ['aero', 'e.1 · Aeropuertos'], ['term', 'e.2–e.4 · Terminales de buses, camiones o ferrocarriles'], ['ferro', 'e.5 · Vías férreas'], ['eds', 'e.6 · Estaciones de servicio'], ['vial', 'e.7–e.8 · Autopistas o caminos públicos'],
  ['port', 'f · Puertos, vías de navegación, astilleros o terminales marítimos'], ['urb', 'g.1 / h.1 · Desarrollo urbano, inmobiliario o equipamiento'], ['tur', 'g.2 · Desarrollo turístico'],
  ['min', 'i.1 · Extracción o beneficio minero'], ['prosp', 'i.2 · Prospección minera'], ['rel', 'i.3 · Disposición de residuos masivos mineros'], ['hc', 'i.4 · Petróleo y gas'], ['arid', 'i.5 · Extracción de áridos o greda'], ['turba', 'i.6 · Extracción de turba'],
  ['ducto', 'j · Oleoductos, gasoductos, ductos mineros o análogos'], ['fab', 'k.1 · Instalación fabril'], ['curt', 'k.2 · Curtiembre'],
  ['agro', 'l.1 · Agroindustria'], ['matad', 'l.2 · Matadero'], ['plantel', 'l.3–l.5 · Planteles y establos de animales'],
  ['forest', 'm.1 · Explotación forestal'], ['astill', 'm.2 · Planta astilladora'], ['aserr', 'm.3 · Aserradero o planta elaboradora de madera'], ['celul', 'm.4 · Celulosa, pasta de papel o papel'],
  ['acuiext', 'n · Explotación intensiva de recursos hidrobiológicos'], ['acui', 'n.1–n.5 · Cultivo de recursos hidrobiológicos'], ['acuipl', 'n · Planta procesadora de recursos hidrobiológicos'],
  ['sptox', 'ñ.1 · Sustancias tóxicas'], ['spexp', 'ñ.2 · Sustancias explosivas'], ['spinf', 'ñ.3 · Sustancias inflamables'], ['spcor', 'ñ.4 · Sustancias corrosivas o reactivas'], ['sptr', 'ñ.5 · Transporte terrestre de sustancias peligrosas'], ['sprad', 'ñ.6–ñ.7 · Sustancias radiactivas'],
  ['san_ap', 'o.1–o.3 · Alcantarillado, aguas lluvias o agua potable'], ['san_ptas', 'o.4 · Planta de tratamiento de aguas domiciliarias'], ['san_rsd', 'o.5 · Residuos sólidos domiciliarios'], ['san_emis', 'o.6 · Emisario submarino'],
  ['san_riles', 'o.7 · Tratamiento o disposición de RILes'], ['san_ris', 'o.8 · Residuos industriales sólidos'], ['san_respel', 'o.9 · Residuos peligrosos'], ['san_salud', 'o.10 · Residuos de establecimientos de salud'], ['remed', 'o.11 · Reparación de áreas contaminadas'],
  ['quim', 'q · Aplicación masiva de productos químicos'], ['ogm', 'r · Organismos genéticamente modificados'], ['coto', 'RSEIA s · Cotos de caza'], ['subsuelo', 'RSEIA t · Concesión del subsuelo de bienes nacionales de uso público'],
  ['otra', 'Otra actividad no catalogada']
].map(([id, label]) => ({ id, label }));

// Parámetros. type: number | count | bool | enum. activity: actividades que lo hacen visible. when: condición adicional de visibilidad.
const N = (id, label, unit, units, activity, help, when) => ({ id, label, type: 'number', unit, units: units || [unit], activity, help, when });
const C_ = (id, label, unit, activity, help, when) => ({ id, label, type: 'count', unit, units: [unit], activity, help, when });
const B = (id, label, activity, help, when) => ({ id, label, type: 'bool', activity, help, when });
const E_ = (id, label, options, activity, help, when) => ({ id, label, type: 'enum', options, activity, help, when });
const VOL = ['m³', 'L', 'hm³'], SUP = ['m²', 'ha', 'km²'], MD = ['t/día', 'kg/día'], MASA = ['t', 'kg', 'kt'];
const CERO = 'Escriba 0 si no aplica.';
export const INPUTS = [
  N('a1_altura_muro', 'Altura del muro de la presa (coronamiento a terreno natural)', 'm', ['m'], ['hid'], CERO),
  N('a1_capacidad', 'Capacidad del embalse', 'm³', VOL, ['hid'], CERO),
  B('a2_vegas_bofedales', '¿Drena o deseca vegas o bofedales?', ['hid'], 'Relevante en Arica y Parinacota, Tarapacá y Antofagasta.'),
  N('a2_nadis', 'Superficie de suelos ñadis a recuperar o afectar', 'ha', SUP, ['hid'], CERO),
  B('a2_turberas', '¿Drena o deseca turberas?', ['hid']),
  N('a2_otros', 'Superficie de otros cuerpos naturales (lagos, lagunas, humedales…) a recuperar o afectar', 'ha', SUP, ['hid'], CERO),
  N('a3_dragado_cont', 'Dragado en aguas continentales (material total)', 'm³', VOL, ['hid'], CERO),
  N('a3_dragado_mar', 'Dragado en aguas marítimas (material total)', 'm³', VOL, ['hid', 'port'], CERO),
  N('a4_defensa', 'Material movilizado por defensa o alteración de cauce', 'm³', VOL, ['hid'], CERO),
  B('a4_pesca_recreativa', '¿Altera lecho o ribera en un área preferencial para la pesca recreativa?', ['hid']),
  B('a5_glaciar', '¿Las obras o actividades alteran características de un glaciar?', ['hid', 'glac'], null, 'loc:glaciar'),
  N('tension_linea', 'Tensión de la línea', 'kV', ['V', 'kV'], ['lt']),
  N('longitud_linea', 'Longitud del trazado', 'km', ['m', 'km'], ['lt']),
  B('b2_subestacion', '¿Incluye subestaciones asociadas a líneas de alto voltaje que mantienen el voltaje a nivel de transporte?', ['lt']),
  N('potencia_instalada', 'Potencia de la central', 'MW', ['W', 'kW', 'MW', 'GW'], ['gen'], 'Indique en la fuente si es potencia nominal o bruta.'),
  B('d1_nuclear', '¿Procesa, manipula, almacena o dispone material capaz de un proceso sostenido de fisión (salvo uranio natural o empobrecido)?', ['nuc']),
  B('e1_aeropuerto', '¿Es un aeródromo público habilitado para vuelos internacionales?', ['aero']),
  C_('e2_buses', 'Sitios de estacionamiento de buses', 'sitios', ['term'], CERO),
  C_('e3_camiones', 'Sitios de estacionamiento de camiones (con almacenaje y transferencia de carga)', 'sitios', ['term'], CERO),
  B('e4_ferro', '¿Es un recinto de inicio o finalización de vías férreas?', ['term']),
  B('e5_via', '¿Habilita una línea de rieles para trenes urbanos o interurbanos?', ['ferro']),
  B('e5_interior', '¿La vía férrea está al interior de una faena industrial o minera?', ['ferro']),
  N('capacidad_almacenamiento_combustible', 'Capacidad de almacenamiento de combustible', 'L', ['L', 'm³'], ['eds']),
  B('e7_autopista', '¿Es una vía con dos o más pistas unidireccionales por calzada, mediana, diseño ≥ 120 km/h, control total de accesos y enlaces?', ['vial']),
  B('e8_camino', '¿Es un camino público?', ['vial']),
  B('f1_puerto', '¿Es un puerto para naves mayores con fines comerciales o productivos (no solo conectividad interna)?', ['port']),
  B('f2_via', '¿Construye o acondiciona una vía de navegación?', ['port']),
  B('f3_astillero', '¿Es un astillero (excluye varaderos, hangares y diques flotantes)?', ['port']),
  B('f4_terminal', '¿Es un terminal marítimo para buques tanque con cañerías de carga o descarga?', ['port']),
  B('g_plan_eae', '¿La zona está comprendida en un instrumento de planificación territorial evaluado estratégicamente?', ['urb', 'tur'], 'Si la respuesta es sí, la letra g) no aplica.'),
  C_('g11_viviendas', 'Número de viviendas', 'viviendas', ['urb'], CERO),
  B('g11_social', '¿Son viviendas sociales, progresivas o infraestructura sanitaria?', ['urb']),
  B('g12_equipamiento', '¿Contempla equipamiento permanente (salud, educación, comercio, servicios u otros)?', ['urb']),
  N('urb_sup_construida', 'Superficie construida', 'm²', SUP, ['urb', 'tur'], CERO),
  N('urb_sup_predial', 'Superficie predial (a intervenir)', 'm²', SUP, ['urb', 'tur'], 'Desde el D.S. 17/2025 se precisa «superficie predial a intervenir». ' + CERO),
  C_('urb_personas', 'Capacidad de atención, afluencia o permanencia simultánea', 'personas', ['urb', 'tur'], CERO),
  C_('urb_estac', 'Sitios de estacionamiento de vehículos', 'sitios', ['urb', 'tur'], CERO),
  { ...N('g13_loteo_ind', 'Superficie de urbanización o loteo con destino industrial', 'm²', SUP, ['urb', 'fab'], CERO), alsoWhen: 'loc:zona_latente_saturada' },
  C_('g2_camas', 'Capacidad en camas', 'camas', ['tur'], CERO),
  C_('g2_camping', 'Sitios para acampar', 'sitios', ['tur'], CERO),
  C_('g2_naves', 'Capacidad para naves', 'naves', ['tur'], CERO),
  B('h11_sistemas_propios', '¿Se emplaza en área de extensión urbana o rural y requiere sistemas propios de agua potable o aguas servidas?', ['urb'], null, 'loc:zona_latente_saturada'),
  B('h12_vias', '¿Incorpora al dominio público vías expresas o troncales?', ['urb'], null, 'loc:zona_latente_saturada'),
  N('h13_superficie', 'Superficie del proyecto inmobiliario', 'ha', SUP, ['urb'], CERO, 'loc:zona_latente_saturada'),
  N('h2_pct', 'Emisión diaria esperada del contaminante que motiva la declaración, respecto del total de la zona para ese tipo de fuente (umbral 5 %)', '%', ['%'], null, 'Requiere inventario de emisiones de la zona.', 'loc:zona_latente_saturada'),
  N('capacidad_extraccion', 'Capacidad de extracción de mineral', 't/mes', ['t/mes', 'kt/mes', 'kg/mes', 't/día', 't/año'], ['min'], 'Bases temporales distintas a t/mes no se convierten.'),
  B('i1_reprocesa_relaves', '¿Contempla reprocesamiento de relaves dentro de la faena en operación o valorización de residuos masivos mineros?', ['min'], 'Excepción del art. 3 i.1, párrafo segundo (D.S. 17/2025).'),
  B('i1_rca_disposicion', '¿Cuenta con RCA favorable y vigente para la disposición de residuos masivos mineros?', ['min'], null, 'inp:i1_reprocesa_relaves'),
  B('i1_relaves_frescos', '¿Se trata de reprocesamiento de relaves frescos?', ['min'], null, 'inp:i1_reprocesa_relaves'),
  N('i1_aumento_pct', 'Capacidad del reprocesamiento o valorización respecto de la capacidad nominal autorizada de procesamiento de minerales', '%', ['%'], ['min'], null, 'inp:i1_reprocesa_relaves'),
  C_('i2_plataformas', 'Plataformas de prospección (con sus sondajes)', 'plataformas', ['prosp']),
  B('dispone_residuos_masivos', '¿Dispone residuos masivos mineros (estériles, relaves, ripios, escorias)?', ['rel']),
  B('residuos_de_otros_proyectos', '¿Los residuos provienen también de otros proyectos mineros?', ['rel']),
  B('i4_explotacion', '¿Explota yacimientos con posterioridad a la perforación del primer pozo exploratorio o instala plantas procesadoras?', ['hc']),
  E_('i5_tipo', 'Tipo de extracción de áridos', [['pozo', 'Pozo o cantera'], ['cauce', 'Cuerpo o curso de agua'], ['playa', 'Arena en playa']], ['arid']),
  N('i5_mes', 'Extracción mensual (pozo o cantera)', 'm³/mes', ['m³/mes'], ['arid'], CERO),
  N('i5_total', 'Material total a remover en la vida útil', 'm³', VOL, ['arid']),
  N('i5_sup', 'Superficie total de extracción (pozo o cantera)', 'ha', SUP, ['arid'], CERO),
  B('i6_turba', '¿Extrae turba?', ['turba']),
  B('j_ducto', '¿Une centros de producción, almacenamiento, tratamiento o disposición mediante canales o tuberías?', ['ducto']),
  B('j_excepcion', '¿Es una red de distribución o un ducto interior de un centro de producción?', ['ducto']),
  N('k1_kva', 'Potencia instalada (suma de capacidades de transformadores, o suma equivalente si usa varios tipos de energía)', 'kVA', ['kVA', 'MVA'], ['fab', 'agro', 'matad', 'astill', 'aserr', 'acuipl']),
  B('k1_loteo_ind', '¿Se emplaza en loteo o uso de suelo industrial de un IPT aprobado ambientalmente?', ['fab']),
  N('capacidad_cueros', 'Capacidad de producción (materia prima de cueros)', 'm²/día', ['m²/día'], ['curt']),
  N('l1_residuos', 'Residuos sólidos generados en algún día de operación', 't/día', MD, ['agro']),
  N('l2_faena', 'Tasa de faena (canales)', 't/mes', ['t/mes', 'kt/mes'], ['matad']),
  C_('l31', 'Bovinos de carne en confinamiento', 'UA', ['plantel'], CERO), C_('l32', 'Bovinos de leche en confinamiento', 'UA', ['plantel'], CERO),
  C_('l33a', 'Porcinos menores de 25 kg', 'animales', ['plantel'], CERO), C_('l33b', 'Porcinos mayores de 25 kg', 'animales', ['plantel'], CERO),
  C_('l34', 'Ovinos o caprinos', 'UA', ['plantel'], CERO), C_('l41', 'Pollos', 'animales', ['plantel'], CERO), C_('l42', 'Gallinas', 'animales', ['plantel'], CERO),
  C_('l43', 'Pavos', 'animales', ['plantel'], CERO), N('l44', 'Peso vivo de otras aves', 't', MASA, ['plantel'], CERO), N('l5', 'Peso vivo de otros animales', 't', MASA, ['plantel'], CERO),
  E_('m1_suelo', 'Terreno de la corta', [['fragil', 'Suelos frágiles (plantaciones)'], ['nativo', 'Bosque nativo (tala rasa)'], ['otro', 'Otro']], ['forest']),
  N('m1_ha', 'Superficie única o continua de corta', 'ha/año', ['ha/año'], ['forest']),
  N('m2_consumo', 'Consumo de madera de la astilladora', 'm³ ssc/h', ['m³ ssc/h'], ['astill']),
  N('m3_consumo', 'Consumo de madera del aserradero o planta', 'm³ ssc/h', ['m³ ssc/h'], ['aserr']),
  B('n_intensiva', '¿Utiliza recursos hidrobiológicos en categoría de conservación mediante barcos fábrica o factoría?', ['acuiext']),
  N('n1_t', 'Macroalgas: producción anual', 't/año', ['t/año'], ['acui'], CERO), N('n1_m2', 'Macroalgas: superficie de cultivo', 'm²', SUP, ['acui'], CERO),
  N('n2_t', 'Moluscos filtradores (desde el D.S. 17: moluscos y otras filtradoras, sistema extensivo): producción anual', 't/año', ['t/año'], ['acui'], CERO), N('n2_m2', 'Moluscos y otras filtradoras: superficie de cultivo', 'm²', SUP, ['acui'], CERO),
  N('n2_otras', 'Otras especies filtradoras: producción anual (solo texto anterior al D.S. 17)', 't/año', ['t/año'], ['acui'], CERO),
  N('n3_t', 'Sistema intensivo (equinodermos, crustáceos, moluscos no filtradores, peces): producción anual', 't/año', ['t/año'], ['acui'], CERO),
  N('n4_t', 'Cultivo en ríos navegables en zona no afecta a marea: producción anual', 't/año', ['t/año'], ['acui'], CERO),
  B('n4_lago', '¿Cultiva en ríos no navegables o en lagos?', ['acui']),
  N('n5_t', 'Peces: producción anual', 't/año', ['t/año'], ['acui'], CERO),
  B('n5_juveniles', '¿Cultiva microalgas o juveniles con suministro o evacuación de aguas?', ['acui']),
  N('n_planta', 'Planta procesadora: biomasa en el mes de máxima producción', 't/mes', ['t/mes', 'kt/mes'], ['acuipl']),
  B('nn_habitual', '¿La producción, disposición o reutilización se realiza durante un semestre o más, con periodicidad mensual o mayor?', ['sptox', 'spexp', 'spinf', 'spcor']),
  N('nn1_prod', 'Tóxicas: producción, disposición o reutilización', 't/día', MD, ['sptox'], CERO), N('nn1_alm', 'Tóxicas: capacidad de almacenamiento', 't', MASA, ['sptox'], CERO),
  N('nn2_prod', 'Explosivas: producción, disposición o reutilización', 't/día', MD, ['spexp'], CERO), N('nn2_alm', 'Explosivas: capacidad de almacenamiento', 't', MASA, ['spexp'], CERO),
  N('nn3_prod', 'Inflamables: producción, disposición o reutilización', 't/día', MD, ['spinf'], CERO), N('nn3_alm', 'Inflamables: capacidad de almacenamiento', 't', MASA, ['spinf'], CERO),
  N('nn4_prod', 'Corrosivas o reactivas: producción, disposición o reutilización', 't/día', MD, ['spcor'], CERO), N('nn4_alm', 'Corrosivas o reactivas: capacidad de almacenamiento', 't', MASA, ['spcor'], CERO),
  N('nn5_transp', 'Transporte terrestre durante un semestre o más', 't/día', MD, ['sptr']),
  B('nn6', '¿Produce, almacena o dispone material radiactivo sobre los límites A2 o 5000 A1, semanalmente y por más de seis meses?', ['sprad']),
  B('nn7', '¿Transporta por tierra sustancias radiactivas que requerirían aprobación multilateral, semanalmente y por más de seis meses?', ['sprad']),
  C_('o1_hab', 'Alcantarillado de aguas servidas: población atendida', 'habitantes', ['san_ap'], CERO),
  B('o2_interconecta', '¿El sistema de aguas lluvias se interconecta con redes de aguas servidas que atienden 10.000 o más habitantes?', ['san_ap']),
  C_('o3_hab', 'Agua potable: población atendida', 'habitantes', ['san_ap'], CERO),
  C_('o4_hab', 'Planta de tratamiento de aguas domiciliarias: población atendida', 'habitantes', ['san_ptas']),
  E_('o5_tipo', 'Instalación de residuos domiciliarios', [['elim', 'Eliminación o relleno sanitario'], ['trat', 'Planta de tratamiento'], ['transf', 'Estación de transferencia'], ['acopio', 'Centro de acopio y clasificación']], ['san_rsd']),
  C_('o5_hab', 'Residuos domiciliarios: población atendida (texto anterior al D.S. 17)', 'habitantes', ['san_rsd']), N('o5_cap', 'Residuos domiciliarios: tasa de ingreso', 't/día', MD, ['san_rsd']),
  B('o5_compost_verde', '¿El compostaje trata exclusivamente residuos de arbolado urbano, parques, áreas verdes y jardines?', ['san_rsd']),
  B('o6_emisario', '¿Contempla un emisario submarino?', ['san_emis']),
  B('o71_lagunas', '¿Contempla lagunas de estabilización?', ['san_riles']), B('o72_riego', '¿Los efluentes se usan para riego, infiltración, aspersión o humectación?', ['san_riles']),
  B('o73_terceros', '¿Trata residuos de terceros?', ['san_riles']), C_('o74_eq', 'Carga contaminante equivalente (población)', 'personas', ['san_riles'], 'Equivalente a aguas servidas de la población indicada, en algún parámetro de la norma de descarga.'),
  B('o7_sin_tratar', '¿Se usan efluentes sin tratar para riego, aspersión o humectación de terrenos o caminos?', ['san_riles']),
  N('o7_riego_vol', 'Volumen de efluente tratado usado en riego, aspersión o humectación', 'm³/día', ['m³/día', 'L/s'], ['san_riles'], CERO), N('o7_caudal', 'Caudal de efluente tratado', 'm³/día', ['m³/día', 'L/s'], ['san_riles']),
  E_('o8_tipo', 'Residuos industriales sólidos', [['elim', 'Eliminación o disposición'], ['animal', 'Tratamiento de residuos de origen animal o lodos'], ['otros', 'Tratamiento de otros (compostaje, biodigestión)']], ['san_ris']),
  N('o8_trat', 'Capacidad de tratamiento', 't/día', MD, ['san_ris'], CERO), N('o8_disp', 'Capacidad de disposición', 't', MASA, ['san_ris'], CERO),
  N('o9_tox', 'Eliminación de residuos peligrosos tóxicos agudos (D.S. 148): tasa de ingreso', 'kg/día', MD, ['san_respel'], CERO), N('o9_otros', 'Eliminación de otros residuos peligrosos: tasa de ingreso', 'kg/día', MD, ['san_respel'], CERO),
  N('o9_trat', 'Tratamiento de residuos peligrosos: tasa de ingreso', 't/día', MD, ['san_respel'], CERO),
  N('o10', 'Residuos especiales de establecimientos de salud: capacidad', 'kg/día', MD, ['san_salud']),
  N('o11_sup', 'Superficie de áreas a reparar o recuperar', 'm²', SUP, ['remed']), B('o11_plan_sma', '¿Las medidas forman parte de un plan de reparación del art. 43 de la LOSMA?', ['remed']),
  B('q_aerea', '¿Planes o programas de aplicación aérea sobre 1.000 ha o más para prevenir o erradicar plagas?', ['quim']),
  B('q_proximo', '¿En área urbana, o en zona rural a menos de 5 km de centros poblados o cursos o masas de agua?', ['quim']),
  B('r_produccion', '¿Utiliza OGM con fines de producción (no de investigación)?', ['ogm']), B('r_confinada', '¿Opera en áreas confinadas con medidas de bioseguridad?', ['ogm']),
  B('s_coto', '¿Constituye un coto de caza (art. 10 Ley 19.473)?', ['coto']), B('t_subsuelo', '¿Es una obra concesionada para construir y explotar el subsuelo de bienes nacionales de uso público?', ['subsuelo']),
  B('altera_humedal_urbano', '¿Implica relleno, drenaje, secado, extracción de caudales o áridos, alteración de vegetación azonal u otra alteración física o química del humedal?', null, null, 'loc:humedal_urbano'),
  B('g2_suma_incluida', '¿Los parámetros informados incluyen la suma de partes, obras y acciones no calificadas ambientalmente (art. 2 g.2)?', null, null, 'mod'),
  B('frac_relacionado', '¿Existen otros proyectos, fases u obras del mismo titular o vinculados funcionalmente, ejecutados o proyectados en el mismo lugar o área?', null, 'Ley 19.300 art. 11 bis (fraccionamiento). Incluya fases anteriores sin evaluación ambiental.', 'all'),
  B('frac_etapas', '¿El proyecto corresponde a uno cuya ejecución se realizará por etapas, y puede acreditarlo?', null, 'Art. 11 bis inciso final: la prohibición no se aplica si se acredita la ejecución por etapas.', 'frac'),
  E_('g3_impactos', 'Art. 2 g.3: ¿la modificación cambia sustantivamente la extensión, magnitud o duración de los impactos?', [['si', 'Sí'], ['no', 'No'], ['ns', 'Sin determinar']], null, 'Indique el fundamento en la columna Fuente.', 'mod'),
  E_('g4_medidas', 'Art. 2 g.4: ¿se modifican sustantivamente las medidas de mitigación, reparación o compensación?', [['si', 'Sí'], ['no', 'No'], ['ns', 'Sin determinar']], null, 'Indique el fundamento en la columna Fuente.', 'mod')
];

export function inputVisible(i, p) {
  if (i.alsoWhen) { const [k2, v2] = i.alsoWhen.split(':'); if (k2 === 'loc' && ['dentro', 'colindante'].includes((p.location || {})[v2])) return true; }
  const acts = p.activities || [];
  const actOk = !i.activity || i.activity.some(a => acts.includes(a));
  if (!i.when) return !!i.activity && actOk;
  const [k, v] = i.when.split(':');
  let w = false;
  if (k === 'loc') w = ['dentro', 'colindante'].includes((p.location || {})[v]);
  if (k === 'inp') w = ((p.inputs || {})[v] || {}).value === true;
  if (k === 'mod') w = (p.nature || []).includes('modificacion');
  if (k === 'all') w = true;
  if (k === 'frac') w = ((p.inputs || {}).frac_relacionado || {}).value === true;
  return i.activity ? actOk && w : w;
}

export const LOCATION_ELEMENTS = [
  { id: 'area_protegida', label: 'Área colocada bajo protección oficial (parque, reserva, monumento natural u otra)', criteria: ['d'] },
  { id: 'santuario', label: 'Santuario de la Naturaleza', criteria: ['d'] },
  { id: 'sitio_prioritario', label: 'Sitio prioritario para la conservación', criteria: ['d'] },
  { id: 'humedal_ramsar', label: 'Humedal protegido (sitio Ramsar)', criteria: ['b', 'd'] },
  { id: 'humedal_urbano', label: 'Humedal total o parcialmente dentro del límite urbano', criteria: ['b', 'd'] },
  { id: 'humedal', label: 'Otros humedales, vegas, bofedales o turberas', criteria: ['b', 'd'] },
  { id: 'glaciar', label: 'Glaciares', criteria: ['b', 'd'] },
  { id: 'recursos_hidricos', label: 'Cuerpos y cursos de agua, acuíferos', criteria: ['b'] },
  { id: 'bosque_nativo', label: 'Bosque nativo y formaciones vegetacionales', criteria: ['b'] },
  { id: 'especies', label: 'Especies en categoría de conservación', criteria: ['b'] },
  { id: 'poblacion', label: 'Población y receptores sensibles', criteria: ['a', 'c'] },
  { id: 'pueblos_indigenas', label: 'Grupos humanos de pueblos indígenas, tierras indígenas o ADI', criteria: ['a', 'c', 'd', 'e', 'f'] },
  { id: 'patrimonio', label: 'Monumentos nacionales y patrimonio cultural', criteria: ['f'] },
  { id: 'paisaje_turismo', label: 'Zonas con valor paisajístico o turístico', criteria: ['e'] },
  { id: 'valor_ambiental', label: 'Territorio con nula o baja intervención antrópica o ecosistemas únicos, escasos o representativos', criteria: ['d'] },
  { id: 'zona_latente_saturada', label: 'Zona declarada latente o saturada', criteria: ['a'] }
];
export const LOCATION_VALUES = [
  { id: 'dentro', label: 'Presente' }, { id: 'colindante', label: 'Próximo' }, { id: 'fuera', label: 'No presente' }, { id: 'desconocido', label: 'Sin información' }
];

// ---------- Constructores de condiciones (árboles JSON; el motor los interpreta, no se ejecuta código) ----------
const gte = (input, value, unit) => ({ cmp: { input, op: '>=', value, unit } });
const gt = (input, value, unit) => ({ cmp: { input, op: '>', value, unit } });
const lte = (input, value, unit) => ({ cmp: { input, op: '<=', value, unit } });
const lt_ = (input, value, unit) => ({ cmp: { input, op: '<', value, unit } });
const yes = input => ({ flag: { input, equals: true } });
const no = input => ({ flag: { input, equals: false } });
const all = (...a) => ({ all: a }), any = (...a) => ({ any: a }), not = n => ({ not: n });
const geo = input => ({ geo: { input } });
const dep = id => ({ rule: { id } });
const rev = (node, reason) => ({ review: node, reason });
const enumIs = (input, values) => ({ enum: { input, in: values } });
const region = (cases, outside) => ({ region: { cases: cases.map(([inn, node]) => ({ in: inn, node })), outside: outside || 'REVIEW' } });

function inputsOf(n, acc = new Set()) {
  if (!n || typeof n !== 'object') return acc;
  for (const k of ['cmp', 'flag', 'enum', 'prof']) if (n[k]) acc.add(n[k].input);
  if (n.geo) acc.add('loc:' + n.geo.input);
  if (n.region) acc.add('region');
  (n.all || n.any || []).forEach(x => inputsOf(x, acc));
  if (n.not) inputsOf(n.not, acc); if (n.review) inputsOf(n.review, acc);
  if (n.region) n.region.cases.forEach(c => inputsOf(c.node, acc));
  return acc;
}
const ref = (art10, lit) => `Ley 19.300 art. 10 ${art10}); RSEIA art. 3 ${lit}`;
function v40(rule, text, logic, o = {}) {
  const exc = o.exc || [];
  return { version_id: rule + '-v1', source_id: 'DS40-LEYCHILE-2024', source_version: 'D.S. 40 consolidado LeyChile (D.O. 01-02-2024)', effective_from: o.from || DS40_FROM, effective_to: o.to || null,
    legal_reference: o.ref, source_url: DS40_PDF, text, required_inputs: [...inputsOf(logic, new Set(exc.flatMap(e => [...inputsOf(e.logic)])))], logic, exceptions: exc,
    validation_status: o.status || 'TEXTO_OFICIAL_CONTRASTADO', reviewer: null, last_reviewed_at: null, notes: o.notes || '' };
}
function v17(rule, text, logic, o = {}) {
  const exc = o.exc || [];
  return { version_id: rule + '-v2', source_id: 'DS17-2025', source_version: 'D.S. 17/2025 MMA, art. único (D.O. 21-01-2026)', effective_from: DS17_FROM, effective_to: null,
    legal_reference: o.ref + ' (mod. D.S. 17/2025)', source_url: o.url || DS17_URL, text, required_inputs: [...inputsOf(logic, new Set(exc.flatMap(e => [...inputsOf(e.logic)])))], logic, exceptions: exc,
    validation_status: o.status || 'TEXTO_OFICIAL_CONTRASTADO', reviewer: null, last_reviewed_at: null, notes: o.notes || 'Texto cotejado con el D.S. 17/2025 (LeyChile, versión única de 21-01-2026). Sin revisión jurídica.' };
}
// T(id, literal, art10, nombre, actividades, [constructores de versión], opciones)
function T(id, literal, art10, name, activity, versions, o = {}) {
  const r = ref(art10, literal);
  const vs = versions.map(fn => fn(r));
  return { rule_id: 'RSEIA-3-' + id, rule_name: name, rule_type: 'tipologia_art3', literal, art10, activity, depends_on: o.deps, versions: vs, evidence_required: o.evidence || ['Descripción de partes, obras y acciones', 'Memoria técnica con los parámetros informados'] };
}
// Una sola versión vigente (sin cambio identificado por el D.S. 17/2025).
const one = (id, text, logic, o = {}) => [r => v40(id, text, logic, { ...o, ref: r, notes: o.notes || 'Sin modificación identificada por el D.S. 17/2025 en las fuentes consultadas. Verificar en el texto consolidado vigente.' })];
// Dos versiones: texto 2024 hasta el 20-01-2026 y texto modificado desde el 21-01-2026.
const two = (id, t1, l1, t2, l2, o = {}) => [r => v40(id, t1, l1, { ...o.v1, ref: r, to: '2026-01-20' }), r => v17(id, t2, l2, { ...o.v2, ref: r })];

export const RULES = [
  T('A1', 'a.1', 'a', 'Presas', ['hid'], one('A1', 'Presas cuyo muro tenga una altura superior a cinco metros (5 m) medidos desde el coronamiento hasta el nivel del terreno natural, en el plano vertical que pasa por el eje de éste y que soportará el embalse de las aguas, o que generen un embalse con una capacidad superior a cincuenta mil metros cúbicos (50.000 m³).',
    any(gt('a1_altura_muro', 5, 'm'), gt('a1_capacidad', 50000, 'm³')), { from: DS8_FROM, notes: 'Texto vigente desde el D.S. 8/2014 (D.O. 27-03-2014). La redacción anterior no está cargada.' })),
  T('A2', 'a.2', 'a', 'Drenaje o desecación', ['hid'], one('A2', 'Drenaje o desecación de: a.2.1 vegas y bofedales en Arica y Parinacota, Tarapacá y Antofagasta, cualquiera sea su superficie; a.2.2 suelos ñadis ≥ 200 ha; a.2.3 turberas; a.2.4 otros cuerpos naturales de aguas superficiales ≥ 10 ha (Arica y Parinacota a Coquimbo), ≥ 20 ha (Valparaíso a Maule, incluida RM) o ≥ 30 ha (Biobío a Magallanes).',
    any(region([[Z.NORTE, yes('a2_vegas_bofedales')]], 'FALSE'), gte('a2_nadis', 200, 'ha'), yes('a2_turberas'),
      region([[Z.AP_CO, gte('a2_otros', 10, 'ha')], [Z.VA_ML, gte('a2_otros', 20, 'ha')], [Z.BI_MA, gte('a2_otros', 30, 'ha')]], 'REVIEW')),
    { notes: 'La región de Ñuble no está comprendida en los tramos de a.2.4 (creada en 2018): se deriva a revisión. Vegas y bofedales fuera de las tres regiones del norte se evalúan en a.2.4.' })),
  T('A3', 'a.3', 'a', 'Dragado', ['hid', 'port'], one('A3', 'Dragado de fango, grava, arenas u otros materiales de cuerpos de aguas continentales ≥ 20.000 m³ (Arica y Parinacota a Atacama) o 50.000 m³ (Coquimbo a Magallanes, incluida RM). Dragado en cursos o cuerpos de aguas marítimas ≥ 50.000 m³ de material total a extraer o remover.',
    any(region([[Z.AP_AT, gte('a3_dragado_cont', 20000, 'm³')], [Z.CO_MA, gte('a3_dragado_cont', 50000, 'm³')]]), gte('a3_dragado_mar', 50000, 'm³')))),
  T('A4', 'a.4', 'a', 'Defensa o alteración de cuerpos o cursos de aguas continentales', ['hid'], one('A4', 'Defensa o alteración que movilice ≥ 50.000 m³ (Arica y Parinacota a Coquimbo) o ≥ 100.000 m³ (Valparaíso a Magallanes, incluida RM). La alteración del lecho y ribera en un área preferencial para la pesca recreativa ingresa independiente del material movilizado.',
    any(region([[Z.AP_CO, gte('a4_defensa', 50000, 'm³')], [Z.VA_MA, gte('a4_defensa', 100000, 'm³')]]), yes('a4_pesca_recreativa')))),
  T('A5', 'a.5', 'a', 'Alteración de glaciares', ['hid', 'glac'], one('A5', 'La ejecución de obras o actividades que impliquen alteración de las características del glaciar.', all(geo('glaciar'), yes('a5_glaciar')),
    { notes: 'El encabezado de la letra a) se refiere a glaciares incorporados en el Inventario Público de la DGA: verificar.' })),
  T('B1', 'b.1', 'b', 'Líneas de transmisión eléctrica de alto voltaje', ['lt'], two('B1',
    'Se entenderá por líneas de transmisión eléctrica de alto voltaje aquellas líneas que conducen energía eléctrica con una tensión mayor a veintitrés kilovoltios (23 kV).', gt('tension_linea', 23, 'kV'),
    'Se entenderá por líneas de transmisión eléctrica de alto voltaje a aquellas líneas que conduzcan energía eléctrica con una tensión mayor a veintitrés kilovoltios (23 kV) y cuyo trazado presente una longitud superior a dos kilómetros (2 km).', all(gt('tension_linea', 23, 'kV'), gt('longitud_linea', 2, 'km')))),
  T('B2', 'b.2', 'b', 'Subestaciones de líneas de alto voltaje', ['lt'], one('B2', 'Se entenderá por subestaciones de líneas de transmisión eléctrica de alto voltaje aquellas que se relacionan a una o más líneas de transporte de energía eléctrica y que tienen por objeto mantener el voltaje a nivel de transporte.', yes('b2_subestacion'),
    { notes: 'El efecto de la longitud mínima de b.1 (D.S. 17/2025) sobre subestaciones no está verificado.' })),
  T('C', 'c', 'c', 'Centrales generadoras de energía mayores a 3 MW', ['gen'], one('C', 'Centrales generadoras de energía mayores a 3 MW.', gt('potencia_instalada', 3, 'MW'), { notes: 'Criterio de potencia (nominal o bruta) sujeto a interpretación del SEA.' })),
  T('D1', 'd.1', 'd', 'Reactores y establecimientos nucleares', ['nuc'], one('D1', 'Dependencias en las que se procesan, manipulan, utilizan, almacenan, tratan o disponen materiales con nucleídos fisionables capaces de producir un proceso sostenido de fisión nuclear, salvo el uranio natural y el uranio empobrecido; e instalaciones radiactivas ubicadas dentro de un establecimiento nuclear.', yes('d1_nuclear'))),
  T('E1', 'e.1', 'e', 'Aeropuertos', ['aero'], one('E1', 'Aeródromo público habilitado para la salida y llegada de aeronaves en vuelos internacionales.', yes('e1_aeropuerto'))),
  T('E2', 'e.2', 'e', 'Terminales de buses', ['term'], one('E2', 'Recintos para la llegada y salida de buses de transporte de pasajeros con capacidad igual o superior a cincuenta (50) sitios de estacionamiento.', gte('e2_buses', 50, 'sitios'))),
  T('E3', 'e.3', 'e', 'Terminales de camiones', ['term'], one('E3', 'Recintos para el estacionamiento de camiones con infraestructura de almacenaje y transferencia de carga y capacidad igual o superior a cincuenta (50) sitios para vehículos medianos o pesados.', gte('e3_camiones', 50, 'sitios'))),
  T('E4', 'e.4', 'e', 'Terminales de ferrocarriles', ['term'], one('E4', 'Recintos destinados al inicio y finalización de una o más vías férreas de trenes urbanos, interurbanos o subterráneos.', yes('e4_ferro'))),
  T('E5', 'e.5', 'e', 'Vías férreas', ['ferro'], one('E5', 'Línea de rieles para trenes urbanos e interurbanos y sus estaciones. Se exceptúan las vías o líneas férreas al interior de faenas industriales o mineras.', yes('e5_via'),
    { exc: [{ id: 'E5-EXC', description: 'Vía férrea al interior de faenas industriales o mineras (art. 3 e.5)', verified: true, logic: yes('e5_interior') }] })),
  T('E6', 'e.6', 'e', 'Estaciones de servicio', ['eds'], two('E6',
    'Locales destinados al expendio de combustibles líquidos o gaseosos para vehículos motorizados u otros usos, cuya capacidad de almacenamiento sea igual o superior a doscientos mil litros (200.000 L).', gte('capacidad_almacenamiento_combustible', 200000, 'L'),
    'Igual definición; la frase «doscientos mil litros (200.000 L)» se reemplaza por «ochocientos cincuenta mil litros (850.000 L)».', gte('capacidad_almacenamiento_combustible', 850000, 'L'))),
  T('E7', 'e.7', 'e', 'Autopistas', ['vial'], one('E7', 'Vías con dos o más pistas unidireccionales por calzada separadas por una mediana, diseñadas para 120 km/h o más, con prioridad absoluta al tránsito, control total de accesos, segregadas y conectadas mediante enlaces.', yes('e7_autopista'))),
  T('E8', 'e.8', 'e', 'Caminos públicos que puedan afectar áreas protegidas', ['vial'], one('E8', 'Los caminos públicos pueden afectar áreas protegidas cuando se localicen en las áreas definidas en el inciso quinto del artículo 8 del Reglamento.', all(yes('e8_camino'), geo('area_protegida')),
    { notes: 'La remisión al inciso quinto del art. 8 (áreas protegidas) debe verificarse en el texto vigente.' })),
  T('F', 'f.1–f.4', 'f', 'Puertos, vías de navegación, astilleros y terminales marítimos', ['port'], one('F',
    'f.1 puerto para naves mayores con fines comerciales o productivos (excluye conectividad interna); f.2 vías de navegación construidas o acondicionadas; f.3 astilleros (excluye varaderos, hangares o diques flotantes); f.4 terminal marítimo para buques tanque con cañerías de carga o descarga.',
    any(yes('f1_puerto'), yes('f2_via'), yes('f3_astillero'), yes('f4_terminal')), { notes: 'No modificado por el D.S. 17/2025 (texto oficial cotejado).' })),
  T('G11', 'g.1.1', 'g', 'Conjuntos habitacionales', ['urb'], one('G11', 'En zonas no comprendidas en planes evaluados estratégicamente: conjuntos habitacionales con 80 o más viviendas o, tratándose de vivienda social, vivienda progresiva o infraestructura sanitaria, 160 o más viviendas.',
    all(no('g_plan_eae'), any(all(no('g11_social'), gte('g11_viviendas', 80, 'viviendas')), all(yes('g11_social'), gte('g11_viviendas', 160, 'viviendas')))))),
  T('G12', 'g.1.2', 'g', 'Proyectos de equipamiento', ['urb'], two('G12',
    'Equipamiento permanente con al menos una de: superficie construida ≥ 5.000 m²; superficie predial ≥ 20.000 m²; capacidad simultánea ≥ 800 personas; 200 o más estacionamientos. Solo en zonas no comprendidas en planes evaluados estratégicamente.',
    all(no('g_plan_eae'), yes('g12_equipamiento'), any(gte('urb_sup_construida', 5000, 'm²'), gte('urb_sup_predial', 20000, 'm²'), gte('urb_personas', 800, 'personas'), gte('urb_estac', 200, 'sitios'))),
    'Letra b) sustituida: «superficie predial a intervenir igual o mayor a veinte mil metros cuadrados (20.000 m²)». Demás condiciones sin cambio.',
    all(no('g_plan_eae'), yes('g12_equipamiento'), any(gte('urb_sup_construida', 5000, 'm²'), gte('urb_sup_predial', 20000, 'm²'), gte('urb_personas', 800, 'personas'), gte('urb_estac', 200, 'sitios'))))),
  T('G13', 'g.1.3', 'g', 'Urbanizaciones o loteos industriales', ['urb', 'fab'], one('G13', 'Urbanizaciones o loteos con destino industrial de una superficie igual o mayor a 30.000 m², en zonas no comprendidas en planes evaluados estratégicamente.', all(no('g_plan_eae'), gte('g13_loteo_ind', 30000, 'm²')))),
  T('G2', 'g.2', 'g', 'Proyectos de desarrollo turístico', ['tur'], two('G2',
    'Hospedaje o equipamiento turístico permanente con al menos una de: construida ≥ 5.000 m²; predial ≥ 15.000 m²; 300 personas; 100 estacionamientos; 100 camas; 200 sitios de camping; 50 naves.',
    all(no('g_plan_eae'), any(gte('urb_sup_construida', 5000, 'm²'), gte('urb_sup_predial', 15000, 'm²'), gte('urb_personas', 300, 'personas'), gte('urb_estac', 100, 'sitios'), gte('g2_camas', 100, 'camas'), gte('g2_camping', 200, 'sitios'), gte('g2_naves', 50, 'naves'))),
    'Letra b) sustituida: «superficie predial a intervenir igual o mayor a quince mil metros cuadrados (15.000 m²)». Demás condiciones sin cambio.',
    all(no('g_plan_eae'), any(gte('urb_sup_construida', 5000, 'm²'), gte('urb_sup_predial', 15000, 'm²'), gte('urb_personas', 300, 'personas'), gte('urb_estac', 100, 'sitios'), gte('g2_camas', 100, 'camas'), gte('g2_camping', 200, 'sitios'), gte('g2_naves', 50, 'naves'))))),
  T('H1', 'h.1', 'h', 'Proyectos inmobiliarios en zonas latentes o saturadas', ['urb'], one('H1', 'Loteos, conjuntos de viviendas o equipamiento en zona latente o saturada con alguna de: h.1.1 extensión urbana o área rural con sistemas propios de agua potable o aguas servidas; h.1.2 incorporación de vías expresas o troncales; h.1.3 superficie ≥ 7 ha o 300 o más viviendas; h.1.4 edificios de uso público para 5.000 o más personas o 1.000 o más estacionamientos.',
    all(geo('zona_latente_saturada'), any(yes('h11_sistemas_propios'), yes('h12_vias'), gte('h13_superficie', 7, 'ha'), gte('g11_viviendas', 300, 'viviendas'), gte('urb_personas', 5000, 'personas'), gte('urb_estac', 1000, 'sitios'))),
    { from: DS63_FROM, notes: 'Texto vigente desde el D.S. 63/2014 (D.O. 06-10-2014).' })),
  T('H2', 'h.2', 'h', 'Proyectos industriales en zonas latentes o saturadas', null, one('H2',
    'Urbanizaciones o loteos industriales ≥ 20 ha, o instalaciones industriales cuya emisión diaria esperada de algún contaminante causante de la saturación o latencia sea ≥ 5 % de la emisión diaria total estimada de ese contaminante en la zona, para ese tipo de fuente.',
    all(geo('zona_latente_saturada'), any(gte('g13_loteo_ind', 20, 'ha'), gte('h2_pct', 5, '%'))),
    { from: DS63_FROM, notes: 'Texto vigente desde el D.S. 63/2014. El D.S. 17/2025 no modificó h.2: la rebaja a 2 % del anteproyecto fue desacumulada (Res. Ex. MMA 2.955/2025).' })),
  T('I1', 'i.1', 'i', 'Proyectos de desarrollo minero', ['min'], two('I1',
    'Acciones u obras cuyo fin es la extracción o beneficio de uno o más yacimientos mineros y cuya capacidad de extracción de mineral es superior a cinco mil toneladas mensuales (5.000 t/mes).', gt('capacidad_extraccion', 5000, 't/mes'),
    'Igual umbral. Párrafo segundo (D.S. 17/2025): «Se exceptúan aquellos proyectos que, contando con una resolución de calificación ambiental favorable y vigente para la disposición de residuos masivos mineros, contemplen reprocesamiento de relaves dentro de la faena minera en operación o la valorización de residuos masivos mineros, siempre que cumplan con alguna de las siguientes circunstancias: a) Que se trate de reprocesamiento de relaves frescos; o b) Que las acciones u obras para el reprocesamiento o valorización de residuos masivos mineros contemplen una capacidad inferior al 25% de la capacidad nominal autorizada para el procesamiento de minerales.»',
    gt('capacidad_extraccion', 5000, 't/mes'),
    { v2: { exc: [{ id: 'I1-EXC-RELAVES', description: 'Reprocesamiento de relaves o valorización de residuos masivos mineros con RCA vigente de disposición, con relaves frescos o capacidad < 25 % de la nominal autorizada (art. 3 i.1 párrafo segundo)', verified: true,
      logic: all(yes('i1_rca_disposicion'), yes('i1_reprocesa_relaves'), any(yes('i1_relaves_frescos'), lt_('i1_aumento_pct', 25, '%'))) }],
      notes: 'Excepción cotejada con el texto oficial. Las circunstancias a) y b) son alternativas. Responda «No» a la pregunta sobre reprocesamiento si el proyecto no reprocesa relaves ni valoriza residuos.' } })),
  T('I2', 'i.2', 'i', 'Prospecciones mineras', ['prosp'], one('I2', 'Prospecciones que consideren 40 o más plataformas, incluyendo sus sondajes (Arica y Parinacota a Coquimbo), o 20 o más plataformas (Valparaíso a Magallanes, incluida RM). Las exploraciones con menos plataformas no se incluyen.',
    region([[Z.AP_CO, gte('i2_plataformas', 40, 'plataformas')], [Z.VA_MA, gte('i2_plataformas', 20, 'plataformas')]]), { notes: 'La distinción entre prospección y exploración depende de la fase del proyecto: verificar.' })),
  T('I3', 'i.3', 'i', 'Disposición de residuos y estériles mineros', ['rel'], one('I3', 'Proyectos en que se dispongan residuos masivos mineros (estériles, minerales de baja ley, residuos lixiviados, relaves, escorias y equivalentes) que provengan de uno o más proyectos de desarrollo minero que por sí mismos o en su conjunto tengan la capacidad de extracción de la letra i.1.',
    all(yes('dispone_residuos_masivos'), any(dep('RSEIA-3-I1'), rev(yes('residuos_de_otros_proyectos'), 'La capacidad «en su conjunto» de varios proyectos requiere análisis especializado.')))), { deps: ['RSEIA-3-I1'] }),
  T('I4', 'i.4', 'i', 'Petróleo y gas', ['hc'], one('I4', 'Acciones u obras cuyo fin es la explotación de yacimientos, comprendiendo las actividades posteriores a la perforación del primer pozo exploratorio y la instalación de plantas procesadoras.', yes('i4_explotacion'))),
  T('I5', 'i.5', 'i', 'Extracción industrial de áridos o greda', ['arid'], one('I5', 'i.5.1 pozos o canteras: ≥ 10.000 m³/mes, o ≥ 100.000 m³ totales en la vida útil, o superficie ≥ 5 ha; i.5.2 cuerpo o curso de agua: ≥ 20.000 m³ totales (Arica y Parinacota a Coquimbo) o ≥ 50.000 m³ (Valparaíso a Magallanes, incluida RM); i.5.3 arena en playa: ≥ 50.000 m³ en la vida útil.',
    any(all(enumIs('i5_tipo', ['pozo']), any(gte('i5_mes', 10000, 'm³/mes'), gte('i5_total', 100000, 'm³'), gte('i5_sup', 5, 'ha'))),
      all(enumIs('i5_tipo', ['cauce']), region([[Z.AP_CO, gte('i5_total', 20000, 'm³')], [Z.VA_MA, gte('i5_total', 50000, 'm³')]])),
      all(enumIs('i5_tipo', ['playa']), gte('i5_total', 50000, 'm³'))))),
  T('I6', 'i.6', 'i', 'Extracción de turba', ['turba'], [r => v40('I6', 'Se entenderá que toda extracción de turba tiene características industriales.', yes('i6_turba'), { ref: r, to: '2026-01-20', notes: 'Literal eliminado por el D.S. 17/2025 (art. único N.º 2 letras e y g), junto con la expresión «, turba» del párrafo primero de la letra i). Texto oficial cotejado.' })]),
  T('J', 'j', 'j', 'Oleoductos, gasoductos, ductos mineros u otros análogos', ['ducto'], one('J', 'Conjuntos de canales o tuberías para el transporte de sustancias o residuos que unen centros de producción, almacenamiento, tratamiento o disposición. Se exceptúan las redes de distribución y los ductos al interior de dichos centros.', yes('j_ducto'),
    { exc: [{ id: 'J-EXC', description: 'Redes de distribución y ductos interiores de centros de producción (art. 3 j)', verified: true, logic: yes('j_excepcion') }] })),
  T('K1', 'k.1', 'k', 'Instalaciones fabriles de dimensiones industriales', ['fab'], one('K1', 'Instalaciones fabriles cuya potencia instalada sea igual o superior a 2.000 kVA, determinada por la suma de las capacidades de los transformadores. Si se usa más de un tipo de energía o combustible, se considera la suma equivalente. Las instalaciones emplazadas en loteos o uso de suelo industrial de un IPT aprobado ambientalmente solo ingresan si cumplen h.2.',
    gte('k1_kva', 2000, 'kVA'), { deps: undefined, exc: [{ id: 'K1-EXC-IPT', description: 'Emplazamiento en loteo o uso de suelo industrial de un IPT aprobado ambientalmente, sin cumplir h.2 (art. 3 k.1, inciso tercero)', verified: true, logic: all(yes('k1_loteo_ind'), not(dep('RSEIA-3-H2'))) }] }), { deps: ['RSEIA-3-H2'] }),
  T('K2', 'k.2', 'k', 'Curtiembres', ['curt'], one('K2', 'Curtiembres cuya capacidad de producción sea igual o superior a treinta metros cuadrados diarios (30 m²/día) de materia prima de cueros.', gte('capacidad_cueros', 30, 'm²/día'))),
  T('L1', 'l.1', 'l', 'Agroindustrias', ['agro'], one('L1', 'Agroindustrias con capacidad para generar 8 t/día o más de residuos sólidos en algún día de operación, o que reúnan los requisitos de h.2 o k.1.', any(gte('l1_residuos', 8, 't/día'), dep('RSEIA-3-H2'), gte('k1_kva', 2000, 'kVA')), { from: DS63_FROM }), { deps: ['RSEIA-3-H2'] }),
  T('L2', 'l.2', 'l', 'Mataderos', ['matad'], one('L2', 'Mataderos con capacidad de faena ≥ 500 t/mes medidas como canales, o que reúnan los requisitos de h.2 o k.1.', any(gte('l2_faena', 500, 't/mes'), dep('RSEIA-3-H2'), gte('k1_kva', 2000, 'kVA')), { from: DS63_FROM }), { deps: ['RSEIA-3-H2'] }),
  T('L3', 'l.3–l.5', 'l', 'Planteles y establos de animales', ['plantel'], one('L3', 'Confinamiento por más de un mes de: 300 UA bovino de carne; 200 UA bovino de leche; 3.000 porcinos < 25 kg o 750 > 25 kg; 2.500 UA ovino o caprino. Avícolas: 85.000 pollos; 60.000 gallinas; 16.500 pavos; 150 t de peso vivo de otras aves. Otros animales: 50 t de peso vivo.',
    any(gte('l31', 300, 'UA'), gte('l32', 200, 'UA'), gte('l33a', 3000, 'animales'), gte('l33b', 750, 'animales'), gte('l34', 2500, 'UA'), gte('l41', 85000, 'animales'), gte('l42', 60000, 'animales'), gte('l43', 16500, 'animales'), gte('l44', 150, 't'), gte('l5', 50, 't')))),
  T('M1', 'm.1', 'm', 'Desarrollo o explotación forestal', ['forest'], one('M1', 'Corta de cosecha final o regeneración por tala rasa en suelos frágiles o bosque nativo, de más de 20 ha/año (Arica y Parinacota a Coquimbo), 200 ha/año (Valparaíso y RM), 500 ha/año (O\'Higgins a Aysén) o 1.000 ha/año (Magallanes).',
    all(enumIs('m1_suelo', ['fragil', 'nativo']), region([[Z.AP_CO, gt('m1_ha', 20, 'ha/año')], [Z.VA_RM, gt('m1_ha', 200, 'ha/año')], [Z.OH_AY, gt('m1_ha', 500, 'ha/año')], [Z.MA, gt('m1_ha', 1000, 'ha/año')]])))),
  T('M2', 'm.2', 'm', 'Plantas astilladoras', ['astill'], one('M2', 'Plantas astilladoras con consumo de madera ≥ 30 m³ ssc/h, o que reúnan los requisitos de h.2 o k.1.', any(gte('m2_consumo', 30, 'm³ ssc/h'), dep('RSEIA-3-H2'), gte('k1_kva', 2000, 'kVA'))), { deps: ['RSEIA-3-H2'] }),
  T('M3', 'm.3', 'm', 'Aserraderos y plantas elaboradoras de madera', ['aserr'], one('M3', 'Aserraderos y plantas elaboradoras de paneles u otros productos con consumo ≥ 30 m³ ssc/h, o que reúnan los requisitos de h.2 o k.1.', any(gte('m3_consumo', 30, 'm³ ssc/h'), dep('RSEIA-3-H2'), gte('k1_kva', 2000, 'kVA'))), { deps: ['RSEIA-3-H2'] }),
  T('M4', 'm.4', 'm', 'Celulosa, pasta de papel y papel', ['celul'], one('M4', 'Toda industria de celulosa, pasta de papel y papel será considerada de dimensiones industriales.', { const: 'TRUE', label: 'Actividad declarada: celulosa, pasta de papel o papel' })),
  T('N0', 'n (explotación)', 'n', 'Explotación intensiva de recursos hidrobiológicos', ['acuiext'], one('N0', 'Utilización de recursos hidrobiológicos declarados en categoría de conservación cuya extracción se realice mediante barcos fábrica o factoría.', yes('n_intensiva'))),
  T('N1', 'n.1–n.5', 'n', 'Cultivo de recursos hidrobiológicos', ['acui'], two('N1',
    'n.1 macroalgas ≥ 500 t/año o ≥ 100.000 m²; n.2 moluscos filtradores ≥ 300 t/año o ≥ 60.000 m², otras filtradoras ≥ 40 t/año; n.3 sistema intensivo ≥ 35 t/año; n.4 ríos navegables en zona no afecta a marea ≥ 15 t/año, o cualquier cultivo en ríos no navegables o lagos; n.5 peces ≥ 8 t/año, o microalgas o juveniles con suministro o evacuación de aguas.',
    any(gte('n1_t', 500, 't/año'), gte('n1_m2', 100000, 'm²'), gte('n2_t', 300, 't/año'), gte('n2_m2', 60000, 'm²'), gte('n2_otras', 40, 't/año'), gte('n3_t', 35, 't/año'), gte('n4_t', 15, 't/año'), yes('n4_lago'), gte('n5_t', 8, 't/año'), yes('n5_juveniles')),
    'n.1 macroalgas: «mil toneladas (1.000 t)». n.2 sustituido: «Una producción anual igual o mayor a mil toneladas (1.000 t) y/o superficie de cultivo igual o superior a sesenta mil metros cuadrados (60.000 m²), tratándose de moluscos filtradores y otras especies filtradoras, a través de un sistema de producción extensivo». n.3 a n.5 sin cambio.',
    any(gte('n1_t', 1000, 't/año'), gte('n1_m2', 100000, 'm²'), gte('n2_t', 1000, 't/año'), gte('n2_m2', 60000, 'm²'), gte('n3_t', 35, 't/año'), gte('n4_t', 15, 't/año'), yes('n4_lago'), gte('n5_t', 8, 't/año'), yes('n5_juveniles')),
    { v2: { notes: 'Texto oficial cotejado. En n.2, informe la producción total de moluscos filtradores y otras especies filtradoras en el campo de moluscos; el umbral separado de 40 t/año para otras filtradoras fue eliminado.' } })),
  T('N6', 'n (plantas)', 'n', 'Plantas procesadoras de recursos hidrobiológicos', ['acuipl'], one('N6', 'Plantas procesadoras, incluidas las de barcos fábrica o factoría, que utilicen ≥ 500 t/mes de biomasa en el mes de máxima producción, o que reúnan los requisitos de h.2 o k.1.', any(gte('n_planta', 500, 't/mes'), dep('RSEIA-3-H2'), gte('k1_kva', 2000, 'kVA'))), { deps: ['RSEIA-3-H2'] }),
  T('NN1', 'ñ.1', 'ñ', 'Sustancias tóxicas', ['sptox'], two('NN1', 'Producción, disposición o reutilización durante un semestre o más ≥ 10.000 kg/día, o capacidad de almacenamiento ≥ 30.000 kg.', any(all(yes('nn_habitual'), gte('nn1_prod', 10, 't/día')), gte('nn1_alm', 30, 't')),
    'Producción, disposición o reutilización durante un semestre o más ≥ 10.000 kg/día; almacenamiento ≥ 2.500 t. Sustancias tóxicas: Clase 6, División 6.1 NCh 382:2013; residuos según arts. 12–14 D.S. 148/2003, con remisión a o.9 para su disposición o reutilización.', any(all(yes('nn_habitual'), gte('nn1_prod', 10, 't/día')), gte('nn1_alm', 2500, 't'))), { evidence: ['Inventario de sustancias por clase NCh 382', 'Capacidad de bodegas'] }),
  T('NN2', 'ñ.2', 'ñ', 'Sustancias explosivas', ['spexp'], two('NN2', 'Producción, disposición o reutilización durante un semestre o más, mensualmente, ≥ 2.500 kg/día, o almacenamiento ≥ 2.500 kg.', any(all(yes('nn_habitual'), gte('nn2_prod', 2.5, 't/día')), gte('nn2_alm', 2.5, 't')),
    'Producción, disposición o reutilización durante un semestre o más, con periodicidad mensual o mayor, ≥ 2.500 kg/día; almacenamiento ≥ 30 t. Sustancias explosivas: Clase 1, División 1.1 NCh 382:2013.', any(all(yes('nn_habitual'), gte('nn2_prod', 2.5, 't/día')), gte('nn2_alm', 30, 't')))),
  T('NN3', 'ñ.3', 'ñ', 'Sustancias inflamables', ['spinf'], two('NN3', 'Producción, disposición o reutilización durante un semestre o más, mensualmente, ≥ 80.000 kg/día, o almacenamiento ≥ 80.000 kg.', any(all(yes('nn_habitual'), gte('nn3_prod', 80, 't/día')), gte('nn3_alm', 80, 't')),
    'Producción, disposición o reutilización durante un semestre o más, con periodicidad mensual o mayor, ≥ 80.000 kg/día; almacenamiento ≥ 1.000 t. Inflamables según Título III del D.S. 57/2019 MINSAL-MMA (o Clase 2, División 2.1, 3 y 4 NCh 382:2013 para mezclas mientras no rija); residuos según art. 15 D.S. 148/2003.', any(all(yes('nn_habitual'), gte('nn3_prod', 80, 't/día')), gte('nn3_alm', 1000, 't')), { v1: { from: DS63_FROM } })),
  T('NN4', 'ñ.4', 'ñ', 'Sustancias corrosivas o reactivas', ['spcor'], two('NN4', 'Producción, disposición o reutilización durante un semestre o más, mensualmente, ≥ 120.000 kg/día, o almacenamiento ≥ 120.000 kg.', any(all(yes('nn_habitual'), gte('nn4_prod', 120, 't/día')), gte('nn4_alm', 120, 't')),
    'Producción, disposición o reutilización durante un semestre o más, con periodicidad mensual o mayor, ≥ 120.000 kg/día; almacenamiento ≥ 2.500 t. Corrosivas y reactivas según Título III del D.S. 57/2019 (o Clases 8 y 5 NCh 382:2013 para mezclas); residuos según arts. 16 y 17 D.S. 148/2003.', any(all(yes('nn_habitual'), gte('nn4_prod', 120, 't/día')), gte('nn4_alm', 2500, 't')))),
  T('NN5', 'ñ.5', 'ñ', 'Transporte terrestre de sustancias peligrosas', ['sptr'], two('NN5', 'Transporte terrestre durante un semestre o más ≥ 400 t/día.', gte('nn5_transp', 400, 't/día'), '«Transporte por medios terrestres de sustancias tóxicas, explosivas, inflamables, corrosivas o reactivas que se realice durante un semestre o más, en una cantidad igual o superior a dos mil quinientas toneladas diarias (2.500 t/día)».', gte('nn5_transp', 2500, 't/día'))),
  T('NN6', 'ñ.6–ñ.7', 'ñ', 'Sustancias radiactivas', ['sprad'], one('NN6', 'ñ.6 producción, almacenamiento, disposición o reutilización sobre los límites A2 (D.S. 12/1985 Minería) o 5000 A1, semanalmente y por más de seis meses; ñ.7 transporte terrestre que requeriría aprobación multilateral, en igual periodicidad.', any(yes('nn6'), yes('nn7')))),
  T('O1', 'o.1–o.3', 'o', 'Alcantarillado, aguas lluvias y agua potable', ['san_ap'], two('O1', 'o.1 alcantarillado ≥ 10.000 habitantes; o.2 aguas lluvias interconectadas con redes de aguas servidas ≥ 10.000 habitantes; o.3 agua potable ≥ 10.000 habitantes.',
    any(gte('o1_hab', 10000, 'habitantes'), yes('o2_interconecta'), gte('o3_hab', 10000, 'habitantes')),
    'o.3: «quince mil (15.000) habitantes». o.1 y o.2 sin cambio.', any(gte('o1_hab', 10000, 'habitantes'), yes('o2_interconecta'), gte('o3_hab', 15000, 'habitantes')))),
  T('O4', 'o.4', 'o', 'Plantas de tratamiento de aguas domiciliarias', ['san_ptas'], two('O4', 'Plantas de tratamiento de aguas de origen domiciliario que atiendan ≥ 2.500 habitantes.', gte('o4_hab', 2500, 'habitantes'), 'o.4: «cinco mil (5.000) habitantes».', gte('o4_hab', 5000, 'habitantes'))),
  T('O5', 'o.5', 'o', 'Residuos sólidos domiciliarios', ['san_rsd'], two('O5', 'Plantas de tratamiento o disposición, rellenos sanitarios, estaciones de transferencia y centros de acopio y clasificación que atiendan ≥ 5.000 habitantes.', gte('o5_hab', 5000, 'habitantes'),
    'o.5.1 eliminación (incluidos rellenos sanitarios) con tasa de ingreso ≥ 30 t/día; o.5.2 tratamiento (incluidas plantas de compostaje y biodigestión) ≥ 50 t/día, salvo compostaje exclusivo de residuos de arbolado urbano, parques, áreas verdes y jardines; o.5.3 estaciones de transferencia ≥ 100 t/día. Los centros de acopio y clasificación dejan de estar listados.',
    any(all(enumIs('o5_tipo', ['elim']), gte('o5_cap', 30, 't/día')), all(enumIs('o5_tipo', ['trat']), gte('o5_cap', 50, 't/día')), all(enumIs('o5_tipo', ['transf']), gte('o5_cap', 100, 't/día'))),
    { v2: { exc: [{ id: 'O5-EXC-VERDES', description: 'Compostaje exclusivo de residuos de arbolado urbano, parques, áreas verdes y jardines (art. 3 o.5.2)', verified: true, logic: all(enumIs('o5_tipo', ['trat']), yes('o5_compost_verde')) }] } })),
  T('O6', 'o.6', 'o', 'Emisarios submarinos', ['san_emis'], one('O6', 'Emisarios submarinos.', yes('o6_emisario'))),
  T('O7', 'o.7', 'o', 'Tratamiento o eliminación de residuos industriales líquidos', ['san_riles'], two('O7', 'Sistemas que cumplan al menos una: o.7.1 lagunas de estabilización; o.7.2 efluentes usados para riego, infiltración, aspersión o humectación; o.7.3 tratamiento de residuos de terceros; o.7.4 carga contaminante media diaria ≥ equivalente a 100 personas.',
    any(yes('o71_lagunas'), yes('o72_riego'), yes('o73_terceros'), gte('o74_eq', 100, 'personas')),
    'o.7.1 «Que sus efluentes sin tratar se usen para el riego, aspersión y humectación de terrenos o caminos, o se utilicen para el mismo efecto efluentes tratados, en cumplimiento de la respectiva norma de emisión, en una cantidad igual o mayor a cincuenta metros cúbicos día (50 m³/día)»; o.7.2 caudal tratado ≥ 160 m³/día.',
    any(rev(yes('o7_sin_tratar'), 'Uso de efluentes sin tratar: el texto admite leer que el umbral de 50 m³/día se aplica solo a efluentes tratados o a ambos supuestos.'), gte('o7_riego_vol', 50, 'm³/día'), gte('o7_caudal', 160, 'm³/día')),
    { v2: { notes: 'Texto oficial cotejado. Uso de efluentes sin tratar bajo 50 m³/día deriva a revisión por ambigüedad de redacción.' } })),
  T('O8', 'o.8', 'o', 'Residuos industriales sólidos', ['san_ris'], two('O8', 'Capacidad ≥ 30 t/día de tratamiento o ≥ 50 t de disposición.', any(gte('o8_trat', 30, 't/día'), gte('o8_disp', 50, 't')),
    'o.8.1 eliminación con tasa de ingreso ≥ 30 t/día; o.8.2 tratamiento de residuos de origen animal o lodos de plantas de tratamiento de aguas residuales ≥ 30 t/día; o.8.3 tratamiento, incluidas plantas de compostaje y biodigestión, ≥ 50 t/día.',
    any(all(enumIs('o8_tipo', ['elim']), gte('o8_trat', 30, 't/día')), all(enumIs('o8_tipo', ['animal']), gte('o8_trat', 30, 't/día')), all(enumIs('o8_tipo', ['otros']), gte('o8_trat', 50, 't/día'))),
    { v1: { from: DS8_FROM }, v2: { notes: 'Texto oficial cotejado. El umbral de 50 t de capacidad de disposición fue reemplazado por tasas de ingreso diarias.' } })),
  T('O9', 'o.9', 'o', 'Residuos peligrosos', ['san_respel'], two('O9', 'Tratamiento, disposición o eliminación con capacidad de 25 kg/día para tóxicos agudos (D.S. 148/2003) y de 1.000 kg/día para otros residuos peligrosos.', any(gte('o9_tox', 25, 'kg/día'), gte('o9_otros', 1000, 'kg/día')),
    'o.9.1 eliminación con tasa de ingreso ≥ 25 kg/día para «tóxicos agudos» del D.S. 148/2003 y ≥ 1 t/día para residuos con otra característica de peligrosidad; o.9.2 tratamiento de residuos peligrosos con tasa de ingreso ≥ 5 t/día.',
    any(gte('o9_tox', 25, 'kg/día'), gte('o9_otros', 1, 't/día'), gte('o9_trat', 5, 't/día')),
    { v1: { from: DS8_FROM }, v2: { notes: 'Texto oficial cotejado. Informe en los campos de eliminación solo las tasas destinadas a eliminación, y en tratamiento la tasa de ingreso a tratamiento.' } })),
  T('O10', 'o.10', 'o', 'Residuos especiales de establecimientos de salud', ['san_salud'], two('O10', 'Tratamiento, disposición o eliminación con capacidad ≥ 250 kg/día.', gte('o10', 250, 'kg/día'), '«Sistemas de tratamiento o eliminación de residuos especiales provenientes de establecimientos de atención de salud, con una tasa de ingreso de recepción mayor o igual a 500 kilogramos diarios (500 kg/día)».', gte('o10', 500, 'kg/día'), { v1: { from: DS8_FROM } })),
  T('O11', 'o.11', 'o', 'Reparación o recuperación de áreas contaminadas', ['remed'], one('O11', 'Reparación o recuperación de áreas que contengan contaminantes ≥ 10.000 m², salvo medidas de un plan de reparación del art. 43 de la LOSMA.', gte('o11_sup', 10000, 'm²'),
    { exc: [{ id: 'O11-EXC', description: 'Medidas de un plan de reparación del art. 43 LOSMA (art. 3 o.11)', verified: true, logic: yes('o11_plan_sma') }] })),
  T('P', 'p', 'p', 'Obras en áreas colocadas bajo protección oficial', null, one('P', 'Ejecución de obras, programas o actividades en parques nacionales, reservas nacionales, monumentos naturales, reservas de zonas vírgenes, santuarios de la naturaleza, parques marinos, reservas marinas o cualesquiera otras áreas colocadas bajo protección oficial, en los casos en que la legislación respectiva lo permita.',
    any(geo('area_protegida'), geo('santuario')), { notes: 'La proximidad no activa la tipología; exige verificar límites oficiales. La calificación de «área colocada bajo protección oficial» requiere revisión jurídica.' }), { evidence: ['Cartografía oficial superpuesta al área del proyecto'] }),
  T('Q', 'q', 'q', 'Aplicación masiva de productos químicos', ['quim'], one('Q', 'Planes y programas por vía aérea sobre ≥ 1.000 ha para prevenir o erradicar plagas, en áreas urbanas o zonas rurales a menos de 5 km de centros poblados o cursos o masas de agua.', all(yes('q_aerea'), yes('q_proximo')))),
  T('R', 'r', 'r', 'Organismos genéticamente modificados', ['ogm'], one('R', 'Proyectos que utilicen OGM con fines de producción y en áreas no confinadas.', all(yes('r_produccion'), no('r_confinada')), { notes: 'Art. 5 transitorio: excluye especies con autorización e informe favorable del SAG (Res. 1.523/2001).' })),
  T('S', 's', 's', 'Cotos de caza', ['coto'], one('S', 'Cotos de caza, en virtud del artículo 10 de la Ley N.º 19.473.', yes('s_coto'), { ref: 'RSEIA art. 3 s)', notes: 'Literal propio del Reglamento; no corresponde a la letra s) del art. 10 de la Ley 19.300.' })),
  T('T', 't', 't', 'Concesiones del subsuelo de bienes nacionales de uso público', ['subsuelo'], one('T', 'Obras que se concesionen para construir y explotar el subsuelo de los bienes nacionales de uso público (art. 37 DFL 1/2006, Ley Orgánica de Municipalidades).', yes('t_subsuelo'), { ref: 'RSEIA art. 3 t)' })),
  { rule_id: 'LEY-10-S', rule_name: 'Alteración de humedales urbanos', rule_type: 'tipologia_art3', literal: 'Ley s)', art10: 's', activity: null, evidence_required: ['Cartografía del límite urbano y del humedal', 'Descripción de la intervención'],
    versions: [{ version_id: 'LEY-10-S-v1', source_id: 'LEY-19300', source_version: 'Ley 19.300 modificada por Ley 21.202', effective_from: '2020-01-23', effective_to: null, legal_reference: 'Ley 19.300 art. 10 s)', source_url: 'https://www.bcn.cl/leychile/',
      text: 'Ejecución de obras o actividades que puedan significar una alteración física o química de humedales total o parcialmente dentro del límite urbano, e impliquen su relleno, drenaje, secado, extracción de caudales o áridos, alteración de la barra terminal o de la vegetación azonal, entre otras. (Paráfrasis; texto no cotejado.)',
      required_inputs: ['loc:humedal_urbano', 'altera_humedal_urbano'], logic: all(geo('humedal_urbano'), yes('altera_humedal_urbano')), exceptions: [], validation_status: 'PENDIENTE_VALIDACION', reviewer: null, last_reviewed_at: null, notes: 'Literal legal no recogido en el art. 3 del Reglamento consolidado a 2024. Fecha de vigencia por verificar.' }] },
  { rule_id: 'LEY-11BIS', rule_name: 'Fraccionamiento de proyectos', rule_type: 'fraccionamiento', literal: 'art. 11 bis', art10: null, activity: null, scope: 'fraccionamiento', evidence_required: ['Descripción de proyectos, fases u obras relacionadas', 'Cronograma y vínculos funcionales', 'Antecedentes que acrediten la ejecución por etapas'],
    versions: [{ version_id: 'LEY-11BIS-v1', source_id: 'LEY-19300', source_version: 'Ley 19.300, art. 11 bis (agregado por Ley 20.417, D.O. 26-01-2010)', effective_from: '2010-01-26', effective_to: null, legal_reference: 'Ley 19.300 art. 11 bis; RSEIA art. 14', source_url: 'https://www.bcn.cl/leychile/navegar?idNorma=30667',
      text: '«Los proponentes no podrán, a sabiendas, fraccionar sus proyectos o actividades con el objeto de variar el instrumento de evaluación o de eludir el ingreso al Sistema de Evaluación de Impacto Ambiental.» La SMA determina la infracción. No se aplica cuando el proponente acredita que el proyecto se ejecutará por etapas.',
      required_inputs: ['frac_relacionado', 'frac_etapas'], logic: { all: [{ flag: { input: 'frac_relacionado', equals: true } }, { not: { flag: { input: 'frac_etapas', equals: true } } }] }, exceptions: [],
      validation_status: 'TEXTO_OFICIAL_CONTRASTADO', reviewer: null, last_reviewed_at: null, interpretive: true,
      notes: 'La intención («a sabiendas») y el vínculo entre proyectos no son determinables por el motor: una activación se deriva siempre a revisión jurídica, nunca a ingreso automático.' }] },
  { rule_id: 'RSEIA-2-G', rule_name: 'Modificación de proyecto (cambios de consideración)', rule_type: 'modificacion', literal: 'art. 2 g)', art10: null, activity: null, scope: 'modificacion', evidence_required: ['RCA y sus modificaciones', 'Descripción de partes, obras y acciones de la modificación', 'Fundamento sobre impactos y medidas'],
    versions: [
      { version_id: 'G-v1', source_id: 'DS40-LEYCHILE-2024', source_version: 'D.S. 40 consolidado (D.O. 01-02-2024)', effective_from: DS40_FROM, effective_to: '2026-01-20', legal_reference: 'Ley 19.300 art. 8 y 10; RSEIA art. 2 g)', source_url: DS40_PDF,
        text: 'g.1 las partes, obras o acciones de la modificación constituyen un proyecto del art. 3; g.2 la suma de partes no calificadas y de la modificación constituye un proyecto del art. 3; g.3 se modifica sustantivamente la extensión, magnitud o duración de los impactos; g.4 se modifican sustantivamente las medidas de mitigación, reparación o compensación. Se consideran los cambios sucesivos desde la entrada en vigencia del SEIA.',
        required_inputs: ['rca', 'g2_suma_incluida', 'g3_impactos', 'g4_medidas'], logic: any({ modificacion: { excludeOriginal: false } }, { prof: { input: 'g3_impactos', label: 'g.3 cambio sustantivo de impactos' } }, { prof: { input: 'g4_medidas', label: 'g.4 cambio sustantivo de medidas' } }), exceptions: [], validation_status: 'TEXTO_OFICIAL_CONTRASTADO', reviewer: null, last_reviewed_at: null,
        notes: 'g.1 y g.2 se evalúan con los resultados del art. 3 sobre los parámetros informados; g.3 y g.4 exigen determinación profesional fundada.' },
      { version_id: 'G-v2', source_id: 'DS17-2025', source_version: 'D.S. 40 modificado por D.S. 17/2025', effective_from: DS17_FROM, effective_to: null, legal_reference: 'RSEIA art. 2 g) (mod. D.S. 17/2025)', source_url: DS17_URL,
        text: 'g.1 agrega: «a excepción de las tipologías de proyecto o actividad de dicho listado por las que fue calificado originalmente, en cuyo caso se atenderá al resto de los numerales de este literal». g.2 a g.4 sin cambio.',
        required_inputs: ['rca', 'g2_suma_incluida', 'g3_impactos', 'g4_medidas'], logic: any({ modificacion: { excludeOriginal: true } }, { prof: { input: 'g3_impactos', label: 'g.3 cambio sustantivo de impactos' } }, { prof: { input: 'g4_medidas', label: 'g.4 cambio sustantivo de medidas' } }), exceptions: [], validation_status: 'TEXTO_OFICIAL_CONTRASTADO', reviewer: null, last_reviewed_at: null,
        notes: 'Texto oficial del D.S. 17/2025 cotejado (art. único N.º 1).' }] }
];

// Cobertura del art. 10 de la Ley 19.300 y del art. 3 del Reglamento.
export const ART10_LETTERS = [
  ['a', 'Obras hidráulicas y alteración de cuerpos de agua'], ['b', 'Líneas de transmisión y subestaciones'], ['c', 'Centrales generadoras > 3 MW'], ['d', 'Reactores y establecimientos nucleares'],
  ['e', 'Aeropuertos, terminales, vías férreas, estaciones de servicio, autopistas y caminos'], ['f', 'Puertos, vías de navegación, astilleros y terminales marítimos'], ['g', 'Desarrollo urbano o turístico'],
  ['h', 'Proyectos industriales o inmobiliarios en zonas latentes o saturadas'], ['i', 'Desarrollo minero, petróleo y gas, áridos'], ['j', 'Oleoductos, gasoductos y ductos'], ['k', 'Instalaciones fabriles y curtiembres'],
  ['l', 'Agroindustrias, mataderos y planteles'], ['m', 'Desarrollo forestal, celulosa, astilladoras y aserraderos'], ['n', 'Recursos hidrobiológicos'], ['ñ', 'Sustancias peligrosas'], ['o', 'Saneamiento ambiental'],
  ['p', 'Áreas colocadas bajo protección oficial'], ['q', 'Aplicación masiva de productos químicos'], ['r', 'Organismos genéticamente modificados'], ['s', 'Ley: humedales urbanos · RSEIA: cotos de caza'], ['t', 'RSEIA: subsuelo de bienes nacionales de uso público']
].map(([letter, name]) => ({ letter, name, rules: RULES.filter(r => r.art10 === letter).map(r => r.rule_id) }));

// Art. 11 Ley 19.300 y arts. 5–10 RSEIA: circunstancias que el Reglamento ordena considerar (texto consolidado 2024).
export const ART11 = [
  { id: 'a', title: 'Riesgo para la salud de la población', ref: 'Ley 19.300 art. 11 a); RSEIA art. 5', evidence: 'Modelación de calidad del aire y ruido, catastro de receptores, análisis de exposición.', questions: [
    '¿Hay población en el área de influencia cuya salud pueda verse afectada?', 'a) ¿Puede superar normas primarias de calidad o aumentar significativamente concentraciones?', 'b) ¿Puede superar los valores de ruido de la normativa vigente?',
    'c) ¿Puede exponer a contaminantes por impacto de emisiones o efluentes sobre suelo, agua o aire?', 'd) ¿Puede exponer a contaminantes por el manejo de residuos?'] },
  { id: 'b', title: 'Efectos adversos sobre recursos naturales renovables', ref: 'Ley 19.300 art. 11 b); RSEIA art. 6', evidence: 'Líneas de base de suelo, flora, fauna, hidrología e hidrogeología.', questions: [
    'a) ¿Pérdida de suelo o de su capacidad para sustentar biodiversidad?', 'b) ¿Intervención de superficie con biota, especies en categoría de conservación o con plan RECOGE?', 'c) ¿Impacto relevante sobre suelo, agua o aire respecto de la línea de base?',
    'd) ¿Superación de normas secundarias de calidad?', 'e) ¿Aumento de ruido sobre el de fondo donde se concentra fauna nativa?', 'f) ¿Uso o manejo de productos químicos o residuos que puedan afectar recursos?',
    'g) ¿Intervención de volumen o caudal de aguas, trasvase de cuencas, o efectos en aguas fósiles, vegas, bofedales, humedales, turberas o glaciares?', 'h) ¿Introducción de especies exóticas?', 'i) ¿Pérdida de resiliencia climática de los ecosistemas?'] },
  { id: 'c', title: 'Reasentamiento o alteración de sistemas de vida y costumbres', ref: 'Ley 19.300 art. 11 c); RSEIA art. 7', evidence: 'Línea de base de medio humano por dimensiones.', questions: [
    '¿Desplaza o reubica grupos humanos del área de influencia?', 'a) ¿Interviene o restringe el acceso a recursos naturales de sustento o uso tradicional?', 'b) ¿Obstruye la circulación o aumenta significativamente tiempos de desplazamiento?',
    'c) ¿Altera el acceso o la calidad de bienes, equipamiento, servicios o infraestructura básica?', 'd) ¿Dificulta el ejercicio de tradiciones, cultura o intereses comunitarios?'] },
  { id: 'd', title: 'Localización y valor ambiental del territorio', ref: 'Ley 19.300 art. 11 d); RSEIA art. 8', evidence: 'Cartografía oficial de áreas protegidas, sitios prioritarios, Ramsar y glaciares.', questions: [
    '¿Hay poblaciones protegidas (pueblos indígenas) en el área de influencia?', '¿Hay recursos o áreas protegidas, sitios prioritarios, humedales protegidos o glaciares en el área de influencia?', '¿El territorio tiene valor ambiental (baja intervención, servicios ecosistémicos, unicidad)?',
    '¿La extensión, magnitud o duración de la intervención puede afectar los objetos de protección?'] },
  { id: 'e', title: 'Valor paisajístico o turístico', ref: 'Ley 19.300 art. 11 e); RSEIA art. 9', evidence: 'Estudio de paisaje y cuencas visuales; flujos turísticos.', questions: [
    'a) ¿Obstruye la visibilidad a una zona con valor paisajístico?', 'b) ¿Altera atributos de una zona con valor paisajístico?', '¿Obstruye el acceso o altera zonas con valor turístico?'] },
  { id: 'f', title: 'Monumentos y patrimonio cultural', ref: 'Ley 19.300 art. 11 f); RSEIA art. 10', evidence: 'Inspección arqueológica, antecedentes del CMN.', questions: [
    'a) ¿Remueve, excava, traslada, deteriora o interviene un Monumento Nacional (Ley 17.288)?', 'b) ¿Modifica o deteriora construcciones o sitios del patrimonio cultural, incluido el indígena?', 'c) ¿Afecta lugares de manifestaciones habituales de la cultura o folclore de una comunidad?'] }
];

// Título VII — PAS (arts. 111–160) y pronunciamiento del art. 161. Texto consolidado 2024. El D.S. 17/2025 no modificó el Título VII según las fuentes consultadas.

// Normas sectoriales citadas por los PAS y la matriz de normativa. Una entrada por norma.
// version queda null hasta que alguien la verifique en LeyChile; nunca se completa con una fecha supuesta.
const SS = (id, cite, title, keys, extra = {}) => ({ id, cite, title, keys, idNorma: null, url: null, version: null, consulted: null, verifiedBy: null, note: '', ...extra });
export const SECTOR_SOURCES = [
  SS('SRC-DS1-1992-DEF', 'D.S. N.º 1/1992 Defensa', 'Reglamento para el Control de la Contaminación Acuática', ['D.S. 1/1992 Defensa']),
  SS('SRC-LEY-18892', 'Ley N.º 18.892', 'Ley General de Pesca y Acuicultura', ['Ley 18.892 LGPA']),
  SS('SRC-LEY-20256', 'Ley N.º 20.256', 'Pesca recreativa', ['Ley 20.256']),
  SS('SRC-DS314-2004-ECO', 'D.S. N.º 314/2004 Economía', 'Acuicultura en áreas de manejo y explotación de recursos bentónicos', ['D.S. 314/2004 Economía']),
  SS('SRC-LEY-17288', 'Ley N.º 17.288', 'Monumentos Nacionales', ['Ley 17.288']),
  SS('SRC-COD-MINERIA', 'Código de Minería', 'Código de Minería', ['Código de Minería']),
  SS('SRC-LEY-19473', 'Ley N.º 19.473', 'Ley de Caza', ['Ley 19.473']),
  SS('SRC-COD-SANITARIO', 'Código Sanitario', 'Código Sanitario', ['Código Sanitario']),
  SS('SRC-DS4-2009-SEGPRES', 'D.S. N.º 4/2009 SEGPRES', 'Manejo de lodos de plantas de tratamiento de aguas servidas', ['D.S. 4/2009 Segpres']),
  SS('SRC-DS490-1976-AGR', 'D.S. N.º 490/1976 Agricultura', 'Alerce', ['D.S. 490/1976 Agricultura']),
  SS('SRC-DS43-1990-AGR', 'D.S. N.º 43/1990 Agricultura', 'Araucaria', ['D.S. 43/1990 Agricultura']),
  SS('SRC-DS13-1995-AGR', 'D.S. N.º 13/1995 Agricultura', 'Queule, pitao, belloto del sur, ruil y belloto del norte', ['D.S. 13/1995 Agricultura']),
  SS('SRC-COD-AGUAS', 'Código de Aguas', 'DFL N.º 1.122/1981 Justicia, fija texto del Código de Aguas', ['Código de Aguas'], { idNorma: '5605', url: 'https://www.bcn.cl/leychile/navegar?idNorma=5605', note: 'Ficha LeyChile identificada (idNorma 5605). La versión vigente no está confirmada: las copias consultadas el 01-11-2026 informan últimas modificaciones distintas.' }),
  SS('SRC-LEY-18302', 'Ley N.º 18.302', 'Seguridad nuclear', ['Ley 18.302']),
  SS('SRC-DS248-2006-MIN', 'D.S. N.º 248/2006 Minería', 'Reglamento de depósitos de relaves', ['D.S. 248/2006 Minería']),
  SS('SRC-DS132-2002-MIN', 'D.S. N.º 132/2002 Minería', 'Reglamento de seguridad minera', ['D.S. 132/2002 Minería']),
  SS('SRC-LEY-20551', 'Ley N.º 20.551', 'Cierre de faenas e instalaciones mineras', ['Ley 20.551']),
  SS('SRC-DS189-2005-MINSAL', 'D.S. N.º 189/2005 MINSAL', 'Rellenos sanitarios', ['D.S. 189/2005 MINSAL']),
  SS('SRC-DS148-2003-MINSAL', 'D.S. N.º 148/2003 MINSAL', 'Reglamento sanitario sobre manejo de residuos peligrosos', ['D.S. 148/2003 MINSAL']),
  SS('SRC-LEY-20283', 'Ley N.º 20.283', 'Recuperación del bosque nativo y fomento forestal', ['Ley 20.283']),
  SS('SRC-DS93-2008', 'D.S. N.º 93/2008', 'Reglamento general de la Ley N.º 20.283', ['D.S. 93/2008']),
  SS('SRC-DL701-1974', 'D.L. N.º 701/1974', 'Fomento forestal', ['D.L. 701/1974']),
  SS('SRC-LEY-18378', 'Ley N.º 18.378', 'Distritos de conservación de suelos, bosques y aguas', ['Ley 18.378']),
  SS('SRC-LEY-11402', 'Ley N.º 11.402', 'Obras de defensa y regularización de riberas y cauces', ['Ley 11.402']),
  SS('SRC-DFL458-1975', 'DFL N.º 458/1975 MINVU', 'Ley General de Urbanismo y Construcciones', ['DFL 458/1975 LGUC']),
  SS('SRC-OGUC', 'OGUC', 'Ordenanza General de Urbanismo y Construcciones', ['OGUC']),
  SS('SRC-DS138-2005-MINSAL', 'D.S. N.º 138/2005 MINSAL', 'Declaración de emisiones', ['D.S. 138/2005 MINSAL']),
  SS('SRC-DS38-2011-MMA', 'D.S. N.º 38/2011 MMA', 'Norma de emisión de ruidos', ['D.S. 38/2011 MMA']),
  SS('SRC-DS90-2000-SEGPRES', 'D.S. N.º 90/2000 MINSEGPRES', 'Norma de emisión de residuos líquidos a aguas superficiales', ['D.S. 90/2000 MINSEGPRES']),
  SS('SRC-DS43-2015-MINSAL', 'D.S. N.º 43/2015 MINSAL', 'Reglamento de almacenamiento de sustancias peligrosas', ['D.S. 43/2015 MINSAL'])
];
const srcKey = s => String(s).replace(/N\.º\s*/g, '').replace(/\s+/g, ' ').trim();
const SRC_BY_KEY = Object.fromEntries(SECTOR_SOURCES.flatMap(s => s.keys.map(k => [srcKey(k), s.id])));
export const sourceIdsOf = norma => [...new Set(String(norma).split(';').map(part => srcKey(part.split(',')[0])).map(k => SRC_BY_KEY[k] || null))];

const OB = {};
export const OBRA_GROUPS = ['Marino y portuario', 'Pesca y acuicultura', 'Áreas protegidas y minería', 'Fauna', 'Flora y bosques', 'Patrimonio cultural', 'Minería y nuclear', 'Aguas y cauces', 'Saneamiento y residuos', 'Territorio', 'Características para normativa'];
const PAS_RAW = [
  [111, 'Vertimiento en aguas de jurisdicción nacional desde naves, aeronaves, artefactos navales, construcciones y obras portuarias', 'D.S. 1/1992 Defensa, art. 108', 'DIRECTEMAR', 'ambiental', 'obra_vertimiento', 'Vertimiento de desechos al mar desde naves u obras portuarias', 0],
  [112, 'Emplazar instalaciones terrestres de recepción de mezclas oleosas en puertos y terminales', 'D.S. 1/1992 Defensa, art. 113', 'DIRECTEMAR', 'ambiental', 'obra_recep_oleosas', 'Instalación terrestre de recepción de mezclas oleosas', 0],
  [113, 'Plantas de tratamiento de mezclas oleosas con descarga a aguas de jurisdicción nacional', 'D.S. 1/1992 Defensa, art. 116', 'DIRECTEMAR', 'ambiental', 'obra_trat_oleosas', 'Planta de tratamiento de mezclas oleosas con descarga al mar', 0],
  [114, 'Instalación de terminal marítimo y cañerías para sustancias contaminantes', 'D.S. 1/1992 Defensa, art. 117', 'DIRECTEMAR', 'ambiental', 'obra_terminal_maritimo', 'Terminal marítimo o cañerías para sustancias contaminantes', 0],
  [115, 'Introducir o descargar materias, energía o sustancias nocivas a aguas de jurisdicción nacional', 'D.S. 1/1992 Defensa, art. 140', 'DIRECTEMAR', 'ambiental', 'obra_descarga_mar', 'Descarga de materias o sustancias a aguas marítimas o de jurisdicción nacional', 0],
  [116, 'Actividades de acuicultura', 'Ley 18.892 LGPA, art. 87 inc. 3', 'Subpesca / Sernapesca', 'ambiental', 'obra_acuicultura', 'Centro de cultivo (acuicultura)', 1],
  [117, 'Repoblación y siembra de especies hidrobiológicas con fines de pesca recreativa', 'Ley 20.256, art. 11 inc. 2', 'Subpesca', 'ambiental', 'obra_repoblacion', 'Repoblación o siembra para pesca recreativa', 1],
  [118, 'Acuicultura en áreas de manejo y explotación de recursos bentónicos', 'D.S. 314/2004 Economía, art. 7', 'Subpesca', 'ambiental', 'obra_amerb', 'Acuicultura en AMERB', 1],
  [119, 'Pesca de investigación para seguimiento de poblaciones hidrobiológicas', 'Ley 18.892 LGPA, art. 99', 'Subpesca', 'ambiental', 'obra_pesca_inv', 'Pesca de investigación', 1],
  [120, 'Trabajos de construcción, excavación u otras actividades que puedan alterar un Santuario de la Naturaleza', 'Ley 17.288, art. 31 inc. 3', 'Consejo de Monumentos Nacionales (art. 6 transitorio)', 'ambiental', 'obra_santuario', 'Obras o actividades dentro de un Santuario de la Naturaleza', 2],
  [121, 'Labores mineras en parques nacionales, reservas nacionales o monumentos naturales', 'Código de Minería, art. 17 N.º 2', 'Ministerio de Minería / Sernageomin', 'ambiental', 'obra_min_snaspe', 'Labores mineras en parque, reserva o monumento natural', 2],
  [122, 'Labores mineras en covaderas o lugares de interés histórico o científico', 'Código de Minería, art. 17 N.º 6', 'Ministerio de Minería', 'ambiental', 'obra_min_covaderas', 'Labores mineras en covaderas o lugares de interés histórico o científico', 2],
  [123, 'Introducción en el medio natural de fauna silvestre, semen, embriones, huevos o larvas', 'Ley 19.473, art. 25 inc. 2', 'SAG', 'ambiental', 'obra_intro_fauna', 'Introducción o liberación de fauna silvestre', 3],
  [124, 'Caza o captura de especies protegidas para controlar animales que causen graves perjuicios', 'Ley 19.473, art. 9 inc. 1', 'SAG', 'ambiental', 'obra_caza_control', 'Caza o captura de control de animales perjudiciales', 3],
  [125, 'Labores mineras donde se han alumbrado aguas subterráneas o que puedan afectar caudal o calidad', 'Código Sanitario, art. 74', 'Autoridad Sanitaria Regional', 'ambiental', 'obra_min_aguas', 'Labores mineras con alumbramiento o afectación de aguas', 6],
  [126, 'Instalaciones para el manejo de lodos de plantas de tratamiento de aguas servidas', 'D.S. 4/2009 Segpres, art. 9', 'Autoridad Sanitaria Regional', 'ambiental', 'obra_lodos', 'Manejo de lodos de PTAS', 8],
  [127, 'Corta y destrucción del Alerce', 'D.S. 490/1976 Agricultura, art. 2', 'CONAF', 'ambiental', 'obra_alerce', 'Corta de alerce', 4],
  [128, 'Corta o explotación de araucarias vivas', 'D.S. 43/1990 Agricultura, art. 2', 'CONAF', 'ambiental', 'obra_araucaria', 'Corta de araucarias', 4],
  [129, 'Corta o explotación de Queule, Pitao, Belloto del Sur, Ruil o Belloto del Norte', 'D.S. 13/1995 Agricultura, art. 2', 'CONAF', 'ambiental', 'obra_monumento_flora', 'Corta de queule, pitao, bellotos o ruil', 4],
  [130, 'Nuevas explotaciones o mayores extracciones de aguas subterráneas en zonas de prohibición que alimentan vegas o bofedales', 'Código de Aguas, arts. 63 inc. 3–4 y 64', 'DGA', 'ambiental', 'obra_extr_bofedales', 'Extracción de aguas subterráneas en zona de prohibición de vegas o bofedales', 7, Z.NORTE],
  [131, 'Trabajos en Monumentos Históricos o construcciones en sus alrededores', 'Ley 17.288, arts. 11 y 12', 'Consejo de Monumentos Nacionales', 'mixto', 'obra_mon_historico', 'Intervención de un Monumento Histórico o su entorno', 5],
  [132, 'Excavaciones de tipo arqueológico, antropológico y paleontológico', 'Ley 17.288, arts. 22 y 23', 'Consejo de Monumentos Nacionales', 'mixto', 'obra_excavacion_arq', 'Excavaciones en sitios arqueológicos o paleontológicos', 5],
  [133, 'Construcciones nuevas u obras en zona típica o pintoresca', 'Ley 17.288, art. 30 N.º 1', 'Consejo de Monumentos Nacionales', 'mixto', 'obra_zona_tipica', 'Construcción en zona típica', 5],
  [134, 'Emplazamiento de instalaciones nucleares y radiactivas', 'Ley 18.302, arts. 4 y 67 inc. 3', 'CCHEN', 'mixto', 'obra_nuclear', 'Instalación nuclear o radiactiva', 6],
  [135, 'Construcción y operación de depósitos de relaves', 'D.S. 248/2006 Minería, art. 9', 'Sernageomin', 'mixto', 'obra_relaves', 'Depósito de relaves', 6],
  [136, 'Establecer un botadero de estériles o acumulación de mineral', 'D.S. 132/2002 Minería, art. 339 inc. 1', 'Sernageomin', 'mixto', 'obra_botadero', 'Botadero de estériles o acumulación de mineral', 6],
  [137, 'Aprobación del plan de cierre de una faena minera', 'Ley 20.551, art. 6', 'Sernageomin', 'mixto', 'obra_cierre_minero', 'Faena minera que requiere plan de cierre', 6],
  [138, 'Obras de evacuación, tratamiento o disposición final de desagües y aguas servidas', 'Código Sanitario, art. 71 b) primera parte', 'Autoridad Sanitaria Regional', 'mixto', 'obra_aguas_servidas', 'Sistema de tratamiento o disposición de aguas servidas', 8],
  [139, 'Obras de evacuación, tratamiento o disposición final de residuos industriales o mineros', 'Código Sanitario, art. 71 b) segunda parte', 'Autoridad Sanitaria Regional', 'mixto', 'obra_riles', 'Tratamiento o disposición de residuos líquidos industriales o mineros', 8],
  [140, 'Plantas de tratamiento o lugares de acumulación, selección o disposición de basuras y desperdicios', 'Código Sanitario, arts. 79 y 80', 'Autoridad Sanitaria Regional', 'mixto', 'obra_residuos_solidos', 'Tratamiento, acumulación o disposición de residuos sólidos', 8],
  [141, 'Construcción, reparación, modificación y ampliación de relleno sanitario', 'D.S. 189/2005 MINSAL, art. 5', 'Autoridad Sanitaria Regional', 'mixto', 'obra_relleno', 'Relleno sanitario', 8],
  [142, 'Sitio destinado al almacenamiento de residuos peligrosos', 'D.S. 148/2003 MINSAL, art. 29', 'Autoridad Sanitaria Regional', 'mixto', 'obra_respel_alm', 'Almacenamiento de residuos peligrosos', 8],
  [143, 'Transporte e instalaciones del sistema de transporte de residuos peligrosos', 'D.S. 148/2003 MINSAL, art. 36', 'Autoridad Sanitaria Regional', 'mixto', 'obra_respel_transp', 'Transporte de residuos peligrosos', 8],
  [144, 'Instalaciones de eliminación de residuos peligrosos', 'D.S. 148/2003 MINSAL, art. 44', 'Autoridad Sanitaria Regional', 'mixto', 'obra_respel_elim', 'Eliminación de residuos peligrosos', 8],
  [145, 'Sitio de reciclaje de residuos peligrosos', 'D.S. 148/2003 MINSAL, art. 52', 'Autoridad Sanitaria Regional', 'mixto', 'obra_respel_recic', 'Reciclaje de residuos peligrosos', 8],
  [146, 'Caza o captura de especies protegidas para investigación, centros de reproducción o utilización sustentable', 'Ley 19.473, art. 9 inc. 1', 'SAG', 'mixto', 'obra_caza_inv', 'Caza o captura de fauna protegida (investigación, rescate o relocalización)', 3],
  [147, 'Recolección de huevos y crías con fines científicos o de reproducción', 'Ley 19.473, art. 5', 'SAG', 'mixto', 'obra_huevos', 'Recolección de huevos o crías', 3],
  [148, 'Corta de bosque nativo', 'Ley 20.283, art. 5', 'CONAF', 'mixto', 'obra_corta_bosque', 'Corta de bosque nativo', 4, null, 'RSEIA-3-M1'],
  [149, 'Corta de plantaciones en terrenos de aptitud preferentemente forestal', 'D.L. 701/1974, art. 21', 'CONAF', 'mixto', 'obra_corta_plantacion', 'Corta de plantaciones en terrenos de aptitud forestal', 4, null, 'RSEIA-3-M1'],
  [150, 'Intervención de especies vegetales nativas clasificadas que formen parte de un bosque nativo, o alteración de su hábitat', 'Ley 20.283, art. 19', 'CONAF', 'mixto', 'obra_especies_clasif', 'Intervención de especies vegetales clasificadas en bosque nativo', 4],
  [151, 'Corta, destrucción o descepado de formaciones xerofíticas', 'Ley 20.283, art. 60; D.S. 93/2008, art. 3', 'CONAF', 'mixto', 'obra_xerofitas', 'Corta de formaciones xerofíticas', 4, null, 'RSEIA-3-M1'],
  [152, 'Manejo de bosque nativo de preservación en ambientes únicos o representativos', 'Ley 20.283, art. 2 N.º 4; D.S. 93/2008, art. 4', 'CONAF', 'mixto', 'obra_bosque_pres', 'Manejo de bosque nativo de preservación', 4],
  [153, 'Corta de árboles o arbustos aislados en áreas declaradas de protección', 'Ley 18.378, art. 4', 'CONAF', 'mixto', 'obra_arboles_aislados', 'Corta de árboles aislados en áreas de protección', 4],
  [154, 'Exploraciones en zonas que alimenten vegas o bofedales', 'Código de Aguas, art. 58 inc. 5', 'DGA', 'mixto', 'obra_explor_bofedales', 'Exploración de aguas subterráneas en zonas que alimentan vegas o bofedales', 7, Z.NORTE],
  [155, 'Construcción de ciertas obras hidráulicas', 'Código de Aguas, art. 294', 'DGA', 'mixto', 'obra_hidraulica_294', 'Obras hidráulicas del art. 294 del Código de Aguas (embalses, acueductos, sifones)', 7],
  [156, 'Modificaciones de cauce', 'Código de Aguas, arts. 41 y 171 inc. 1', 'DGA', 'mixto', 'obra_cauce', 'Modificación de cauce', 7],
  [157, 'Obras de regularización o defensa de cauces naturales', 'Código de Aguas, art. 171 inc. 1–2', 'DGA', 'mixto', 'obra_defensa_cauce', 'Regularización o defensa de cauces', 7],
  [158, 'Obras para la recarga artificial de acuíferos', 'Código de Aguas, art. 66', 'DGA', 'mixto', 'obra_recarga', 'Recarga artificial de acuíferos', 7],
  [159, 'Extracción de ripio y arena en cauces de ríos y esteros', 'Ley 11.402, art. 11', 'Dirección de Obras Hidráulicas / municipalidad', 'mixto', 'obra_aridos_cauce', 'Extracción de áridos en cauces', 7],
  [160, 'Subdividir y urbanizar terrenos rurales o construir fuera de los límites urbanos', 'DFL 458/1975 LGUC, art. 55 inc. 3–4', 'SEREMI MINVU / SAG', 'mixto', 'obra_rural', 'Subdivisión, urbanización o construcción en área rural', 9],
  [161, 'Calificación de instalaciones industriales y de bodegaje (pronunciamiento)', 'OGUC, art. 4.14.2', 'Autoridad Sanitaria Regional', 'pronunciamiento', 'obra_calif_industrial', 'Instalación industrial o de bodegaje en área con IPT que restringe usos según calificación', 9]
];
export const PAS_CATALOG = PAS_RAW.map(([art, nombre, norma, organismo, tipo, trigger, obra, g, regions, excludeIfRule]) => {
  OB[trigger] = { id: trigger, label: obra, group: OBRA_GROUPS[g] };
  return { id: 'PAS-' + art, articulo: String(art), nombre, norma, sourceIds: sourceIdsOf(norma), organismo, tipo: tipo === 'ambiental' ? 'Contenido únicamente ambiental' : tipo === 'mixto' ? 'Mixto' : 'Pronunciamiento', objeto: '', trigger, regions: regions || null, excludeIfRule: excludeIfRule || null,
    validation_status: 'TEXTO_OFICIAL_CONTRASTADO', fuente: DS40_PDF, vigencia: 'Texto consolidado 2024; sin cambios del D.S. 17/2025 según fuentes secundarias',
    notas: [regions ? 'Solo aplica en Arica y Parinacota, Tarapacá y Antofagasta.' : '', excludeIfRule ? 'No aplica a proyectos de la letra m.1 (art. ' + art + ').' : '', art === 140 ? 'Solo si no corresponde otro PAS por la misma acción.' : '', art === 161 ? 'Exigible solo en áreas con IPT que restringe usos según la calificación.' : ''].filter(Boolean).join(' ') };
});
const NORM_OBRAS = [['car_ruido', 'Fuentes emisoras de ruido'], ['car_emisiones', 'Fuentes fijas de emisiones atmosféricas'], ['car_descarga_sup', 'Descarga de residuos líquidos a aguas superficiales'], ['car_respel', 'Generación de residuos peligrosos'], ['car_sust_pel', 'Almacenamiento de sustancias peligrosas'], ['car_captacion', 'Captación de aguas']];
NORM_OBRAS.forEach(([id, label]) => { OB[id] = { id, label, group: OBRA_GROUPS[10] }; });
export const OBRAS = OBRA_GROUPS.flatMap(g => Object.values(OB).filter(o => o.group === g)).map(o => ({ ...o, label: o.group + ' · ' + o.label }));

export const NORMATIVA = [
  { id: 'N-AIRE-138', materia: 'Calidad del aire y emisiones', norma: 'D.S. N.º 138/2005 MINSAL', articulo: 'Por precisar', resumen: 'Declaración de emisiones de fuentes fijas.', trigger: 'car_emisiones', obligacion: 'Declarar emisiones ante la autoridad', evidencia: 'Comprobante de declaración', fase: 'Operación', responsable: 'Encargado ambiental', autoridad: 'Autoridad Sanitaria / MMA (por precisar)' },
  { id: 'N-RUIDO-38', materia: 'Ruido y vibraciones', norma: 'D.S. N.º 38/2011 MMA', articulo: 'Por precisar', resumen: 'Norma de emisión de ruidos generados por fuentes.', trigger: 'car_ruido', obligacion: 'Cumplir límites de emisión en receptores', evidencia: 'Mediciones de ruido', fase: 'Construcción y operación', responsable: 'Encargado ambiental', autoridad: 'Superintendencia del Medio Ambiente' },
  { id: 'N-DESC-90', materia: 'Descargas y efluentes', norma: 'D.S. N.º 90/2000 MINSEGPRES', articulo: 'Por precisar', resumen: 'Norma de emisión para descargas de residuos líquidos a aguas marinas y continentales superficiales.', trigger: 'car_descarga_sup', obligacion: 'Cumplir límites de descarga y autocontrol', evidencia: 'Reportes de autocontrol', fase: 'Operación', responsable: 'Jefe de planta', autoridad: 'Superintendencia del Medio Ambiente' },
  { id: 'N-RESPEL-148', materia: 'Residuos peligrosos', norma: 'D.S. N.º 148/2003 MINSAL', articulo: 'Por precisar', resumen: 'Reglamento sanitario sobre manejo de residuos peligrosos.', trigger: 'car_respel', obligacion: 'Manejo, almacenamiento y declaración de residuos peligrosos', evidencia: 'Declaraciones y registros', fase: 'Construcción y operación', responsable: 'Encargado de residuos', autoridad: 'Autoridad Sanitaria Regional' },
  { id: 'N-SUSTPEL-43', materia: 'Sustancias peligrosas', norma: 'D.S. N.º 43/2015 MINSAL', articulo: 'Por precisar', resumen: 'Reglamento de almacenamiento de sustancias peligrosas.', trigger: 'car_sust_pel', obligacion: 'Condiciones de almacenamiento', evidencia: 'Registros e inspecciones', fase: 'Operación', responsable: 'Jefe de bodega', autoridad: 'Autoridad Sanitaria Regional' },
  { id: 'N-BOSQUE-20283', materia: 'Bosque nativo y vegetación', norma: 'Ley N.º 20.283', articulo: 'Art. 5 (plan de manejo)', resumen: 'Ley de recuperación del bosque nativo y fomento forestal.', trigger: 'obra_corta_bosque', obligacion: 'Plan de manejo previo a la corta', evidencia: 'Resolución de plan de manejo', fase: 'Construcción', responsable: 'Titular', autoridad: 'CONAF' },
  { id: 'N-PATR-17288', materia: 'Suelo y patrimonio', norma: 'Ley N.º 17.288', articulo: 'Arts. 22 y 23', resumen: 'Ley de Monumentos Nacionales.', trigger: 'obra_excavacion_arq', triggerLoc: 'patrimonio', obligacion: 'Gestión de hallazgos y permisos ante el CMN', evidencia: 'Informes arqueológicos', fase: 'Construcción', responsable: 'Titular', autoridad: 'Consejo de Monumentos Nacionales' },
  { id: 'N-CIERRE-20551', materia: 'Cierre y abandono', norma: 'Ley N.º 20.551', articulo: 'Art. 6', resumen: 'Ley que regula el cierre de faenas e instalaciones mineras.', triggerActivity: 'min', obligacion: 'Plan de cierre de faena minera', evidencia: 'Plan de cierre aprobado', fase: 'Cierre', responsable: 'Titular', autoridad: 'SERNAGEOMIN' },
  { id: 'N-AGUA-CA', materia: 'Agua y recursos hídricos', norma: 'Código de Aguas', articulo: 'Por precisar', resumen: 'Derechos de aprovechamiento de aguas.', trigger: 'car_captacion', obligacion: 'Contar con derechos o autorizaciones para la captación', evidencia: 'Títulos de derechos de agua', fase: 'Construcción y operación', responsable: 'Titular', autoridad: 'Dirección General de Aguas' }
].map(n => ({ ...n, sourceIds: sourceIdsOf(n.norma), frecuencia: 'No registrada', fuente: null, vigencia: 'Por verificar', validation_status: 'PENDIENTE_VALIDACION' }));

export const FEATURES = [
  ['Ficha del proyecto por pasos con preguntas condicionales', 'IMPLEMENTADA'],
  ['Motor determinístico: lógica trivalente, unidades, vigencias, dependencias, excepciones, tramos regionales', 'IMPLEMENTADA'],
  ['Art. 3 RSEIA completo (letras a–t) y art. 10 s) de la Ley', 'IMPLEMENTADA — ' + RULES.filter(r => r.rule_type === 'tipologia_art3').length + ' reglas; 0 validadas jurídicamente'],
  ['Versiones previas y posteriores al D.S. 17/2025', 'IMPLEMENTADA — texto oficial del D.S. 17/2025 cotejado (LeyChile)'],
  ['Selección preliminar por tipo de proyecto, localización y región', 'IMPLEMENTADA — sugerencias; no declaran actividades ni obras'],
  ['Calidad del dato (confirmado, estimado, desconocido, no aplica) y proximidad al umbral', 'IMPLEMENTADA'],
  ['Fraccionamiento (Ley 19.300 art. 11 bis)', 'IMPLEMENTADA — siempre deriva a revisión jurídica'],
  ['Explicación «¿Por qué se obtuvo este resultado?»', 'IMPLEMENTADA'],
  ['Reglas de modificación (art. 2 g.1–g.4)', 'IMPLEMENTADA — g.3 y g.4 por determinación profesional fundada'],
  ['Análisis DIA/EIA con circunstancias de los arts. 5–10', 'PARCIAL — cuestionario y determinación profesional; sin umbrales de significancia'],
  ['Catálogo de PAS (arts. 111–161) con exclusiones', 'IMPLEMENTADA — requisitos detallados pendientes'],
  ['Matriz de normativa ambiental', 'PARCIAL — 9 normas, resúmenes no verificados'],
  ['Obligaciones de RCA', 'PARCIAL — registro manual; extracción automática pendiente'],
  ['Carga de documentos', 'SIMULADA — solo metadatos en el navegador; requiere Supabase Storage'],
  ['Historial y reproducción de evaluaciones', 'IMPLEMENTADA — almacenamiento local del navegador'],
  ['Informe preliminar', 'IMPLEMENTADA — impresión a PDF del navegador, CSV y JSON'],
  ['Pruebas automatizadas y regresión', 'IMPLEMENTADA — ejecutables en la pantalla Pruebas'],
  ['Autenticación, organizaciones y RLS', 'PENDIENTE — esquema SQL preparado'],
  ['PostGIS / análisis geográfico', 'PENDIENTE — localización declarada por el usuario'],
  ['Extracción documental con IA', 'PENDIENTE']
];

// Perfiles de proyecto para la selección preliminar. Son sugerencias para orientar la ficha: no declaran actividades ni obras.
const PT = (id, label, basis, activities, obras, loc) => ({ id, label, basis, activities, obras, loc });
export const PROJECT_TYPES = [
  PT('min_metal', 'Minería metálica (rajo o subterránea)', 'Extracción y beneficio con depósitos de relaves y estériles, energía propia y cierre de faena.', ['min', 'rel', 'lt'], ['obra_relaves', 'obra_botadero', 'obra_cierre_minero', 'obra_min_aguas', 'obra_aguas_servidas', 'obra_respel_alm', 'car_emisiones', 'car_ruido', 'car_respel', 'car_sust_pel', 'car_captacion'], ['glaciar', 'humedal', 'recursos_hidricos', 'pueblos_indigenas', 'patrimonio', 'poblacion']),
  PT('min_prosp', 'Prospección minera', 'Campañas de sondajes con plataformas, caminos de acceso y campamento.', ['prosp'], ['obra_aguas_servidas', 'obra_respel_alm', 'car_ruido', 'car_captacion', 'obra_excavacion_arq'], ['glaciar', 'humedal', 'patrimonio', 'area_protegida']),
  PT('aridos', 'Extracción de áridos', 'Extracción en pozo, cantera o cauce, con movimiento de tierra y transporte.', ['arid'], ['obra_aridos_cauce', 'obra_cauce', 'obra_defensa_cauce', 'car_ruido', 'car_emisiones'], ['recursos_hidricos', 'poblacion', 'especies']),
  PT('solar', 'Central solar fotovoltaica', 'Generación con paneles, subestación y línea de evacuación. Intervención extensa de superficie.', ['gen', 'lt'], ['obra_aguas_servidas', 'obra_excavacion_arq', 'obra_rural', 'obra_respel_alm', 'car_ruido'], ['patrimonio', 'especies', 'paisaje_turismo', 'pueblos_indigenas']),
  PT('eolico', 'Parque eólico', 'Aerogeneradores, caminos internos, subestación y línea. Riesgo para avifauna y paisaje.', ['gen', 'lt'], ['obra_corta_bosque', 'obra_especies_clasif', 'obra_excavacion_arq', 'obra_rural', 'obra_aguas_servidas', 'car_ruido'], ['bosque_nativo', 'especies', 'paisaje_turismo', 'poblacion', 'patrimonio']),
  PT('hidro', 'Central hidroeléctrica', 'Bocatoma, conducción y casa de máquinas, con obras en cauces y línea de evacuación.', ['gen', 'hid', 'lt'], ['obra_hidraulica_294', 'obra_cauce', 'obra_defensa_cauce', 'obra_corta_bosque', 'obra_aridos_cauce', 'car_captacion'], ['recursos_hidricos', 'especies', 'bosque_nativo', 'pueblos_indigenas', 'paisaje_turismo']),
  PT('transmision', 'Línea de transmisión eléctrica', 'Trazado lineal con torres, franja de servidumbre y subestaciones.', ['lt'], ['obra_corta_bosque', 'obra_corta_plantacion', 'obra_rural', 'obra_excavacion_arq'], ['bosque_nativo', 'area_protegida', 'paisaje_turismo', 'patrimonio', 'pueblos_indigenas']),
  PT('inmobiliario', 'Proyecto inmobiliario o de equipamiento', 'Viviendas, comercio o servicios con urbanización y estacionamientos.', ['urb'], ['obra_rural', 'obra_aguas_servidas', 'car_ruido'], ['humedal_urbano', 'zona_latente_saturada', 'poblacion', 'patrimonio']),
  PT('industrial', 'Instalación industrial', 'Planta de proceso con fuentes de emisión, residuos y sustancias peligrosas.', ['fab'], ['obra_calif_industrial', 'obra_riles', 'obra_respel_alm', 'car_emisiones', 'car_ruido', 'car_respel', 'car_sust_pel', 'car_descarga_sup', 'car_captacion'], ['zona_latente_saturada', 'poblacion', 'recursos_hidricos']),
  PT('agro', 'Agroindustria o matadero', 'Procesamiento de productos agropecuarios con RILes, residuos orgánicos y emisiones.', ['agro', 'san_riles'], ['obra_riles', 'obra_residuos_solidos', 'car_emisiones', 'car_descarga_sup', 'car_captacion', 'car_ruido'], ['zona_latente_saturada', 'recursos_hidricos', 'poblacion']),
  PT('acuicultura', 'Acuicultura', 'Centro de cultivo en mar, lago o río, y eventual planta de proceso.', ['acui'], ['obra_acuicultura', 'obra_descarga_mar', 'obra_vertimiento'], ['area_protegida', 'especies', 'pueblos_indigenas', 'paisaje_turismo']),
  PT('forestal', 'Explotación forestal o aserradero', 'Corta de bosques o plantaciones y procesamiento de madera.', ['forest', 'aserr'], ['obra_corta_bosque', 'obra_corta_plantacion', 'obra_especies_clasif', 'obra_xerofitas', 'car_emisiones', 'car_ruido'], ['bosque_nativo', 'especies', 'recursos_hidricos', 'pueblos_indigenas']),
  PT('residuos', 'Gestión de residuos sólidos', 'Relleno sanitario, planta de tratamiento o estación de transferencia.', ['san_rsd'], ['obra_relleno', 'obra_residuos_solidos', 'obra_rural', 'car_emisiones', 'car_ruido', 'car_descarga_sup'], ['poblacion', 'pueblos_indigenas', 'recursos_hidricos']),
  PT('sanitaria', 'Agua potable y aguas servidas', 'Captación, plantas de tratamiento, redes y disposición de efluentes y lodos.', ['san_ap', 'san_ptas'], ['obra_aguas_servidas', 'obra_lodos', 'car_descarga_sup', 'car_captacion'], ['recursos_hidricos', 'poblacion']),
  PT('portuario', 'Puerto o terminal marítimo', 'Obras marítimas, dragado, recepción de residuos de naves y descargas al mar.', ['port', 'hid'], ['obra_terminal_maritimo', 'obra_recep_oleosas', 'obra_trat_oleosas', 'obra_descarga_mar', 'obra_vertimiento', 'car_sust_pel'], ['area_protegida', 'especies', 'paisaje_turismo', 'poblacion']),
  PT('vial', 'Infraestructura vial o ferroviaria', 'Trazados lineales con puentes, cortes, botaderos y extracción de áridos.', ['vial', 'ferro'], ['obra_corta_bosque', 'obra_cauce', 'obra_defensa_cauce', 'obra_aridos_cauce', 'obra_excavacion_arq', 'obra_rural'], ['area_protegida', 'poblacion', 'patrimonio', 'bosque_nativo']),
  PT('combustibles', 'Estación de servicio o almacenamiento de combustibles', 'Estanques de combustibles líquidos o gaseosos y despacho.', ['eds', 'spinf'], ['car_sust_pel', 'car_respel', 'obra_aguas_servidas', 'obra_respel_alm'], ['poblacion', 'zona_latente_saturada'])
];

// Reglas de derivación por localización y región (selección preliminar).
export const PRESELECT_LOC_RULES = [
  { loc: ['area_protegida', 'santuario'], rules: ['RSEIA-3-P'], obras: ['obra_santuario', 'obra_min_snaspe'], why: 'Área bajo protección oficial declarada presente o próxima (art. 3 p)' },
  { loc: ['humedal_urbano'], rules: ['LEY-10-S'], obras: [], why: 'Humedal urbano declarado presente o próximo (Ley 19.300 art. 10 s)' },
  { loc: ['zona_latente_saturada'], rules: ['RSEIA-3-H1', 'RSEIA-3-H2'], obras: [], why: 'Zona latente o saturada declarada (letra h)' },
  { loc: ['glaciar'], rules: ['RSEIA-3-A5'], obras: [], why: 'Glaciar declarado presente o próximo (art. 3 a.5)' },
  { loc: ['patrimonio'], rules: [], obras: ['obra_excavacion_arq', 'obra_mon_historico', 'obra_zona_tipica'], why: 'Patrimonio cultural declarado presente o próximo' },
  { loc: ['bosque_nativo'], rules: [], obras: ['obra_corta_bosque', 'obra_especies_clasif'], why: 'Bosque nativo declarado presente o próximo' },
  { loc: ['recursos_hidricos'], rules: [], obras: ['obra_cauce', 'obra_defensa_cauce'], why: 'Cuerpos o cursos de agua declarados presentes o próximos' },
  { loc: ['humedal'], rules: [], obras: ['obra_extr_bofedales', 'obra_explor_bofedales'], regions: ['AP', 'TA', 'AN'], why: 'Vegas o bofedales en Arica y Parinacota, Tarapacá o Antofagasta (PAS 130 y 154)' }
];
export const PRESELECT_REGION_RULES = [
  { regions: ['AP', 'TA', 'AN'], ifActivity: ['hid', 'min', 'gen', 'prosp', 'san_ap'], loc: ['humedal'], obras: ['obra_extr_bofedales', 'obra_explor_bofedales'], why: 'Región con vegas y bofedales protegidos por los arts. 3 a.2.1, 130 y 154' }
];

// Listas de selección para la ficha. Los sectores remiten a las letras del art. 10 y a los perfiles de proyecto.
const SC = (id, label, art10, types, activities) => ({ id, label, art10, types, activities });
export const SECTORS = [
  SC('mineria', 'Minería', 'i', ['min_metal', 'min_prosp', 'aridos'], ['min', 'prosp', 'rel', 'arid', 'turba']),
  SC('energia', 'Energía', 'b, c, d', ['solar', 'eolico', 'hidro', 'transmision'], ['gen', 'lt', 'nuc']),
  SC('hidrocarburos', 'Petróleo, gas y ductos', 'i.4, j', [], ['hc', 'ducto']),
  SC('hidraulica', 'Obras hidráulicas y riego', 'a', ['hidro'], ['hid', 'glac']),
  SC('inmobiliario', 'Inmobiliario, urbano y turístico', 'g, h', ['inmobiliario'], ['urb', 'tur', 'subsuelo']),
  SC('transporte', 'Transporte e infraestructura vial', 'e', ['vial', 'combustibles'], ['aero', 'term', 'ferro', 'vial', 'eds']),
  SC('portuario', 'Puertos y obras marítimas', 'f', ['portuario'], ['port', 'hid']),
  SC('industria', 'Industria manufacturera', 'k', ['industrial'], ['fab', 'curt']),
  SC('agro', 'Agroindustria y ganadería', 'l, q, r', ['agro'], ['agro', 'matad', 'plantel', 'quim', 'ogm']),
  SC('forestal', 'Forestal y celulosa', 'm', ['forestal'], ['forest', 'astill', 'aserr', 'celul']),
  SC('acuicultura', 'Pesca y acuicultura', 'n', ['acuicultura'], ['acuiext', 'acui', 'acuipl']),
  SC('saneamiento', 'Saneamiento ambiental', 'o', ['residuos', 'sanitaria'], ['san_ap', 'san_ptas', 'san_rsd', 'san_emis', 'san_riles', 'san_ris', 'san_respel', 'san_salud', 'remed']),
  SC('peligrosas', 'Combustibles y sustancias peligrosas', 'e.6, ñ', ['combustibles'], ['eds', 'sptox', 'spexp', 'spinf', 'spcor', 'sptr', 'sprad']),
  SC('otro', 'Otro sector', '', [], [])
];
export const ETAPAS = ['Perfil', 'Ingeniería conceptual', 'Prefactibilidad', 'Factibilidad', 'Anteproyecto', 'Ingeniería básica', 'Ingeniería de detalle', 'Construcción', 'Operación', 'Ampliación o modificación de operación', 'Cierre'];
export const SOURCE_HINTS = {
  param: ['Memoria técnica del proyecto', 'Ficha técnica del fabricante', 'Plano del proyecto', 'Plan minero', 'Balance de masa', 'Balance hídrico', 'Estudio de ingeniería', 'Estimación del titular', 'RCA vigente', 'Informe de laboratorio'],
  loc: ['Áreas protegidas oficiales – MMA', 'SNASPE – CONAF', 'Inventario Público de Glaciares – DGA', 'Inventario Nacional de Humedales – MMA', 'Humedales urbanos declarados – MMA', 'Catastro de vegetación – CONAF', 'Tierras y ADI – CONADI', 'Consejo de Monumentos Nacionales', 'Zonas latentes o saturadas – MMA', 'IDE Chile', 'Línea de base del proyecto', 'Visita a terreno']
};

// Comunas por región (346), ordenadas por provincia.
export const COMUNAS = {"AP":["Arica","Camarones","Putre","General Lagos"],"TA":["Iquique","Alto Hospicio","Pozo Almonte","Camiña","Colchane","Huara","Pica"],"AN":["Antofagasta","Mejillones","Sierra Gorda","Taltal","Calama","Ollagüe","San Pedro de Atacama","Tocopilla","María Elena"],"AT":["Copiapó","Caldera","Tierra Amarilla","Chañaral","Diego de Almagro","Vallenar","Alto del Carmen","Freirina","Huasco"],"CO":["La Serena","Coquimbo","Andacollo","La Higuera","Paiguano","Vicuña","Illapel","Canela","Los Vilos","Salamanca","Ovalle","Combarbalá","Monte Patria","Punitaqui","Río Hurtado"],"VA":["Valparaíso","Casablanca","Concón","Juan Fernández","Puchuncaví","Quintero","Viña del Mar","Isla de Pascua","Los Andes","Calle Larga","Rinconada","San Esteban","La Ligua","Cabildo","Papudo","Petorca","Zapallar","Quillota","Calera","Hijuelas","La Cruz","Nogales","San Antonio","Algarrobo","Cartagena","El Quisco","El Tabo","Santo Domingo","San Felipe","Catemu","Llaillay","Panquehue","Putaendo","Santa María","Quilpué","Limache","Olmué","Villa Alemana"],"RM":["Santiago","Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina","Lampa","Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto","San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"],"OH":["Rancagua","Codegua","Coinco","Coltauco","Doñihue","Graneros","Las Cabras","Machalí","Malloa","Mostazal","Olivar","Peumo","Pichidegua","Quinta de Tilcoco","Rengo","Requínoa","San Vicente","Pichilemu","La Estrella","Litueche","Marchigüe","Navidad","Paredones","San Fernando","Chépica","Chimbarongo","Lolol","Nancagua","Palmilla","Peralillo","Placilla","Pumanque","Santa Cruz"],"ML":["Talca","Constitución","Curepto","Empedrado","Maule","Pelarco","Pencahue","Río Claro","San Clemente","San Rafael","Cauquenes","Chanco","Pelluhue","Curicó","Hualañé","Licantén","Molina","Rauco","Romeral","Sagrada Familia","Teno","Vichuquén","Linares","Colbún","Longaví","Parral","Retiro","San Javier","Villa Alegre","Yerbas Buenas"],"NB":["Chillán","Bulnes","Chillán Viejo","El Carmen","Pemuco","Pinto","Quillón","San Ignacio","Yungay","Quirihue","Cobquecura","Coelemu","Ninhue","Portezuelo","Ránquil","Treguaco","San Carlos","Coihueco","Ñiquén","San Fabián","San Nicolás"],"BI":["Concepción","Coronel","Chiguayante","Florida","Hualqui","Lota","Penco","San Pedro de la Paz","Santa Juana","Talcahuano","Tomé","Hualpén","Lebu","Arauco","Cañete","Contulmo","Curanilahue","Los Álamos","Tirúa","Los Ángeles","Antuco","Cabrero","Laja","Mulchén","Nacimiento","Negrete","Quilaco","Quilleco","San Rosendo","Santa Bárbara","Tucapel","Yumbel","Alto Biobío"],"AR":["Temuco","Carahue","Cunco","Curarrehue","Freire","Galvarino","Gorbea","Lautaro","Loncoche","Melipeuco","Nueva Imperial","Padre Las Casas","Perquenco","Pitrufquén","Pucón","Saavedra","Teodoro Schmidt","Toltén","Vilcún","Villarrica","Cholchol","Angol","Collipulli","Curacautín","Ercilla","Lonquimay","Los Sauces","Lumaco","Purén","Renaico","Traiguén","Victoria"],"LR":["Valdivia","Corral","Lanco","Los Lagos","Máfil","Mariquina","Paillaco","Panguipulli","La Unión","Futrono","Lago Ranco","Río Bueno"],"LL":["Puerto Montt","Calbuco","Cochamó","Fresia","Frutillar","Los Muermos","Llanquihue","Maullín","Puerto Varas","Castro","Ancud","Chonchi","Curaco de Vélez","Dalcahue","Puqueldón","Queilén","Quellón","Quemchi","Quinchao","Osorno","Puerto Octay","Purranque","Puyehue","Río Negro","San Juan de la Costa","San Pablo","Chaitén","Futaleufú","Hualaihué","Palena"],"AY":["Coyhaique","Lago Verde","Aysén","Cisnes","Guaitecas","Cochrane","O'Higgins","Tortel","Chile Chico","Río Ibáñez"],"MA":["Punta Arenas","Laguna Blanca","Río Verde","San Gregorio","Cabo de Hornos","Antártica","Porvenir","Primavera","Timaukel","Natales","Torres del Paine"]};

// Capas de conocimiento: distinguen la naturaleza de cada elemento en la explicación y el informe.
export const KNOWLEDGE_LAYERS = {
  ley: 'Texto legal obligatorio', reglamento: 'Reglamento', modificacion: 'Reglamento (modificación)', guia: 'Criterio o guía oficial del SEA',
  interpretacion: 'Interpretación técnica del motor', supuesto: 'Supuesto declarado por el usuario', dato: 'Dato del proyecto', motor: 'Resultado de otra regla', conclusion: 'Conclusión generada'
};
export const DATA_QUALITY = [['confirmado', 'Confirmado'], ['estimado', 'Estimado'], ['desconocido', 'Desconocido'], ['na', 'No aplica']];

// Guías oficiales del SEA para PAS (índice verificado el 30-10-2026 en sea.gob.cl). Orientan la tramitación; no son norma.
const SG = 'https://www.sea.gob.cl/sites/default/files/';
export const PAS_GUIDES = {
  138: ['Segunda edición', '2025-10-23', 'Res. Ex. N.º 202533101951', SG + 'imce/archivos/2025/10/23/Guia-PAS-138_2025_Res.pdf', 'Observancia desde el 21-11-2025'],
  140: ['Primera edición', '2024-11-14', 'Res. Ex. N.º 202499101905', SG + 'imce/archivos/2024/11/14/Guia_PAS_140_2024.pdf', 'Observancia desde el 29-11-2024'],
  157: ['Segunda edición', '2022-09-27', 'Res. Ex. N.º 202299101770', SG + 'imce/archivos/2022/11/04/guia_pas_157_2022_vf.pdf', ''],
  146: ['Primera edición', '2022-03-08', 'Res. Ex. N.º 202299101179', SG + 'imce/archivos/2022/03/09/guia_pas_146.pdf', ''],
  116: ['Primera edición', '2021-03-11', 'Res. Ex. N.º 202199101135', SG + 'imce/archivos/2021/03/12/guia_pas_116_finalizada_a_publicar.pdf', ''],
  137: ['Primera edición', '2020-03-13', 'Res. Ex. N.º 20209910170', SG + 'imce/archivos/2020/03/13/guia_pas_137.pdf', ''],
  135: ['Primera edición', '2020-03-13', 'Res. Ex. N.º 2020991068', SG + 'imce/archivos/2020/03/13/guia_pas_135.pdf', ''],
  160: ['Primera edición', '2019-03-11', 'Res. Ex. N.º 295 (dejada sin efecto por Res. Ex. N.º 202399101279 de 29-03-2023)', SG + 'imce/archivos/2019/03/14/guia_sea_pas_160_imprentaweb.pdf', 'Observancia actualizada en 2023: competencias del art. 55 LGUC transferidas a los Gobiernos Regionales'],
  136: ['Primera edición', '2019-03-11', 'Res. Ex. N.º 294', SG + 'imce/archivos/2019/03/13/guia_sea_pas_136_web.pdf', ''],
  131: ['Primera edición', '2018-02-22', 'Res. Ex. N.º 207', SG + 'imce/archivos/2018/03/02/pas_131.pdf', ''],
  132: ['Primera edición', '2018-02-22', 'Res. Ex. N.º 209', SG + 'imce/archivos/2018/03/02/pas_132.pdf', ''],
  133: ['Primera edición', '2018-02-22', 'Res. Ex. N.º 208', SG + 'imce/archivos/2018/03/02/pas_133.pdf', ''],
  148: ['Primera edición', '2014', 'Res. Ex. N.º 1010 de 06-08-2015', SG + 'migration_files/instructivos/Art_148_PAS_bosque_nativo.pdf', ''],
  149: ['Primera edición', '2014', 'Res. Ex. N.º 1010 de 06-08-2015', SG + 'migration_files/instructivos/Art_149_PAS_Corta_de_plantaciones.pdf', ''],
  155: ['Primera edición', '2014', 'Res. Ex. N.º 1010 de 06-08-2015', SG + 'migration_files/instructivos/Art_155_PAS_obras_hidraulicas.pdf', ''],
  156: ['Primera edición', '2014', 'Res. Ex. N.º 1010 de 06-08-2015', SG + 'migration_files/instructivos/Art_156_PAS_modificacion_cauce.pdf', '']
};
PAS_CATALOG.forEach(p => { const g = PAS_GUIDES[p.articulo]; p.guia = g ? { title: 'Guía trámite PAS ' + p.articulo, edicion: g[0], fecha: g[1], resolucion: g[2], url: g[3], observancia: g[4] } : null; });

// Guías del SEA relacionadas con el art. 11 (índice consultado el 21-10-2026). Criterios de predicción y evaluación de significancia.
export const ART11_GUIDES = {
  a: [['Evaluación ambiental del riesgo para la salud de la población', 'Segunda edición, 08-03-2023', SG + 'imce/archivos/2023/03/08/Guia.pdf'], ['Predicción y evaluación de impactos por ruido y vibración', 'Primera edición, 15-02-2019', SG + 'imce/archivos/2019/07/15/040619_guia_r_y_v_web.pdf'], ['Predicción y evaluación de impactos por olor', 'Primera edición, 19-12-2017', SG + 'imce/archivos/2019/12/04/guia_pye_impactos_por_olor_190807.pdf']],
  b: [['Evaluación de efectos adversos sobre recursos naturales renovables', 'Segunda edición, 09-01-2023', SG + 'imce/archivos/2023/01/10/Guia-Efectos-adversos-RNR_2023.pdf'], ['Predicción y evaluación de impactos sobre ecosistemas terrestres', 'Primera edición, 01-08-2025; observancia desde el 09-02-2026', SG + 'imce/archivos/2025/08/4/Guia-EVA-Ecoterrestre25_conres.pdf'], ['Predicción y evaluación de impactos en ecosistemas marinos', 'Primera edición, 28-03-2024', SG + 'imce/archivos/2024/03/28/Gu%c3%ada%20impactos%20ecosistema%20marino%202024.pdf'], ['Predicción y evaluación de impacto ambiental en humedales', 'Primera edición, 06-04-2023', SG + 'imce/archivos/2023/06/Guia-EVA-Humedales_2023.pdf'], ['Compensación de la biodiversidad en el SEIA', 'Segunda edición, 08-03-2022', SG + 'imce/archivos/2022/08/29/guia_teorica_compensacion_biodiversidad.pdf']],
  c: [['Predicción y evaluación de impactos sobre los sistemas de vida y costumbres de grupos humanos', 'Segunda edición, 14-01-2025; observancia desde el 07-04-2025', SG + 'imce/archivos/2025/01/14/2025_GSVCGH_2ed.pdf'], ['Evaluación del reasentamiento de comunidades humanas', 'Segunda edición, 2014', SG + 'migration_files/guias/Guia_Reasentamiento_20140609.pdf']],
  d: [['Predicción y evaluación de impacto ambiental en humedales', 'Primera edición, 06-04-2023', SG + 'imce/archivos/2023/06/Guia-EVA-Humedales_2023.pdf'], ['Predicción y evaluación de impactos sobre ecosistemas terrestres', 'Primera edición, 01-08-2025', SG + 'imce/archivos/2025/08/4/Guia-EVA-Ecoterrestre25_conres.pdf']],
  e: [['Evaluación de impacto ambiental del valor paisajístico', 'Segunda edición, 15-02-2019', SG + 'imce/archivos/2019/03/13/guia_valor_paisajistico_websea.pdf'], ['Valor turístico en el SEIA', 'Primera edición, 27-12-2017', SG + 'imce/archivos/2017/12/27/guia_valor_turistico_en_el_seia_27_12_17.pdf']],
  f: [['Evaluación de monumentos nacionales pertenecientes al patrimonio cultural', 'Primera edición, 2012', SG + 'migration_files/guias/guia_monumentos_060213.pdf']]
};
ART11.forEach(c => { c.guides = (ART11_GUIDES[c.id] || []).map(([title, edicion, url]) => ({ title, edicion, url })); });
