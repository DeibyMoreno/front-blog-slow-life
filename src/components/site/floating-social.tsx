"use client";

import { motion, useReducedMotion } from "motion/react";

import {
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/site/social-icons";
import { siteSocial } from "@/config/site";

const buttons = [
  {
    label: "Instagram",
    ariaLabel: "Seguir a Slow Life en Instagram",
    href: siteSocial.instagram.url,
    icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    ariaLabel: "Escribir a Slow Life por WhatsApp",
    href: siteSocial.whatsapp.url,
    icon: WhatsAppIcon,
  },
];

export function FloatingSocial() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      className="fixed right-5 bottom-5 z-50 flex flex-col gap-3 sm:right-6 sm:bottom-6"
    >
      {buttons.map(({ label, ariaLabel, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className="group relative flex size-12 items-center justify-center rounded-full backdrop-blur-md shadow-lg shadow-ink/30 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Icon className="size-8" />
          <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 rounded-full border border-linen bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap text-ink opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </motion.div>
  );
}