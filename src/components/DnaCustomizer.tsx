import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Sliders,
  RotateCcw,
  Camera,
  Swords,
  Sparkles,
  Edit3,
  Languages,
  Shield,
  Zap,
  FileText,
  BookOpen,
} from 'lucide-react';
import {
  YugiohCardDna,
  YugiohAttribute,
  YugiohCardType,
  YugiohMonsterType,
  YugiohRarity
} from '../types/yugioh';
import { YUGIOH_CARD_PRESETS } from '../data/yugiohCards';
import { toJapaneseName } from '../utils/japaneseTransliterate';

interface DnaCustomizerProps {
  cardDisplayName?: string;
  onChangeCardDisplayName?: (name: string) => void;
  japaneseName?: string;
  onChangeJapaneseName?: (japanese: string) => void;
  dna: YugiohCardDna;
  onUpdateDna: (updatedDna: YugiohCardDna) => void;
  facePriorityPercent: number;
  onChangeFacePriority: (percent: number) => void;
}

export const DnaCustomizer: React.FC<DnaCustomizerProps> = ({
  cardDisplayName,
  onChangeCardDisplayName,
  japaneseName,
  onChangeJapaneseName,
  dna,
  onUpdateDna,
  facePriorityPercent,
  onChangeFacePriority,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const attributes: YugiohAttribute[] = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'];
  const cardTypes: YugiohCardType[] = ['Normal', 'Effect', 'Ritual', 'Fusion', 'Synchro', 'Xyz', 'Egyptian God'];
  const monsterTypes: YugiohMonsterType[] = [
    'Dragon',
    'Spellcaster',
    'Fiend',
    'Warrior',
    'Machine',
    'Zombie',
    'Fairy',
    'Beast',
    'Beast-Warrior',
    'Winged Beast',
    'Reptile',
    'Fish',
    'Sea Serpent',
    'Aqua',
    'Pyro',
    'Thunder',
    'Rock',
    'Plant',
    'Insect',
    'Psychic',
    'Cyberse',
    'Wyrm',
    'Divine-Beast',
  ];
  const rarities: YugiohRarity[] = [
    'Secret Rare',
    'Prismatic Secret Rare',
    'Ghost Rare',
    'Ultra Rare',
    'Ultimate Rare',
    'Collector\'s Rare',
    'Starlight Rare',
  ];

  const handleResetToPreset = () => {
    const original = YUGIOH_CARD_PRESETS.find((p) => p.id === dna.id);
    if (original) {
      onUpdateDna(original);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* DESKRIPSI KARTU */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-semibold text-zinc-100 font-serif">
            Deskripsi Kartu
          </h2>
        </div>

        {/* Quick Template Buttons */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          <button
            type="button"
            onClick={() => {
              const text = 'Gains 300 ATK for each monster in your GY. Once per turn: You can target 1 card on the field; destroy that target.';
              onUpdateDna({ ...dna, effectText: text, abilities: [text] });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors cursor-pointer"
          >
            🔥 ATK Boost & Destroy
          </button>
          <button
            type="button"
            onClick={() => {
              const text = '(Quick Effect): When your opponent activates a card or effect: You can negate the activation, and if you do, destroy it.';
              onUpdateDna({ ...dna, effectText: text, abilities: [text] });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors cursor-pointer"
          >
            ⚡ Quick Negate
          </button>
          <button
            type="button"
            onClick={() => {
              const text = 'Cannot be destroyed by battle or card effects. Your opponent takes any battle damage you would have taken from battles involving this card.';
              onUpdateDna({ ...dna, effectText: text, abilities: [text] });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors cursor-pointer"
          >
            🛡️ Proteksi / Kebal
          </button>
          <button
            type="button"
            onClick={() => {
              const text = 'Makhluk legendaris berkekuatan dahsyat dengan aura magis tak tertandingi. Ditempa dalam pertempuran epik untuk menjaga keseimbangan semesta.';
              onUpdateDna({ ...dna, effectText: text, abilities: [text] });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-750 transition-colors cursor-pointer"
          >
            📜 Lore Indonesia
          </button>
          <button
            type="button"
            onClick={() => {
              onUpdateDna({ ...dna, effectText: '', abilities: [''] });
            }}
            className="text-[10px] px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 transition-colors cursor-pointer"
          >
            🧹 Kosongkan
          </button>
        </div>

        {/* Textarea */}
        <textarea
          rows={3}
          value={
            dna.effectText !== undefined && dna.effectText !== null && dna.effectText !== ''
              ? dna.effectText
              : (dna.abilities && dna.abilities.length > 0 ? dna.abilities.join(' ') : (dna.flavorText || ''))
          }
          onChange={(e) => {
            const val = e.target.value;
            onUpdateDna({
              ...dna,
              effectText: val,
              abilities: [val],
            });
          }}
          placeholder="Tulis sendiri deskripsi kemampuan bertarung atau lore kartu Anda di sini..."
          className="w-full p-2.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-serif text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 leading-relaxed"
        />
      </div>

      {/* OPTIONAL EXPANDABLE: KUSTOMISASI KARAKTER & STATISTIK */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-850/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-zinc-200 font-serif">
              Kustomisasi Karakter & Statistik (Opsional: ATK/DEF, Level, Atribut)
            </span>
          </div>

          <div className="text-zinc-400 text-xs flex items-center gap-1">
            <span>{isOpen ? 'Tutup' : 'Ubah'}</span>
            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </button>

        {isOpen && (
          <div className="p-4 border-t border-zinc-800 space-y-3.5 bg-zinc-950">
            {/* Grid of editable parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* Attribute */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Attribute</label>
                <select
                  value={dna.attribute}
                  onChange={(e) => onUpdateDna({ ...dna, attribute: e.target.value as YugiohAttribute })}
                  className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-semibold text-amber-300 focus:outline-none"
                >
                  {attributes.map((attr) => (
                    <option key={attr} value={attr}>
                      {attr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level Stars (1-12) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-zinc-300">Level Stars</label>
                  <span className="text-xs font-mono text-amber-400">★ {dna.level}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={dna.level}
                  onChange={(e) => onUpdateDna({ ...dna, level: Number(e.target.value) })}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Card Frame Type */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Frame Card Type</label>
                <select
                  value={dna.cardType}
                  onChange={(e) => onUpdateDna({ ...dna, cardType: e.target.value as YugiohCardType })}
                  className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs text-zinc-100 focus:outline-none"
                >
                  {cardTypes.map((ct) => (
                    <option key={ct} value={ct}>
                      {ct} Monster
                    </option>
                  ))}
                </select>
              </div>

              {/* Monster Type */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300">Monster Archetype</label>
                <select
                  value={dna.monsterType}
                  onChange={(e) => onUpdateDna({ ...dna, monsterType: e.target.value as YugiohMonsterType })}
                  className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs text-zinc-100 focus:outline-none"
                >
                  {monsterTypes.map((mt) => (
                    <option key={mt} value={mt}>
                      {mt}
                    </option>
                  ))}
                </select>
              </div>

              {/* ATK Value */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 font-serif">ATK (Attack)</label>
                <input
                  type="text"
                  value={dna.atk}
                  onChange={(e) => onUpdateDna({ ...dna, atk: e.target.value })}
                  placeholder="3000"
                  className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-mono font-bold text-amber-300 focus:outline-none"
                />
              </div>

              {/* DEF Value */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 font-serif">DEF (Defense)</label>
                <input
                  type="text"
                  value={dna.def}
                  onChange={(e) => onUpdateDna({ ...dna, def: e.target.value })}
                  placeholder="2500"
                  className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-750 focus:border-amber-500 rounded-lg text-xs font-mono font-bold text-amber-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleResetToPreset}
                className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 flex items-center gap-1.5 transition-colors border border-zinc-750"
              >
                <RotateCcw className="w-3 h-3" /> Reset ke Preset {dna.name}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
