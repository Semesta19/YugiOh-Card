/**
 * Translates/transliterates names and Pokémon names to Japanese Katakana characters.
 */

// Well-known official Japanese Pokémon names
const POKEMON_JAPANESE_MAP: Record<string, string> = {
  articuno: 'フリーザー',
  charizard: 'リザードン',
  pikachu: 'ピカチュウ',
  blastoise: 'カメックス',
  gengar: 'ゲンガー',
  lucario: 'ルカリオ',
  mewtwo: 'ミュウツー',
  rayquaza: 'レックウザ',
  garchomp: 'ガブリアス',
  eevee: 'イーブイ',
  zapdos: 'サンダー',
  moltres: 'ファイヤー',
  mew: 'ミュウ',
  lugia: 'ルギア',
  hooh: 'ホウオウ',
  'ho-oh': 'ホウオウ',
  suicune: 'スイクン',
  raikou: 'ライコウ',
  entei: 'エンテイ',
  greninja: 'ゲッコウガ',
  umbreon: 'ブラッキー',
  espeon: 'エーフィ',
  sylveon: 'ニンフィア',
  gardevoir: 'サーナイト',
  dragonite: 'カイリュー',
  tyranitar: 'バンギラス',
  arceus: 'アルセウス',
  giratina: 'ギラティナ',
  dialga: 'ディアルガ',
  palkia: 'パルキア',
  kyogre: 'カイオーガ',
  groudon: 'グラードン',
  snorlax: 'カビゴン',
  venusaur: 'フシギバナ',
  gyarados: 'ギャラドス',
  bulbasaur: 'フシギダネ',
  charmander: 'ヒトカゲ',
  squirtle: 'ゼニガメ',
};

// Common name overrides for natural Japanese transliteration
const KNOWN_NAMES_MAP: Record<string, string> = {
  aziz: 'アジズ',
  azis: 'アジス',
  ridho: 'リド',
  ridhozain: 'リド・ザイン',
  zain: 'ザイン',
  rian: 'リアン',
  ryan: 'ライアン',
  budi: 'ブディ',
  agus: 'アグス',
  alex: 'アレックス',
  john: 'ジョン',
  david: 'デイヴィッド',
  michael: 'マイケル',
  sarah: 'サラ',
  kevin: 'ケヴィン',
  daniel: 'ダニエル',
  leo: 'レオ',
  ken: 'ケン',
  maya: 'マヤ',
  reza: 'レザ',
  dimas: 'ディマス',
  fajar: 'ファジャル',
  bayu: 'バユ',
};

// Syllable mappings ordered by length descending
const SYLLABLE_MAP: [RegExp, string][] = [
  // Special compounds
  [/^kya/i, 'キャ'], [/^kyu/i, 'キュ'], [/^kyo/i, 'キョ'],
  [/^sha/i, 'シャ'], [/^shu/i, 'シュ'], [/^sho/i, 'ショ'], [/^she/i, 'シェ'],
  [/^cha/i, 'チャ'], [/^chu/i, 'チュ'], [/^cho/i, 'チョ'], [/^che/i, 'チェ'],
  [/^nya/i, 'ニャ'], [/^nyu/i, 'ニュ'], [/^nyo/i, 'ニョ'],
  [/^hya/i, 'ヒャ'], [/^hyu/i, 'ヒュ'], [/^hyo/i, 'ヒョ'],
  [/^mya/i, 'ミャ'], [/^myu/i, 'ミュ'], [/^myo/i, 'ミョ'],
  [/^rya/i, 'リャ'], [/^ryu/i, 'リュ'], [/^ryo/i, 'リョ'],
  [/^gya/i, 'ギャ'], [/^gyu/i, 'ギュ'], [/^gyo/i, 'ギョ'],
  [/^ja/i, 'ジャ'],   [/^ju/i, 'ジュ'],   [/^jo/i, 'ジョ'],   [/^je/i, 'ジェ'],
  [/^bya/i, 'ビャ'], [/^byu/i, 'ビュ'], [/^byo/i, 'ビョ'],
  [/^pya/i, 'ピャ'], [/^pyu/i, 'ピュ'], [/^pyo/i, 'ピョ'],
  [/^tsu/i, 'ツ'],   [/^chi/i, 'チ'],   [/^shi/i, 'シ'],

  // Foreign sounds
  [/^fa/i, 'ファ'], [/^fi/i, 'フィ'], [/^fe/i, 'フェ'], [/^fo/i, 'フォ'],
  [/^va/i, 'ヴァ'], [/^vi/i, 'ヴィ'], [/^vu/i, 'ヴ'],   [/^ve/i, 'ヴェ'], [/^vo/i, 'ヴォ'],
  [/^ti/i, 'ティ'], [/^di/i, 'ディ'], [/^du/i, 'ドゥ'], [/^tu/i, 'トゥ'],
  [/^wi/i, 'ウィ'], [/^we/i, 'ウェ'], [/^wo/i, 'ウォ'],

  // Double consonants (gemination: sokuon)
  [/^kk/i, 'ック'], [/^pp/i, 'ップ'], [/^tt/i, 'ット'], [/^ss/i, 'ッス'],

  // Standard 2-character syllables
  [/^ka/i, 'カ'], [/^ki/i, 'キ'], [/^ku/i, 'ク'], [/^ke/i, 'ケ'], [/^ko/i, 'コ'],
  [/^sa/i, 'サ'], [/^si/i, 'シ'], [/^su/i, 'ス'], [/^se/i, 'セ'], [/^so/i, 'ソ'],
  [/^ta/i, 'タ'], [/^te/i, 'テ'], [/^to/i, 'ト'],
  [/^na/i, 'ナ'], [/^ni/i, 'ニ'], [/^nu/i, 'ヌ'], [/^ne/i, 'ネ'], [/^no/i, 'ノ'],
  [/^ha/i, 'ハ'], [/^hi/i, 'ヒ'], [/^fu/i, 'フ'], [/^he/i, 'ヘ'], [/^ho/i, 'ホ'],
  [/^ma/i, 'マ'], [/^mi/i, 'ミ'], [/^mu/i, 'ム'], [/^me/i, 'メ'], [/^mo/i, 'モ'],
  [/^ya/i, 'ヤ'], [/^yu/i, 'ユ'], [/^yo/i, 'ヨ'],
  [/^ra/i, 'ラ'], [/^ri/i, 'リ'], [/^ru/i, 'ル'], [/^re/i, 'レ'], [/^ro/i, 'ロ'],
  [/^la/i, 'ラ'], [/^li/i, 'リ'], [/^lu/i, 'ル'], [/^le/i, 'レ'], [/^lo/i, 'ロ'],
  [/^wa/i, 'ワ'],
  [/^ga/i, 'ガ'], [/^gi/i, 'ギ'], [/^gu/i, 'グ'], [/^ge/i, 'ゲ'], [/^go/i, 'ゴ'],
  [/^za/i, 'ザ'], [/^zi/i, 'ジ'], [/^zu/i, 'ズ'], [/^ze/i, 'ゼ'], [/^zo/i, 'ゾ'],
  [/^ji/i, 'ジ'],
  [/^da/i, 'ダ'], [/^de/i, 'デ'], [/^do/i, 'ド'],
  [/^ba/i, 'バ'], [/^bi/i, 'ビ'], [/^bu/i, 'ブ'], [/^be/i, 'ベ'], [/^bo/i, 'ボ'],
  [/^pa/i, 'パ'], [/^pi/i, 'ピ'], [/^pu/i, 'プ'], [/^pe/i, 'ペ'], [/^po/i, 'ポ'],

  // Vowels
  [/^a/i, 'ア'], [/^i/i, 'イ'], [/^u/i, 'ウ'], [/^e/i, 'エ'], [/^o/i, 'オ'],

  // Standalone consonants
  [/^n(?![aiueo])/i, 'ン'],
  [/^z/i, 'ズ'],
  [/^s/i, 'ス'],
  [/^t/i, 'ト'],
  [/^d/i, 'ド'],
  [/^k/i, 'ク'],
  [/^g/i, 'グ'],
  [/^b/i, 'ブ'],
  [/^p/i, 'プ'],
  [/^m/i, 'ム'],
  [/^r/i, 'ル'],
  [/^l/i, 'ル'],
  [/^f/i, 'フ'],
  [/^v/i, 'ヴ'],
  [/^h/i, 'フ'],
  [/^j/i, 'ジ'],
  [/^w/i, 'ウ'],
  [/^y/i, 'イ'],
];

/**
 * Checks if a string already contains Japanese characters (Hiragana, Katakana, or Kanji).
 */
export function isAlreadyJapanese(text: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

/**
 * Converts a name or Pokémon name to Japanese Katakana script.
 * e.g. "Aziz" -> "アジズ"
 * e.g. "Mewtwo" -> "ミュウツー"
 * e.g. "Charizard" -> "リザードン"
 */
export function toJapaneseName(name: string): string {
  if (!name || typeof name !== 'string') return '';
  const trimmed = name.trim();
  if (!trimmed) return '';

  // If already Japanese, return as-is
  if (isAlreadyJapanese(trimmed)) {
    return trimmed;
  }

  const normalized = trimmed.toLowerCase();

  // 1. Direct dictionary check (Pokemon & popular names)
  if (POKEMON_JAPANESE_MAP[normalized]) {
    return POKEMON_JAPANESE_MAP[normalized];
  }
  if (KNOWN_NAMES_MAP[normalized]) {
    return KNOWN_NAMES_MAP[normalized];
  }

  // Handle compound like "Aziz ex" or "Mewtwo ex"
  const exMatch = trimmed.match(/^(.+?)\s+(ex|vmax|vstar|gx|v)$/i);
  if (exMatch) {
    const base = toJapaneseName(exMatch[1]);
    return `${base} ${exMatch[2].toUpperCase()}`;
  }

  // 2. Rule-based transliteration to Katakana
  let remaining = normalized;
  let result = '';

  // Handle spaces and hyphens
  remaining = remaining.replace(/\s+/g, '・');

  while (remaining.length > 0) {
    // Check for middle dot
    if (remaining[0] === '・') {
      result += '・';
      remaining = remaining.slice(1);
      continue;
    }

    // Check long vowel markers
    if (remaining.startsWith('ee') || remaining.startsWith('oo') || remaining.startsWith('aa') || remaining.startsWith('ii')) {
      const firstChar = remaining[0];
      const match = SYLLABLE_MAP.find(([regex]) => regex.test(firstChar));
      if (match) {
        result += match[1] + 'ー';
        remaining = remaining.slice(2);
        continue;
      }
    }

    // Match against syllable table
    let matched = false;
    for (const [regex, katakana] of SYLLABLE_MAP) {
      if (regex.test(remaining)) {
        result += katakana;
        remaining = remaining.replace(regex, '');
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Unmapped character: keep or skip
      result += remaining[0];
      remaining = remaining.slice(1);
    }
  }

  return result || trimmed;
}
