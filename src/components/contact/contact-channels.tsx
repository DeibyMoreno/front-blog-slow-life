import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  InstagramStrokeIcon,
  WhatsAppStrokeIcon,
} from "@/components/site/social-icons";
import { MOTION_STAGGER_S, Reveal } from "@/components/ui/reveal";
import { siteSocial } from "@/config/site";

const channels = [
  {
    name: "Instagram",
    tag: "La puerta para mirar",
    icon: InstagramStrokeIcon,
    text: "Nuestro diario visual: procesos, prendas y días de vida lenta. Escribinos por mensaje directo.",
    meta: siteSocial.instagram.handle,
    href: siteSocial.instagram.url,
    cta: "Seguir y escribir",
    iconClass: "text-sage",
    ctaHover: "group-hover:border-forest group-hover:text-forest",
  },
  {
    name: "WhatsApp",
    tag: "La puerta para hablar",
    icon: WhatsAppStrokeIcon,
    text: "La vía directa para preguntar por tallas, materiales o tu próximo outfit lento. Te leemos con calma.",
    meta: siteSocial.whatsapp.number,
    href: siteSocial.whatsapp.url,
    cta: "Escribir por WhatsApp",
    iconClass: "text-sage",
    ctaHover: "group-hover:border-forest group-hover:text-forest",
  },
];

export function ContactChannels() {
  return (
    <section className="border-t border-linen bg-sand">
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
            Dos puertas
          </p>
          <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
            Mirar, o hablar.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-stone sm:text-base">
            Elige la puerta que mejor se adapte a tu momento. Ambas llevan a la
            misma conversación, al ritmo que prefieras.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Reveal key={channel.name} delay={MOTION_STAGGER_S * index}>
                <Link
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-linen bg-cream p-8 transition-colors hover:border-sage/50 sm:p-10"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terra">
                      {channel.tag}
                    </p>
                    <Icon className={`size-12 shrink-0 ${channel.iconClass}`} />
                  </div>

                  <h3 className="mt-5 font-display text-2xl tracking-tight text-ink sm:text-3xl group-hover:text-forest transition-colors">
                    {channel.name}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone">
                    {channel.text}
                  </p>
                  <p className="mt-4 text-xs font-medium tracking-[0.14em] text-forest/80">
                    {channel.meta}
                  </p>

                  <span
                    className={`mt-auto inline-flex items-center gap-2 border-b border-ink/40 pb-1 pt-8 text-xs font-semibold uppercase tracking-[0.2em] text-ink transition-colors ${channel.ctaHover}`}
                  >
                    {channel.cta}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}