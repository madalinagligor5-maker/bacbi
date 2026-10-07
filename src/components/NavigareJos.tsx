"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type NumeIcon } from "./Icon";

const SECTIUNI: { href: string; eticheta: string; icon: NumeIcon }[] = [
  { href: "/azi", eticheta: "Azi", icon: "azi" },
  { href: "/invata", eticheta: "Învață", icon: "invata" },
  { href: "/grile", eticheta: "Grile", icon: "grile" },
  { href: "/simulare", eticheta: "Simulare", icon: "simulare" },
  { href: "/progres", eticheta: "Progres", icon: "progres" },
];

export default function NavigareJos() {
  const pathname = usePathname();
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigare principală"
    >
      <ul className="mx-auto flex max-w-2xl">
        {SECTIUNI.map((s) => {
          const activ = pathname.startsWith(s.href);
          return (
            <li key={s.href} className="flex-1">
              <Link
                href={s.href}
                aria-current={activ ? "page" : undefined}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-1 text-[11px] font-semibold ${
                  activ ? "text-primary" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`grid h-7 w-12 place-items-center rounded-full transition-colors ${
                    activ ? "bg-primary-soft" : ""
                  }`}
                >
                  <Icon nume={s.icon} className="h-5 w-5" grosime={activ ? 2.2 : 1.8} />
                </span>
                {s.eticheta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
