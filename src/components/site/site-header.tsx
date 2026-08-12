"use client";

import { useEffect, useState } from "react";
import { Menu, User, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Nosotros", href: "/nosotros" },
];

interface SiteHeaderProps {
  overlay?: boolean;
  tone?: "light" | "dark";
}

export function SiteHeader({
  overlay = false,
  tone = "light",
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showSolid = scrolled || open;
  const showLight = tone === "light" && !showSolid && pathname === "/";
  const dark = tone === "dark";
  const useLightText = showLight || dark;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
          showSolid
            ? dark
              ? "border-white/10 bg-ink/80 backdrop-blur-md"
              : "border-linen/70 bg-cream/80 backdrop-blur-md"
            : "border-transparent bg-transparent"

        )}
      >
        <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Logo
            className={useLightText ? "text-cream" : undefined}
            size="30"
          />

          <nav
            className={cn(
              "absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-1.5 py-1 backdrop-blur-sm md:flex",
              dark ? "border-white/10 bg-white/5" : "border-linen bg-cream/70"
            )}
          >
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                    dark
                      ? "text-cream/70 hover:text-cream"
                      : "text-forest hover:text-ink",
                    active &&
                    (dark ? "bg-white/10 text-cream" : "bg-sand/80 text-ink")
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Iniciar sesión"
              title="Iniciar sesión"
              className={cn(
                "rounded-full border-0 bg-transparent backdrop-blur-sm",
                useLightText
                  ? "text-cream hover:bg-white/10"
                  : "text-ink hover:text-forest"
              )}
              render={<Link href="/login" />}
            >
              <User />
            </Button>

            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className={cn(
                "flex size-9 items-center justify-center rounded-md transition-colors md:hidden",
                useLightText ? "text-cream" : "text-ink"
              )}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              key="mobile-menu"
              initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, height: 0, transition: { duration: 0.25 } }
              }
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={cn(
                "overflow-hidden border-t px-5 pb-6 pt-2 md:hidden",
                dark ? "border-white/10 bg-ink" : "border-linen/70 bg-cream"
              )}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b py-3.5 font-display text-xl",
                    dark
                      ? "border-white/10 text-cream"
                      : "border-linen/60 text-ink"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                className="mt-4 w-full"
                render={<Link href="/login" />}
              >
                Entrar
              </Button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {!overlay && <div aria-hidden className="h-16" />}
    </>
  );
}
