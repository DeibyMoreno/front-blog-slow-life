import Link from "next/link";

import { Logo } from "@/components/site/logo";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "Blog",
    links: [
      { label: "Lo último", href: "/blog" },
      { label: "Estilo de vida", href: "/blog" },
      { label: "La marca", href: "/blog" },
    ],
  },
  {
    title: "Slow Life",
    links: [
      { label: "Nuestra historia", href: "/nosotros" },
      { label: "Sostenibilidad", href: "/sostenibilidad" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

interface SiteFooterProps {
  tone?: "light" | "dark";
}

export function SiteFooter({ tone = "light" }: SiteFooterProps) {
  const dark = tone === "dark";
  const muted = dark ? "text-cream/50" : "text-stone";
  const heading = dark ? "text-cream/60" : "text-terra";
  const link = dark
    ? "text-cream/60 transition-colors hover:text-cream"
    : "text-stone transition-colors hover:text-ink";
  const hairline = dark ? "bg-white/10" : "bg-linen";

  return (
    <footer
      className={cn(
        "border-t",
        dark ? "border-white/10 bg-ink" : "border-linen bg-sand"
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm space-y-4">
            <Logo className={dark ? "text-cream" : undefined} />
            <p className={cn("text-sm leading-relaxed", muted)}>
              Un diario sobre moda lenta, materiales con criterio y un vestir
              más consciente.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3
                className={cn(
                  "mb-4 text-xs font-semibold uppercase tracking-[0.18em]",
                  heading
                )}
              >
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} className={link}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className={cn("my-10", hairline)} />

        <div
          className={cn(
            "flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between",
            muted
          )}
        >
          <p>
            © {new Date().getFullYear()} Slow Life. Todos los derechos
            reservados.
          </p>
          <p className="italic">Hecho con calma.</p>
        </div>
      </div>
    </footer>
  );
}
