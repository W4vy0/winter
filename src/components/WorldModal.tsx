import React from 'react';
import { ModalShell } from './ModalShell';
import { WORLD_OVERVIEW_SIMPLE } from '../data/worldData';

interface WorldModalProps {
  onClose: () => void;
}

export const WorldModal: React.FC<WorldModalProps> = ({ onClose }) => {
  return (
    <ModalShell
      title="세계관 소개"
      subtitle="2026년 대한민국 — 혹한의 세계"
      frequency="142.85 MHz"
      iconUrl="https://igx.kr/v/Lmc/w/21"
      onClose={onClose}
    >
      <div className="space-y-3">
        {WORLD_OVERVIEW_SIMPLE.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 space-y-1"
          >
            <h3 className="text-xs font-bold text-cyan-300">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-stone-300">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </ModalShell>
  );
};
