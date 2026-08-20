import type { Metadata } from "next";
import { Suspense } from "react";

import { Logo } from "@/components/site/logo";
import { LoginForm } from "./login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Acceso",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-5 bg-cover bg-center bg-fixed text-ink"
      style={{ backgroundImage: "url(/banner/login.webp)" }}
    >
      <div className="w-full max-w-sm">
        <Card className="bg-cream">
          <CardHeader>
            <div className="mb-8 flex justify-center">
              <Logo className="text-ink" />
            </div>

            <CardTitle className="font-display text-2xl">Acceso al panel</CardTitle>
            <CardDescription className="text-stone">
              Entra para gestionar el contenido de Slow Life.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}