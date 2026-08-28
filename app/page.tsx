export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background px-6 text-center text-foreground">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-extrabold text-white shadow-lg shadow-primary/25">
          B
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">BacPilot</h1>
      </div>

      <p className="max-w-md text-lg text-slate-600">
        Pregătire inteligentă pentru examenul de bacalaureat. Aplicația rulează corect. ✓
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
          Primar
        </span>
        <span className="rounded-full bg-success/10 px-4 py-1.5 text-sm font-semibold text-success">
          Succes
        </span>
        <span className="rounded-full bg-warning/10 px-4 py-1.5 text-sm font-semibold text-warning">
          Atenție
        </span>
        <span className="rounded-full bg-danger/10 px-4 py-1.5 text-sm font-semibold text-danger">
          Slab
        </span>
      </div>
    </main>
  );
}
