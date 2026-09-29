/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PhotoUploader } from './components/PhotoUploader';
import { CardNameSection } from './components/CardNameSection';
import { CharacterSelector } from './components/CharacterSelector';
import { CardDescriptionSection } from './components/CardDescriptionSection';
import { CharacterCustomizer } from './components/CharacterCustomizer';
import { CardDisplay } from './components/CardDisplay';
import { CardHistory } from './components/CardHistory';
import {
  YugiohCardDna,
  YugiohGenerationSettings,
  GeneratedYugiohCard,
} from './types/yugioh';
import { YUGIOH_CARD_PRESETS } from './data/yugiohCards';
import { buildYugiohCardPrompt } from './utils/promptBuilder';
import { toJapaneseName } from './utils/japaneseTransliterate';
import { loadCardHistory, saveCardToStorage, clearCardStorage } from './utils/cardStorage';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const defaultPreset =
    YUGIOH_CARD_PRESETS.find((p) => p.id === 'dark-magician-girl') ||
    YUGIOH_CARD_PRESETS[0];

  const [currentDna, setCurrentDna] = useState<YugiohCardDna>(defaultPreset);
  const [cardDisplayName, setCardDisplayName] = useState<string>('Dark Magician Girl');
  const [japaneseName, setJapaneseName] = useState<string>('ブラック・マジシャン・ガール');
  const [bottomCopyright] = useState<string>('@2026 Bapack-bapack Deadstar');

  const [portraitImage, setPortraitImage] = useState<string | null>(null);
  const [settings, setSettings] = useState<YugiohGenerationSettings>({
    model: 'gemini-3-pro-image',
    facePriorityPercent: 33,
    aspectRatio: '2:3',
    resolution: '1K',
    customCardName: 'Dark Magician Girl',
    japaneseName: 'ブラック・マジシャン・ガール',
    bottomCopyright: '@2026 Bapack-bapack Deadstar',
    isolatedCardOnly: true,
    holographicIntensity: 'secret-rare',
    generationTarget: 'artwork',
  });

  const [cardImageUrl, setCardImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingDna, setIsGeneratingDna] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedYugiohCard[]>([]);

  // Load history from storage on mount
  useEffect(() => {
    let isMounted = true;
    loadCardHistory()
      .then((cards) => {
        if (isMounted && cards && cards.length > 0) {
          setHistory(cards as GeneratedYugiohCard[]);
        }
      })
      .catch((err) => {
        console.warn('Could not load card history from storage:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const saveToHistory = (newCard: GeneratedYugiohCard) => {
    setHistory((prev) => [newCard, ...prev.slice(0, 29)]);
    saveCardToStorage(newCard).catch((err) => {
      console.warn('Non-fatal: Failed to persist card to storage:', err);
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    clearCardStorage().catch((err) => {
      console.warn('Non-fatal: Failed to clear card storage:', err);
    });
  };

  const compiledPrompt = buildYugiohCardPrompt(currentDna, {
    ...settings,
    facePriorityPercent: 33,
    customCardName: cardDisplayName,
    japaneseName: japaneseName || toJapaneseName(cardDisplayName),
    bottomCopyright: bottomCopyright,
    isolatedCardOnly: true,
  });

  const handleGenerateCard = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: compiledPrompt,
          image: portraitImage,
          model: settings.model,
          imageSize: settings.resolution,
          aspectRatio: settings.generationTarget === 'full-card' ? '2:3' : '1:1',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal menghasilkan kartu Yu-Gi-Oh!');
      }

      setCardImageUrl(data.imageUrl);

      saveToHistory({
        id: `yugioh-card-${Date.now()}`,
        timestamp: Date.now(),
        cardName: currentDna.name,
        characterName: currentDna.name,
        cardDisplayName: cardDisplayName,
        japaneseName: japaneseName || toJapaneseName(cardDisplayName),
        cardDna: currentDna,
        imageUrl: data.imageUrl,
        portraitUsed: portraitImage || undefined,
        prompt: compiledPrompt,
        model: settings.model,
      });
    } catch (err: any) {
      console.error('Generation error:', err);
      setErrorMessage(err.message || 'Gagal memproses kartu.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomGenerateDna = async (name: string) => {
    setIsGeneratingDna(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/generate-dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pokemonName: name }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal meracik data kartu.');
      }
      setCurrentDna(data.dna);
      setCardDisplayName(data.dna.name);
      setJapaneseName(toJapaneseName(data.dna.name));
    } catch (err: any) {
      console.error('DNA generation error:', err);
      setErrorMessage(err.message || 'Gagal meracik data kartu.');
    } finally {
      setIsGeneratingDna(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090d] text-zinc-100 flex flex-col font-sans antialiased relative overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* iOS Ambient Mesh Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.06] blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[550px] h-[550px] rounded-full bg-blue-600/[0.05] blur-[130px]" />
      </div>

      {/* Header */}
      <Header
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl ios-glass border border-red-500/20 text-red-200 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT COLUMN: Controls 1 -> 5 */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1. Upload Wajah */}
            <PhotoUploader
              portraitImage={portraitImage}
              onSelectImage={(img) => setPortraitImage(img)}
            />

            {/* 2. Nama Kartu */}
            <CardNameSection
              cardDisplayName={cardDisplayName}
              onChangeCardDisplayName={(val) => {
                setCardDisplayName(val);
                setSettings((prev) => ({ ...prev, customCardName: val }));
              }}
              japaneseName={japaneseName}
              onChangeJapaneseName={(val) => {
                setJapaneseName(val);
                setSettings((prev) => ({ ...prev, japaneseName: val }));
              }}
              defaultName={currentDna.name}
              defaultJapaneseName={currentDna.japaneseName}
            />

            {/* 3. Pilih Karakter (Populer / Kustomisasi) */}
            <CharacterSelector
              currentDna={currentDna}
              onSelectDna={(dna) => setCurrentDna(dna)}
              onCustomGenerateDna={handleCustomGenerateDna}
              isGeneratingDna={isGeneratingDna}
              onNameChange={(name, japanese) => {
                setCardDisplayName(name);
                setJapaneseName(japanese);
                setSettings((prev) => ({ ...prev, customCardName: name, japaneseName: japanese }));
              }}
            />

            {/* 4. Deskripsi Kartu */}
            <CardDescriptionSection
              dna={currentDna}
              onUpdateDna={(updated) => setCurrentDna(updated)}
            />

            {/* 5. Kustomisasi Karakter */}
            <CharacterCustomizer
              dna={currentDna}
              onUpdateDna={(updated) => setCurrentDna(updated)}
            />
          </div>

          {/* RIGHT COLUMN: 6. Tampilan Kartu & 7. Tombol Generate Kartu */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
            {/* 6. Tampilan Kartu & Download */}
            <CardDisplay
              card={
                cardImageUrl
                  ? {
                      id: 'current-card',
                      timestamp: Date.now(),
                      cardName: currentDna.name,
                      characterName: currentDna.name,
                      cardDisplayName: cardDisplayName,
                      japaneseName: japaneseName,
                      cardDna: currentDna,
                      imageUrl: cardImageUrl,
                      prompt: compiledPrompt,
                      model: settings.model,
                    }
                  : null
              }
              currentDna={currentDna}
              isLoading={isGenerating}
              onUpdateDna={(updated) => setCurrentDna(updated)}
              cardDisplayName={cardDisplayName}
              japaneseName={japaneseName}
              bottomCopyright={bottomCopyright}
            />

            {/* 7. Tombol Generate Kartu */}
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleGenerateCard}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 font-bold text-xs tracking-wider uppercase disabled:opacity-40 transition-all shadow-[0_0_24px_rgba(245,158,11,0.35)] hover:shadow-[0_0_32px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed font-serif active:scale-[0.99]"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-zinc-950" />
                  <span>Generate Kartu</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 8. Riwayat */}
        <CardHistory
          cards={history}
          onSelectCard={(c) => {
            setCardImageUrl(c.imageUrl);
            if (c.cardDna) setCurrentDna(c.cardDna);
            if (c.cardDisplayName) setCardDisplayName(c.cardDisplayName);
            if (c.japaneseName) setJapaneseName(c.japaneseName);
            if (c.portraitUsed) setPortraitImage(c.portraitUsed);
          }}
          onClearHistory={handleClearHistory}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] bg-zinc-950/60 backdrop-blur-md py-3 text-center text-xs text-white/40">
        <p>{bottomCopyright}</p>
      </footer>
    </div>
  );
}
