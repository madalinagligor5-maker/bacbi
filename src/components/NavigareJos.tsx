"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIUNI = [
  { href: "/azi", eticheta: "Azi" },
  { href: "/invata", eticheta: "Învață" },
  { href: "/grile", eticheta: "Grile" },
  { href: "/simulare", eticheta: "Simulare" },
  { href: "/progres", eticheta: "Progres" },
];

export default function NavigareJos() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 border-t bg-white">
      <ul className="mx-auto flex max-w-xl justify-around">
        {SECTIUNI.map((s) => {
          const activ = pathname.startsWith(s.href);
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                className={`block px-3 py-3 text-sm ${activ ? "font-semibold" : "text-slate-500"}`}
              >
                {s.eticheta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
