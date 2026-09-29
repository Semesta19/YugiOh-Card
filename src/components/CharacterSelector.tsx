import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { YugiohCardDna, YugiohAttribute } from '../types/yugioh';
import { YUGIOH_CARD_PRESETS, createDefaultYugiohCardForName } from '../data/yugiohCards';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface CharacterSelectorProps {
  currentDna: YugiohCardDna;
  onSelectDna: (dna: YugiohCardDna) => void;
  onCustomGenerateDna: (name: string) => Promise<void>;
  isGeneratingDna: boolean;
  onNameChange?: (name: string, japanese: string) => void;
}

const ATTRIBUTES: (YugiohAttribute | 'All')[] = [
  'All',
  'DARK',
  'LIGHT',
  'DIVINE',
  'FIRE',
  'WATER',
  'WIND',
  'EARTH',
];

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  currentDna,
  onSelectDna,
  onCustomGenerateDna,
  isGeneratingDna,
  onNameChange,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttrFilter, setSelectedAttrFilter] = useState<string>('All');
  const [customInputName, setCustomInputName] = useState('');

  const filteredPresets = YUGIOH_CARD_PRESETS.filter((preset) => {
    const matchesSearch =
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.characterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.monsterType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAttr =
      selectedAttrFilter === 'All' || preset.attribute === selectedAttrFilter;

    return matchesSearch && matchesAttr;
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputName.trim()) return;
    const newCard = createDefaultYugiohCardForName(customInputName.trim());
    onSelectDna(newCard);
    if (onNameChange) {
      onNameChange(newCard.name, toJapaneseName(newCard.name));
    }
  };

  const handleAiCraft = async () => {
    if (!customInputName.trim()) return;
    await onCustomGenerateDna(customInputName.trim());
  };

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3.5">
      {/* Header with iOS Segmented Control */}
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
          Pilih Karakter
        </h2>

        {/* iOS Segmented Pill */}
        <div className="flex p-0.5 rounded-xl bg-white/[0.06] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'presets'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Populer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'custom'
                ? 'bg-white/20 text-white shadow-sm backdrop-blur-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Kustomisasi
          </button>
        </div>
      </div>

      {/* Tab 1: Populer Presets */}
      {activeTab === 'presets' && (
        <div className="space-y-3">
          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari monster..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 ios-glass-input rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {ATTRIBUTES.map((attr) => (
                <button
                  key={attr}
                  type="button"
                  onClick={() => setSelectedAttrFilter(attr)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                    selectedAttrFilter === attr
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                      : 'bg-white/[0.04] text-white/60 border border-white/[0.06] hover:text-white'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          {/* Monster Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[260px] overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = currentDna.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelectDna(preset);
                    if (onNameChange) {
                      onNameChange(preset.name, preset.japaneseName || toJapaneseName(preset.name));
                    }
                  }}
                  className={`relative text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400/60 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'ios-glass-subtle hover:bg-white/[0.07] border-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-white/90 truncate font-serif">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      ★{preset.level}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-amber-300/80 truncate">
                    {preset.japaneseName || toJapaneseName(preset.name)}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-white/50 mt-2 pt-1 border-t border-white/[0.08]">
                    <span className="font-mono text-white/70">{preset.attribute}</span>
                    <span className="font-serif text-amber-200">ATK {preset.atk}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Kustomisasi */}
      {activeTab === 'custom' && (
        <div className="space-y-3">
          <form onSubmit={handleCustomSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Ketik nama karakter..."
              value={customInputName}
              onChange={(e) => setCustomInputName(e.target.value)}
              className="flex-1 px-3.5 py-2.5 ios-glass-input rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!customInputName.trim()}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 disabled:opacity-40 text-white text-xs font-medium border border-white/10 transition-all cursor-pointer"
            >
              Gunakan
            </button>
          </form>

          <div className="flex items-center justify-between p-3 rounded-xl ios-glass-subtle border border-white/[0.08] gap-2">
            <span className="text-xs text-white/80 font-medium">
              AI Auto-Craft Data Kartu
            </span>

            <button
              type="button"
              onClick={handleAiCraft}
              disabled={!customInputName.trim() || isGeneratingDna}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-semibold disabled:opacity-40 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isGeneratingDna ? 'Meracik...' : 'AI Craft'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
