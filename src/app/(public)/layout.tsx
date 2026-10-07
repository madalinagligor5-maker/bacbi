import Link from "next/link";
import Logo from "@/components/Logo";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Logo />
        <nav className="flex items-center gap-1 text-sm font-semibold">
          <Link href="/pret" className="hidden rounded-lg px-3 py-2 text-muted hover:text-ink sm:block">
            Prețuri
          </Link>
          <Link href="/autentificare" className="rounded-lg px-3 py-2 hover:bg-surface-2">
            Intră în cont
          </Link>
        </nav>
      </header>
      {children}
      <footer className="mx-auto mt-16 max-w-5xl border-t border-line px-4 py-8 text-sm text-muted">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <p>Pregătire pentru Bacalaureatul la biologie, pe programa de simulare 2026.</p>
        </div>
      </footer>
    </div>
  );
}
