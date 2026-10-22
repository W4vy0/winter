import React, { useState } from 'react';
import { ModalShell } from './ModalShell';
import { SURVIVORS, SURVIVOR_GROUPS, Survivor } from '../data/worldData';
import { ImagePreviewModal } from './ImagePreviewModal';
import { soundManager } from '../utils/audio';

interface SurvivorsModalProps {
  onClose: () => void;
}

export const SurvivorsModal: React.FC<SurvivorsModalProps> = ({ onClose }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('철새');
  const [previewSurvivor, setPreviewSurvivor] = useState<Survivor | null>(null);

  const filterTabs = SURVIVOR_GROUPS.map((g) => ({
    id: g.name,
    label: g.name
  }));

  const filteredSurvivors = SURVIVORS.filter((s) => s.group === selectedGroup);
  const currentGroup = SURVIVOR_GROUPS.find((g) => g.name === selectedGroup);

  const handlePhotoClick = (survivor: Survivor) => {
    soundManager.playClick();
    setPreviewSurvivor(survivor);
  };

  return (
    <>
      <ModalShell
        title="생존자 소개"
        subtitle="소속 집단별 생존자 프로필"
        frequency="142.85 MHz"
        iconUrl="https://igx.kr/v/Lmc/w/20"
        onClose={onClose}
      >
        <div className="space-y-4">
          {/* Faction Tabs Only */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedGroup(tab.id);
                }}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedGroup === tab.id
                    ? 'bg-emerald-500 text-stone-950 shadow-md'
                    : 'bg-stone-900 border border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Group Base Subtitle */}
          {currentGroup && (
            <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-stone-800/80 pb-2">
              <span>거점: <strong className="text-stone-200">{currentGroup.base}</strong></span>
              <span>리더: <strong className="text-emerald-400">{currentGroup.leader}</strong></span>
            </div>
          )}

          {/* Survivor Cards */}
          <div className="space-y-3">
            {filteredSurvivors.map((survivor) => (
              <div
                key={survivor.id}
                className="flex gap-3 rounded-xl border border-stone-800 bg-stone-900/60 p-3 hover:border-stone-700 transition"
              >
                {/* 1024x1024 Square Photo - Clickable for full view */}
                <div
                  className="group relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-stone-700 bg-stone-950 sm:h-24 sm:w-24"
                  onClick={() => handlePhotoClick(survivor)}
                  title="얼굴 터치 시 사진 크게 보기"
                >
                  <img
                    src={survivor.imageUrl}
                    alt={survivor.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />
                  {survivor.isLeader && (
                    <span className="absolute bottom-1 left-1 rounded bg-amber-500 px-1 py-0.2 text-[9px] font-bold text-stone-950">
                      리더
                    </span>
                  )}
                  <span className="absolute top-1 right-1 rounded-full bg-black/60 px-1 text-[8px] font-mono text-stone-300 opacity-90">
                    확대
                  </span>
                </div>

                {/* Character Details: Name, MBTI, Personality, Height/Gender/Age, Appearance */}
                <div className="flex-1 min-w-0 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-stone-100">
                      {survivor.name}
                    </span>
                    <span className="rounded bg-stone-800 px-1.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400 border border-stone-700">
                      {survivor.mbti}
                    </span>
                  </div>

                  <div className="text-[11px] text-stone-400">
                    <span>{survivor.height}</span> · <span>{survivor.gender}</span> · <span>{survivor.age}세</span>
                  </div>

                  <div className="text-[11px] text-stone-300">
                    <span className="text-stone-500 font-medium">성격: </span>
                    {survivor.personality}
                  </div>

                  <div className="text-[11px] text-stone-300">
                    <span className="text-stone-500 font-medium">외관: </span>
                    {survivor.appearance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalShell>

      {/* Full Photo Preview Modal for Survivor */}
      {previewSurvivor && (
        <ImagePreviewModal
          imageUrl={previewSurvivor.imageUrl}
          title={previewSurvivor.name}
          subtitle={`${previewSurvivor.group} · ${previewSurvivor.mbti} · ${previewSurvivor.height} · ${previewSurvivor.age}세`}
          onClose={() => setPreviewSurvivor(null)}
        />
      )}
    </>
  );
};
