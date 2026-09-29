import React from 'react';
import { Languages, RotateCcw } from 'lucide-react';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface CardNameSectionProps {
  cardDisplayName: string;
  onChangeCardDisplayName: (name: string) => void;
  japaneseName: string;
  onChangeJapaneseName: (japanese: string) => void;
  defaultName?: string;
  defaultJapaneseName?: string;
}

export const CardNameSection: React.FC<CardNameSectionProps> = ({
  cardDisplayName,
  onChangeCardDisplayName,
  japaneseName,
  onChangeJapaneseName,
  defaultName = '',
  defaultJapaneseName = '',
}) => {
  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
      <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
        Nama Kartu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Latin Name */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-white/70 block">
            Nama (Latin)
          </label>
          <input
            type="text"
            value={cardDisplayName}
            onChange={(e) => {
              const val = e.target.value;
              onChangeCardDisplayName(val);
              onChangeJapaneseName(toJapaneseName(val));
            }}
            placeholder="Dark Magician Girl..."
            className="w-full px-3.5 py-2.5 ios-glass-input rounded-xl text-xs font-medium text-white placeholder:text-zinc-500 focus:outline-none"
          />
        </div>

        {/* Japanese Name */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium text-white/70 flex items-center gap-1">
              <Languages className="w-3 h-3 text-amber-400" />
              <span>Aksara Jepang</span>
            </label>
            {defaultName && cardDisplayName !== defaultName && (
              <button
                type="button"
                onClick={() => {
                  onChangeCardDisplayName(defaultName);
                  onChangeJapaneseName(defaultJapaneseName || toJapaneseName(defaultName));
                }}
                className="text-[10px] text-white/50 hover:text-white flex items-center gap-1 transition-colors"
                title="Reset nama"
              >
                <RotateCcw className="w-2.5 h-2.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
          <input
            type="text"
            value={japaneseName}
            onChange={(e) => onChangeJapaneseName(e.target.value)}
            placeholder="ブラック・マジシャン・ガール..."
            className="w-full px-3.5 py-2.5 ios-glass-input rounded-xl text-xs font-mono font-bold text-amber-300 placeholder:text-zinc-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
