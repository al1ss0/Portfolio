// Contador de visitas do "site status" (versão mobile).
// Guarda o número num Redis da Upstash, que a Vercel cria em Storage → Upstash (Redis).
// A integração preenche KV_REST_API_URL e KV_REST_API_TOKEN (ou UPSTASH_REDIS_REST_URL/TOKEN).
// Sem essas variáveis (por exemplo, rodando no PC), conta só na memória enquanto o servidor estiver ligado.

const KEY = 'portfolio:visits';
let memory = 0;

function redisConfig(env) {
  const url = env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL;
  const token = env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ''), token } : null;
}

// add = true soma uma visita; false só lê o número atual
export async function visits(env, add) {
  const redis = redisConfig(env);
  if (!redis) {
    if (add) memory += 1;
    return { count: memory, persisted: false };
  }
  const res = await fetch(`${redis.url}/${add ? 'incr' : 'get'}/${encodeURIComponent(KEY)}`, {
    headers: { Authorization: `Bearer ${redis.token}` },
  });
  if (!res.ok) throw new Error(`Redis respondeu ${res.status}`);
  const { result } = await res.json();
  return { count: Number(result) || 0, persisted: true };
}
