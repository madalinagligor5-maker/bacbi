import Link from "next/link";
import Icon, { type NumeIcon } from "@/components/Icon";
import { VARIANTE } from "@/lib/curriculum";
import { CONFUZII, itemiAutocorectabili } from "@/lib/continut";
import { DATA_EXAMEN_ORIENTATIVA, zilePanaLa } from "@/lib/examen";

// Planul se schimbă de la o zi la alta.
export const revalidate = 3600;

function ziuaAnului(d: Date) {
  return Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86_400_000);
}

export default function Azi() {
  const azi = new Date();
  const zile = zilePanaLa(DATA_EXAMEN_ORIENTATIVA, azi);
  const zi = ziuaAnului(azi);

  // Până există progres salvat, planul alege capitolul zilei prin rotație.
  const capitole = VARIANTE[0].capitole;
  const capitol = capitole[zi % capitole.length];
  const nrGrile = Math.min(10, itemiAutocorectabili(capitol.id).length);
  const coduri = Object.keys(CONFUZII);
  const confuzie = CONFUZII[coduri[zi % coduri.length]];

  const plan: { icon: NumeIcon; tip: string; titlu: string; minute: number; href: string }[] = [
    {
      icon: "invata",
      tip: "Învață",
      titlu: capitol.titlu,
      minute: 5,
      href: `/invata/${VARIANTE[0].id}/${capitol.slug}`,
    },
    { icon: "grile", tip: "Grile", titlu: `${nrGrile} întrebări din capitol`, minute: 8, href: `/grile/${capitol.slug}` },
    { icon: "repeta", tip: "Recapitulare", titlu: "Ce ai greșit zilele trecute", minute: 5, href: "/recapitulare" },
  ];
  const totalMinute = plan.reduce((s, p) => s + p.minute, 0);

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 pt-6">
      <section className="relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-ink">
        <svg
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-15"
          aria-hidden="true"
        >
          <path d="M30 170C30 90 80 30 180 20c-10 100-70 150-150 150Z" fill="currentColor" />
        </svg>
        <p className="text-sm font-semibold opacity-80">Până la Bac</p>
        <p className="mt-1 font-display text-6xl font-bold leading-none tracking-tight">
          {zile}
          <span className="ml-2 text-2xl font-semibold">zile</span>
        </p>
        <p className="mt-2 text-sm opacity-80">Proba E.d · dată orientativă, o setezi la onboarding</p>
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-white">
            <Icon nume="flacara" className="h-4 w-4" grosime={2} />
          </span>
          0 zile la rând · începe seria azi
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-xl font-bold">Planul de azi</h2>
          <span className="text-sm text-muted">~{totalMinute} minute</span>
        </div>
        <ol className="space-y-3">
          {plan.map((p, i) => (
            <li key={p.tip}>
              <Link href={p.href} className="card flex items-center gap-4 p-4 transition-colors hover:border-primary">
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <Icon nume={p.icon} className="h-6 w-6" />
                  <span className="absolute -left-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[11px] font-bold text-bg">
                    {i + 1}
                  </span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow block">
                    {p.tip} · {p.minute} min
                  </span>
                  <span className="block truncate font-semibold">{p.titlu}</span>
                </span>
                <Icon nume="sageata" className="h-5 w-5 shrink-0 text-muted" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {confuzie && (
        <section className="rounded-2xl bg-warn-soft p-5">
          <div className="flex items-center gap-2 text-warn">
            <Icon nume="tinta" className="h-5 w-5" />
            <p className="text-xs font-semibold uppercase tracking-wider">Punctul slab al zilei</p>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold">{confuzie.title}</h3>
          <p className="mt-1 text-sm">{confuzie.desc}</p>
          <p className="mt-3 text-sm">
            <span className="font-semibold">Ce faci: </span>
            {confuzie.remedy}
          </p>
        </section>
      )}

      <Link href="/simulare" className="card flex items-center gap-4 p-4 hover:border-primary">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Icon nume="simulare" className="h-6 w-6" />
        </span>
        <span className="flex-1">
          <span className="block font-semibold">Ai 3 ore libere în weekend?</span>
          <span className="block text-sm text-muted">Fă o simulare completă și vezi nota estimată.</span>
        </span>
        <Icon nume="sageata" className="h-5 w-5 text-muted" />
      </Link>
    </main>
  );
}
