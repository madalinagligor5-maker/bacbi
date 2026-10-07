import Link from "next/link";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import NavigareJos from "@/components/NavigareJos";

export default function ElevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen pb-24">
      <div className="sticky top-0 z-10 border-b border-line bg-bg">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
          <Logo href="/azi" />
          <Link
            href="/cont"
            aria-label="Contul meu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted hover:text-ink"
          >
            <Icon nume="utilizator" />
          </Link>
        </div>
      </div>
      {children}
      <NavigareJos />
    </div>
  );
}
