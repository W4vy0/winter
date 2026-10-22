import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Radio, RotateCcw, Music } from 'lucide-react';
import { WorldModal } from './WorldModal';
import { SurvivorsModal } from './SurvivorsModal';
import { RulesModal } from './RulesModal';
import { LocationsModal } from './LocationsModal';
import { ZombiesModal } from './ZombiesModal';

interface ClothInventoryProps {
  onRestartScan: () => void;
}

type ActiveModalType = 'water' | 'radio' | 'chocobar' | 'map' | 'bat' | null;

export const ClothInventory: React.FC<ClothInventoryProps> = ({ onRestartScan }) => {
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [isBgmOn, setIsBgmOn] = useState(soundManager.isBgmPlaying());

  useEffect(() => {
    const unsubscribe = soundManager.subscribeBgm((playing) => {
      setIsBgmOn(playing);
    });
    // Attempt BGM start if user entered directly
    soundManager.startBgm();
    return () => unsubscribe();
  }, []);

  const handleOpen = (type: ActiveModalType) => {
    soundManager.startBgm();
    soundManager.playClick();
    setActiveModal(type);
  };

  const handleClose = () => {
    setActiveModal(null);
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    setIsBgmOn(!muted && soundManager.isBgmPlaying());
  };

  const toggleBgm = () => {
    soundManager.playClick();
    const playing = soundManager.toggleBgm();
    setIsBgmOn(playing);
  };

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-stone-950 font-sans select-none">
      {/* Background ambient cold snow vignette */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.6)_0%,rgba(2,6,23,0.95)_100%)]" />

      {/* Mobile-optimized viewport frame (832x1216 ratio preservation) */}
      <div className="relative z-20 flex h-full max-h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] border-x border-stone-800/60 bg-stone-950">
        
        {/* Top Radio Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-stone-800/80 bg-stone-950/80 px-4 py-2.5 backdrop-blur-md">
          {/* Green Radio Frequency Signal */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-wider text-emerald-400">
              <Radio className="h-3.5 w-3.5 text-emerald-400" />
              <span>142.85 MHz</span>
              <span className="text-stone-600">|</span>
              <span className="text-[10px] text-emerald-500/90 font-sans">신호 연결됨</span>
            </div>
          </div>

          {/* Action buttons (BGM toggle, Audio mute & Rescan) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleBgm}
              className={`flex items-center gap-1 rounded-lg border px-2 py-1 text-xs transition ${
                isBgmOn
                  ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                  : 'border-stone-700/80 bg-stone-900/90 text-stone-500 hover:text-stone-300'
              }`}
              title="배경음악(BGM) 켜기/끄기"
              aria-label="배경음악 제어"
            >
              <Music className={`h-3.5 w-3.5 ${isBgmOn ? 'animate-pulse text-emerald-400' : ''}`} />
              <span className="font-mono text-[10px]">{isBgmOn ? 'BGM ON' : 'BGM OFF'}</span>
            </button>

            <button
              onClick={toggleSound}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-700/80 bg-stone-900/90 text-stone-300 transition hover:bg-stone-800 hover:text-white"
              title="전체 음소거"
              aria-label="소리 제어"
            >
              {isMuted ? <VolumeX className="h-3.5 w-3.5 text-stone-500" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
            </button>

            <button
              onClick={onRestartScan}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-700/80 bg-stone-900/90 text-stone-400 transition hover:bg-stone-800 hover:text-white"
              title="무전 주파수 재탐색"
              aria-label="주파수 재탐색"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Full Background: Blue Cloth (파란 보자기 832x1216) */}
        <div className="relative flex-1 w-full overflow-hidden">
          <img
            src="https://igx.kr/v/Lmc/w/18"
            alt="파란 보자기 생존 물품 보관함"
            className="h-full w-full object-cover object-center pointer-events-none"
          />

          {/* Vignette overlay */}
          <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,transparent_40%,rgba(10,12,16,0.6)_100%]" />

          {/* Item 1: 물 (세계관 소개) - Enlarged size */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 active:scale-95 group"
            style={{ top: '20%', left: '26%' }}
            onClick={() => handleOpen('water')}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-30 w-30 items-center justify-center filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.9)] group-hover:scale-105 transition duration-300 sm:h-36 sm:w-36">
                <img
                  src="https://igx.kr/v/Lmc/w/21"
                  alt="물"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-400 font-mono text-[9px] font-bold text-stone-950 shadow-md animate-pulse">
                  1
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-cyan-500/60 bg-stone-950/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-xs group-hover:border-cyan-400 group-hover:bg-stone-900">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-bold text-cyan-200">세계관 소개</span>
              </div>
            </div>
          </div>

          {/* Item 2: 무전기 (생존자 소개 · 소속 집단) - Enlarged size */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 active:scale-95 group"
            style={{ top: '20%', left: '74%' }}
            onClick={() => handleOpen('radio')}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-30 w-30 items-center justify-center filter drop-shadow-[0_14px_22px_rgba(0,0,0,0.9)] group-hover:scale-105 transition duration-300 sm:h-36 sm:w-36">
                <img
                  src="https://igx.kr/v/Lmc/w/20"
                  alt="무전기"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 font-mono text-[9px] font-bold text-stone-950 shadow-md animate-pulse">
                  2
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-emerald-500/60 bg-stone-950/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-xs group-hover:border-emerald-400 group-hover:bg-stone-900">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-emerald-200">생존자 소개</span>
              </div>
            </div>
          </div>

          {/* Item 3: 초코바 (생존 수칙 · 추위 · 배고픔 · 체력) - Center */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 active:scale-95 group"
            style={{ top: '50%', left: '50%' }}
            onClick={() => handleOpen('chocobar')}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-24 w-28 items-center justify-center filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)] group-hover:scale-105 transition duration-300 sm:h-28 sm:w-32">
                <img
                  src="https://igx.kr/v/Lmc/w/19"
                  alt="초코바"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-amber-400 font-mono text-[9px] font-bold text-stone-950 shadow-md animate-pulse">
                  3
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-amber-500/60 bg-stone-950/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-xs group-hover:border-amber-400 group-hover:bg-stone-900">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-[11px] font-bold text-amber-200">생존 수칙</span>
              </div>
            </div>
          </div>

          {/* Item 4: 찢어진 지도 조각 (주요 장소 안내) - Bottom-Left */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 active:scale-95 group"
            style={{ top: '80%', left: '26%' }}
            onClick={() => handleOpen('map')}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)] group-hover:scale-105 transition duration-300 sm:h-28 sm:w-28">
                <img
                  src="https://igx.kr/v/Lmc/w/22"
                  alt="찢어진 지도 조각"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-400 font-mono text-[9px] font-bold text-stone-950 shadow-md animate-pulse">
                  4
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-rose-500/60 bg-stone-950/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-xs group-hover:border-rose-400 group-hover:bg-stone-900">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
                <span className="text-[11px] font-bold text-rose-200">주요 장소</span>
              </div>
            </div>
          </div>

          {/* Item 5: 야구방망이 (좀비 종류 · 위협 정보) - Bottom-Right */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 active:scale-95 group"
            style={{ top: '80%', left: '74%' }}
            onClick={() => handleOpen('bat')}
          >
            <div className="relative flex flex-col items-center">
              <div className="relative flex h-24 w-24 items-center justify-center filter drop-shadow-[0_12px_18px_rgba(0,0,0,0.85)] group-hover:scale-105 transition duration-300 sm:h-28 sm:w-28">
                <img
                  src="https://igx.kr/v/Lmc/w/23"
                  alt="야구방망이"
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-400 font-mono text-[9px] font-bold text-stone-950 shadow-md animate-pulse">
                  5
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1 rounded-full border border-purple-500/60 bg-stone-950/85 px-2.5 py-1 text-center shadow-lg backdrop-blur-xs group-hover:border-purple-400 group-hover:bg-stone-900">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-ping" />
                <span className="text-[11px] font-bold text-purple-200">좀비 위협</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-center border-t border-stone-800/80 bg-stone-950/90 px-4 py-2 text-center backdrop-blur-md">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-stone-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>보자기 위 물건을 터치하면 상세 정보창이 열립니다</span>
          </p>
        </div>
      </div>

      {/* Modals for 5 Items */}
      {activeModal === 'water' && <WorldModal onClose={handleClose} />}
      {activeModal === 'radio' && <SurvivorsModal onClose={handleClose} />}
      {activeModal === 'chocobar' && <RulesModal onClose={handleClose} />}
      {activeModal === 'map' && <LocationsModal onClose={handleClose} />}
      {activeModal === 'bat' && <ZombiesModal onClose={handleClose} />}
    </div>
  );
};
