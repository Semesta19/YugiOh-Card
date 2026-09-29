/**
 * Server LOKAL untuk development saja (npm run dev).
 * Di Vercel file ini TIDAK dipakai; Vercel menjalankan folder /api sebagai Serverless Functions.
 * Handler yang sama dipakai di sini supaya perilaku lokal = produksi.
 */
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { POST as generateCard } from './api/generate-card.ts';
import { POST as generateDna } from './api/generate-dna.ts';
import { GET as health } from './api/health.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

function adapt(handler: (req: globalThis.Request) => globalThis.Response | Promise<globalThis.Response>) {
  return async (req: Request, res: Response) => {
    try {
      const webReq = new globalThis.Request(`http://localhost:${PORT}${req.originalUrl}`, {
        method: req.method,
        headers: { 'Content-Type': 'application/json' },
        body: req.method === 'GET' ? undefined : JSON.stringify(req.body ?? {}),
      });
      const webRes = await handler(webReq);
      res.status(webRes.status);
      webRes.headers.forEach((value, key) => res.setHeader(key, value));
      res.send(Buffer.from(await webRes.arrayBuffer()));
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err?.message || 'Server error' });
    }
  };
}

app.get('/api/health', adapt(health));
app.post('/api/generate-card', adapt(generateCard));
app.post('/api/generate-dna', adapt(generateDna));

async function startServer() {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dev server: http://localhost:${PORT}`);
  });
}

startServer();