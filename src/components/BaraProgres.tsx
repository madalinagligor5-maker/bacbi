export default function BaraProgres({
  valoare,
  total,
  culoare = "bg-primary",
  eticheta,
}: {
  valoare: number;
  total: number;
  culoare?: string;
  eticheta?: string;
}) {
  const procent = total > 0 ? Math.round((valoare / total) * 100) : 0;
  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-surface-2"
      role="progressbar"
      aria-valuenow={procent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={eticheta}
    >
      <div className={`h-full rounded-full ${culoare} transition-all`} style={{ width: `${procent}%` }} />
    </div>
  );
}
