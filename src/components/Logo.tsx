import Link from "next/link";

// Sigla: o frunză stilizată într-un pătrat rotunjit, lângă numele aplicației.
export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2" aria-label="BacBio, acasă">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-ink">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z" opacity=".9" />
          <path
            d="M5 19l7-7"
            stroke="var(--primary)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </span>
      <span className="font-display text-xl font-bold tracking-tight">
        Bac<span className="text-primary">Bio</span>
      </span>
    </Link>
  );
}
