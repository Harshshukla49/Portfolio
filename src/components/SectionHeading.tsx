import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  suffix?: ReactNode;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  suffix,
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-xs uppercase tracking-[0.45em] text-cyan-300/80">{eyebrow}</p>
      <div className="mt-4 flex items-end gap-4">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        {suffix}
      </div>
      {description ? <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p> : null}
    </div>
  );
}
