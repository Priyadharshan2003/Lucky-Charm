export function CharmCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="p-4 border rounded-lg bg-white/10 backdrop-blur-md">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </div>
  );
}
