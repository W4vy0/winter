import React, { useEffect, useState } from 'react';
import { Radio, Wifi, Volume2, VolumeX, ShieldAlert, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LoadingRadioProps {
  onComplete: () => void;
}

export const LoadingRadio: React.FC<LoadingRadioProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'searching' | 'locked'>('searching');
  const [frequency, setFrequency] = useState('87.35');
  const [signalStrength, setSignalStrength] = useState(1);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  useEffect(() => {
    // Frequency oscillation simulation
    const freqInterval = setInterval(() => {
      if (phase === 'searching') {
        const randFreq = (80 + Math.random() * 65).toFixed(2);
        setFrequency(randFreq);
        setSignalStrength(Math.floor(Math.random() * 4) + 1);
        if (Math.random() > 0.4) {
          soundManager.playBeep(400 + Math.random() * 400, 0.04);
        }
      }
    }, 180);

    // After 2.2 seconds, signal is locked
    const lockTimer = setTimeout(() => {
      setPhase('locked');
      setFrequency('142.85');
      setSignalStrength(5);
      soundManager.playSignalLock();
      soundManager.playStaticBurst(0.3);
      soundManager.startBgm();

      // Transition to main menu after short confirmation
      const finishTimer = setTimeout(() => {
        onComplete();
      }, 1400);

      return () => clearTimeout(finishTimer);
    }, 2400);

    return () => {
      clearInterval(freqInterval);
      clearTimeout(lockTimer);
    };
  }, [phase, onComplete]);

  const handleSkip = () => {
    soundManager.startBgm();
    soundManager.playSignalLock();
    setPhase('locked');
    setFrequency('142.85');
    setSignalStrength(5);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950 px-4 text-stone-200 select-none">
      {/* Background blizzard ambient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-xs"
        style={{ backgroundImage: `url('https://igx.kr/v/Lmc/w/18')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,78,59,0.15),rgba(12,10,9,0.95))]" />

      {/* Military Walkie-Talkie Chassis */}
      <div className="relative w-full max-w-sm rounded-3xl border-2 border-stone-700 bg-stone-900/95 p-6 shadow-2xl backdrop-blur-md">
        {/* Antenna */}
        <div className="absolute -top-10 left-8 flex flex-col items-center">
          <div className="h-10 w-3 rounded-t-sm bg-gradient-to-r from-stone-600 via-stone-500 to-stone-700 shadow-md" />
          <div className="h-2 w-5 rounded-b-sm bg-stone-800 border-t border-stone-600" />
        </div>

        {/* Top Radio Controls */}
        <div className="mb-4 flex items-center justify-between border-b border-stone-800 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-stone-400">
              PRC-2026 // SURVIVAL UNIT
            </span>
          </div>

          <button
            onClick={toggleSound}
            className="flex items-center gap-1 rounded border border-stone-700 bg-stone-800/80 px-2 py-1 text-xs text-stone-300 hover:text-white"
            title="효과음 켜기/끄기"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5 text-stone-500" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-400" />}
            <span className="font-mono text-[10px]">{isMuted ? 'MUTE' : 'AUDIO'}</span>
          </button>
        </div>

        {/* LCD / CRT Screen Container */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-900/60 bg-emerald-950/30 p-4 shadow-inner">
          {/* CRT scanlines effect */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-70" />

          {/* Top Status Bar */}
          <div className="flex items-center justify-between font-mono text-[11px] text-emerald-500/80">
            <span className="flex items-center gap-1.5">
              <span className={`inline-block h-2 w-2 rounded-full ${phase === 'locked' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'}`} />
              {phase === 'locked' ? 'CH-SECURE' : 'CH-SCAN'}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[10px]">PWR</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-2.5 w-1 rounded-xs transition-colors ${
                      lvl <= signalStrength ? 'bg-emerald-400' : 'bg-emerald-950/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Frequency readout */}
          <div className="my-5 text-center">
            <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-600">
              UHF SURVIVAL FREQUENCY
            </div>
            <div className="font-mono text-4xl font-extrabold tracking-wider text-emerald-300 drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]">
              {frequency} <span className="text-xl text-emerald-500 font-normal">MHz</span>
            </div>
          </div>

          {/* Frequency Wave Visualizer */}
          <div className="my-2 flex h-8 items-center justify-center gap-1 overflow-hidden px-2">
            {[4, 12, 24, 8, 16, 28, 10, 20, 32, 14, 22, 6, 18, 26, 9].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  phase === 'locked' ? 'bg-emerald-400' : 'bg-amber-400/80'
                }`}
                style={{
                  height: phase === 'locked' 
                    ? `${10 + Math.sin(i * 0.8) * 8}px` 
                    : `${Math.max(4, (height * signalStrength) / 3)}px`
                }}
              />
            ))}
          </div>

          {/* Dynamic Status Text */}
          <div className="mt-4 flex flex-col items-center justify-center rounded border border-emerald-900/40 bg-black/40 py-2.5 px-3">
            {phase === 'searching' ? (
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 animate-spin text-amber-400" />
                <span className="font-sans font-medium text-sm tracking-wide text-amber-300 animate-pulse">
                  주파수를 탐색 중…
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400 animate-bounce" />
                <span className="font-sans font-bold text-sm tracking-wider text-emerald-300">
                  신호 연결됨
                </span>
              </div>
            )}
            <p className="mt-1 text-[11px] font-mono text-emerald-600/90">
              {phase === 'searching' ? 'EXTREME COLD EMERGENCY BAND 2026' : '생존자 물품 보관함 데이터 수신 완료'}
            </p>
          </div>
        </div>

        {/* Radio Speaker Grill */}
        <div className="my-4 grid grid-cols-6 gap-1 px-4 opacity-40">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="h-1 rounded-full bg-stone-700" />
          ))}
        </div>

        {/* Action Skip Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSkip}
            className="group flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800/90 px-4 py-2 font-mono text-xs text-stone-300 shadow-md transition hover:border-emerald-500 hover:bg-stone-800 hover:text-emerald-400"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-emerald-400 group-hover:animate-pulse" />
            <span>신호 즉시 동기화</span>
          </button>
        </div>
      </div>
    </div>
  );
};
