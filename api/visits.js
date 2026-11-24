// Vercel: GET /api/visits lê o contador, POST /api/visits soma uma visita.
import { visits } from '../server/visits.js';

export default async function handler(req, res) {
  try {
    const data = await visits(process.env, req.method === 'POST');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json(data);
  } catch (err) {
    console.warn('[visits]', err.message);
    res.status(200).json({ count: null });
  }
}
