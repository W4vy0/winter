import React, { useState } from 'react';
import { ModalShell } from './ModalShell';
import { ZOMBIE_TYPES } from '../data/worldData';
import { ImagePreviewModal } from './ImagePreviewModal';
import { soundManager } from '../utils/audio';

interface ZombiesModalProps {
  onClose: () => void;
}

export const ZombiesModal: React.FC<ZombiesModalProps> = ({ onClose }) => {
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  const handleImageClick = (url: string, name: string) => {
    soundManager.playClick();
    setPreviewImage({ url, title: name });
  };

  return (
    <>
      <ModalShell
        title="좀비 종류 · 위협 정보"
        subtitle="4대 감염체 유형 및 행동 양식"
        frequency="142.85 MHz"
        iconUrl="https://igx.kr/v/Lmc/w/23"
        onClose={onClose}
      >
        <div className="space-y-4">
          {ZOMBIE_TYPES.map((zombie) => (
            <div
              key={zombie.id}
              className="overflow-hidden rounded-xl border border-stone-800 bg-stone-900/60 shadow-md"
            >
              {/* 1650 x 432 Panoramic Image (Clickable for full view) */}
              <div
                className="group relative w-full aspect-[1650/432] cursor-pointer overflow-hidden bg-stone-950"
                onClick={() => handleImageClick(zombie.imageUrl, zombie.name)}
                title="클릭하여 사진 크게 보기"
              >
                <img
                  src={zombie.imageUrl}
                  alt={zombie.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="rounded bg-black/75 px-2 py-0.5 text-xs font-bold text-rose-300 border border-stone-700/60 backdrop-blur-xs">
                    {zombie.name}
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-stone-400 opacity-80 backdrop-blur-xs">
                  터치하여 확대
                </div>
              </div>

              {/* ONLY Behavior (행동 양식) */}
              <div className="p-3 text-xs">
                <div className="text-stone-300">
                  <strong className="text-amber-300">행동 양식: </strong>
                  <span className="leading-relaxed">{zombie.behavior}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ModalShell>

      {/* Full Photo Preview Modal */}
      {previewImage && (
        <ImagePreviewModal
          imageUrl={previewImage.url}
          title={previewImage.title}
          subtitle="감염체 사진 확대 보기"
          onClose={() => setPreviewImage(null)}
        />
      )}
    </>
  );
};
