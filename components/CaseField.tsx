export default function CaseField({
  label,
  children,
}: {
  label: string;
  children: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-x-4 sm:grid-cols-[92px_minmax(0,1fr)]">
      <dt className="font-display text-[0.75rem] uppercase tracking-[0.14em] text-fumo">
        {label}
      </dt>
      <dd className="text-[1rem] leading-[1.65] text-serragem">{children}</dd>
    </div>
  );
}
