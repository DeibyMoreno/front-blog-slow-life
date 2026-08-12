import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="space-y-8">
      <header className="space-y-1.5">
        <p className="text-xs font-medium tracking-widest text-sage uppercase">
          Panel · Slow Life
        </p>
        <h1 className="font-display text-3xl tracking-tight text-ink text-balance">
          {title}
        </h1>
        <p className="max-w-prose text-sm text-stone">{description}</p>
      </header>

      <Card>
        <CardContent className="flex min-h-56 flex-col items-start justify-center gap-1.5 py-10">
          <p className="text-sm font-medium text-ink">En construcción</p>
          <p className="text-sm text-stone">
            Este módulo se conectará al backend GraphQL en una próxima etapa.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}