import React, { useState, useEffect } from 'react';
import { LoadingRadio } from './components/LoadingRadio';
import { ClothInventory } from './components/ClothInventory';
import { FallingSnow } from './components/FallingSnow';

export default function App() {
  const [screen, setScreen] = useState<'loading' | 'main'>('loading');

  // Preload crucial image assets in background during loading
  useEffect(() => {
    const imagesToPreload = [
      'https://igx.kr/v/Lmc/w/18', // Blue cloth background
      'https://igx.kr/v/Lmc/w/21', // Water
      'https://igx.kr/v/Lmc/w/20', // Radio
      'https://igx.kr/v/Lmc/w/19', // Chocobar
      'https://igx.kr/v/Lmc/w/22', // Map
      'https://igx.kr/v/Lmc/w/23'  // Bat
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-stone-950 text-stone-100 antialiased overflow-hidden">
      {/* Falling iPhone Snowflake Emojis (❄️) */}
      <FallingSnow />

      {screen === 'loading' ? (
        <LoadingRadio onComplete={() => setScreen('main')} />
      ) : (
        <ClothInventory onRestartScan={() => setScreen('loading')} />
      )}
    </main>
  );
}
