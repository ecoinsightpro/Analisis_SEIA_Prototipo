# Auditoría normativa de los motores (motor 0.6.0, catálogo dev.4) — 01-11-2026

Revisión regla por regla de `seia-engine.js` y `seia-catalog.js` contra Ley 19.300, D.S. 40/2012 (consolidado 2024), D.S. 17/2025, Código de Aguas y Ley 21.202. **Estado (motor 0.7.0, catálogo CAT-2026.11-dev.5): los 18 puntos resueltos. 112 pruebas superadas.**

## A. Errores normativos (pueden dar «no ingreso» indebido)
1. **Falta la primera tipología del art. 3 a)**: «Acueductos, embalses o tranques y sifones que deban someterse a la autorización del art. 294 del Código de Aguas». Art. 294 vigente: embalses > 50.000 m³ o muro > 5 m (en cauce; fuera de cauce > 150.000 m³ o > 7 m según la redacción modificada por Ley 21.770, de vigencia diferida); acueductos > 2 m³/s; acueductos > 0,5 m³/s a < 1 km del límite urbano con cota de fondo > 10 m sobre él; sifones y canoas que crucen cauces naturales. Fuentes: LeyChile idNorma 5605; Guía PAS 155 del SEA. Requiere nueva regla, unidad m³/s y dos versiones si la modificación de la Ley 21.770 ya rige.
2. **Letra p) incompleta**: la Ley 21.202 (art. 4 N.º 1) incorporó «humedales urbanos» a la letra p) del art. 10 de la Ley 19.300. La regla P solo considera área protegida y santuario. Agregar humedal urbano **declarado** por el MMA. Áreas de preservación ecológica de IPT también son áreas bajo protección oficial (Dictamen CGR E39766N20; Of. SEA 202099102647). Sitios Ramsar: derivar a revisión.
3. **a.5 glaciares depende de declarar la actividad «hid/glac»**: un proyecto minero con glaciar presente queda DESCARTADO. Debe evaluarse por localización (como p) y s)).
4. **e.8 caminos públicos** solo usa «área protegida»; omite santuarios y demás áreas del art. 8 RSEIA.
5. **g.1.3 loteos industriales**: la pregunta sobre IPT evaluado estratégicamente no se muestra en proyectos «fab», por lo que g.1.3 queda indeterminada sin forma de responder.
6. **«No aplica» en condiciones negativas** (`no(...)`): devuelve FALSO. Si el usuario marca «No aplica» en «¿IPT evaluado estratégicamente?», la letra g) entera queda descartada. Debe tratarse como indeterminado.

## B. Lógica de modificaciones (art. 2 g)
7. Un proyecto **sin RCA** (anterior al SEIA o nunca evaluado) que se modifica queda siempre en «información insuficiente» porque se exige la RCA. g.1 y g.2 aplican igual (g.2 cuenta desde la vigencia del SEIA).
8. Excepción g.1 del D.S. 17/2025: el texto excluye la tipología original **solo de g.1** y remite «al resto de los numerales». El motor también la excluye de g.2. Si la suma de partes no calificadas constituye la misma tipología, debe derivar a revisión.
9. g.4 se refiere a medidas para impactos **significativos**: solo procede si la RCA original proviene de un EIA. Falta registrar el instrumento (DIA/EIA) de cada RCA.

## C. Texto ya verificable
10. **Ley 10 s)**: texto oficial confirmado (Dictamen CGR E157665N21; Ley 21.202). Incluye «componentes bióticos, interacciones o flujos ecosistémicos», «vegetación azonal hídrica y ripariana», «cubierta vegetal de turberas», flora y fauna, «indistintamente de su superficie». No exige declaración del MMA (jurisprudencia CGR). Puede pasar de PENDIENTE_VALIDACION a TEXTO_OFICIAL_CONTRASTADO; vigencia desde 23-01-2020.
11. **Letra q)** fue reemplazada por la Ley 21.202 (agrega «humedales»). La regla Q usa la redacción reglamentaria; agregar humedales a la condición de proximidad.

## D. Mejoras de coherencia
12. **Ñuble en a.2.4**: hoy cualquier valor deriva a revisión. Si el valor no activa ningún tramo (p. ej. < 10 ha) o activa todos (≥ 30 ha), se puede concluir. No hay norma que asimile Ñuble a Biobío (Ley 21.033 no lo dispone; Ley 21.074 art. 9 solo cubre cambios de nombre).
13. **i.3**: si el proyecto no declara extracción minera, la dependencia de i.1 se lee como FALSO. Agregar «capacidad de extracción de los proyectos de origen».
14. **o.9 (texto previo al D.S. 17)**: incluía tratamiento; la versión 1 no lee la tasa de tratamiento.
15. **o.8 (D.S. 17)**: la eliminación usa el campo rotulado «capacidad de tratamiento». Renombrar a «tasa de ingreso».
16. **h.1** solo para «urb»: equipamiento turístico en zona saturada también es «proyecto inmobiliario» (h.1 incluye equipamiento).
17. **Fraccionamiento**: si no se responde, la regla queda DESCARTADA (contradice «dato faltante ≠ no aplica»). Decisión de producto pendiente.
18. **m.2, m.3, n (plantas)**: remiten a h.2 desde 2013 mientras l.1 y l.2 lo hacen desde el D.S. 63/2014. Verificar la fecha de la remisión.

## Verificado sin observaciones
Umbrales a.1, a.3, a.4, b, c, e.1–e.7, f, g.1.1, g.1.2, g.2, h.2, i.1 (incl. excepción D.S. 17), i.2, i.4, i.5, j, k.1 (excepción IPT), k.2, l, m.1, ñ, o.1–o.7, o.10, o.11, r, s, t; lógica trivalente, conversión de unidades, vigencias, proximidad al umbral, Motor B (art. 11, consulta indígena arts. 85–86) y exclusiones m.1 de los PAS 148, 149 y 151.

## Decisiones sobre los puntos 16–18
- **16 · h.1**: se aplica también a proyectos turísticos (g.2), porque h.1 comprende «proyectos destinados a equipamiento».
- **17 · Fraccionamiento**: el art. 11 bis es una prohibición sancionada por la SMA, no una causal de ingreso. En un proyecto nuevo, la falta de respuesta no bloquea la conclusión, pero genera una advertencia. En proyectos por etapas, con obras complementarias o modificaciones, la regla se evalúa y la falta de respuesta deja el análisis indeterminado.
- **18 · Remisión a h.2 o k.1**: en m.2, m.3 y plantas procesadoras se mantiene desde la vigencia del D.S. 40 y se documenta en cada regla. Solo afecta evaluaciones anteriores al 06-10-2014.
