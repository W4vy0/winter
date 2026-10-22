import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ImagePreviewModalProps {
  imageUrl: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageUrl,
  title,
  subtitle,
  onClose
}) => {
  useEffect(() => {
    soundManager.playBeep(600, 0.04);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[95vw] sm:max-w-lg flex flex-col items-center overflow-hidden rounded-2xl border border-stone-700 bg-stone-950 p-2 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex w-full items-center justify-between border-b border-stone-800 px-3 py-2 text-stone-200">
          <div>
            <h4 className="text-xs font-bold text-stone-100">{title}</h4>
            {subtitle && <p className="text-[10px] text-stone-400">{subtitle}</p>}
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="rounded-lg border border-stone-700 bg-stone-800/80 p-1 text-stone-400 transition hover:bg-stone-700 hover:text-white"
            aria-label="닫기"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Enlarged Image */}
        <div className="flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-xl bg-black/60 p-1">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-[72vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};
