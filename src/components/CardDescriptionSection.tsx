import React from 'react';
import { YugiohCardDna } from '../types/yugioh';

interface CardDescriptionSectionProps {
  dna: YugiohCardDna;
  onUpdateDna: (updatedDna: YugiohCardDna) => void;
}

export const CardDescriptionSection: React.FC<CardDescriptionSectionProps> = ({
  dna,
  onUpdateDna,
}) => {
  const currentText =
    dna.effectText !== undefined && dna.effectText !== null && dna.effectText !== ''
      ? dna.effectText
      : (dna.abilities && dna.abilities.length > 0 ? dna.abilities.join(' ') : (dna.flavorText || ''));

  return (
    <div className="ios-glass rounded-2xl p-4 sm:p-5 space-y-3">
      <h2 className="text-xs font-semibold text-white/90 tracking-wide uppercase font-serif">
        Deskripsi Kartu
      </h2>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => {
            const text = 'Gains 300 ATK for each monster in your GY. Once per turn: You can target 1 card on the field; destroy that target.';
            onUpdateDna({ ...dna, effectText: text, abilities: [text] });
          }}
          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-white/[0.08] transition-all cursor-pointer"
        >
          ATK Boost & Destroy
        </button>
        <button
          type="button"
          onClick={() => {
            const text = '(Quick Effect): When your opponent activates a card or effect: You can negate the activation, and if you do, destroy it.';
            onUpdateDna({ ...dna, effectText: text, abilities: [text] });
          }}
          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-white/[0.08] transition-all cursor-pointer"
        >
          Quick Negate
        </button>
        <button
          type="button"
          onClick={() => {
            const text = 'Cannot be destroyed by battle or card effects. Your opponent takes any battle damage you would have taken from battles involving this card.';
            onUpdateDna({ ...dna, effectText: text, abilities: [text] });
          }}
          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-white/[0.08] transition-all cursor-pointer"
        >
          Proteksi
        </button>
        <button
          type="button"
          onClick={() => {
            const text = 'Makhluk legendaris berkekuatan dahsyat dengan aura magis tak tertandingi. Ditempa dalam pertempuran epik untuk menjaga keseimbangan semesta.';
            onUpdateDna({ ...dna, effectText: text, abilities: [text] });
          }}
          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-white/80 border border-white/[0.08] transition-all cursor-pointer"
        >
          Lore Legendaris
        </button>
        <button
          type="button"
          onClick={() => {
            onUpdateDna({ ...dna, effectText: '', abilities: [''] });
          }}
          className="text-[11px] px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] text-white/40 hover:text-white/70 border border-white/[0.06] transition-all cursor-pointer"
        >
          Kosongkan
        </button>
      </div>

      {/* Textarea */}
      <textarea
        rows={3}
        value={currentText}
        onChange={(e) => {
          const val = e.target.value;
          onUpdateDna({
            ...dna,
            effectText: val,
            abilities: [val],
          });
        }}
        placeholder="Tulis efek atau lore kartu..."
        className="w-full p-3 ios-glass-input rounded-xl text-xs font-serif text-white placeholder:text-zinc-500 focus:outline-none leading-relaxed resize-none"
      />
    </div>
  );
};
