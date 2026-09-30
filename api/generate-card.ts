/**
 * POST /api/generate-card
 * Generator gambar kartu memakai OpenAI gpt-image-2.
 *
 * - Tanpa foto wajah  -> POST /v1/images/generations
 * - Dengan foto wajah -> POST /v1/images/edits (foto dipakai sebagai referensi identitas)
 *
 * Catatan gpt-image-2: JANGAN kirim `input_fidelity` (selalu high otomatis)
 * dan JANGAN kirim `response_format` (selalu base64).
 */

const OPENAI_BASE = 'https://api.openai.com/v1';
const IMAGE_MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-2';

const VALID_QUALITY = ['low', 'medium', 'high'] as const;
type Quality = (typeof VALID_QUALITY)[number];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

/** Ubah data URL base64 menjadi Blob agar bisa dikirim sebagai file multipart. */
function dataUrlToBlob(dataUrl: string): Blob | null {
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  const mime = match[1];
  const bytes = Buffer.from(match[2], 'base64');
  return new Blob([bytes], { type: mime });
}

function extFromMime(mime: string): string {
  if (mime.includes('png')) return 'png';
  if (mime.includes('webp')) return 'webp';
  return 'jpg';
}

/**
 * Arahan pose acak (dipilih server tiap generate). Wajah selalu tetap terlihat jelas
 * (tanpa profil penuh) supaya identitas tidak hilang.
 */
const POSES = [
  'three-quarter view, head turned about 30 degrees toward the viewer\'s left, shoulders angled, eyes looking back at the camera',
  'three-quarter view, head turned about 30 degrees toward the viewer\'s right, shoulders angled, eyes looking back at the camera',
  'head tilted slightly to one side with the chin lowered, intense gaze looking up toward the camera, shoulders turned',
  'low-angle heroic shot, chin slightly raised, head turned a little to the left, confident commanding look',
  'looking over one shoulder toward the camera, head turned about 35 degrees, one hand raised casting a spell near the shoulder',
  'dynamic three-quarter view leaning slightly toward the camera, head turned to the right with a subtle head tilt, fierce focused eyes',
];

function pickPose(): string {
  return POSES[Math.floor(Math.random() * POSES.length)];
}

function friendlyOpenAIError(status: number, payload: any) {
  const raw: string = payload?.error?.message || `OpenAI mengembalikan status ${status}.`;
  const code: string = payload?.error?.code || '';
  let hint: string | undefined;

  if (status === 401) {
    hint = 'OPENAI_API_KEY salah atau belum diisi di Vercel (Settings > Environment Variables).';
  } else if (status === 403 || /verif/i.test(raw)) {
    hint =
      'Model gpt-image-2 butuh Organization Verification. Verifikasi organisasi di platform.openai.com > Settings > Organization > General.';
  } else if (status === 429) {
    hint = 'Kuota / rate limit OpenAI tercapai. Cek saldo billing atau coba lagi beberapa saat.';
  } else if (code === 'moderation_blocked' || /safety|moderation/i.test(raw)) {
    hint = 'Permintaan ditolak filter keamanan OpenAI. Coba ganti foto atau ubah deskripsi kartu.';
  } else if (status === 400) {
    hint = 'Parameter permintaan ditolak oleh OpenAI. Periksa deskripsi kartu dan foto yang diunggah.';
  }
  return { error: raw, hint, status };
}

export async function POST(request: Request): Promise<Response> {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body permintaan tidak valid (bukan JSON, atau terlalu besar).' }, 400);
  }

  const { prompt, image, aspectRatio = '1:1' } = body ?? {};
  const freePose = body?.poseMode !== 'front';
  const quality: Quality = VALID_QUALITY.includes(body?.quality) ? body.quality : 'medium';

  if (!prompt || typeof prompt !== 'string') {
    return json({ error: 'Prompt wajib diisi.' }, 400);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return json(
      {
        error: 'OPENAI_API_KEY belum dikonfigurasi di server.',
        hint: 'Tambahkan OPENAI_API_KEY di Vercel > Project > Settings > Environment Variables, lalu Redeploy.',
      },
      500,
    );
  }

  // 2:3 (kartu penuh) -> portrait, selain itu -> persegi (artwork).
  const size = aspectRatio === '2:3' ? '1024x1536' : '1024x1024';
  const hasPortrait = typeof image === 'string' && image.startsWith('data:');

  let finalPrompt: string = prompt;
  if (hasPortrait) {
    const pose = pickPose();
    finalPrompt = `[INPUT IMAGE 1: FACIAL IDENTITY REFERENCE PHOTO${freePose ? ' - IDENTITY ONLY' : ''}]
CRITICAL MANDATE: Lock the identity of the face in this attached reference photo with 100% precision. The face MUST be rendered as an authentic, photorealistic human photograph with natural skin pores, natural eyes, and exact facial likeness. ABSOLUTELY NO 3D / CGI, NO CARTOON, NO ANIME.
${
  freePose
    ? `
USE THE PHOTO FOR IDENTITY ONLY (facial features, bone structure, eyes, nose, lips, skin tone, age). Do NOT copy its head angle, gaze direction, expression, body pose, framing, crop, lighting, background or clothing. Re-pose the SAME person in a new dynamic angle. The face must stay fully visible and instantly recognizable (no full profile, no hidden face).
`
    : ''
}
${prompt}
${freePose ? `\nPOSE DIRECTIVE (overrides any pose wording above and must NOT match the reference photo's pose): ${pose}.` : ''}`;
  }

  try {
    let upstream: Response;

    if (hasPortrait) {
      const blob = dataUrlToBlob(image);
      if (!blob) return json({ error: 'Format foto tidak valid. Gunakan JPG, PNG, atau WEBP.' }, 400);

      const form = new FormData();
      form.append('model', IMAGE_MODEL);
      form.append('prompt', finalPrompt);
      form.append('size', size);
      form.append('quality', quality);
      form.append('n', '1');
      // JPEG jauh lebih kecil dari PNG -> aman dari batas response 4,5 MB milik Vercel.
      form.append('output_format', 'jpeg');
      form.append('output_compression', '90');
      form.append('image[]', blob, `portrait.${extFromMime(blob.type)}`);

      upstream = await fetch(`${OPENAI_BASE}/images/edits`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });
    } else {
      upstream = await fetch(`${OPENAI_BASE}/images/generations`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: IMAGE_MODEL,
          prompt: finalPrompt,
          size,
          quality,
          n: 1,
          output_format: 'jpeg',
          output_compression: 90,
        }),
      });
    }

    const payload: any = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      const { error, hint, status } = friendlyOpenAIError(upstream.status, payload);
      console.error('OpenAI image error:', status, payload?.error);
      return json({ error, hint }, status >= 400 && status < 600 ? status : 500);
    }

    const b64: string | undefined = payload?.data?.[0]?.b64_json;
    if (!b64) {
      return json({ error: 'Model tidak mengembalikan gambar. Coba generate ulang.' }, 502);
    }

    return json({
      success: true,
      imageUrl: `data:image/jpeg;base64,${b64}`,
      model: IMAGE_MODEL,
      quality,
      size,
    });
  } catch (err: any) {
    console.error('Error generating card image:', err);
    return json({ error: err?.message || 'Gagal menghasilkan gambar kartu.' }, 500);
  }
}