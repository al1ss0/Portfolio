import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getNowPlaying } from './server/lastfm.js';

// Em desenvolvimento, o próprio Vite responde /api/now-playing,
// lendo a chave do Last.fm do arquivo .env.local (que não vai para o git).
function nowPlayingApi(env) {
  return {
    name: 'now-playing-api',
    configureServer(server) {
      server.middlewares.use('/api/now-playing', async (req, res) => {
        const data = await getNowPlaying({
          apiKey: env.LASTFM_API_KEY,
          user: env.LASTFM_USER,
          mock: env.LASTFM_MOCK,
        });
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(data));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'LASTFM_');
  return {
    plugins: [react(), nowPlayingApi(env)],
  };
});
