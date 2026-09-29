import React, { useState } from 'react';
import { Sliders, Sparkles } from 'lucide-react';
import { YugiohGenerationSettings } from '../types/yugioh';

interface HeaderProps {
  settings: YugiohGenerationSettings;
  onUpdateSettings: (newSettings: Partial<YugiohGenerationSettings>) => void;
}

export const Header: React.FC<HeaderProps> = ({ settings, onUpdateSettings }) => {
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  return (
    <header className="border-b border-white/[0.08] bg-zinc-950/60 backdrop-blur-2xl sticky top-0 z-30 px-4 sm:px-6 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-300 font-serif text-sm font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            遊
          </div>
          <h1 className="text-sm font-bold text-white tracking-tight font-serif flex items-center gap-1.5">
            <span className="text-amber-400">Yu-Gi-Oh!</span>
            <span className="text-white/40 font-normal font-sans">/</span>
            <span className="text-white/90 font-sans font-semibold">Card</span>
          </h1>
        </div>

        {/* Model Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl ios-glass-subtle hover:bg-white/[0.08] border border-white/[0.08] text-xs text-white transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium text-white/90">
              {settings.model === 'gemini-3-pro-image'
                ? 'Nano Banana Pro'
                : 'Nano Banana 2'}
            </span>
            <Sliders className="w-3 h-3 text-white/50 ml-0.5" />
          </button>

          {showSettingsDropdown && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl ios-glass border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-1">
              <button
                type="button"
                onClick={() => {
                  onUpdateSettings({ model: 'gemini-3-pro-image' });
                  setShowSettingsDropdown(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                  settings.model === 'gemini-3-pro-image'
                    ? 'bg-amber-400/15 text-white font-medium border border-amber-400/30'
                    : 'hover:bg-white/[0.06] text-white/70 hover:text-white'
                }`}
              >
                <span className="font-semibold">Nano Banana Pro</span>
                <span className="text-[10px] text-amber-400 font-mono">3 Pro</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdateSettings({ model: 'gemini-3.1-flash-image' });
                  setShowSettingsDropdown(false);
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                  settings.model === 'gemini-3.1-flash-image'
                    ? 'bg-amber-400/15 text-white font-medium border border-amber-400/30'
                    : 'hover:bg-white/[0.06] text-white/70 hover:text-white'
                }`}
              >
                <span className="font-semibold">Nano Banana 2</span>
                <span className="text-[10px] text-white/50 font-mono">3.1 Flash</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
