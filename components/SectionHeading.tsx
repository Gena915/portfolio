import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal>
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-[var(--color-accent)]">{index}</span>
          <span className="h-px w-10 bg-[var(--color-border)]" />
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
        </div>
        {subtitle && (
          <p className="mt-3 max-w-2xl text-[var(--color-muted)]">{subtitle}</p>
        )}
      </div>
    </Reveal>
  );
}
