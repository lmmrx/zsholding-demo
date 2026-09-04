import type { OrgNode } from '@/lib/types';

function Node({ node, root = false }: { node: OrgNode; root?: boolean }) {
  return (
    <div
      className={`relative text-center rounded-[11px] border px-[17px] py-[13px] min-w-[150px] shadow-sm ${
        root
          ? 'bg-navy text-white border-navy'
          : 'bg-paper border-line'
      }`}
    >
      <div
        className={`font-mono text-[11px] tracking-[.03em] ${
          root ? 'text-amber-soft' : 'text-ink-soft'
        }`}
      >
        {node.role}
      </div>
      <div className="font-serif text-[14.5px] font-semibold mt-1">{node.name}</div>
      {node.properties && (
        <div className="text-[11px] text-ink-soft mt-1.5 leading-[1.4] max-w-[170px] mx-auto">
          {node.properties}
        </div>
      )}
    </div>
  );
}

export default function OrgChart({
  leadership,
  directors,
  generalManagers,
}: {
  leadership: OrgNode[];
  directors: OrgNode[];
  generalManagers: OrgNode[];
}) {
  return (
    <div className="py-5 pb-2.5 overflow-x-auto">
      <div className="flex justify-center gap-7 flex-wrap">
        {leadership.map((node) => (
          <Node key={node.name} node={node} root />
        ))}
      </div>
      <div className="org-connector-line" />
      <div className="flex gap-[22px] justify-center flex-wrap">
        {directors.map((node) => (
          <Node key={node.name} node={node} />
        ))}
      </div>
      <div className="org-connector-line" />
      <div className="text-center font-mono text-[10.5px] tracking-[.08em] uppercase text-steel mb-3.5">
        General Managers
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        {generalManagers.map((node) => (
          <Node key={node.name} node={node} />
        ))}
      </div>
    </div>
  );
}
