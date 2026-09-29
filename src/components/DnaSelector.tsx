import React, { useState } from 'react';
import {
  Search,
  Wand2,
  Swords,
  Camera,
  Layers,
  Sparkles,
  Edit3,
  Languages,
  ShieldAlert,
} from 'lucide-react';
import { YugiohCardDna, YugiohAttribute } from '../types/yugioh';
import { YUGIOH_CARD_PRESETS, createDefaultYugiohCardForName } from '../data/yugiohCards';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface DnaSelectorProps {
  cardDisplayName: string;
  onChangeCardDisplayName: (name: string) => void;
  japaneseName: string;
  onChangeJapaneseName: (japanese: string) => void;
  currentDna: YugiohCardDna;
  onSelectDna: (dna: YugiohCardDna) => void;
  onCustomGenerateDna: (name: string) => Promise<void>;
  isGeneratingDna: boolean;
}

const ATTRIBUTES: (YugiohAttribute | 'All')[] = [
  'All',
  'DARK',
  'LIGHT',
  'DIVINE',
  'FIRE',
  'WATER',
  'WIND',
  'EARTH'
];

export const DnaSelector: React.FC<DnaSelectorProps> = ({
  cardDisplayName,
  onChangeCardDisplayName,
  japaneseName,
  onChangeJapaneseName,
  currentDna,
  onSelectDna,
  onCustomGenerateDna,
  isGeneratingDna,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttrFilter, setSelectedAttrFilter] = useState<string>('All');
  const [customInputName, setCustomInputName] = useState('');

  // Filter presets
  const filteredPresets = YUGIOH_CARD_PRESETS.filter((preset) => {
    const matchesSearch =
      preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.characterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      preset.monsterType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAttr =
      selectedAttrFilter === 'All' || preset.attribute === selectedAttrFilter;

    return matchesSearch && matchesAttr;
  });

  const handleCustomTypeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInputName.trim()) return;
    const newCard = createDefaultYugiohCardForName(customInputName.trim());
    onSelectDna(newCard);
    if (!cardDisplayName.trim()) {
      onChangeCardDisplayName(newCard.name);
      onChangeJapaneseName(toJapaneseName(newCard.name));
    }
  };

  const handleAiCraftSubmit = async () => {
    if (!customInputName.trim()) return;
    await onCustomGenerateDna(customInputName.trim());
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* NAMA KARTU */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
        <label className="text-xs font-semibold text-zinc-100 flex items-center gap-2 font-serif">
          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Nama Kartu</span>
        </label>

        {/* Dual Input: Card Title & Japanese Katakana/Kanji Script */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Card Title Input */}
          <div className="space-y-1">
            <span className="text-[10px] font-medium text-zinc-400 block">
              Nama:
            </span>
            <input
              type="text"
              value={cardDisplayName}
              onChange={(e) => {
                const val = e.target.value;
                onChangeCardDisplayName(val);
                onChangeJapaneseName(toJapaneseName(val));
              }}
              placeholder={`Contoh: ${currentDna.name}...`}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-semibold text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Japanese Katakana Script Input */}
          <div className="space-y-1">
            <span className="text-[10px] font-medium text-zinc-400 block flex items-center gap-1">
              <Languages className="w-3 h-3 text-amber-400" /> Aksara Jepang:
            </span>
            <div className="flex gap-1.5">
              <input
                type="text"
                value={japaneseName}
                onChange={(e) => onChangeJapaneseName(e.target.value)}
                placeholder="アジズ, ブラック・マジシャン..."
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-mono font-bold text-zinc-100 placeholder-zinc-500 focus:outline-none transition-colors"
              />
              {cardDisplayName !== currentDna.name && (
                <button
                  type="button"
                  onClick={() => {
                    onChangeCardDisplayName(currentDna.name);
                    onChangeJapaneseName(currentDna.japaneseName || toJapaneseName(currentDna.name));
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-750 text-[11px] text-zinc-300 transition-colors whitespace-nowrap"
                  title="Reset ke nama asli"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PILIH KARAKTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-300">
            <Swords className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-zinc-100 tracking-tight font-serif">
            Pilih Karakter
          </h2>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex p-0.5 rounded-lg bg-zinc-950 border border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'presets'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Karakter Populer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Wand2 className="w-3 h-3 text-amber-400" /> Kostumisasi
          </button>
        </div>
      </div>

      {/* Mode 1: Presets Library */}
      {activeTab === 'presets' && (
        <div className="space-y-3">
          {/* Search & Attribute Filters */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari monster (Blue-Eyes, Dark Magician, Slifer, Exodia, Red-Eyes...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-500/60"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {ATTRIBUTES.map((attr) => (
                <button
                  key={attr}
                  type="button"
                  onClick={() => setSelectedAttrFilter(attr)}
                  className={`px-2 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors ${
                    selectedAttrFilter === attr
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-zinc-950 text-zinc-400 border border-zinc-850 hover:border-zinc-750'
                  }`}
                >
                  {attr}
                </button>
              ))}
            </div>
          </div>

          {/* Monster Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[290px] overflow-y-auto pr-1">
            {filteredPresets.map((preset) => {
              const isSelected = currentDna.id === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelectDna(preset);
                    if (!cardDisplayName || cardDisplayName === currentDna.name) {
                      onChangeCardDisplayName(preset.name);
                      onChangeJapaneseName(preset.japaneseName || toJapaneseName(preset.name));
                    }
                  }}
                  className={`relative text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-950/20 border-amber-500/80 text-zinc-100 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-zinc-100 truncate font-serif">
                      {preset.name}
                    </span>
                    <span className="text-[10px] font-mono text-amber-400">
                      ★{preset.level}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-amber-300/70 truncate">
                    {preset.japaneseName || toJapaneseName(preset.name)}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mt-2 pt-1 border-t border-zinc-850">
                    <span className="font-mono text-zinc-300">{preset.attribute}</span>
                    <span className="font-serif text-amber-200">ATK {preset.atk}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mode 2: Custom Typed Character */}
      {activeTab === 'custom' && (
        <div className="space-y-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-200 block font-serif">
              Nama Karakter atau Monster Custom
            </label>
            <p className="text-[11px] text-zinc-400">
              Ketik nama monster Yu-Gi-Oh! atau karakter favoritmu (contoh: Blue-Eyes Ultimate Dragon, Judai Yuki, Cyber End Dragon, Yugi Muto).
            </p>
          </div>

          <form onSubmit={handleCustomTypeSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Contoh: Blue-Eyes Ultimate Dragon, Dark Paladin, Black Skull Dragon..."
              value={customInputName}
              onChange={(e) => setCustomInputName(e.target.value)}
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-750 rounded-lg text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!customInputName.trim()}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-100 rounded-lg text-xs font-medium transition-colors"
            >
              Gunakan Karakter
            </button>
          </form>

          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <span className="text-xs font-medium text-amber-300 flex items-center gap-1.5 justify-center sm:justify-start font-serif">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" /> AI Auto-Craft Yu-Gi-Oh! Card Data
              </span>
              <p className="text-[11px] text-zinc-400">
                AI meracik ATK/DEF, Attribute, Level Stars, efek TCG, kostum armor, dan efek hologram.
              </p>
            </div>

            <button
              type="button"
              disabled={!customInputName.trim() || isGeneratingDna}
              onClick={handleAiCraftSubmit}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.25)] transition-all"
            >
              {isGeneratingDna ? (
                <>
                  <div className="w-3 h-3 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  Meracik Kartu TCG...
                </>
              ) : (
                <>AI Generate Card Data</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Active Selected Summary Banner */}
      <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-zinc-400">Karakter Terpilih:</span>
            <span className="font-serif font-bold text-amber-300 text-sm">
              {currentDna.name}
            </span>
            <span className="text-zinc-500 font-mono">[{currentDna.attribute}]</span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400">Level: <strong className="text-amber-200">★{currentDna.level}</strong></span>
            <span className="text-zinc-500">·</span>
            <span className="text-zinc-400">Tipe: <strong className="text-zinc-200">[{currentDna.monsterType} / {currentDna.cardType}]</strong></span>
          </div>
          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
            Armor: {currentDna.costume}
          </p>
        </div>

        <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800 text-[11px] font-mono text-zinc-300">
          <span className="text-amber-300 font-serif font-bold">ATK/ {currentDna.atk}</span> &nbsp;
          <span className="text-amber-200 font-serif font-bold">DEF/ {currentDna.def}</span>
        </div>
      </div>
    </div>
  );
};
