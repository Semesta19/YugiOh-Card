/**
 * POST /api/generate-dna
 * Membuat "DNA" kartu Yu-Gi-Oh! (data stat + deskripsi visual) untuk karakter kustom
 * memakai OpenAI (JSON mode). Jika gagal / tidak ada API key, client otomatis
 * memakai generator lokal (createDefaultYugiohCardForName), jadi fitur tetap jalan.
 */

const OPENAI_BASE = 'https://api.openai.com/v1';
const TEXT_MODEL = process.env.OPENAI_TEXT_MODEL || 'gpt-4.1-mini';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request): Promise<Response> {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Body permintaan tidak valid.' }, 400);
  }

  const characterName: unknown = body?.characterName || body?.pokemonName;
  if (!characterName || typeof characterName !== 'string') {
    return json({ error: 'Nama karakter wajib diisi.' }, 400);
  }
  const safeName = characterName.trim().slice(0, 80);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Client akan memakai generator lokal.
    return json({ success: false, useFallback: true, error: 'OPENAI_API_KEY belum dikonfigurasi.' });
  }

  const prompt = `You are a master Kazuki Takahashi-style Japanese Yu-Gi-Oh! trading card game designer and lore architect.
Analyze the monster or character: "${safeName}".
Generate authentic, high-end Yu-Gi-Oh! card data and transformation DNA for creating a human-transformed collectible card in the style of Secret Rare / Ghost Rare TCG cards.

Return a JSON object conforming strictly to this structure:
{
  "name": "${safeName}",
  "characterTitle": "e.g. Legendary Dragon of Annihilation, Supreme Spellcaster of Arcane Might",
  "attribute": "One of: DARK, LIGHT, EARTH, WATER, FIRE, WIND, DIVINE",
  "cardType": "One of: Normal, Effect, Ritual, Fusion, Synchro, Xyz, Egyptian God",
  "monsterType": "One of: Dragon, Spellcaster, Fiend, Warrior, Machine, Zombie, Fairy, Beast, Beast-Warrior, Winged Beast, Reptile, Fish, Sea Serpent, Aqua, Pyro, Thunder, Rock, Plant, Insect, Psychic, Cyberse, Wyrm, Divine-Beast",
  "level": integer (between 1 and 12),
  "atk": "numeric string (e.g. 2500, 3000, 4000, or ?)",
  "def": "numeric string (e.g. 2100, 2500, 4000, or ?)",
  "cardPasscode": "8-digit string e.g. 89631139",
  "cardSetCode": "e.g. TCG-EN001",
  "edition": "1st Edition",
  "rarity": "Secret Rare",
  "palette": "detailed color palette with primary and metallic foil shades",
  "costume": "highly detailed human fantasy armor / sorcerer robes / battle coat inspired by ${safeName} motifs to frame the human face",
  "hairstyle": "modern dynamic anime hairstyle matching ${safeName}'s aesthetic and colors",
  "energyEffects": "signature magical effects, plasma vortex, glowing runes, or elemental aura",
  "environment": "epic atmospheric TCG battle background setting",
  "visualMotifs": "specific iconic motifs, symbols, and artistic details",
  "holographicPattern": "Secret Rare prismatic rainbow diffraction foil, holographic reflections on armor edges and attribute icon",
  "effectText": "[Type / Effect]\\nSummoning condition and abilities text in authentic Yu-Gi-Oh! TCG wording.",
  "abilities": [
    "Signature Ability 1: TCG mechanics text",
    "Signature Ability 2: Once per turn effect text",
    "Special Protection or ATK boost ability"
  ],
  "flavorText": "1-2 sentences of legendary collectible lore.",
  "illustrator": "Studio Dice / Kazuki Takahashi"
}
Respond with the JSON object only.`;

  try {
    const upstream = await fetch(`${OPENAI_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
    });

    const payload: any = await upstream.json().catch(() => null);
    if (!upstream.ok) {
      console.warn('OpenAI DNA error:', upstream.status, payload?.error?.message);
      return json({ success: false, useFallback: true, error: payload?.error?.message || 'Gagal meracik data kartu.' });
    }

    const text: string | undefined = payload?.choices?.[0]?.message?.content;
    const parsed = text ? JSON.parse(text) : null;
    if (!parsed || !parsed.name) {
      return json({ success: false, useFallback: true, error: 'Respons AI tidak valid.' });
    }

    return json({
      success: true,
      source: 'ai',
      dna: {
        ...parsed,
        id: String(parsed.name).toLowerCase().replace(/[^a-z0-9]/g, '-'),
      },
    });
  } catch (err: any) {
    console.warn('DNA generation failed:', err?.message);
    return json({ success: false, useFallback: true, error: err?.message || 'Gagal meracik data kartu.' });
  }
}