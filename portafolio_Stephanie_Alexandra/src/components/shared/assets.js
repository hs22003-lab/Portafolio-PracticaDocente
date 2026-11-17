import { useEffect, useState } from 'react';

/* =====================================================================
   DISPONIBILIDAD DE ARCHIVOS PÚBLICOS (/public/docs, /public/img)
   Verifica con una petición HEAD si un archivo existe antes de enlazarlo.
   Un servidor con "SPA fallback" devuelve index.html (text/html) para rutas
   inexistentes: esa respuesta se considera "no disponible".
   (módulo sin componentes)
   ===================================================================== */

const cache = new Map();

/** Codifica la ruta pública (tildes, eñes y espacios) para usarla en href/src. */
export const assetUrl = (path) => encodeURI(path);

/** Devuelve una promesa { ok, size } cacheada por ruta. */
export function probeAsset(path) {
  if (!cache.has(path)) {
    const request = fetch(assetUrl(path), { method: 'HEAD' })
      .then((res) => {
        // Servidores sin soporte de HEAD: se asume disponible.
        if (res.status === 405 || res.status === 501) return { ok: true, size: null };
        const type = (res.headers.get('content-type') || '').toLowerCase();
        const ok = res.ok && !type.includes('text/html');
        const len = Number(res.headers.get('content-length'));
        return { ok, size: ok && Number.isFinite(len) && len > 0 ? len : null };
      })
      .catch(() => ({ ok: false, size: null }));
    cache.set(path, request);
  }
  return cache.get(path);
}

/** Verifica un conjunto de rutas. Devuelve { [ruta]: { ok, size } } (rutas sin resolver aún no aparecen). */
export function useAssetMap(paths) {
  const key = paths.filter(Boolean).join('\n');
  const [map, setMap] = useState({});

  useEffect(() => {
    let alive = true;
    const list = key ? key.split('\n') : [];
    Promise.all(list.map((p) => probeAsset(p).then((r) => [p, r]))).then((entries) => {
      if (alive) setMap((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
    });
    return () => {
      alive = false;
    };
  }, [key]);

  return map;
}

/**
 * Elige la primera ruta candidata disponible.
 * state: 'checking' | 'ok' | 'missing'
 */
export function pickAsset(candidates, map) {
  const list = [].concat(candidates || []).filter(Boolean);
  for (const path of list) {
    const r = map[path];
    if (!r) return { state: 'checking', url: null, size: null, path: null };
    if (r.ok) return { state: 'ok', url: assetUrl(path), size: r.size, path };
  }
  return { state: 'missing', url: null, size: null, path: null };
}

/** Resuelve un único documento con rutas candidatas. */
export function useAsset(candidates) {
  const list = [].concat(candidates || []).filter(Boolean);
  const map = useAssetMap(list);
  return pickAsset(list, map);
}

/** Resuelve varios documentos a la vez: { id: candidatos } → { id: resultado }. */
export function useAssets(registry) {
  const all = Object.values(registry).flatMap((c) => [].concat(c || []));
  const map = useAssetMap(all);
  return Object.fromEntries(Object.entries(registry).map(([id, c]) => [id, pickAsset(c, map)]));
}

/** 1536000 → "1.5 MB" */
export const formatBytes = (bytes) => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};
