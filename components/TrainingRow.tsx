import { TRAINING_ICONS } from './icons';
import type { TrainingItem } from '@/lib/types';

export default function TrainingRow({ item }: { item: TrainingItem }) {
  const Icon = TRAINING_ICONS[item.icon];
  return (
    <div className="flex items-center gap-4 bg-paper border border-line rounded-xl px-[18px] py-4 mb-3 shadow-sm">
      <div className="w-10 h-10 rounded-[9px] bg-amber-soft flex items-center justify-center flex-shrink-0">
        <Icon className="w-[18px] h-[18px] text-[#7A5316]" />
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-[15px] mb-0.5 text-navy">{item.title}</h3>
        <p className="text-[12.5px] text-ink-soft">{item.description}</p>
      </div>
      <div className="ml-auto text-right flex-shrink-0">
        <div className="font-mono text-xs text-slate font-semibold">{item.duration}</div>
        <div className="text-[10.5px] text-ink-soft mt-0.5">{item.format}</div>
      </div>
    </div>
  );
}
