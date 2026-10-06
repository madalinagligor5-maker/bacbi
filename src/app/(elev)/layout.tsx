import NavigareJos from "@/components/NavigareJos";

export default function ElevLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16">
      {children}
      <NavigareJos />
    </div>
  );
}
