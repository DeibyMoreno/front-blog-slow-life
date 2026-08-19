import Link from "next/link";

import { Logo } from "@/components/site/logo";
import {
  InstagramStrokeIcon,
  WhatsAppStrokeIcon,
} from "@/components/site/social-icons";
import { Separator } from "@/components/ui/separator";
import { siteSocial } from "@/config/site";
import { cn } from "@/lib/utils";

const socials = [
  {
    label: "Instagram",
    ariaLabel: "Seguir a Slow Life en Instagram",
    href: siteSocial.instagram.url,
    icon: InstagramStrokeIcon,
  },
  {
    label: "WhatsApp",
    ariaLabel: "Escribir a Slow Life por WhatsApp",
    href: siteSocial.whatsapp.url,
    icon: WhatsAppStrokeIcon,
  },
];

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
              Un diario para vivir a tu propio ritmo.
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
            "flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between",
            muted
          )}
        >
          <p>
            © {new Date().getFullYear()} Slow Life. Todos los derechos
            reservados.
          </p>

          <div className="flex items-center gap-2">
            {socials.map(({ label, ariaLabel, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={ariaLabel}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
                  dark
                    ? "border-white/10 text-cream/60 hover:border-sage/60 hover:text-cream"
                    : "border-linen/70 text-stone hover:border-sage hover:text-forest"
                )}
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>

          <p className="italic">Hecho con calma.</p>
        </div>
      </div>
    </footer>
  );
}
