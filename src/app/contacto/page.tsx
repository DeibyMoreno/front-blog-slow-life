import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactChannels } from "@/components/contact/contact-channels";
// import { ContactDirect } from "@/components/contact/contact-direct";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Dos puertas para escribirnos: una para mirar (Instagram), otra para hablar (WhatsApp). A nuestro ritmo, sin formalismos.",
};

export default function ContactoPage() {
  return (
    <>
      <SiteHeader overlay tone="dark" />

      <main className="flex-1 bg-cream">
        <ContactHero />
        <ContactChannels />
        {/*<ContactDirect />*/}
      </main>

      <SiteFooter />
    </>
  );
}