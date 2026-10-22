import React from 'react';
import { ModalShell } from './ModalShell';
import { SURVIVAL_RULES_SIMPLE } from '../data/worldData';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <ModalShell
      title="생존 수칙"
      subtitle="추위 · 배고픔 · 체력"
      frequency="142.85 MHz"
      iconUrl="https://igx.kr/v/Lmc/w/19"
      onClose={onClose}
    >
      <div className="space-y-3">
        {SURVIVAL_RULES_SIMPLE.map((rule, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-stone-800 bg-stone-900/60 p-3.5 space-y-1"
          >
            <h3 className="text-xs font-bold text-amber-300">
              {rule.title}
            </h3>
            <p className="text-xs leading-relaxed text-stone-300">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>
    </ModalShell>
  );
};
