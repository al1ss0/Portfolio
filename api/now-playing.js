// Função para quando o site for publicado (formato da Vercel: a pasta api/ vira /api/...).
// Configure LASTFM_API_KEY e LASTFM_USER nas variáveis de ambiente do serviço.
import { getNowPlaying } from '../server/lastfm.js';

export default async function handler(req, res) {
  const data = await getNowPlaying({
    apiKey: process.env.LASTFM_API_KEY,
    user: process.env.LASTFM_USER,
  });
  res.setHeader('Cache-Control', 's-maxage=20, stale-while-revalidate=60');
  res.status(200).json(data);
}
