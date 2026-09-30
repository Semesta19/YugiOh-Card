import { YugiohCardDna, YugiohGenerationSettings } from '../types/yugioh';

export function buildYugiohCardPrompt(
  card: YugiohCardDna,
  settings?: Partial<YugiohGenerationSettings>
): string {
  // If user provided a custom title / name
  const characterName = settings?.customCardName?.trim() ? settings.customCardName.trim() : card.name;
  const japaneseName = settings?.japaneseName?.trim() || card.japaneseName || 'ブラック・マジシャン・ガール';
  const attribute = card.attribute || 'DARK';
  const level = card.level || 6;
  const atk = card.atk || '2000';
  const def = card.def || '1700';
  const monsterType = card.monsterType || 'Spellcaster';
  const cardType = card.cardType || 'Effect';
  const copyrightText = settings?.bottomCopyright || '@2026 Bapack-bapack Deadstar';
  const setCode = card.cardSetCode || 'SS01-ENA04';
  const passcode = card.cardPasscode || '38033121';
  const targetMode = settings?.generationTarget || 'artwork';
  const poseMode = settings?.poseMode || 'auto';
  const freePose = poseMode !== 'front';

  const effectLore =
    (card.effectText !== undefined && card.effectText !== null && card.effectText !== '')
      ? card.effectText
      : (card.abilities && card.abilities.length > 0
          ? card.abilities.join(' ')
          : (card.flavorText || 'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GY.'));

  const isDmg = /dark magician girl/i.test(card.name) || /dark magician girl/i.test(characterName);

  // DEFAULT & RECOMMENDED MODE: ARTWORK ONLY
  // Generates the square 1:1 artwork portrait that fits into the authentic TCG card frame.
  // PREVENTS DOUBLE CARDS ("Jangan ada double kartu dalam kartu") & MAXIMIZES IDENTITY LOCK.
  if (targetMode === 'artwork') {
    return `================================================================================
CRITICAL TOP-PRIORITY INSTRUCTION: ABSOLUTE PHOTOREALISM & 100% IDENTITY LOCK
================================================================================

1. STRICT FACIAL IDENTITY LOCK ("HARUS LOCK IDENTITY WAJAH SESUAI GAMBAR TERUPLOAD"):
- INPUT REFERENCE: Image 1 is the uploaded photo of a real living person.
- The face in the output image MUST be a 100% IDENTICAL biometric match to this person:
  * Exact eye shape, eyelid creases, epicanthic folds, iris color, pupil size, eye spacing, and authentic gaze.
  * Exact eyebrow structure: shape, arch, density, color, and natural hair pattern.
  * Exact nose structure: bridge width, nostril contours, and nose tip shape.
  * Exact mouth and lips: lip fullness, lip contour, mouth width, and the natural shape of the smile lines.
  * Exact facial geometry and bone structure: jawline, cheekbones, chin contour, forehead, and natural proportions.
  * Exact natural skin complexion, undertone, and any unique facial marks (moles, freckles, beauty marks).
- Biometric verification match: A facial recognition algorithm and friends/family must identify the person with 100% certainty.
- ZERO facial morphing, ZERO facial blending with anime/fictional characters, ZERO face swapping. The person's real face must be preserved with absolute fidelity.
${freePose ? `- IDENTITY IS NOT POSE: The identity lock applies ONLY to facial features (eyes, brows, nose, lips, jaw, skin tone, marks). It does NOT lock the head angle, gaze direction, expression, body pose, camera angle, crop, lighting, background or clothing of the uploaded photo. RE-POSE the same person in a NEW dynamic angle (three-quarter view / head tilt / turned shoulders) while keeping the face fully visible and instantly recognizable. Do NOT reproduce the uploaded photo's frontal pose.
` : ''}
2. ABSOLUTE PHOTOREALISM — STRICT BAN ON 3D / CGI & CARTOON / ANIME ("TANPA DIUBAH JADI 3D ATAU KARTUN"):
- The face MUST be rendered as an authentic, high-resolution REAL-LIFE HUMAN PHOTOGRAPH.
- Natural human skin texture: micro-pores, fine epidermal details, realistic skin subsurface scattering (SSS), natural skin translucency, real eyelid creases, authentic human lip texture and lines, natural eye moisture and realistic corneal reflections/catchlights.
- ABSOLUTELY FORBIDDEN FOR THE FACE:
  * NO 3D, NO CGI, NO 3D RENDER: Do NOT render the face as a 3D digital model, Octane render, Unreal Engine asset, Blender render, Pixar/Disney 3D animation, video game character, plastic mannequin, porcelain doll, or smooth polygon mesh.
  * NO 2D CARTOON, NO ANIME: Do NOT render the face as 2D anime, manga drawing, cartoon, cel-shaded illustration, comic art, digital drawing, caricature, or stylized vector.
- The aesthetic is a REAL-LIFE LIVE-ACTION CINEMATIC PHOTOGRAPH of an actual real human person wearing high-end movie-quality physical costume, armor, and accessories, captured with an 85mm portrait camera lens with natural depth of field.

3. ANTI-DUPLICATION MANDATE ("JANGAN ADA DOUBLE KARTU"):
- DO NOT GENERATE ANY TRADING CARD BORDERS, CARD FRAMES, OR CARD MARGINS.
- DO NOT GENERATE ANY TOP NAMEPLATES, TITLE BARS, OR TEXT HEADERS.
- DO NOT GENERATE ANY LEVEL STARS, RANK ORBS, OR ATTRIBUTE CIRCLES.
- DO NOT GENERATE ANY BOTTOM EFFECT BOXES, LORE TEXT, ATK/DEF STATS, PASSCODES, OR COPYRIGHT LABELS.
- The entire image must be 100% PURE CHARACTER ARTWORK ILLUSTRATION (the content of the artwork window).
- Any outer card frames or nested cards inside this image are STRICTLY FORBIDDEN.

4. COMPOSITION: FACE DOMINANT 1/3 OF FRAME ("WAJAH DOMINAN 1/3 DARI GAMBAR"):
- Framing: Cinematic bust / head-and-shoulders close-up portrait.
- The realistic face of the person is the dominant central focal point, occupying approximately 1/3 (one-third) of the entire image area.
${freePose ? '- Pose: FREE and DYNAMIC heroic head-and-shoulders portrait with a NEW head angle and body orientation (see POSE DIRECTIVE), confident presence fitting a Yu-Gi-Oh! champion. Do NOT copy the pose of the uploaded photo.' : '- Pose: Dynamic head-and-shoulders portrait facing the viewer with confident, heroic presence fitting a Yu-Gi-Oh! champion.'}

5. PRACTICAL COSTUME & CHARACTER MOTIFS (${characterName} - ${card.name}):
- The Yu-Gi-Oh! fantasy theme is achieved through physical live-action costume, ornate armor, headwear/hat, weapons, and arcane effects worn by this real person.
${
  isDmg
    ? `- Headwear: Iconic curved pointed wizard hat (cerulean blue with vibrant magenta-pink trim and golden spiral curls on the sides), worn naturally over their hair.
- Hair: Natural flowing silky hair (${card.hairstyle}) elegantly framing the realistic human face and cascading over the shoulders.
- Robe & Attire: Mastercrafted cerulean blue sorceress dress with high-collared magenta neckline, gold trim, and glowing golden star/jewel amulet brooch at the chest.
- Magical Wand: Holding the classic golden spiral-tipped magical wand with warm luminescence.
- Arcane Background: The legendary golden runic Dark Magic Circle (mystic ancient glyph disc) radiating divine arcane light directly behind the character's head, floating in a mystical violet/magenta twilight realm with shimmering magical stardust and subtle glowing arcane hearts.`
    : `- Costume & Armor: ${card.costume}
- Hairstyle: ${card.hairstyle}
- Energy & Magic Effects: ${card.energyEffects}
- Background Setting: ${card.environment}
- Visual Motifs: ${card.visualMotifs}`
}

6. CARD LORE & CUSTOM EFFECT CONTEXT:
"${effectLore}"

7. HOLOGRAPHIC FINISH ("TETAP PAKAI HOLOGRAM"):
- Secret Rare holographic diagonal prism lines and rainbow foil diffraction glistening across the armor edges, accessories, and magical particles.
- Physical trading-card artwork aesthetic with rich ink saturation and studio-grade collectible lighting.
================================================================================
${settings?.customPromptAdditions ? `\nADDITIONAL USER DIRECTIVES:\n${settings.customPromptAdditions}` : ''}`;
  }

  // FULL CARD MODE: Generates the entire 2:3 physical card
  return `Create a complete, authentic collectible trading card in the EXACT composition and visual layout of the classic Japanese Yu-Gi-Oh! TCG physical card (specifically referencing the iconic Effect Monster card layout like Dark Magician Girl), featuring a REALISTIC PHOTO portrait based on the uploaded person's face.

================================================================================
CRITICAL COMPOSITION & VISUAL SPECIFICATIONS (MATCHING REFERENCE CARD)
================================================================================

1. OVERALL CARD STRUCTURE & PROPORTIONS:
- Aspect ratio: Standard 2:3 physical trading card (59mm × 86mm ratio).
- Isolated single card presented in full view from top edge to bottom edge without cropping any element.
- Outer Frame: Warm ochre-tan / caramel parchment textured cardstock border (classic Yu-Gi-Oh! Effect Monster card color) with subtle printed paper grain, fine bevels, and micro-embossed border lines.

2. TOP TITLE AREA (IN AUTHENTIC JAPANESE CHARACTERS):
- A recessed horizontal tan-parchment nameplate banner at the top of the card.
- The card title MUST be rendered in JAPANESE SCRIPT (Kanji / Katakana characters):
  "${japaneseName}"
- Typography: Authentic classic Japanese TCG bold black serif/gothic lettering with subtle metallic emboss and crisp printing edges.
- In the upper-right corner of the title bar: The circular Attribute symbol:
  Circular badge for [${attribute} 闇] with the glowing Japanese kanji in the center and small English "${attribute}" text above it, glowing with arcane elemental color.

3. LEVEL / RANK STARS (ALIGNED TO THE RIGHT):
- Exactly underneath the title banner, aligned to the RIGHT side (directly beneath the attribute crest):
  A neat horizontal row of ${level} glowing circular Level Stars.
- Appearance: Classic spherical red-orange orbs with glowing 5-point yellow stars in the center and radiant reflective gloss.

4. MAIN ARTWORK WINDOW — 100% REALISTIC PHOTO PORTRAIT WITH STRICT IDENTITY LOCK:
- A central square illustration window framed by a double metallic silver/gray beveled border.
- STRICT FACIAL IDENTITY LOCK ("HARUS LOCK IDENTITY WAJAH SESUAI GAMBAR TERUPLOAD"):
  * The face MUST be an exact 100% biometric likeness to the person in the uploaded photo.
  * Retain exact eye contours, eyelid creases, iris color, nose bridge & tip, mouth, lip fullness, smile lines, jawline, chin, and natural skin tone.
  * ZERO morphing or altering facial features. The real person must be instantly recognized.
${freePose ? `  * IDENTITY IS NOT POSE: lock only the facial features. Head angle, gaze, expression, body pose and camera angle must be NEW and dynamic (three-quarter view / head tilt / turned shoulders), NOT copied from the uploaded photo. The face stays fully visible.
` : ''}- ABSOLUTE PHOTOREALISM — STRICT BAN ON 3D / CGI & CARTOON / ANIME:
  * The face MUST be rendered as an authentic, crisp REAL HUMAN PHOTOGRAPH with natural skin pores, epidermal micro-texture, fine lines, subsurface scattering, and natural iris reflections.
  * ABSOLUTELY FORBIDDEN: NO 3D model, NO CGI, NO Octane render, NO video game character, NO Pixar/Disney 3D, NO 2D anime, NO cartoon, NO cel-shaded drawing.
  * A real living human captured by an 85mm portrait camera lens, wearing high-end movie-quality physical costume and armor.
- COMPOSITION: FACE DOMINANT 1/3 OF ARTWORK FRAME:
  * The realistic face of the uploaded person is the prominent central focal point, occupying approximately 1/3 (one-third) of the entire artwork window area.
  * Framing: Bust / head-and-shoulders close-up composition (face, head, neck, shoulders, and upper chest) ${freePose ? 'in a NEW dynamic pose and head angle (NOT copied from the uploaded photo), with heroic Yu-Gi-Oh! presence.' : 'matching the iconic Dark Magician Girl card pose.'}
- COSTUME & MOTIFS (${characterName}):
  * Headpiece: Iconic curved peaked wizard hat (blue with magenta trim and side spiral curls) framing the realistic human face.
  * Hairstyle: Long flowing hair (${card.hairstyle}) naturally framing the face and shoulders.
  * Robe / Mantle: Sorceress attire with high-collared neckline, golden jewel brooch / amulet at the chest, and holding the gold spiral magic wand/staff.
  * Background: The legendary golden runic Dark Magic Circle / mystic glyph ring radiating arcane light directly behind the character's head, set against a deep mystical magenta/violet background with subtle glowing hearts and arcane sparkles.

5. SET CODE (BELOW ARTWORK):
- In the narrow space directly beneath the bottom-right corner of the artwork frame, above the effect box:
  Printed set code in crisp black monospace font: "${setCode}".

6. EFFECT DESCRIPTION BOX (PARCHMENT TEXTURE):
- A large warm-parchment rectangular box with a thin double-line border.
- Bracketed Type line in bold serif:
  [${monsterType} / ${cardType}]
- Lore / Effect description:
  "${effectLore}"
- A thin horizontal divider line running across the lower section of the effect box.
- Lower-right corner of the effect box (classic bold serif numbers):
  ATK / ${atk}   DEF / ${def}

7. HOLOGRAPHIC FOIL EFFECT (SECRET RARE / ULTRA RARE):
- The card MUST have a realistic physical holographic foil finish ("tetap pakai hologram"):
  * Secret Rare diagonal laser foil lines running across the card at a 45-degree angle.
  * Prismatic rainbow shimmer catching the light across the artwork, magical spell circle, stars, attribute symbol, and gold lettering.
  * Authentic physical light diffraction that glistens naturally across the cardstock.

8. CARD FOOTER & USER-REQUESTED COPYRIGHT:
- Lower-left corner: 8-digit printed passcode "${passcode}", followed by "1st Edition".
- Lower-center/right: EXACT COPYRIGHT NOTICE:
  "${copyrightText}"
- Lower-right corner: Square metallic holographic Eye of Anubis security stamp with the sacred Eye glyph shining in gold/silver foil.

================================================================================
FINAL QUALITY & REALISM:
The final image must look like a high-end photograph of a genuine, physical Japanese Yu-Gi-Oh! collectible trading card with authentic textures, rich ink density, and realistic holographic reflections. The face must be a realistic human photo occupying 1/3 of the artwork frame.
================================================================================
${settings?.customPromptAdditions ? `\nADDITIONAL USER DIRECTIVES:\n${settings.customPromptAdditions}` : ''}`;
}

// Backwards compatibility alias for App.tsx
export const buildPokemonCardPrompt = (dna: any, settings?: any) => {
  return buildYugiohCardPrompt(dna, settings);
};