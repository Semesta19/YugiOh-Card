import React, { useState, useRef } from 'react';
import { 
  Download, 
  RotateCw, 
  Sparkles, 
  Loader2, 
  Share2, 
  Check,
  X,
  ImageDown
} from 'lucide-react';
import { toCanvas } from 'html-to-image';
import { GeneratedYugiohCard, YugiohCardDna, ATTRIBUTE_CONFIG } from '../types/yugioh';
import { toJapaneseName } from '../utils/japaneseTransliterate';
import {
  urlToBlob,
  isTouchDevice,
  canShareImageFile,
  shareImageToGallery,
  downloadBlob,
  extensionForBlob,
  safeFilename,
} from '../utils/imageUtils';
import { 
  renderFullCardToCanvas, 
  drawImageCover, 
  roundRect, 
  loadImage 
} from '../utils/cardCanvasRenderer';

interface CardDisplayProps {
  card: GeneratedYugiohCard | null;
  currentDna: YugiohCardDna;
  isLoading: boolean;
  onUpdateDna?: (updated: YugiohCardDna) => void;
  cardDisplayName?: string;
  japaneseName?: string;
  bottomCopyright?: string;
}

export const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  currentDna,
  isLoading,
  cardDisplayName,
  japaneseName,
  bottomCopyright,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [enableHolo, setEnableHolo] = useState(true);
  const [showShareToast, setShowShareToast] = useState(false);
  const [viewMode, setViewMode] = useState<'frame' | 'full-image'>('frame');
  const [isExporting, setIsExporting] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mobile Gallery Save Modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryImage, setGalleryImage] = useState<{ url: string; blob: Blob; filename: string } | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const frontCardRef = useRef<HTMLDivElement>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);
  const exportArtworkRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const activeName = (cardDisplayName?.trim() || currentDna.name || '').trim();
  const effectiveJpName = (
    japaneseName?.trim() || 
    currentDna.japaneseName?.trim() || 
    toJapaneseName(activeName)
  ).trim();

  const attribute = currentDna.attribute || 'DARK';
  const attrInfo = ATTRIBUTE_CONFIG[attribute] || ATTRIBUTE_CONFIG.DARK;
  const levelStars = Math.min(12, Math.max(1, currentDna.level || 7));

  // Determine current display effect text (prioritizes customized effectText)
  const displayEffectText =
    currentDna.effectText !== undefined && currentDna.effectText !== null && currentDna.effectText !== ''
      ? currentDna.effectText
      : (currentDna.abilities && currentDna.abilities.length > 0
          ? currentDna.abilities.join(' ')
          : (currentDna.flavorText || 'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GY.'));

  // Determine frame styling based on card type / archetype
  const getFrameTheme = () => {
    switch (currentDna.cardType) {
      case 'Normal':
        return {
          border: 'border-[#c69a58]',
          outerBg: 'bg-gradient-to-b from-[#d9aa68] via-[#c69550] to-[#aa7738]',
          innerBg: 'bg-[#e2bb82]',
          label: 'NORMAL MONSTER'
        };
      case 'Effect':
        return {
          border: 'border-[#b85c28]',
          outerBg: 'bg-gradient-to-b from-[#c86d35] via-[#b65825] to-[#924018]',
          innerBg: 'bg-[#d88049]',
          label: 'EFFECT MONSTER'
        };
      case 'Ritual':
        return {
          border: 'border-[#30689b]',
          outerBg: 'bg-gradient-to-b from-[#4085c4] via-[#316c9f] to-[#1f486d]',
          innerBg: 'bg-[#559ddc]',
          label: 'RITUAL MONSTER'
        };
      case 'Fusion':
        return {
          border: 'border-[#69397e]',
          outerBg: 'bg-gradient-to-b from-[#874b9f] via-[#6d3780] to-[#4c215b]',
          innerBg: 'bg-[#985cb1]',
          label: 'FUSION MONSTER'
        };
      case 'Synchro':
        return {
          border: 'border-[#d0d0d0]',
          outerBg: 'bg-gradient-to-b from-[#ffffff] via-[#e5e5e5] to-[#cccccc]',
          innerBg: 'bg-[#f4f4f4]',
          label: 'SYNCHRO MONSTER'
        };
      case 'Egyptian God':
        if (attribute === 'DIVINE' && /slifer/i.test(currentDna.name)) {
          return {
            border: 'border-[#8f1d24]',
            outerBg: 'bg-gradient-to-b from-[#a72830] via-[#8c1e25] to-[#5b1015]',
            innerBg: 'bg-[#bd363f]',
            label: 'DIVINE-BEAST'
          };
        } else if (attribute === 'DIVINE' && /obelisk/i.test(currentDna.name)) {
          return {
            border: 'border-[#1b3b6f]',
            outerBg: 'bg-gradient-to-b from-[#244f95] via-[#1a3d76] to-[#0f2448]',
            innerBg: 'bg-[#2f65be]',
            label: 'DIVINE-BEAST'
          };
        }
        return {
          border: 'border-[#b8860b]',
          outerBg: 'bg-gradient-to-b from-[#d4af37] via-[#b8860b] to-[#805e09]',
          innerBg: 'bg-[#e5c158]',
          label: 'DIVINE-BEAST'
        };
      default:
        return {
          border: 'border-[#b85c28]',
          outerBg: 'bg-gradient-to-b from-[#c86d35] via-[#b65825] to-[#924018]',
          innerBg: 'bg-[#d88049]',
          label: 'EFFECT MONSTER'
        };
    }
  };

  const frameTheme = getFrameTheme();

  // Mouse 3D perspective tilt (desktop cursor)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 14;
    const rotX = -((y - centerY) / centerY) * maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(Math.max(-20, Math.min(20, rotX)));
    setRotateY(Math.max(-20, Math.min(20, rotY)));
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // TOUCH GESTURE HANDLERS (Mobile / iPad finger touch tilt, NO card dragging/displacement)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || !cardRef.current) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    setIsInteracting(true);
    setIsHovered(true);

    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 16;
    const rotX = -((y - centerY) / centerY) * maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(Math.max(-22, Math.min(22, rotX)));
    setRotateY(Math.max(-22, Math.min(22, rotY)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1 || !cardRef.current) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const maxRotation = 16;
    const rotX = -((y - centerY) / centerY) * maxRotation;
    const rotY = ((x - centerX) / centerX) * maxRotation;

    setRotateX(Math.max(-22, Math.min(22, rotX)));
    setRotateY(Math.max(-22, Math.min(22, rotY)));
  };

  const handleTouchEnd = () => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    setIsInteracting(false);
    setIsHovered(false);

    // Quick tap toggles card flip
    if (start && Date.now() - start.time < 250) {
      setIsFlipped((prev) => !prev);
    }

    setRotateX(0);
    setRotateY(0);
  };

  // Tutup modal galeri & bersihkan blob URL
  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    setSaveStatus(null);
    setGalleryImage((prev) => {
      if (prev) URL.revokeObjectURL(prev.url);
      return null;
    });
  };

  /**
   * Kirim hasil ke pengguna:
   * - HP / tablet: buka modal dengan tombol "Simpan ke Galeri" (share sheet native).
   *   Share sheet harus dipicu tap langsung, jadi tidak bisa otomatis setelah proses async.
   * - Desktop: langsung download file.
   */
  const deliverImage = async (sourceUrl: string, baseSuffix: string) => {
    const blob = await urlToBlob(sourceUrl);
    const filename = safeFilename(activeName, baseSuffix, extensionForBlob(blob));

    if (isTouchDevice()) {
      setGalleryImage((prev) => {
        if (prev) URL.revokeObjectURL(prev.url);
        return { url: URL.createObjectURL(blob), blob, filename };
      });
      setSaveStatus(null);
      setShowGalleryModal(true);
    } else {
      downloadBlob(blob, filename);
    }
  };

  const handleSaveToGallery = async () => {
    if (!galleryImage) return;
    const result = await shareImageToGallery(galleryImage.blob, galleryImage.filename);
    if (result === 'shared') {
      setSaveStatus('Pilih "Simpan Gambar" / "Galeri" pada menu yang muncul.');
    } else if (result === 'unsupported') {
      // Browser tidak mendukung share file -> download biasa (masuk Downloads / Files)
      downloadBlob(galleryImage.blob, galleryImage.filename);
      setSaveStatus('Browser ini belum mendukung simpan langsung. Gambar diunduh; atau tekan lama gambar lalu pilih "Simpan ke Foto".');
    } else if (result === 'failed') {
      setSaveStatus('Gagal membuka menu simpan. Tekan lama pada gambar lalu pilih "Simpan ke Foto".');
    }
  };

  const handleTouchCancel = () => {
    touchStartRef.current = null;
    setIsInteracting(false);
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Download high-resolution PNG & Save to Mobile Gallery
  const handleDownload = async () => {
    if (!card?.imageUrl) return;

    if (viewMode === 'full-image') {
      try {
        setIsExporting(true);
        await deliverImage(card.imageUrl, 'Yugioh_Artwork');
      } catch (e) {
        console.warn('Artwork export error:', e);
      } finally {
        setIsExporting(false);
      }
      return;
    }

    try {
      setIsExporting(true);
      setRotateX(0);
      setRotateY(0);
      setIsHovered(false);

      let finalDataUrl = '';

      // METHOD 1: High-fidelity DOM to Canvas + Native 2D Artwork Compositing
      if (exportCardRef.current && exportArtworkRef.current) {
        try {
          if (typeof document !== 'undefined' && document.fonts) {
            await document.fonts.ready;
          }

          const exportCardEl = exportCardRef.current;
          const exportArtEl = exportArtworkRef.current;

          // Pixel ratio 3 bisa terlalu berat di HP lama (batas ukuran canvas) -> 2 di perangkat sentuh
          const pixelRatio = isTouchDevice() ? 2 : 3;
          const canvas = await toCanvas(exportCardEl, {
            pixelRatio,
            cacheBust: false,
            filter: (node) => {
              if ((node as HTMLElement)?.dataset?.exportImg === 'true') {
                return false;
              }
              return true;
            },
          });

          const cardRect = exportCardEl.getBoundingClientRect();
          const artRect = exportArtEl.getBoundingClientRect();
          const ratio = canvas.width / cardRect.width;

          const artX = (artRect.left - cardRect.left) * ratio;
          const artY = (artRect.top - cardRect.top) * ratio;
          const artW = artRect.width * ratio;
          const artH = artRect.height * ratio;

          const img = await loadImage(card.imageUrl);
          const ctx = canvas.getContext('2d');

          if (ctx) {
            ctx.save();
            roundRect(ctx, artX, artY, artW, artH, 10 * (ratio / 3));
            ctx.clip();

            drawImageCover(ctx, img, artX, artY, artW, artH);

            ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.lineWidth = 8;
            roundRect(ctx, artX + 4, artY + 4, artW - 8, artH - 8, 8);
            ctx.stroke();

            if (enableHolo) {
              const holoGrad = ctx.createLinearGradient(artX, artY, artX + artW, artY + artH);
              holoGrad.addColorStop(0, 'rgba(255,255,255,0.05)');
              holoGrad.addColorStop(0.2, 'rgba(6,182,212,0.12)');
              holoGrad.addColorStop(0.4, 'rgba(236,72,153,0.14)');
              holoGrad.addColorStop(0.6, 'rgba(234,179,8,0.12)');
              holoGrad.addColorStop(0.8, 'rgba(168,85,247,0.12)');
              holoGrad.addColorStop(1, 'rgba(255,255,255,0.05)');
              ctx.fillStyle = holoGrad;
              ctx.fillRect(artX, artY, artW, artH);
            }

            ctx.restore();
          }

          finalDataUrl = canvas.toDataURL('image/png');
        } catch (domErr) {
          console.warn('DOM to Canvas export fallback:', domErr);
        }
      }

      // METHOD 2: Proportional Canvas Renderer Fallback
      if (!finalDataUrl) {
        finalDataUrl = await renderFullCardToCanvas({
          cardDna: currentDna,
          imageUrl: card.imageUrl,
          cardDisplayName: activeName,
          japaneseName: effectiveJpName,
          bottomCopyright: bottomCopyright || '@2026 Bapack-bapack Deadstar',
        });
      }

      await deliverImage(finalDataUrl, 'Yugioh_Card');
    } catch (e) {
      console.warn('Card export error, using image fallback:', e);
      try {
        await deliverImage(card.imageUrl, 'Yugioh');
      } catch (fallbackErr) {
        console.warn('Fallback export failed:', fallbackErr);
      }
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-3.5">
      {/* View Mode iOS Segmented Pill */}
      {card?.imageUrl && (
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-md text-xs">
          <button
            type="button"
            onClick={() => setViewMode('frame')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'frame'
                ? 'bg-white/20 text-white font-bold shadow-sm backdrop-blur-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Kartu TCG</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('full-image')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              viewMode === 'full-image'
                ? 'bg-white/20 text-white font-bold shadow-sm backdrop-blur-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>Gambar Saja</span>
          </button>
        </div>
      )}

      {/* 3D Interactive Card Stage */}
      <div
        className="w-full flex flex-col items-center justify-center py-1 select-none"
        style={{ perspective: '1200px' }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
            transformStyle: 'preserve-3d',
            transition: isInteracting
              ? 'none'
              : 'transform 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.25)',
            touchAction: 'pan-y',
          }}
          className="relative w-[min(100%,320px)] sm:w-[350px] md:w-[380px] aspect-[59/86] rounded-[18px] cursor-pointer shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] group will-change-transform"
        >
          {/* FRONT OF YU-GI-OH! CARD */}
          {viewMode === 'full-image' && card?.imageUrl ? (
            /* STANDALONE IMAGE VIEW */
            <div
              className="absolute inset-0 rounded-[18px] overflow-hidden bg-black flex items-center justify-center shadow-2xl border-2 border-amber-600/60"
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: isHovered
                  ? `0 0 35px ${attrInfo.glow}, 0 20px 40px rgba(0,0,0,0.8)`
                  : '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={card.imageUrl}
                alt={activeName}
                className="w-full h-full object-cover rounded-[16px]"
              />
              {enableHolo && <div className="absolute inset-0 secret-rare-foil rounded-[16px] z-20 pointer-events-none" />}
              {enableHolo && <div className="absolute inset-0 holo-overlay opacity-35 rounded-[16px] z-20 pointer-events-none" />}
            </div>
          ) : (
            /* AUTHENTIC TCG CARD FRAME */
            <div
              ref={frontCardRef}
              className={`absolute inset-0 rounded-[18px] p-2.5 sm:p-3 overflow-hidden border-2 ${frameTheme.border} ${frameTheme.outerBg} flex flex-col justify-between shadow-2xl transition-all duration-300 font-serif`}
              style={{
                backfaceVisibility: 'hidden',
                boxShadow: isExporting
                  ? 'none'
                  : isHovered
                  ? `0 0 35px ${attrInfo.glow}, 0 20px 40px rgba(0,0,0,0.8)`
                  : '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              {/* Textured Cardstock Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />

              {/* Secret Rare Diagonal Foil Sheen */}
              {enableHolo && <div className="absolute inset-0 secret-rare-foil rounded-[16px] z-20 pointer-events-none" />}
              {enableHolo && <div className="absolute inset-0 holo-overlay opacity-35 rounded-[16px] z-20 pointer-events-none" />}

              {/* CARD HEADER */}
              <div className="relative z-10 bg-gradient-to-b from-[#f8eddc] via-[#edd8ba] to-[#e0c49e] rounded px-2.5 py-1 border-2 border-[#5c3514] shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-between gap-1.5">
                <div className="flex flex-col overflow-hidden min-w-0">
                  <h2 className="text-xs sm:text-sm font-black font-serif text-[#160d05] tracking-wide truncate drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                    {effectiveJpName}
                  </h2>
                  {activeName && activeName.toLowerCase() !== effectiveJpName.toLowerCase() && (
                    <span className="text-[8px] sm:text-[8.5px] font-sans font-bold text-[#684321] tracking-wider uppercase truncate">
                      {activeName}
                    </span>
                  )}
                </div>

                <div 
                  className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-br ${attrInfo.bg} border-2 border-amber-300/90 flex flex-col items-center justify-center shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.7)]`}
                  title={`Attribute: ${attribute}`}
                >
                  <span className="text-[6px] font-sans font-black tracking-tighter text-white/90 leading-none">
                    {attribute}
                  </span>
                  <span className="text-[12px] font-bold font-serif leading-none drop-shadow text-white">
                    {attrInfo.kanji}
                  </span>
                </div>
              </div>

              {/* LEVEL STARS ROW */}
              <div className="relative z-10 flex items-center justify-end gap-0.5 px-1 py-0.5">
                {Array.from({ length: levelStars }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-red-600 border border-amber-100 flex items-center justify-center shadow-[0_0_4px_rgba(239,68,68,0.9)]"
                  >
                    <span className="text-[9px] text-yellow-100 font-bold leading-none drop-shadow">★</span>
                  </div>
                ))}
              </div>

              {/* MAIN ARTWORK WINDOW */}
              <div className="relative z-10 w-full aspect-[1/1] sm:aspect-[1.04/1] rounded overflow-hidden border-[3px] border-[#7d7162] bg-[#120f0c] shadow-[inset_0_0_12px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.5)] flex items-center justify-center">
                {card?.imageUrl ? (
                  <>
                    <img
                      src={card.imageUrl}
                      alt={activeName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.85)] pointer-events-none" />
                  </>
                ) : isLoading ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-[#170e17] w-full h-full">
                    <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
                    <p className="text-xs text-amber-200 font-serif font-bold">
                      Memproses Kartu...
                    </p>
                  </div>
                ) : (
                  <div className="relative w-full h-full bg-gradient-to-b from-[#241220] via-[#150a13] to-[#0c050b] flex flex-col items-center justify-center p-3 text-center overflow-hidden">
                    <div className="w-24 h-24 rounded-full border border-amber-400/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-amber-400/30" />
                    </div>
                  </div>
                )}
              </div>

              {/* SET CODE */}
              <div className="relative z-10 flex justify-end px-0.5 -mt-0.5 mb-0.5">
                <span className="text-[8px] font-mono font-bold text-[#1f1309] tracking-wider">
                  {currentDna.cardSetCode || 'SS01-ENA04'}
                </span>
              </div>

              {/* EFFECT / LORE BOX */}
              <div 
                onClick={(e) => e.stopPropagation()}
                className="relative z-10 bg-gradient-to-b from-[#f9f2e3] via-[#f2e3c9] to-[#e5d2b1] rounded border-2 border-[#5c3514] p-1.5 flex flex-col justify-between text-left shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] min-h-[75px]"
              >
                <div className="text-[9.5px] sm:text-[10.5px] font-black font-serif text-[#160d05] border-b border-[#a88a64] pb-0.5 tracking-tight flex items-center justify-between">
                  <span>[{currentDna.monsterType || 'Spellcaster'} / {currentDna.cardType || 'Effect'}]</span>
                </div>

                <div className="text-[8px] sm:text-[8.5px] leading-tight text-[#22150a] font-serif py-1 max-h-[50px] overflow-y-auto pr-0.5">
                  <p className="line-clamp-3">
                    {displayEffectText}
                  </p>
                </div>

                <div className="flex items-center justify-end pt-0.5 border-t border-[#a88a64] text-[9.5px] sm:text-[10.5px] font-serif font-black tracking-tight text-[#160d05]">
                  <div className="flex items-center gap-2">
                    <span>
                      ATK / <span className="text-[11px] font-bold">{currentDna.atk || '2000'}</span>
                    </span>
                    <span>
                      DEF / <span className="text-[11px] font-bold">{currentDna.def || '1700'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* CARD FOOTER */}
              <div className="relative z-10 flex items-center justify-between px-0.5 pt-0.5 text-[7px] font-sans font-bold text-[#1f1309] leading-none">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono">{currentDna.cardPasscode || '38033121'}</span>
                  <span className="font-serif italic font-normal">1st Edition</span>
                </div>

                <span className="truncate max-w-[170px] text-center font-serif text-[7.5px]">
                  {bottomCopyright || '@2026 Bapack-bapack Deadstar'}
                </span>

                <div
                  className="w-3.5 h-3.5 rounded-[1px] bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-500 border border-amber-600 shadow-sm flex items-center justify-center text-[7px] text-amber-950 font-bold shrink-0"
                >
                  👁
                </div>
              </div>
            </div>
          )}

          {/* BACK OF YU-GI-OH! CARD */}
          <div
            className="absolute inset-0 rounded-[18px] p-3 overflow-hidden bg-[#24130a] border-4 border-[#3b1e10] flex flex-col items-center justify-center shadow-2xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-[88%] h-[92%] rounded-xl border-2 border-[#542d17] bg-gradient-to-br from-[#170a04] via-[#3a1a09] to-[#0f0602] relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
              <div className="absolute w-44 h-44 rounded-full border border-amber-500/20 animate-spin [animation-duration:30s]" />
              <div className="absolute w-32 h-32 rounded-full border border-amber-500/30 animate-spin [animation-duration:20s]" />
              <div className="absolute w-20 h-20 rounded-full border border-amber-400/40" />

              <div className="relative z-10 px-4 py-2 rounded-lg bg-black/80 border border-amber-500/60 shadow-xl flex flex-col items-center">
                <span className="text-amber-400 font-serif font-black text-sm tracking-widest">
                  遊☆戯☆王
                </span>
                <span className="text-[8px] font-mono text-zinc-300 tracking-wider">
                  OFFICIAL CARD GAME
                </span>
                <span className="text-[7px] text-amber-300/70 font-mono mt-0.5">
                  KONAMI / SHUEISHA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar (NO CETAK FISIK, iOS Glassmorphism) */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-1 w-full">
        {/* Toggle Foil */}
        <button
          type="button"
          onClick={() => setEnableHolo(!enableHolo)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            enableHolo
              ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
              : 'ios-glass-subtle text-white/60 hover:text-white border border-white/[0.08]'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Foil: {enableHolo ? 'ON' : 'OFF'}</span>
        </button>

        {/* Rotate Front/Back */}
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium ios-glass-subtle hover:bg-white/[0.1] text-white/80 hover:text-white border border-white/[0.08] transition-all"
        >
          <RotateCw className="w-3.5 h-3.5 text-white/70" />
          <span>Balik</span>
        </button>

        {/* Download Button (Prominent) */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={!card?.imageUrl || isExporting}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 border border-amber-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_18px_rgba(245,158,11,0.35)] transition-all cursor-pointer font-serif"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
              <span>Menyiapkan...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-zinc-950" />
              <span>Download Kartu</span>
            </>
          )}
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          className="flex items-center gap-1.5 p-2 rounded-xl text-xs text-white/60 hover:text-white ios-glass-subtle border border-white/[0.08] transition-all"
          title="Salin Tautan"
        >
          {showShareToast ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {showShareToast && (
        <div className="text-[11px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full animate-in fade-in backdrop-blur-md">
          Tautan tersalin
        </div>
      )}

      {/* MOBILE GALLERY SAVE MODAL (iOS Glassmorphism) */}
      {showGalleryModal && galleryImage && (
        <div
          onClick={closeGalleryModal}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-black/80 backdrop-blur-xl animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="ios-glass rounded-3xl max-w-sm w-full p-4 space-y-3 max-h-[92dvh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h3 className="text-xs font-semibold text-white/90 uppercase tracking-wide font-serif">
                Kartu Yu-Gi-Oh!
              </h3>
              <button
                type="button"
                onClick={closeGalleryModal}
                aria-label="Tutup"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center p-1 bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-inner">
              {/* Tanpa select-none supaya tekan-lama -> "Simpan ke Foto" tetap bisa di iOS/Android */}
              <img
                src={galleryImage.url}
                alt={activeName}
                className="max-h-[50dvh] w-auto max-w-full object-contain rounded-xl [-webkit-touch-callout:default]"
              />
            </div>

            <button
              type="button"
              onClick={handleSaveToGallery}
              className="w-full py-3 px-3 min-h-[48px] rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all font-serif"
            >
              <ImageDown className="w-4 h-4" />
              <span>Simpan ke Galeri</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => downloadBlob(galleryImage.blob, galleryImage.filename)}
                className="py-2.5 px-3 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                type="button"
                onClick={closeGalleryModal}
                className="py-2.5 px-3 min-h-[44px] rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-xs flex items-center justify-center transition-colors"
              >
                <span>Tutup</span>
              </button>
            </div>

            <p className="text-[11px] leading-relaxed text-white/50 text-center">
              {saveStatus ||
                (canShareImageFile(galleryImage.blob, galleryImage.filename)
                  ? 'Ketuk "Simpan ke Galeri", lalu pilih "Simpan Gambar" (iPhone) atau Galeri/Foto (Android).'
                  : 'Tekan lama pada gambar, lalu pilih "Simpan ke Foto" / "Download gambar".')}
            </p>
          </div>
        </div>
      )}

      {/* OFFSCREEN PRISTINE EXPORT CONTAINER (100% matched, fixed 380px, 59:86 aspect ratio) */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: '0',
          width: '380px',
          height: '554px',
          pointerEvents: 'none',
          zIndex: -999,
          visibility: 'visible',
        }}
      >
        <div
          ref={exportCardRef}
          className={`w-[380px] h-[554px] rounded-[18px] p-3 overflow-hidden border-2 ${frameTheme.border} ${frameTheme.outerBg} flex flex-col justify-between font-serif relative`}
          style={{
            boxSizing: 'border-box',
          }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px]" />

          {/* CARD HEADER */}
          <div className="relative z-10 bg-gradient-to-b from-[#f8eddc] via-[#edd8ba] to-[#e0c49e] rounded px-2.5 py-1 border-2 border-[#5c3514] shadow-[inset_0_1px_3px_rgba(0,0,0,0.35),0_1px_2px_rgba(0,0,0,0.4)] flex items-center justify-between gap-1.5">
            <div className="flex flex-col overflow-hidden min-w-0">
              <h2 className="text-sm font-black font-serif text-[#160d05] tracking-wide truncate">
                {effectiveJpName}
              </h2>
              {activeName && activeName.toLowerCase() !== effectiveJpName.toLowerCase() && (
                <span className="text-[8.5px] font-sans font-bold text-[#684321] tracking-wider uppercase truncate">
                  {activeName}
                </span>
              )}
            </div>

            <div 
              className={`w-7.5 h-7.5 rounded-full bg-gradient-to-br ${attrInfo.bg} border-2 border-amber-300/90 flex flex-col items-center justify-center shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.7)]`}
            >
              <span className="text-[6px] font-sans font-black tracking-tighter text-white/90 leading-none">
                {attribute}
              </span>
              <span className="text-[12px] font-bold font-serif leading-none text-white">
                {attrInfo.kanji}
              </span>
            </div>
          </div>

          {/* LEVEL STARS ROW */}
          <div className="relative z-10 flex items-center justify-end gap-0.5 px-1 py-0.5">
            {Array.from({ length: levelStars }).map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-500 to-red-600 border border-amber-100 flex items-center justify-center shadow-[0_0_4px_rgba(239,68,68,0.9)]"
              >
                <span className="text-[9px] text-yellow-100 font-bold leading-none drop-shadow">★</span>
              </div>
            ))}
          </div>

          {/* MAIN ARTWORK WINDOW (Target for Canvas 2D Blit) */}
          <div 
            ref={exportArtworkRef}
            className="relative z-10 w-full aspect-[1.04/1] rounded overflow-hidden border-[3px] border-[#7d7162] bg-[#120f0c] shadow-[inset_0_0_12px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            <div data-export-img="true" className="w-full h-full bg-[#120f0c]" />
          </div>

          {/* SET CODE */}
          <div className="relative z-10 flex justify-end px-0.5 -mt-0.5 mb-0.5">
            <span className="text-[8px] font-mono font-bold text-[#1f1309] tracking-wider">
              {currentDna.cardSetCode || 'SS01-ENA04'}
            </span>
          </div>

          {/* EFFECT / LORE BOX */}
          <div className="relative z-10 bg-gradient-to-b from-[#f9f2e3] via-[#f2e3c9] to-[#e5d2b1] rounded border-2 border-[#5c3514] p-1.5 flex flex-col justify-between text-left shadow-[inset_0_1px_3px_rgba(0,0,0,0.25)] min-h-[75px]">
            <div className="text-[10.5px] font-black font-serif text-[#160d05] border-b border-[#a88a64] pb-0.5 tracking-tight flex items-center justify-between">
              <span>[{currentDna.monsterType || 'Spellcaster'} / {currentDna.cardType || 'Effect'}]</span>
            </div>

            <div className="text-[8.5px] leading-tight text-[#22150a] font-serif py-1 max-h-[50px] overflow-hidden pr-0.5">
              <p className="line-clamp-3">
                {displayEffectText}
              </p>
            </div>

            <div className="flex items-center justify-end pt-0.5 border-t border-[#a88a64] text-[10.5px] font-serif font-black tracking-tight text-[#160d05]">
              <div className="flex items-center gap-2">
                <span>
                  ATK / <span className="text-[11px] font-bold">{currentDna.atk || '2000'}</span>
                </span>
                <span>
                  DEF / <span className="text-[11px] font-bold">{currentDna.def || '1700'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* CARD FOOTER */}
          <div className="relative z-10 flex items-center justify-between px-0.5 pt-0.5 text-[7px] font-sans font-bold text-[#1f1309] leading-none">
            <div className="flex items-center gap-1.5">
              <span className="font-mono">{currentDna.cardPasscode || '38033121'}</span>
              <span className="font-serif italic font-normal">1st Edition</span>
            </div>

            <span className="truncate max-w-[170px] text-center font-serif text-[7.5px]">
              {bottomCopyright || '@2026 Bapack-bapack Deadstar'}
            </span>

            <div className="w-3.5 h-3.5 rounded-[1px] bg-gradient-to-tr from-amber-300 via-yellow-100 to-amber-500 border border-amber-600 shadow-sm flex items-center justify-center text-[7px] text-amber-950 font-bold shrink-0">
              👁
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};