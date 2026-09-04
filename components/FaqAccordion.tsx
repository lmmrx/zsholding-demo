import type { FaqCategory } from '@/lib/types';

export default function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  return (
    <div>
      {categories.map((cat, i) => (
        <div key={cat.category}>
          <div
            className={`font-serif text-[20.5px] text-navy font-semibold tracking-[-.01em] ${
              i === 0 ? 'mt-0 mb-4' : 'mt-[26px] mb-3'
            }`}
          >
            {cat.category}
          </div>
          {cat.faqs.map((faq) => (
            <details
              key={faq.question}
              open={faq.open}
              className="faq bg-paper border border-line rounded-xl mb-3 overflow-hidden"
            >
              <summary className="cursor-pointer px-5 py-[17px] font-semibold text-[14.5px] text-navy flex items-center justify-between">
                {faq.question}
              </summary>
              <div className="px-5 pb-[18px] text-[13.5px] text-ink-soft leading-[1.65]">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
  );
}
