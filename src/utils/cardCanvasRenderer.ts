import { YugiohCardDna, YugiohAttribute, ATTRIBUTE_CONFIG } from '../types/yugioh';
import { toJapaneseName } from './japaneseTransliterate';

export interface RenderCardOptions {
  cardDna: YugiohCardDna;
  imageUrl: string;
  cardDisplayName?: string;
  japaneseName?: string;
  bottomCopyright?: string;
}

interface FrameThemeColors {
  outerGrad: [string, string, string];
  border: string;
  label: string;
}

/**
 * Returns exact cardstock border & gradient colors based on cardType and attribute,
 * matching CardDisplay.tsx getFrameTheme() 1:1.
 */
function getCanvasFrameTheme(cardType: string, attribute?: string, cardName?: string): FrameThemeColors {
  switch (cardType) {
    case 'Normal':
      return {
        outerGrad: ['#d9aa68', '#c69550', '#aa7738'],
        border: '#c69a58',
        label: 'NORMAL MONSTER',
      };
    case 'Effect':
      return {
        outerGrad: ['#c86d35', '#b65825', '#924018'],
        border: '#b85c28',
        label: 'EFFECT MONSTER',
      };
    case 'Ritual':
      return {
        outerGrad: ['#4085c4', '#316c9f', '#1f486d'],
        border: '#30689b',
        label: 'RITUAL MONSTER',
      };
    case 'Fusion':
      return {
        outerGrad: ['#874b9f', '#6d3780', '#4c215b'],
        border: '#69397e',
        label: 'FUSION MONSTER',
      };
    case 'Synchro':
      return {
        outerGrad: ['#ffffff', '#e5e5e5', '#cccccc'],
        border: '#d0d0d0',
        label: 'SYNCHRO MONSTER',
      };
    case 'Egyptian God':
      if (attribute === 'DIVINE' && /slifer/i.test(cardName || '')) {
        return {
          outerGrad: ['#a72830', '#8c1e25', '#5b1015'],
          border: '#8f1d24',
          label: 'DIVINE-BEAST',
        };
      } else if (attribute === 'DIVINE' && /obelisk/i.test(cardName || '')) {
        return {
          outerGrad: ['#244f95', '#1a3d76', '#0f2448'],
          border: '#1b3b6f',
          label: 'DIVINE-BEAST',
        };
      }
      return {
        outerGrad: ['#d4af37', '#b8860b', '#805e09'],
        border: '#b8860b',
        label: 'DIVINE-BEAST',
      };
    default:
      return {
        outerGrad: ['#c86d35', '#b65825', '#924018'],
        border: '#b85c28',
        label: 'EFFECT MONSTER',
      };
  }
}

/**
 * Returns exact attribute crest background colors matching ATTRIBUTE_CONFIG.
 */
function getCanvasAttributeColors(attr: YugiohAttribute): { grad: [string, string, string]; border: string } {
  switch (attr) {
    case 'DARK':
      return { grad: ['#581c87', '#1e1b4b', '#0f172a'], border: '#fde047' };
    case 'LIGHT':
      return { grad: ['#fef08a', '#eab308', '#ca8a04'], border: '#fde047' };
    case 'EARTH':
      return { grad: ['#92400e', '#78350f', '#451a03'], border: '#fbbf24' };
    case 'WATER':
      return { grad: ['#38bdf8', '#2563eb', '#0e7490'], border: '#7dd3fc' };
    case 'FIRE':
      return { grad: ['#dc2626', '#ea580c', '#b45309'], border: '#fca5a5' };
    case 'WIND':
      return { grad: ['#10b981', '#0d9488', '#0e7490'], border: '#6ee7b7' };
    case 'DIVINE':
      return { grad: ['#f59e0b', '#eab308', '#b91c1c'], border: '#fde047' };
    default:
      return { grad: ['#581c87', '#1e1b4b', '#0f172a'], border: '#fde047' };
  }
}

/**
 * Renders an authentic Yu-Gi-Oh! physical trading card onto an HTML5 Canvas.
 * Generates an ultra-crisp 1000 x 1458 px image (59:86 standard TCG ratio, 300 DPI print quality)
 * matching CardDisplay.tsx 1:1 in exact composition, margins, spacing, fonts, and colors.
 */
export async function renderFullCardToCanvas(options: RenderCardOptions): Promise<string> {
  const {
    cardDna,
    imageUrl,
    cardDisplayName,
    japaneseName,
    bottomCopyright = '@2026 Bapack-bapack Deadstar',
  } = options;

  // Wait for web fonts if available
  try {
    if (typeof document !== 'undefined' && document.fonts) {
      await document.fonts.ready;
    }
  } catch (err) {
    // Non-fatal if font check fails
  }

  const width = 1000;
  const height = 1458; // Standard 59:86 aspect ratio
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  // Padding mirroring CardDisplay.tsx (sm:p-3 on 380px container = ~32px on 1000px canvas)
  const padX = 32;
  const contentW = width - 2 * padX; // 936 px
  const contentX = padX;

  // 1. Draw Outer Cardstock Container with Frame Theme Gradient
  const frameTheme = getCanvasFrameTheme(cardDna.cardType, cardDna.attribute, cardDna.name);
  const outerRadius = 46;

  // Inset cardstock slightly to prevent border clipping on any screen or printer
  const cardInset = 3;
  const outerGradient = ctx.createLinearGradient(0, 0, 0, height);
  outerGradient.addColorStop(0, frameTheme.outerGrad[0]);
  outerGradient.addColorStop(0.5, frameTheme.outerGrad[1]);
  outerGradient.addColorStop(1, frameTheme.outerGrad[2]);
  ctx.fillStyle = outerGradient;
  roundRect(ctx, cardInset, cardInset, width - 2 * cardInset, height - 2 * cardInset, outerRadius);
  ctx.fill();

  // Subtle cardstock paper texture pattern
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let py = 12; py < height - 12; py += 16) {
    for (let px = 12; px < width - 12; px += 16) {
      ctx.fillRect(px, py, 2, 2);
    }
  }

  // Outer border stroke (inset by lineWidth/2 to prevent clipping)
  const borderWidth = 6;
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = frameTheme.border;
  roundRect(
    ctx,
    cardInset + borderWidth / 2,
    cardInset + borderWidth / 2,
    width - 2 * cardInset - borderWidth,
    height - 2 * cardInset - borderWidth,
    outerRadius - 3
  );
  ctx.stroke();

  // 2. Card Header: Parchment Nameplate Banner
  const bannerX = contentX;
  const bannerY = 32;
  const bannerW = contentW;
  const bannerH = 96;

  // Parchment gradient: from-[#f8eddc] via-[#edd8ba] to-[#e0c49e]
  const bannerGrad = ctx.createLinearGradient(bannerX, bannerY, bannerX, bannerY + bannerH);
  bannerGrad.addColorStop(0, '#f8eddc');
  bannerGrad.addColorStop(0.5, '#edd8ba');
  bannerGrad.addColorStop(1, '#e0c49e');
  ctx.fillStyle = bannerGrad;
  roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 12);
  ctx.fill();

  ctx.lineWidth = 4.5;
  ctx.strokeStyle = '#5c3514';
  roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 12);
  ctx.stroke();

  // Inner parchment bevel highlight
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
  roundRect(ctx, bannerX + 3, bannerY + 3, bannerW - 6, bannerH - 6, 9);
  ctx.stroke();

  // Attribute Crest Setup
  const attr: YugiohAttribute = cardDna.attribute || 'DARK';
  const attrInfo = ATTRIBUTE_CONFIG[attr] || ATTRIBUTE_CONFIG.DARK;
  const attrColors = getCanvasAttributeColors(attr);
  const attrRadius = 38; // 76px diameter
  const attrX = bannerX + bannerW - 14 - attrRadius;
  const attrY = bannerY + bannerH / 2;

  // Title Texts on Left side
  const effectiveEnTitle = (cardDisplayName?.trim() || cardDna.name || '').trim();
  const effectiveJpTitle = (
    japaneseName?.trim() ||
    cardDna.japaneseName?.trim() ||
    toJapaneseName(effectiveEnTitle)
  ).trim();

  const hasSubtitle = !!(effectiveEnTitle && effectiveEnTitle.toLowerCase() !== effectiveJpTitle.toLowerCase());
  const maxTitleW = attrX - attrRadius - bannerX - 28;

  if (hasSubtitle) {
    // Japanese Title + English Subtitle stacked neatly
    let jpFontSize = 30;
    ctx.font = `900 ${jpFontSize}px "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`;
    let measuredJpW = ctx.measureText(effectiveJpTitle).width;
    if (measuredJpW > maxTitleW) {
      jpFontSize = Math.max(20, Math.floor(jpFontSize * (maxTitleW / measuredJpW)));
      ctx.font = `900 ${jpFontSize}px "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`;
    }
    ctx.fillStyle = '#160d05';
    ctx.textBaseline = 'top';
    ctx.fillText(effectiveJpTitle, bannerX + 20, bannerY + 14, maxTitleW);

    let enFontSize = 16;
    ctx.font = `bold ${enFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    let measuredEnW = ctx.measureText(effectiveEnTitle.toUpperCase()).width;
    if (measuredEnW > maxTitleW) {
      enFontSize = Math.max(12, Math.floor(enFontSize * (maxTitleW / measuredEnW)));
      ctx.font = `bold ${enFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    }
    ctx.fillStyle = '#684321';
    ctx.fillText(effectiveEnTitle.toUpperCase(), bannerX + 20, bannerY + 56, maxTitleW);
  } else {
    // Single Dominant Japanese Title (Vertically Centered)
    let jpFontSize = 32;
    ctx.font = `900 ${jpFontSize}px "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`;
    let measuredJpW = ctx.measureText(effectiveJpTitle).width;
    if (measuredJpW > maxTitleW) {
      jpFontSize = Math.max(22, Math.floor(jpFontSize * (maxTitleW / measuredJpW)));
      ctx.font = `900 ${jpFontSize}px "Noto Serif JP", "Yu Mincho", "Hiragino Mincho ProN", serif`;
    }
    ctx.fillStyle = '#160d05';
    ctx.textBaseline = 'middle';
    ctx.fillText(effectiveJpTitle, bannerX + 20, bannerY + bannerH / 2, maxTitleW);
  }

  // 2b. Draw Attribute Crest Circle (DARK 闇, LIGHT 光, etc.)
  ctx.save();
  ctx.beginPath();
  ctx.arc(attrX, attrY, attrRadius, 0, Math.PI * 2);
  ctx.clip();

  const circleGrad = ctx.createRadialGradient(attrX - 8, attrY - 8, 4, attrX, attrY, attrRadius);
  circleGrad.addColorStop(0, attrColors.grad[0]);
  circleGrad.addColorStop(0.5, attrColors.grad[1]);
  circleGrad.addColorStop(1, attrColors.grad[2]);
  ctx.fillStyle = circleGrad;
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = '900 11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(attr, attrX, attrY - 14);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 30px "Noto Serif JP", "Yu Mincho", serif';
  ctx.fillText(attrInfo.kanji, attrX, attrY + 11);
  ctx.restore();

  ctx.lineWidth = 3;
  ctx.strokeStyle = attrColors.border;
  ctx.beginPath();
  ctx.arc(attrX, attrY, attrRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.textAlign = 'left';

  // 3. Level Stars Row (Aligned to the Right beneath attribute crest)
  const starsCount = Math.min(12, Math.max(1, cardDna.level || 7));
  const starsRowY = bannerY + bannerH + 4; // 132
  const starsRowH = 38;
  const starRadius = 16;
  const starGap = 38;
  const rightmostStarX = bannerX + bannerW - 8 - starRadius;

  for (let i = 0; i < starsCount; i++) {
    const sx = rightmostStarX - (starsCount - 1 - i) * starGap;
    const sy = starsRowY + starsRowH / 2;

    const orbGrad = ctx.createRadialGradient(sx - 4, sy - 4, 2, sx, sy, starRadius);
    orbGrad.addColorStop(0, '#fef08a');
    orbGrad.addColorStop(0.35, '#f59e0b');
    orbGrad.addColorStop(1, '#dc2626');
    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(sx, sy, starRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#fffbeb';
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fffbeb';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('★', sx, sy);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
  }

  // 4. Main Artwork Window (Double Metallic Beveled Frame)
  const artFrameX = contentX;
  const artFrameY = starsRowY + starsRowH + 6; // 176
  const artFrameW = contentW; // 936
  const artFrameH = Math.round(artFrameW / 1.04); // 900 px

  ctx.lineWidth = 7;
  ctx.strokeStyle = '#7d7162';
  roundRect(ctx, artFrameX - 3.5, artFrameY - 3.5, artFrameW + 7, artFrameH + 7, 10);
  ctx.stroke();

  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#3e3428';
  roundRect(ctx, artFrameX, artFrameY, artFrameW, artFrameH, 8);
  ctx.stroke();

  ctx.fillStyle = '#120f0c';
  ctx.fillRect(artFrameX, artFrameY, artFrameW, artFrameH);

  if (imageUrl) {
    try {
      const img = await loadImage(imageUrl);
      ctx.save();
      ctx.beginPath();
      roundRect(ctx, artFrameX, artFrameY, artFrameW, artFrameH, 8);
      ctx.clip();

      // Object-fit: cover logic to avoid stretching/cropping distortion
      drawImageCover(ctx, img, artFrameX, artFrameY, artFrameW, artFrameH);

      // Secret Rare holographic diagonal sheen overlay
      const holoGrad = ctx.createLinearGradient(
        artFrameX,
        artFrameY,
        artFrameX + artFrameW,
        artFrameY + artFrameH
      );
      holoGrad.addColorStop(0, 'rgba(255,255,255,0.05)');
      holoGrad.addColorStop(0.2, 'rgba(6,182,212,0.12)');
      holoGrad.addColorStop(0.4, 'rgba(236,72,153,0.14)');
      holoGrad.addColorStop(0.6, 'rgba(234,179,8,0.12)');
      holoGrad.addColorStop(0.8, 'rgba(168,85,247,0.12)');
      holoGrad.addColorStop(1, 'rgba(255,255,255,0.05)');
      ctx.fillStyle = holoGrad;
      ctx.fillRect(artFrameX, artFrameY, artFrameW, artFrameH);

      // Inner shadow edge
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.lineWidth = 10;
      roundRect(ctx, artFrameX + 5, artFrameY + 5, artFrameW - 10, artFrameH - 10, 6);
      ctx.stroke();

      ctx.restore();
    } catch (e) {
      console.error('Failed to load card artwork into canvas:', e);
    }
  }

  // 5. Set Code (positioned neatly beneath artwork right corner)
  const setCodeY = artFrameY + artFrameH + 18; // 1094
  ctx.font = 'bold 18px "Courier New", monospace';
  ctx.fillStyle = '#1c1208';
  ctx.textAlign = 'right';
  ctx.fillText(cardDna.cardSetCode || 'SS01-ENA04', artFrameX + artFrameW - 4, setCodeY);
  ctx.textAlign = 'left';

  // 6. Effect / Lore Box (Warm Parchment Texture)
  const boxX = contentX;
  const boxY = setCodeY + 8; // 1102
  const boxW = contentW;
  const boxH = 264; // Ends at 1366px

  const boxGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxH);
  boxGrad.addColorStop(0, '#f9f2e3');
  boxGrad.addColorStop(0.5, '#f2e3c9');
  boxGrad.addColorStop(1, '#e5d2b1');
  ctx.fillStyle = boxGrad;
  roundRect(ctx, boxX, boxY, boxW, boxH, 10);
  ctx.fill();

  ctx.lineWidth = 4;
  ctx.strokeStyle = '#5c3514';
  roundRect(ctx, boxX, boxY, boxW, boxH, 10);
  ctx.stroke();

  // Type header: [MonsterType / CardType]
  const monsterType = cardDna.monsterType || 'Spellcaster';
  const cardType = cardDna.cardType || 'Effect';
  ctx.font = '900 22px "Noto Serif JP", serif';
  ctx.fillStyle = '#160d05';
  ctx.textBaseline = 'top';
  ctx.fillText(`[${monsterType} / ${cardType}]`, boxX + 16, boxY + 12);

  // Divider line under type header
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#a88a64';
  ctx.beginPath();
  ctx.moveTo(boxX + 12, boxY + 40);
  ctx.lineTo(boxX + boxW - 12, boxY + 40);
  ctx.stroke();

  // Effect Lore Text (Prioritizes user's custom effectText)
  const effectLore =
    cardDna.effectText !== undefined && cardDna.effectText !== null && cardDna.effectText !== ''
      ? cardDna.effectText
      : cardDna.abilities && cardDna.abilities.length > 0
      ? cardDna.abilities.join(' ')
      : cardDna.flavorText ||
        'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GY.';

  ctx.font = '600 18px "Noto Serif JP", "Times New Roman", serif';
  ctx.fillStyle = '#160d05';
  ctx.textBaseline = 'top';
  wrapText(ctx, effectLore, boxX + 16, boxY + 50, boxW - 32, 24, 6);

  // Stats Divider Line
  const statsLineY = boxY + boxH - 42;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#a88a64';
  ctx.beginPath();
  ctx.moveTo(boxX + 12, statsLineY);
  ctx.lineTo(boxX + boxW - 12, statsLineY);
  ctx.stroke();

  // ATK / DEF Stats
  const atk = cardDna.atk || '2000';
  const def = cardDna.def || '1700';
  ctx.font = '900 22px "Noto Serif JP", serif';
  ctx.fillStyle = '#160d05';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'right';
  ctx.fillText(`ATK / ${atk}    DEF / ${def}`, boxX + boxW - 18, statsLineY + 21);
  ctx.textAlign = 'left';

  // 7. Footer: Passcode, Edition, User Copyright, Eye of Anubis Stamp
  const footerY = 1414;

  // Passcode & 1st Edition
  ctx.font = 'bold 16px monospace';
  ctx.fillStyle = '#1f1309';
  ctx.textBaseline = 'middle';
  ctx.fillText(cardDna.cardPasscode || '38033121', boxX + 4, footerY);

  ctx.font = 'italic 16px serif';
  ctx.fillText('1st Edition', boxX + 130, footerY);

  // USER COPYRIGHT: @2026 Bapack-bapack Deadstar
  ctx.textAlign = 'center';
  ctx.font = 'bold 16px serif';
  ctx.fillText(bottomCopyright, width / 2 + 10, footerY);
  ctx.textAlign = 'left';

  // Eye of Anubis Holographic Square Stamp (Bottom Right)
  const stampSize = 30;
  const stampX = boxX + boxW - stampSize - 2;
  const stampY = footerY - stampSize / 2;

  const stampGrad = ctx.createLinearGradient(stampX, stampY, stampX + stampSize, stampY + stampSize);
  stampGrad.addColorStop(0, '#fef08a');
  stampGrad.addColorStop(0.5, '#f59e0b');
  stampGrad.addColorStop(1, '#b45309');
  ctx.fillStyle = stampGrad;
  ctx.fillRect(stampX, stampY, stampSize, stampSize);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#78350f';
  ctx.strokeRect(stampX, stampY, stampSize, stampSize);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#451a03';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('👁', stampX + stampSize / 2, stampY + stampSize / 2);

  return canvas.toDataURL('image/png');
}

// Draw image with object-fit: cover math
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const imgW = img.naturalWidth || img.width;
  const imgH = img.naturalHeight || img.height;
  if (!imgW || !imgH) {
    ctx.drawImage(img, x, y, w, h);
    return;
  }
  const imgRatio = imgW / imgH;
  const targetRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = imgW;
  let sh = imgH;

  if (imgRatio > targetRatio) {
    sw = imgH * targetRatio;
    sx = (imgW - sw) / 2;
  } else {
    sh = imgW / targetRatio;
    sy = (imgH - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, x, y, w, h);
}

// Utility: Rounded rectangle helper
export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number
) {
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

// Utility: Wrap text helper with line clamp & newline support
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
) {
  const paragraphs = text.split('\n');
  let lineCount = 0;

  for (let p = 0; p < paragraphs.length; p++) {
    const para = paragraphs[p];
    if (!para.trim()) {
      y += lineHeight * 0.5;
      continue;
    }
    const words = para.split(' ');
    let line = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && n > 0) {
        lineCount++;
        if (lineCount >= maxLines) {
          ctx.fillText(line.trim() + '...', x, y);
          return;
        }
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    if (line) {
      lineCount++;
      if (lineCount >= maxLines && p < paragraphs.length - 1) {
        ctx.fillText(line.trim() + '...', x, y);
        return;
      }
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
  }
}

// Async image loader supporting base64 and URLs without CORS taint
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const isDataOrBlob = src.startsWith('data:') || src.startsWith('blob:');
    if (!isDataOrBlob) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      if (img.crossOrigin) {
        const retry = new Image();
        retry.onload = () => resolve(retry);
        retry.onerror = () => reject(err);
        retry.src = src;
      } else {
        reject(err);
      }
    };
    img.src = src;
    if (img.complete && img.naturalWidth !== 0) {
      resolve(img);
    }
  });
}
