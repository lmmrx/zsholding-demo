export default function PageHeading({
  eyebrow,
  title,
  lede,
  titleSize = 'default',
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  titleSize?: 'default' | 'small';
}) {
  return (
    <>
      {eyebrow && (
        <p className="font-mono text-[11.5px] tracking-[.1em] uppercase text-amber font-semibold mb-2.5">
          {eyebrow}
        </p>
      )}
      <h1
        className={`font-serif font-semibold text-ink tracking-[-.02em] leading-[1.1] mb-3 ${
          titleSize === 'small' ? 'text-[26px]' : 'text-[38px]'
        }`}
      >
        {title}
      </h1>
      {lede && (
        <p className="text-[15.5px] text-ink-soft max-w-[640px] leading-[1.6] mb-[38px]">
          {lede}
        </p>
      )}
    </>
  );
}
