# LiqenInsight SEIA — prototipo funcional (modo desarrollo)

Herramienta de análisis **preliminar** de aplicabilidad del SEIA. No es una resolución del SEA, una consulta de pertinencia ni una autorización administrativa.

## Qué hay en este proyecto

| Archivo | Rol |
|---|---|
| `LiqenInsight SEIA.dc.html` | Interfaz (12 pantallas). Persiste en `localStorage` del navegador. |
| `seia-catalog.js` | Catálogo normativo versionado: fuentes, reglas, unidades, PAS, normativa, art. 11. Solo datos. |
| `seia-engine.js` | Motor determinístico. ES module sin DOM; reutilizable desde Node, Next.js o un worker. |
| `seia-tests.js` | 50 pruebas (motor, unitarias, regresión). Se ejecutan en la pantalla *Pruebas*. |
| `schema.sql` | Esquema PostgreSQL/Supabase con RLS por organización. |

## Arquitectura

```
UI (DC / futuro Next.js)  →  servicio de evaluación  →  seia-engine.js  ←  seia-catalog.js (o tablas legal_rules)
                                    ↓
                     rule_evaluations + evaluation_results (instantánea inmutable)
```

- **Catálogo, motor, datos del proyecto e informe están separados.** El motor recibe `(project, {date, rules})` y devuelve resultados trazables.
- **Intérprete controlado**: las condiciones son árboles JSON (`all`, `any`, `not`, `const`, `cmp`, `flag`, `enum`, `prof`, `geo`, `region`, `rule`, `review`, `pending`, `unverified`, `modificacion`). No hay `eval`.
- **Lógica trivalente + revisión**: VERDADERO / FALSO / DESCONOCIDO / REVISIÓN. `AND` y `OR` propagan la incertidumbre: un dato faltante nunca equivale a "no aplica".
- **Unidades**: conversión solo dentro de la misma dimensión. Cambios de base temporal (t/día → t/mes) se rechazan porque requieren un supuesto de operación.
- **Vigencia**: cada regla tiene versiones con `effective_from/effective_to`; se elige la vigente a la fecha de evaluación. Reproducir una evaluación = misma instantánea + misma fecha + misma versión de catálogo.
- **Modificaciones**: en proyectos declarados como modificación, las tipologías del art. 3 se evalúan sobre la magnitud de la modificación y alimentan la regla art. 2 g.1. La versión DS 17/2025 excluye las tipologías originales de la RCA.

### Decisiones sobre el modelo de datos
- `project_versions.payload` (jsonb) guarda la ficha completa e inmutable; las tablas `project_parameters`, `project_locations` y `project_activities` son proyecciones consultables.
- `legal_rules` usa clave `(rule_id, version_id)` y guarda la lógica en jsonb; `rule_conditions` se materializa para búsquedas.
- `rule_evaluations` y `project_versions` son inmutables (trigger).

## Estado del catálogo (CAT-2026.10-dev.4)
- **Art. 3 RSEIA completo (letras a–t)**, art. 10 s) de la Ley 19.300 y art. 2 g.1–g.4. 65 reglas, 84 versiones. **0 validadas jurídicamente.**
- Fuentes oficiales cotejadas: texto consolidado del D.S. 40 en LeyChile (última modificación D.S. 30, D.O. 01-02-2024) y **texto oficial del D.S. 17/2025** (LeyChile, versión única de 21-01-2026, https://bcn.cl/A1K4dP).
- 83 de 84 versiones con texto oficial contrastado. Pendiente: art. 10 s) de la Ley 19.300 (humedales urbanos).
- D.S. 17/2025 modifica: art. 2 g.1; art. 3 b.1, e.6, g.1.2 b), g.2 b), i) y i.1, i.6 (derogado), n.1, n.2, ñ.1–ñ.5, o), o.3, o.4, o.5, o.7, o.8, o.9, o.10; agrega art. 60 d.7. **No modifica h.2 ni f.3** (propuestas del anteproyecto desacumuladas por Res. Ex. MMA 2.955/2025).
- Interpretación abierta: o.7.1 (efluentes sin tratar) deriva a revisión.
- Tramos regionales (a.2, a.3, a.4, i.2, i.5, m.1) resueltos por región; Ñuble se deriva a revisión cuando no está en el tramo literal.
- Literales previos a los D.S. 8/2014 y 63/2014 (a.1, h.1, h.2, l.1, l.2, ñ.3, o.8–o.10) no cargados.
- PAS: arts. 111–160 y pronunciamiento del art. 161 (Título VII no modificado por el D.S. 17/2025).

## Instalación y ejecución
Abrir `LiqenInsight SEIA.dc.html` en un navegador moderno. No requiere servidor de base de datos en modo desarrollo.

Para migrar a Next.js: copiar `seia-catalog.js` y `seia-engine.js` a `packages/seia-engine/`, exponer `POST /api/evaluations` que cargue la versión del proyecto, ejecute `runSeia` y persista el resultado.

Estructura propuesta:
```
apps/web/            Next.js (App Router), Tailwind
  app/(app)/proyectos/[id]/{ficha,evaluacion,dia-eia,pas,normativa,informe,historial}
  app/api/evaluations/route.ts
packages/seia-engine/  motor + tipos + pruebas (vitest)
packages/catalog/      seeds de legal_rules desde JSON revisado
supabase/migrations/   schema.sql
```

## Variables de entorno (sin credenciales reales)
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # solo servidor; nunca en el cliente
SEIA_CATALOG_VERSION=CAT-2026.10-dev.1
```

## Conectar Supabase
1. Crear proyecto y ejecutar `schema.sql`.
2. Crear bucket privado `project-documents`.
3. Cargar `legal_sources` y `legal_rules` desde `seia-catalog.js` con un script que corra con la service role.
4. Reemplazar la capa `localStorage` de la interfaz por llamadas al servicio.

## Limitaciones conocidas
- No se descargó el texto íntegro del DS 40 vigente ni del DS 17/2025; varias reglas dependen de fuentes secundarias.
- Los documentos no se suben: solo se registran metadatos locales.
- La localización es declarada por el usuario; no hay cruce con cartografía oficial.
- El análisis del art. 11 no aplica criterios de significancia automáticamente; requiere determinación profesional.

## Próximas tareas para producción
1. Revisión jurídica regla por regla y registro de `reviewer` y `last_reviewed_at`.
2. Incorporar el texto oficial del DS 17/2025 y completar el art. 3.
3. Implementar art. 2 g.2–g.4 y subliterales faltantes.
4. Autenticación, organizaciones y almacenamiento de documentos en Supabase.
5. Cruce geográfico con PostGIS y capas oficiales.
6. Contraste con consultas de pertinencia públicas comparables.


## Auditoría y mejoras (motor 0.4.0)
**Se mantiene:** catálogo versionado del art. 3 (a–t), art. 2 g), PAS 111–161, lógica trivalente, tramos regionales, selección preliminar, aplicación guiada por etapas, historial y reproducción.

**Debilidades corregidas:**
- No se distinguía dato confirmado, estimado, desconocido o no aplicable. Ahora cada parámetro numérico declara su calidad; un dato estimado a ±10 % del umbral deriva a revisión y «no aplica» se trata como inexistente, no como faltante.
- Una regla pendiente de validación (art. 10 s) podía activar el ingreso. Ahora deriva a revisión.
- No se evaluaba el fraccionamiento. Nueva regla Ley 19.300 art. 11 bis (texto cotejado en LeyChile), siempre derivada a revisión jurídica; el inciso final (ejecución por etapas acreditada) la excluye.
- Motor B aceptaba «efecto significativo» sin fundamento. Ahora exige fundamento escrito y registra incertidumbre y antecedentes faltantes por criterio.
- Se agregó la explicación «¿Por qué se obtuvo este resultado?» y el informe de 15 secciones con niveles Determinado / Preliminar / Pendiente, exportable a PDF y Word.

**Motores:** A = `runSeia` (ingreso, resultado por regla APLICA / NO_APLICA / INDETERMINADO); B = `runArt11` (solo con ingreso identificado). Se comunican únicamente por el resultado global.

**Pendiente de validación:** Ley 19.300 art. 10 s); Ley 21.455 (no incorporada); criterios de significancia de las guías del SEA; requisitos de otorgamiento de cada PAS; matriz de normativa.

**Pruebas:** 85 (motor, unitarias, Motor B, regresión). Cada prueba nueva incluye su fundamento normativo.

## Verificación de la lógica (motor 0.4.1)
- Motor A: una excepción cuyos antecedentes faltan queda en «información insuficiente» (antes «revisión»).
- Motor B: la DIA solo procede si los seis criterios tienen determinación profesional fundada y con evidencia; respuestas negativas sin determinación mantienen la vía pendiente. En modificaciones se recuerda el art. 11 ter.
- Invariantes comprobados en 400 proyectos aleatorios: sin «no ingreso» con reglas abiertas, sin «ingreso» sin regla activada, sin activación con reglas pendientes de validación, y quitar datos nunca convierte una regla en «no activada».
- 85 pruebas superadas.

## Revisión profunda (motor 0.5.0, catálogo dev.4)
Auditoría estructural automática de las 66 reglas: entradas, unidades, opciones, dependencias, vigencias sin huecos ni solapes, tramos regionales, visibilidad de cada entrada cuando su regla aplica, y coherencia de PAS, normativa y perfiles de proyecto.
- Corregido: h.2 (sin actividad) usaba la superficie de loteo industrial, que solo se mostraba en proyectos urbanos o fabriles. Ahora se muestra en cualquier proyecto en zona latente o saturada.
- Corregido: en modificaciones, una tipología en revisión llegaba a g.1 como «información insuficiente». Ahora se propaga como revisión.
- Confirmado: l.1, l.2, m.2, m.3 y n (plantas) evalúan los requisitos de k.1 directamente (potencia ≥ 2.000 kVA), sin depender de que se declare la actividad fabril.
- Invariantes en 600 proyectos aleatorios (todas las regiones, modificaciones y calidades de dato): 0 violaciones.
- Secuencia de la aplicación: Localización pasa antes de Parámetros, porque activa tipologías por sí misma y habilita parámetros (zona saturada, glaciar, humedal urbano).
- 93 pruebas superadas.

## Auditoría normativa (motor 0.7.0, catálogo CAT-2026.11-dev.5)
Detalle en `AUDITORIA-NORMATIVA.md`.
- Nueva regla **art. 3 a) inicial**: acueductos, embalses o tranques y sifones del art. 294 del Código de Aguas (unidad m³/s).
- **Letra p)** con dos versiones: desde la Ley 21.202 incluye humedales urbanos declarados; sitio Ramsar deriva a revisión.
- **Ley 10 s)** con texto oficial cotejado (Ley 21.202; Dictamen CGR E157665N21); no exige declaración del MMA. Ya no queda pendiente de validación.
- a.5 glaciares se evalúa por localización en todo proyecto; e.8 incluye santuarios; g.1.3 pregunta por el IPT evaluado en proyectos fabriles; i.3 usa la capacidad de los proyectos de origen; o.9 (texto anterior) incluye tratamiento; q) incluye humedales.
- Motor: «No aplica» en una condición negativa queda indeterminado; en regiones fuera de los tramos (Ñuble) se concluye si todos los tramos coinciden.
- Art. 2 g): modificación de proyecto sin RCA evaluable; la tipología original excluida del g.1 deja g.2 en revisión; g.4 solo si alguna RCA proviene de un EIA.
- 110 pruebas superadas (11 nuevas).
