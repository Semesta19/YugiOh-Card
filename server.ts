import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Generous payload limit for high-resolution base64 portrait photos
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// API: Generate Card Image using Nano Banana Pro (gemini-3-pro-image)
app.post('/api/generate-card', async (req: Request, res: Response) => {
  try {
    const { prompt, image, model = 'gemini-3-pro-image', imageSize = '1K', aspectRatio = '1:1' } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Prompt is required.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in Settings > Secrets.',
      });
      return;
    }

    // Supported image models:
    // Nano Banana Pro: 'gemini-3-pro-image'
    // Nano Banana 2: 'gemini-3.1-flash-image'
    // Nano Banana Lite: 'gemini-3.1-flash-lite-image'
    const validModels = ['gemini-3-pro-image', 'gemini-3.1-flash-image', 'gemini-3.1-flash-lite-image'];
    const selectedModel = validModels.includes(model) ? model : 'gemini-3-pro-image';

    const parts: any[] = [];

    // If user provided a portrait photo (base64 data URL)
    if (image && typeof image === 'string') {
      const match = image.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        const mimeType = match[1];
        const base64Data = match[2];
        parts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
      }
    }

    let finalPrompt = prompt;
    if (image && typeof image === 'string') {
      finalPrompt = `[INPUT IMAGE 1: FACIAL IDENTITY REFERENCE PHOTO]
CRITICAL MANDATE: Lock the identity of the face in this attached reference photo with 100% precision. The face MUST be rendered as an authentic, photorealistic human photograph with natural skin pores, natural eyes, and exact facial likeness. ABSOLUTELY NO 3D / CGI, NO CARTOON, NO ANIME.

${prompt}`;
    }

    // Append prompt instructions
    parts.push({
      text: finalPrompt,
    });

    // Generate with Gemini image model
    const config: any = {
      imageConfig: {
        aspectRatio: aspectRatio === '2:3' ? '2:3' : '1:1',
      },
    };

    if (selectedModel !== 'gemini-3.1-flash-lite-image') {
      config.imageConfig.imageSize = imageSize === '2K' ? '2K' : '1K';
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: {
        parts,
      },
      config,
    });

    let generatedImageUrl = '';
    let responseText = '';

    const candidate = response.candidates?.[0];
    if (candidate?.content?.parts) {
      for (const part of candidate.content.parts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType || 'image/png';
          generatedImageUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          responseText += part.text;
        }
      }
    }

    if (!generatedImageUrl) {
      // Check if candidate had any finish reason
      const finishReason = candidate?.finishReason || 'NO_IMAGE_RETURNED';
      res.status(500).json({
        error: `Model did not return an image part (Finish reason: ${finishReason}). ${responseText || ''}`,
      });
      return;
    }

    res.json({
      success: true,
      imageUrl: generatedImageUrl,
      model: selectedModel,
      textNotes: responseText,
    });
  } catch (error: any) {
    console.error('Error generating card image:', error);
    const errorMessage = error?.message || 'Failed to generate card image.';
    const isPaidKeyError = /billing|paid|quota|permission|unauthorized|tier/i.test(errorMessage);

    res.status(500).json({
      error: errorMessage,
      isPaidKeyError,
      hint: isPaidKeyError
        ? 'Nano Banana Pro requires an active API key with access to image generation. You can also try selecting Nano Banana 2 or verify your API key.'
        : undefined,
    });
  }
});

// API: Generate thematic Yu-Gi-Oh! Card DNA for custom typed characters
app.post('/api/generate-dna', async (req: Request, res: Response) => {
  try {
    const characterName = req.body.characterName || req.body.pokemonName;

    if (!characterName || typeof characterName !== 'string') {
      res.status(400).json({ error: 'Character name is required.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
      return;
    }

    const prompt = `You are a master Kazuki Takahashi-style Japanese Yu-Gi-Oh! trading card game designer and lore architect.
Analyze the monster or character: "${characterName}".
Generate authentic, high-end Yu-Gi-Oh! card data and transformation DNA for creating a human-transformed collectible card in the style of Secret Rare / Ghost Rare TCG cards.

Return a JSON object conforming strictly to this structure:
{
  "name": "${characterName}",
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
  "costume": "highly detailed human fantasy armor / sorcerer robes / battle coat inspired by ${characterName} motifs to frame the human face",
  "hairstyle": "modern dynamic anime hairstyle matching ${characterName}'s aesthetic and colors",
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
}`;

    let parsedJson: any = null;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    for (const m of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: m,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });
        if (response.text) {
          parsedJson = JSON.parse(response.text.trim());
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${m} failed for DNA generation, trying next...`, err?.message);
      }
    }

    if (!parsedJson || !parsedJson.name) {
      const { createDefaultYugiohCardForName } = await import('./src/data/yugiohCards.ts');
      const fallbackCard = createDefaultYugiohCardForName(characterName);
      res.json({ success: true, dna: fallbackCard, source: 'smart-generator' });
      return;
    }

    const cardWithId = {
      ...parsedJson,
      id: parsedJson.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    };

    res.json({ success: true, dna: cardWithId, source: 'ai' });
  } catch (error: any) {
    console.error('Error generating Yu-Gi-Oh Card DNA:', error);
    try {
      const { createDefaultYugiohCardForName } = await import('./src/data/yugiohCards.ts');
      const fallbackCard = createDefaultYugiohCardForName(req.body.characterName || req.body.pokemonName || 'Custom');
      res.json({ success: true, dna: fallbackCard, source: 'fallback' });
    } catch {
      res.status(500).json({ error: error?.message || 'Failed to generate card data.' });
    }
  }
});

// Configure Vite middleware in development or static serve in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
