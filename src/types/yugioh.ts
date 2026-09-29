export type YugiohAttribute = 
  | 'DARK' 
  | 'LIGHT' 
  | 'EARTH' 
  | 'WATER' 
  | 'FIRE' 
  | 'WIND' 
  | 'DIVINE';

export const ATTRIBUTE_CONFIG: Record<YugiohAttribute, { symbol: string; kanji: string; bg: string; text: string; glow: string }> = {
  DARK: { symbol: 'DARK', kanji: '闇', bg: 'from-purple-900 via-slate-900 to-indigo-950', text: 'text-purple-300', glow: 'rgba(168, 85, 247, 0.6)' },
  LIGHT: { symbol: 'LIGHT', kanji: '光', bg: 'from-amber-200 via-yellow-400 to-amber-500', text: 'text-amber-950', glow: 'rgba(251, 191, 36, 0.7)' },
  EARTH: { symbol: 'EARTH', kanji: '地', bg: 'from-amber-800 via-yellow-900 to-stone-900', text: 'text-amber-200', glow: 'rgba(217, 119, 6, 0.6)' },
  WATER: { symbol: 'WATER', kanji: '水', bg: 'from-sky-500 via-blue-600 to-cyan-700', text: 'text-sky-100', glow: 'rgba(56, 189, 248, 0.7)' },
  FIRE: { symbol: 'FIRE', kanji: '炎', bg: 'from-red-600 via-orange-600 to-amber-700', text: 'text-amber-100', glow: 'rgba(239, 68, 68, 0.7)' },
  WIND: { symbol: 'WIND', kanji: '風', bg: 'from-emerald-500 via-teal-600 to-cyan-700', text: 'text-emerald-100', glow: 'rgba(16, 185, 129, 0.7)' },
  DIVINE: { symbol: 'DIVINE', kanji: '神', bg: 'from-amber-400 via-yellow-500 to-red-600', text: 'text-yellow-100', glow: 'rgba(245, 158, 11, 0.9)' },
};

export type YugiohCardType = 
  | 'Normal'
  | 'Effect'
  | 'Ritual'
  | 'Fusion'
  | 'Synchro'
  | 'Xyz'
  | 'Link'
  | 'Egyptian God';

export type YugiohMonsterType =
  | 'Dragon'
  | 'Spellcaster'
  | 'Fiend'
  | 'Warrior'
  | 'Machine'
  | 'Zombie'
  | 'Fairy'
  | 'Beast'
  | 'Beast-Warrior'
  | 'Winged Beast'
  | 'Reptile'
  | 'Fish'
  | 'Sea Serpent'
  | 'Aqua'
  | 'Pyro'
  | 'Thunder'
  | 'Rock'
  | 'Plant'
  | 'Insect'
  | 'Psychic'
  | 'Cyberse'
  | 'Wyrm'
  | 'Divine-Beast';

export type YugiohRarity = 
  | 'Secret Rare'
  | 'Prismatic Secret Rare'
  | 'Ghost Rare'
  | 'Ultra Rare'
  | 'Super Rare'
  | 'Rare'
  | 'Ultimate Rare'
  | 'Starlight Rare'
  | 'Collector\'s Rare';

export interface YugiohCardDna {
  id: string;
  name: string;
  japaneseName?: string;
  characterTitle: string;
  attribute: YugiohAttribute;
  cardType: YugiohCardType;
  monsterType: YugiohMonsterType;
  secondaryType?: string; // e.g. "Effect", "Tuner", "Toon", "Spirit"
  level: number; // 1 to 12
  isRank?: boolean; // For Xyz monsters
  atk: string; // e.g. "3000" or "?"
  def: string; // e.g. "2500" or "?"
  cardPasscode: string; // 8-digit passcode e.g. "89631139"
  cardSetCode: string; // e.g. "LOB-001"
  edition: string; // "1st Edition" or "LIMITED EDITION"
  rarity: YugiohRarity;
  palette: string;
  costume: string;
  hairstyle: string;
  energyEffects: string;
  environment: string;
  visualMotifs: string;
  holographicPattern: string;
  effectText: string;
  abilities: string[];
  summoningCondition?: string;
  flavorText?: string;
  illustrator: string;
}

export interface YugiohGenerationSettings {
  model: 'gemini-3-pro-image' | 'gemini-3.1-flash-image' | 'gemini-3.1-flash-lite-image';
  facePriorityPercent: number; // default 33%
  aspectRatio: '2:3' | '63x88';
  resolution: '1K' | '2K';
  customCardName?: string; // e.g. "Aziz" or character name
  japaneseName?: string; // Japanese Katakana/Kanji for the title
  bottomCopyright?: string; // e.g. "©1996 KAZUKI TAKAHASHI" or "@2026 Bapack-Bapack DeadStar"
  isolatedCardOnly?: boolean;
  bodyCrop?: 'bust' | 'half-body';
  realismMode?: 'photorealistic-tcg' | 'cinematic';
  rarityFoil?: YugiohRarity;
  holographicIntensity?: string;
  generationTarget?: 'artwork' | 'full-card';
  customPromptAdditions?: string;
}

export interface GeneratedYugiohCard {
  id: string;
  timestamp: number;
  characterName: string;
  cardName?: string;
  cardDisplayName?: string;
  japaneseName?: string;
  cardDna: YugiohCardDna;
  imageUrl: string;
  portraitUsed?: string;
  prompt: string;
  model: string;
  generationTarget?: 'artwork' | 'full-card';
}

// Backward compatibility alias for legacy imports
export type PokemonDna = YugiohCardDna;
export type GenerationSettings = YugiohGenerationSettings;
export type GeneratedCard = GeneratedYugiohCard;
