import React from 'react';
import { Trash2 } from 'lucide-react';
import { GeneratedYugiohCard } from '../types/yugioh';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface CardHistoryProps {
  cards: GeneratedYugiohCard[];
  onSelectCard: (card: GeneratedYugiohCard) => void;
  onClearHistory: () => void;
}

export const CardHistory: React.FC<CardHistoryProps> = ({
  cards,
  onSelectCard,
  onClearHistory,
}) => {
  if (cards.length === 0) return null;

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
            Riwayat
          </h2>
          <span className="text-[11px] text-white/50">
            ({cards.length})
          </span>
        </div>

        <button
          type="button"
          onClick={onClearHistory}
          className="text-xs text-white/50 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Hapus</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-1">
        {cards.map((card) => {
          const effectiveName =
            card.cardDisplayName || card.characterName || (card as any).pokemonName || 'Yu-Gi-Oh Card';
          const jpName =
            card.japaneseName || card.cardDna?.japaneseName || toJapaneseName(effectiveName);

          return (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-amber-400/60 bg-black/40 transition-all flex flex-col shadow-sm hover:shadow-[0_0_16px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="aspect-[59/86] w-full overflow-hidden bg-black relative">
                <img
                  src={card.imageUrl}
                  alt={effectiveName}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute top-1.5 right-1.5">
                  <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-black/60 text-amber-300 border border-white/15 backdrop-blur-md">
                    {card.cardDna?.attribute || 'TCG'}
                  </span>
                </div>
                <div className="absolute bottom-1.5 left-2 right-2 text-left">
                  <p className="text-[11px] font-bold font-serif text-white truncate">
                    {effectiveName}
                  </p>
                  <p className="text-[9.5px] text-amber-300/80 font-mono truncate">
                    {jpName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
