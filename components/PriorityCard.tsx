export default function PriorityCard({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-paper border border-line rounded-[14px] p-[26px] shadow-sm">
      <div className="font-mono text-xs text-amber font-semibold mb-2.5">
        {label}
      </div>
      <h3 className="font-serif text-[18.5px] font-semibold mb-2 text-ink tracking-[-.005em]">
        {title}
      </h3>
      <p className="text-[13.5px] text-ink-soft leading-[1.6]">{description}</p>
    </div>
  );
}
