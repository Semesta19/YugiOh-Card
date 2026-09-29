import React, { useState } from 'react';
import { Copy, Check, Terminal, Eye } from 'lucide-react';

interface PromptViewerProps {
  promptText: string;
}

export const PromptViewer: React.FC<PromptViewerProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-750 flex items-center justify-center text-zinc-300">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
              <span className="font-serif text-amber-300">Yu-Gi-Oh! TCG Prompt Engine</span>
              <span className="text-[11px] font-normal text-zinc-400">
                · {promptText.length.toLocaleString()} karakter
              </span>
            </h3>
            <span className="text-[11px] text-zinc-400">
              Lock Identity 🔒 · Humanized Monster Transformation · Secret Rare Holographic Foil · 2:3 TCG
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white px-2.5 py-1 rounded-md bg-zinc-800 border border-zinc-700 hover:bg-zinc-750 transition-colors"
          >
            <Eye className="w-3 h-3" /> {isExpanded ? 'Ringkas' : 'Lihat Penuh'}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 text-[11px] font-medium px-3 py-1 rounded-md transition-colors ${
              copied
                ? 'bg-zinc-100 text-zinc-950 font-semibold'
                : 'bg-zinc-800 text-zinc-200 border border-zinc-750 hover:bg-zinc-750'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Tersalin
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Salin Prompt
              </>
            )}
          </button>
        </div>
      </div>

      <div
        className={`relative rounded-xl bg-zinc-950 p-3.5 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto leading-relaxed transition-all ${
          isExpanded ? 'max-h-[500px]' : 'max-h-[140px]'
        }`}
      >
        <pre className="whitespace-pre-wrap">{promptText}</pre>

        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none rounded-b-xl" />
        )}
      </div>
    </div>
  );
};
