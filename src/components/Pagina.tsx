// Schelet comun pentru paginile care încă nu au design.
export default function Pagina({
  titlu,
  continut,
  children,
}: {
  titlu: string;
  continut: string[];
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-xl px-4 py-6">
      <h1 className="text-2xl font-semibold">{titlu}</h1>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
        {continut.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {children && <div className="mt-6">{children}</div>}
    </main>
  );
}
