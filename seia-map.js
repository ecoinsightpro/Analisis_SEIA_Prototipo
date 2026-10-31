// LiqenInsight SEIA — Selector de ubicación en mapa (Leaflet + OpenStreetMap) y conversión WGS84 ↔ UTM.
// <seia-map lat="-27.48" lon="-70.28" center="-27.4,-70.3" zoom="7"></seia-map>
// Emite el evento "seia-pick" (bubbles) con detail { lat, lon, utm: { zone, hemi, e, n } }.

const A = 6378137, F = 1 / 298.257223563, K0 = 0.9996, E2 = F * (2 - F), EP2 = E2 / (1 - E2);
const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;

export function zoneOf(lat, lon) { return Math.floor((lon + 180) / 6) + 1; }

export function toUTM(lat, lon, forceZone) {
  const zone = forceZone || zoneOf(lat, lon);
  const lon0 = rad((zone - 1) * 6 - 180 + 3), phi = rad(lat), lam = rad(lon);
  const N = A / Math.sqrt(1 - E2 * Math.sin(phi) ** 2), T = Math.tan(phi) ** 2, C = EP2 * Math.cos(phi) ** 2, Aa = Math.cos(phi) * (lam - lon0);
  const M = A * ((1 - E2 / 4 - 3 * E2 ** 2 / 64 - 5 * E2 ** 3 / 256) * phi - (3 * E2 / 8 + 3 * E2 ** 2 / 32 + 45 * E2 ** 3 / 1024) * Math.sin(2 * phi) + (15 * E2 ** 2 / 256 + 45 * E2 ** 3 / 1024) * Math.sin(4 * phi) - (35 * E2 ** 3 / 3072) * Math.sin(6 * phi));
  const e = K0 * N * (Aa + (1 - T + C) * Aa ** 3 / 6 + (5 - 18 * T + T ** 2 + 72 * C - 58 * EP2) * Aa ** 5 / 120) + 500000;
  let n = K0 * (M + N * Math.tan(phi) * (Aa ** 2 / 2 + (5 - T + 9 * C + 4 * C ** 2) * Aa ** 4 / 24 + (61 - 58 * T + T ** 2 + 600 * C - 330 * EP2) * Aa ** 6 / 720));
  const hemi = lat < 0 ? 'S' : 'N'; if (lat < 0) n += 10000000;
  return { zone, hemi, e: Math.round(e * 100) / 100, n: Math.round(n * 100) / 100 };
}

export function fromUTM(e, n, zone, hemi) {
  const x = e - 500000, y = hemi === 'S' ? n - 10000000 : n, lon0 = rad((zone - 1) * 6 - 180 + 3);
  const M = y / K0, mu = M / (A * (1 - E2 / 4 - 3 * E2 ** 2 / 64 - 5 * E2 ** 3 / 256)), e1 = (1 - Math.sqrt(1 - E2)) / (1 + Math.sqrt(1 - E2));
  const p1 = mu + (3 * e1 / 2 - 27 * e1 ** 3 / 32) * Math.sin(2 * mu) + (21 * e1 ** 2 / 16 - 55 * e1 ** 4 / 32) * Math.sin(4 * mu) + (151 * e1 ** 3 / 96) * Math.sin(6 * mu) + (1097 * e1 ** 4 / 512) * Math.sin(8 * mu);
  const N1 = A / Math.sqrt(1 - E2 * Math.sin(p1) ** 2), T1 = Math.tan(p1) ** 2, C1 = EP2 * Math.cos(p1) ** 2, R1 = A * (1 - E2) / (1 - E2 * Math.sin(p1) ** 2) ** 1.5, D = x / (N1 * K0);
  const lat = p1 - (N1 * Math.tan(p1) / R1) * (D ** 2 / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 ** 2 - 9 * EP2) * D ** 4 / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 ** 2 - 252 * EP2 - 3 * C1 ** 2) * D ** 6 / 720);
  const lon = lon0 + (D - (1 + 2 * T1 + C1) * D ** 3 / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 ** 2 + 8 * EP2 + 24 * T1 ** 2) * D ** 5 / 120) / Math.cos(p1);
  return { lat: Math.round(deg(lat) * 1e6) / 1e6, lon: Math.round(deg(lon) * 1e6) / 1e6 };
}

// Centros aproximados de cada región (solo para encuadrar el mapa).
export const REGION_CENTERS = { AP: [-18.5, -69.6, 8], TA: [-20.2, -69.3, 8], AN: [-23.6, -69.3, 7], AT: [-27.4, -70.0, 7], CO: [-30.5, -71.0, 7], VA: [-32.8, -71.0, 8], RM: [-33.5, -70.7, 9], OH: [-34.4, -71.0, 8], ML: [-35.5, -71.5, 8], NB: [-36.6, -72.0, 8], BI: [-37.4, -72.5, 8], AR: [-38.7, -72.5, 8], LR: [-40.0, -72.6, 8], LL: [-41.9, -72.8, 7], AY: [-46.4, -72.6, 6], MA: [-52.5, -71.5, 6] };

if (typeof window !== 'undefined') window.SeiaGeo = { toUTM, fromUTM, zoneOf, REGION_CENTERS };

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (window.__leafletP) return window.__leafletP;
  const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
  window.__leafletP = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; s.onload = () => res(window.L); s.onerror = () => rej(new Error('No se pudo cargar el mapa')); document.head.appendChild(s); });
  return window.__leafletP;
}

if (typeof customElements !== 'undefined' && !customElements.get('seia-map')) {
  customElements.define('seia-map', class extends HTMLElement {
    static get observedAttributes() { return ['lat', 'lon', 'center', 'place']; }
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.style.display = 'block'; this.style.position = 'relative';
      this.innerHTML = '<div data-m style="position:absolute;inset:0;background:#E9E8E3"></div><div data-msg style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:13px system-ui;color:#55616A">Cargando mapa…</div>';
      loadLeaflet().then(L => {
        this.querySelector('[data-msg]').remove();
        const box = this.querySelector('[data-m]');
        const m = this._map = L.map(box, { zoomControl: true, attributionControl: true }).setView([-33.45, -70.66], 5);
        const base = {
          'Calles': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri' }),
          'Topográfico': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri' }),
          'Satélite': L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, attribution: 'Tiles © Esri — Maxar, Earthstar Geographics' })
        };
        base['Topográfico'].addTo(m);
        L.control.layers(base, null, { position: 'topright' }).addTo(m);
        L.control.scale({ imperial: false }).addTo(m);
        m.on('click', ev => this.pick(ev.latlng.lat, ev.latlng.lng));
        this.sync(true);
        this.goPlace();
        setTimeout(() => m.invalidateSize(), 50);
      }).catch(err => { const msg = this.querySelector('[data-msg]'); if (msg) msg.textContent = err.message + '. Ingrese las coordenadas manualmente.'; });
    }
    attributeChangedCallback(name) { if (!this._map) return; if (name === 'place') this.goPlace(); else this.sync(false); }
    // Encuadra la comuna usando el geocodificador de Esri (sin clave). Resultado en caché local.
    goPlace() {
      const place = this.getAttribute('place') || '';
      if (!place || place === this._lastPlace) return; this._lastPlace = place;
      const key = 'seia-geo-' + place; let cached = null;
      try { cached = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
      const fit = ext => {
        if (!ext || this._lastPlace !== place) return;
        const b = window.L.latLngBounds([ext.ymin, ext.xmin], [ext.ymax, ext.xmax]);
        if (this._mk && b.contains(this._mk.getLatLng())) return;
        this._map.flyToBounds(b, { maxZoom: 12, duration: 0.6 });
      };
      if (cached) return fit(cached);
      const url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&maxLocations=1&countryCode=CHL&category=City,Subregion,Region&outFields=Type&SingleLine=' + encodeURIComponent(place);
      fetch(url).then(r => r.json()).then(j => { const c = (j.candidates || [])[0]; if (!c) return; const ext = c.extent || { xmin: c.location.x - 0.15, xmax: c.location.x + 0.15, ymin: c.location.y - 0.15, ymax: c.location.y + 0.15 }; try { localStorage.setItem(key, JSON.stringify(ext)); } catch (e) {} fit(ext); }).catch(() => {});
    }
    pick(lat, lon) {
      lat = Math.round(lat * 1e6) / 1e6; lon = Math.round(lon * 1e6) / 1e6;
      this.placeMarker(lat, lon);
      this.dispatchEvent(new CustomEvent('seia-pick', { bubbles: true, composed: true, detail: { lat, lon, utm: toUTM(lat, lon) } }));
    }
    placeMarker(lat, lon) {
      const L = window.L;
      if (!this._mk) { this._mk = L.marker([lat, lon], { draggable: true }).addTo(this._map); this._mk.on('dragend', () => { const p = this._mk.getLatLng(); this.pick(p.lat, p.lng); }); }
      else this._mk.setLatLng([lat, lon]);
    }
    sync(first) {
      const lat = parseFloat(this.getAttribute('lat')), lon = parseFloat(this.getAttribute('lon'));
      if (Number.isFinite(lat) && Number.isFinite(lon)) { this.placeMarker(lat, lon); if (first || !this._map.getBounds().contains([lat, lon])) this._map.setView([lat, lon], Math.max(this._map.getZoom(), 12)); return; }
      const c = (this.getAttribute('center') || '').split(',').map(Number);
      if (c.length >= 2 && c.every(Number.isFinite) && this.getAttribute('center') !== this._lastC) { this._lastC = this.getAttribute('center'); this._map.setView([c[0], c[1]], c[2] || 7); }
    }
  });
}
