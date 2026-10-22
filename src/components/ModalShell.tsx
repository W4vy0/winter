import React, { useEffect } from 'react';
import { X, Radio, Activity, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ModalShellProps {
  title: string;
  subtitle: string;
  frequency?: string;
  iconUrl?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  title,
  subtitle,
  frequency = '142.85 MHz',
  iconUrl,
  onClose,
  children
}) => {
  useEffect(() => {
    soundManager.playBeep(700, 0.05);
    // Listen for ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClose = () => {
    soundManager.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Background touch dismiss layer */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Dark Tactical Panel */}
      <div 
        className="relative z-10 flex h-[88vh] max-h-[850px] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-stone-700/80 bg-stone-950/95 text-stone-100 shadow-[0_0_50px_rgba(0,0,0,0.9)] ring-1 ring-emerald-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Radio Frequency HUD Bar */}
        <div className="flex items-center justify-between border-b border-stone-800 bg-stone-900/90 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-wider text-emerald-400">
              <Radio className="h-3 w-3 text-emerald-400" />
              <span>{frequency}</span>
              <span className="text-stone-500">|</span>
              <span className="text-emerald-500/80">SIGNAL LOCKED</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 font-mono text-[10px] text-stone-400 bg-stone-800/80 px-2 py-0.5 rounded border border-stone-700/60">
              <Activity className="h-3 w-3 text-emerald-400 animate-pulse" />
              <span>CH-01</span>
            </div>

            <button
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-700 bg-stone-800/80 text-stone-400 transition hover:bg-stone-700 hover:text-white"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Section Header Title with Item Icon */}
        <div className="flex items-center gap-3 border-b border-stone-800/80 bg-stone-900/40 px-5 py-3">
          {iconUrl && (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-stone-700 bg-stone-900 p-1.5 shadow-sm">
              <img src={iconUrl} alt={title} className="h-full w-full object-contain" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold tracking-tight text-stone-100 sm:text-lg">
              {title}
            </h2>
            <p className="text-xs text-stone-400 line-clamp-1">{subtitle}</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 custom-scrollbar">
          {children}
        </div>

        {/* Bottom Status Footer */}
        <div className="flex items-center justify-between border-t border-stone-800/80 bg-stone-950/90 px-4 py-2 text-[11px] font-mono text-stone-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            2026 SURVIVAL ARCHIVE
          </span>
          <button
            onClick={handleClose}
            className="rounded border border-stone-700/80 bg-stone-800 px-3 py-1 text-xs text-stone-300 hover:bg-stone-700 hover:text-white transition"
          >
            닫기 [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
