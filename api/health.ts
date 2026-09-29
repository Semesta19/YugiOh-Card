/** GET /api/health : cek cepat apakah API key sudah terpasang di server. */
export function GET(): Response {
  return new Response(
    JSON.stringify({
      status: 'ok',
      hasApiKey: !!process.env.OPENAI_API_KEY,
      imageModel: process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2',
      timestamp: new Date().toISOString(),
    }),
    { headers: { 'Content-Type': 'application/json' } },
  );
}