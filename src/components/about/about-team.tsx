import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  {
    name: "Por definir",
    role: "Dirección editorial",
    initials: "?",
  },
  {
    name: "Por definir",
    role: "Materiales y oficios",
    initials: "?",
  },
  {
    name: "Por definir",
    role: "Fotografía y crónicas",
    initials: "?",
  },
];

export function AboutTeam() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <div className="rounded-2xl border-2 border-dashed border-linen bg-cream p-8 sm:p-12">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
              El equipo · Para completar
            </p>
            <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
              Quienes lo hacemos posible
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.role}
                className="flex items-center gap-4 rounded-2xl border border-linen bg-sand p-6"
              >
                <Avatar size="lg" className="bg-linen text-terra">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display text-lg tracking-tight text-ink">
                    {member.name}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-stone">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-xs italic text-stone">
            Pendiente de completar: añade el nombre, rol y fotografía reales de
            cada persona del equipo.
          </p>
        </div>
      </div>
    </section>
  );
}
