'use client';

import { useState, type ReactNode } from 'react';

export interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

export default function SubTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div>
      <div className="flex gap-1.5 mb-[30px] border-b border-line">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`text-[13.5px] font-medium pb-2.5 pt-2.5 mr-6 relative top-px border-b-2 ${
              active === tab.key
                ? 'text-ink border-amber font-semibold'
                : 'text-ink-soft border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.key} className={active === tab.key ? 'block' : 'hidden'}>
          {tab.content}
        </div>
      ))}
    </div>
  );
}
