import React, { useState } from 'react';
import { ModalShell } from './ModalShell';
import { LOCATIONS } from '../data/worldData';
import { ImagePreviewModal } from './ImagePreviewModal';
import { soundManager } from '../utils/audio';

interface LocationsModalProps {
  onClose: () => void;
}

export const LocationsModal: React.FC<LocationsModalProps> = ({ onClose }) => {
  const [previewLoc, setPreviewLoc] = useState<{ url: string; name: string } | null>(null);

  const handlePhotoClick = (url: string, name: string) => {
    soundManager.playClick();
    setPreviewLoc({ url, name });
  };

  return (
    <>
      <ModalShell
        title="주요 장소"
        subtitle="주요 14대 구역 사진"
        frequency="142.85 MHz"
        iconUrl="https://igx.kr/v/Lmc/w/22"
        onClose={onClose}
      >
        <div className="space-y-3.5">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/40 shadow-md"
            >
              {/* 1650 x 432 Panoramic Image */}
              <div
                className="group relative w-full aspect-[1650/432] cursor-pointer overflow-hidden bg-stone-950"
                onClick={() => handlePhotoClick(loc.imageUrl, loc.name)}
                title="클릭하여 사진 크게 보기"
              >
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
                {/* Clean Place Name Tag */}
                <div className="absolute top-2 left-2">
                  <span className="rounded bg-black/75 px-2 py-0.5 text-xs font-bold text-stone-200 backdrop-blur-xs border border-stone-700/60">
                    {loc.name}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-stone-400 opacity-80 backdrop-blur-xs">
                  터치하여 확대
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModalShell>

      {/* Enlarged Location Photo Preview */}
      {previewLoc && (
        <ImagePreviewModal
          imageUrl={previewLoc.url}
          title={previewLoc.name}
          subtitle="주요 장소 사진 확대 보기"
          onClose={() => setPreviewLoc(null)}
        />
      )}
    </>
  );
};
