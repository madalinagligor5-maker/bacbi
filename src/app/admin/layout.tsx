import Logo from "@/components/Logo";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
          <Logo href="/admin" />
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent">Admin</span>
        </div>
      </header>
      {children}
    </div>
  );
}
