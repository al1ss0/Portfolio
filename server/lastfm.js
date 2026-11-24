// Busca no Last.fm a música que está tocando agora (ou a última que tocou).
// Roda só no servidor: a chave da API nunca vai para o navegador.
// Usado pelo Vite em desenvolvimento (vite.config.js) e pela função api/now-playing.js quando publicar.

const CACHE_MS = 20_000; // o Last.fm pede para não chamar a API toda hora
let cache = { at: 0, data: null };

export async function getNowPlaying({ apiKey, user, mock } = {}) {
  if (mock === 'playing' || mock === 'recent') {
    return { status: mock, track: 'Nome da Música', artist: 'Artista', url: 'https://www.last.fm' };
  }
  if (!apiKey || !user) return { status: 'off' };
  if (cache.data && Date.now() - cache.at < CACHE_MS) return cache.data;

  const params = new URLSearchParams({
    method: 'user.getrecenttracks',
    user,
    api_key: apiKey,
    format: 'json',
    limit: '1',
  });

  try {
    const res = await fetch(`https://ws.audioscrobbler.com/2.0/?${params}`, {
      headers: { 'User-Agent': 'portfolio-now-playing/1.0' },
    });
    if (!res.ok) throw new Error(`Last.fm respondeu ${res.status}`);
    const json = await res.json();
    const item = [].concat(json?.recenttracks?.track ?? [])[0];

    const data = item
      ? {
          status: item['@attr']?.nowplaying === 'true' ? 'playing' : 'recent',
          track: item.name,
          artist: item.artist?.['#text'] ?? item.artist?.name ?? '',
          url: item.url,
          // capa do álbum (o Last.fm manda vários tamanhos; vazio quando não tem)
          image: [].concat(item.image ?? []).map((i) => i['#text']).filter(Boolean).pop() ?? '',
        }
      : { status: 'none' };

    cache = { at: Date.now(), data };
    return data;
  } catch (err) {
    console.warn('[now-playing]', err.message);
    // se a API falhar, devolve o último resultado bom (ou nada)
    return cache.data ?? { status: 'off' };
  }
}
