import React, { useState, useEffect } from 'react';
import { Printer, X, Loader2 } from 'lucide-react';
import { YugiohCardDna } from '../types/yugioh';
import { toJapaneseName } from '../utils/japaneseTransliterate';
import { renderFullCardToCanvas } from '../utils/cardCanvasRenderer';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardImageUrl: string;
  dna: YugiohCardDna;
  cardDisplayName?: string;
  japaneseName?: string;
  bottomCopyright?: string;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  cardImageUrl,
  dna,
  cardDisplayName,
  japaneseName,
  bottomCopyright = '@2026 Bapack-bapack Deadstar',
}) => {
  const [layoutMode, setLayoutMode] = useState<'single' | 'sheet9'>('single');
  const [printCardUrl, setPrintCardUrl] = useState<string>(cardImageUrl);
  const [isRendering, setIsRendering] = useState<boolean>(false);

  const effectiveName = cardDisplayName?.trim() || dna.name;
  const displayJp = japaneseName?.trim() || dna.japaneseName || toJapaneseName(effectiveName);

  useEffect(() => {
    let isCancelled = false;
    if (isOpen && cardImageUrl) {
      setIsRendering(true);
      renderFullCardToCanvas({
        cardDna: dna,
        imageUrl: cardImageUrl,
        cardDisplayName: effectiveName,
        japaneseName: displayJp,
        bottomCopyright,
      })
        .then((dataUrl) => {
          if (!isCancelled) {
            setPrintCardUrl(dataUrl);
            setIsRendering(false);
          }
        })
        .catch((e) => {
          console.warn('Canvas render error in print modal, fallback to raw image:', e);
          if (!isCancelled) {
            setPrintCardUrl(cardImageUrl);
            setIsRendering(false);
          }
        });
    }
    return () => {
      isCancelled = true;
    };
  }, [isOpen, cardImageUrl, dna, effectiveName, displayJp, bottomCopyright]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-100">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh] text-zinc-300 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2 font-serif">
                <span>Lembar Cetak Kartu Fisik Yu-Gi-Oh! TCG</span>
                <span className="font-mono text-amber-300 font-normal">
                  {displayJp} [{effectiveName}]
                </span>
              </h3>
              <p className="text-[11px] text-zinc-400">
                Ukuran standar kartu TCG (59×86 mm / rasio 2:3) untuk card sleeve resmi Yu-Gi-Oh!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Layout Toggle */}
        <div className="flex items-center justify-between bg-zinc-950 p-2 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Mode Tata Letak:</span>
            <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-zinc-800">
              <button
                type="button"
                onClick={() => setLayoutMode('single')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  layoutMode === 'single'
                    ? 'bg-zinc-800 text-amber-300 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1 Kartu (Skala 100% 59×86mm TCG)
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('sheet9')}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                  layoutMode === 'sheet9'
                    ? 'bg-zinc-800 text-amber-300 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Lembar 9 Kartu (3×3 Binder)
              </button>
            </div>
          </div>

          <div className="text-xs text-zinc-400 font-mono hidden sm:block">
            59 mm × 86 mm (2.32" × 3.38")
          </div>
        </div>

        {/* Printable Preview Sheet */}
        <div className="bg-white text-zinc-900 p-6 rounded-xl min-h-[400px] flex items-center justify-center overflow-auto print:p-0 print:m-0 print:border-none relative">
          {isRendering && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-10">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
              <p className="text-xs text-zinc-600 mt-2 font-medium">Merakit kartu fisik TCG 59×86 mm...</p>
            </div>
          )}

          {layoutMode === 'single' ? (
            <div className="relative p-4 border border-dashed border-zinc-300">
              {/* Corner Cutting Marks */}
              <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-zinc-900" />
              <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-zinc-900" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-zinc-900" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-zinc-900" />

              <div
                style={{ width: '59mm', height: '86mm' }}
                className="overflow-hidden rounded-xl shadow-lg border border-zinc-300 bg-black"
              >
                <img
                  src={printCardUrl}
                  alt={effectiveName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-[10px] text-zinc-500 text-center mt-2 font-mono">
                {displayJp} · 59mm × 86mm · {bottomCopyright}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  style={{ width: '42mm', height: '61.2mm' }}
                  className="overflow-hidden rounded-lg shadow-sm border border-zinc-300 relative group bg-black"
                >
                  <img
                    src={printCardUrl}
                    alt={`${effectiveName} #${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 text-[8px] bg-white/80 px-1 rounded font-mono">
                    #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Print instructions */}
        <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-xs text-zinc-400 space-y-1">
          <p className="font-medium text-amber-300 font-serif">Panduan Pencetakan Kartu TCG:</p>
          <ul className="list-disc list-inside space-y-0.5 text-[11px]">
            <li>Gunakan kertas glossy photo paper 260–300 gsm untuk feel kartu TCG original.</li>
            <li>Di jendela cetak printer, pastikan opsi <strong>Scale</strong> diatur ke <strong>100% (Actual size)</strong> agar pas dengan Japanese mini sleeve (59×86 mm).</li>
          </ul>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-200 font-medium text-xs transition-colors border border-zinc-700"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" /> Buka Menu Cetak
          </button>
        </div>
      </div>
    </div>
  );
};
