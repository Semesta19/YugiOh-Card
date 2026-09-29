import React, { useState } from 'react';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import {
  YugiohCardDna,
  YugiohAttribute,
  YugiohCardType,
  YugiohMonsterType,
} from '../types/yugioh';
import { YUGIOH_CARD_PRESETS } from '../data/yugiohCards';

interface CharacterCustomizerProps {
  dna: YugiohCardDna;
  onUpdateDna: (updatedDna: YugiohCardDna) => void;
}

const ATTRIBUTES: YugiohAttribute[] = ['DARK', 'LIGHT', 'EARTH', 'WATER', 'FIRE', 'WIND', 'DIVINE'];
const CARD_TYPES: YugiohCardType[] = ['Normal', 'Effect', 'Ritual', 'Fusion', 'Synchro', 'Xyz', 'Egyptian God'];
const MONSTER_TYPES: YugiohMonsterType[] = [
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

export const CharacterCustomizer: React.FC<CharacterCustomizerProps> = ({
  dna,
  onUpdateDna,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleResetToPreset = () => {
    const original = YUGIOH_CARD_PRESETS.find((p) => p.id === dna.id);
    if (original) {
      onUpdateDna(original);
    }
  };

  return (
    <div className="ios-glass rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.04] transition-colors cursor-pointer"
      >
        <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
          Kustomisasi Karakter
        </h2>

        <div className="text-white/60 text-xs flex items-center gap-1.5 font-medium">
          <span>{isOpen ? 'Tutup' : 'Ubah'}</span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 sm:p-5 border-t border-white/[0.08] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {/* Attribute */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-white/70 block">
                Atribut
              </label>
              <select
                value={dna.attribute}
                onChange={(e) => onUpdateDna({ ...dna, attribute: e.target.value as YugiohAttribute })}
                className="w-full px-3 py-2 ios-glass-input rounded-xl text-xs font-semibold text-amber-300 focus:outline-none"
              >
                {ATTRIBUTES.map((attr) => (
                  <option key={attr} value={attr} className="bg-zinc-900 text-white">
                    {attr}
                  </option>
                ))}
              </select>
            </div>

            {/* Level Stars */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium text-white/70">
                  Level
                </label>
                <span className="text-xs font-mono text-amber-400">★ {dna.level}</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={dna.level}
                onChange={(e) => onUpdateDna({ ...dna, level: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg appearance-none mt-2"
              />
            </div>

            {/* Card Frame Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-white/70 block">
                Tipe Kartu
              </label>
              <select
                value={dna.cardType}
                onChange={(e) => onUpdateDna({ ...dna, cardType: e.target.value as YugiohCardType })}
                className="w-full px-3 py-2 ios-glass-input rounded-xl text-xs text-white focus:outline-none"
              >
                {CARD_TYPES.map((ct) => (
                  <option key={ct} value={ct} className="bg-zinc-900 text-white">
                    {ct} Monster
                  </option>
                ))}
              </select>
            </div>

            {/* Monster Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-white/70 block">
                Arketipe
              </label>
              <select
                value={dna.monsterType}
                onChange={(e) => onUpdateDna({ ...dna, monsterType: e.target.value as YugiohMonsterType })}
                className="w-full px-3 py-2 ios-glass-input rounded-xl text-xs text-white focus:outline-none"
              >
                {MONSTER_TYPES.map((mt) => (
                  <option key={mt} value={mt} className="bg-zinc-900 text-white">
                    {mt}
                  </option>
                ))}
              </select>
            </div>

            {/* ATK Value */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-white/70 block">
                ATK
              </label>
              <input
                type="text"
                value={dna.atk}
                onChange={(e) => onUpdateDna({ ...dna, atk: e.target.value })}
                placeholder="2000"
                className="w-full px-3 py-2 ios-glass-input rounded-xl text-xs font-mono font-bold text-amber-300 focus:outline-none"
              />
            </div>

            {/* DEF Value */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-white/70 block">
                DEF
              </label>
              <input
                type="text"
                value={dna.def}
                onChange={(e) => onUpdateDna({ ...dna, def: e.target.value })}
                placeholder="1700"
                className="w-full px-3 py-2 ios-glass-input rounded-xl text-xs font-mono font-bold text-amber-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Reset */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleResetToPreset}
              className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs text-white/70 hover:text-white flex items-center gap-1.5 transition-all border border-white/[0.08] cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
