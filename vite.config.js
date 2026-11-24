import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getNowPlaying } from './server/lastfm.js';
import { visits } from './server/visits.js';

const json = (res, data) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};

// Em desenvolvimento, o próprio Vite responde as rotas /api/...
// lendo as chaves do arquivo .env.local (que não vai para o git).
function devApi(env) {
  return {
    name: 'dev-api',
    configureServer(server) {
      server.middlewares.use('/api/now-playing', async (req, res) => {
        json(res, await getNowPlaying({
          apiKey: env.LASTFM_API_KEY,
          user: env.LASTFM_USER,
          mock: env.LASTFM_MOCK,
        }));
      });
      server.middlewares.use('/api/visits', async (req, res) => {
        try {
          json(res, await visits(env, req.method === 'POST'));
        } catch (err) {
          json(res, { count: null });
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['LASTFM_', 'KV_', 'UPSTASH_']);
  return {
    plugins: [react(), devApi(env)],
  };
});
