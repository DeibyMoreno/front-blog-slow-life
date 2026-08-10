import Link from "next/link";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-5 py-32 text-center">
        <p className="font-display text-8xl italic text-forest">404</p>
        <h1 className="mt-6 font-display text-3xl tracking-tight text-ink">
          Esta página no existe
        </h1>
        <p className="mt-3 max-w-md text-stone">
          Tal vez el enlace cambió. Volvamos al inicio y encontremos algo
          bueno que leer.
        </p>
        <Button className="mt-8" render={<Link href="/" />}>
          Ir al inicio
        </Button>
      </main>
      <SiteFooter />
    </>
  );
}