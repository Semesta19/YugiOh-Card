import React, { useState } from 'react';
import { Sliders, Sparkles, Check } from 'lucide-react';
import { YugiohGenerationSettings } from '../types/yugioh';

interface HeaderProps {
  settings: YugiohGenerationSettings;
  onUpdateSettings: (newSettings: Partial<YugiohGenerationSettings>) => void;
}

const POSE_OPTIONS: {
  value: NonNullable<YugiohGenerationSettings['poseMode']>;
  label: string;
  desc: string;
}[] = [
  { value: 'auto', label: 'Bebas', desc: 'Wajah sama, angle & pose menyesuaikan' },
  { value: 'front', label: 'Sesuai foto', desc: 'Ikuti pose & arah wajah foto' },
];

const QUALITY_OPTIONS: {
  value: YugiohGenerationSettings['quality'];
  label: string;
  desc: string;
}[] = [
  { value: 'low', label: 'Cepat', desc: 'Paling cepat & hemat' },
  { value: 'medium', label: 'Standar', desc: 'Seimbang (disarankan)' },
  { value: 'high', label: 'Terbaik', desc: 'Detail maksimal, lebih lama' },
];

export const Header: React.FC<HeaderProps> = ({ settings, onUpdateSettings }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const activeQuality = QUALITY_OPTIONS.find((q) => q.value === settings.quality) || QUALITY_OPTIONS[1];

  return (
    <header className="border-b border-white/[0.08] bg-zinc-950/60 backdrop-blur-2xl sticky top-0 z-30 px-3 sm:px-6 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300 font-serif text-sm font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            遊
          </div>
          <h1 className="text-sm font-bold text-white tracking-tight font-serif flex items-center gap-1.5 truncate">
            <span className="text-amber-400">Yu-Gi-Oh!</span>
            <span className="text-white/40 font-normal font-sans">/</span>
            <span className="text-white/90 font-sans font-semibold">Card</span>
          </h1>
        </div>

        {/* Model & Quality Selector */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            aria-expanded={showSettingsDropdown}
            className="flex items-center gap-2 px-3 py-2 min-h-[36px] rounded-xl ios-glass-subtle hover:bg-white/[0.08] border border-white/[0.08] text-xs text-white transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-white/90">
              GPT Image 2
              <span className="hidden sm:inline text-white/50"> · {activeQuality.label}</span>
            </span>
            <Sliders className="w-3 h-3 text-white/50 ml-0.5" />
          </button>

          {showSettingsDropdown && (
            <>
              {/* Overlay: tap di luar untuk menutup */}
              <div className="fixed inset-0 z-40" onClick={() => setShowSettingsDropdown(false)} />
              <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] max-h-[80dvh] overflow-y-auto rounded-2xl ios-glass border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-1">
                <p className="px-2.5 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-white/40 font-mono">
                  Pose & angle wajah
                </p>
                {POSE_OPTIONS.map((opt) => {
                  const active = (settings.poseMode || 'auto') === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onUpdateSettings({ poseMode: opt.value })}
                      className={`w-full text-left p-2.5 min-h-[44px] rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-amber-400/15 text-white font-medium border border-amber-400/30'
                          : 'hover:bg-white/[0.06] text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-[10px] text-white/45">{opt.desc}</span>
                      </span>
                      {active && <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    </button>
                  );
                })}
                <div className="my-1 border-t border-white/10" />
                <p className="px-2.5 pt-1 pb-1.5 text-[10px] uppercase tracking-wider text-white/40 font-mono">
                  Kualitas render
                </p>
                {QUALITY_OPTIONS.map((opt) => {
                  const active = settings.quality === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onUpdateSettings({ model: 'gpt-image-2', quality: opt.value });
                        setShowSettingsDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 min-h-[44px] rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-amber-400/15 text-white font-medium border border-amber-400/30'
                          : 'hover:bg-white/[0.06] text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="flex flex-col">
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-[10px] text-white/45">{opt.desc}</span>
                      </span>
                      {active && <Check className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};