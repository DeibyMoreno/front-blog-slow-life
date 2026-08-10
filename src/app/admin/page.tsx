import type { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import { Logo } from "@/components/site/logo";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getArticles } from "@/lib/blog/api";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const revalidate = 600;

export const metadata: Metadata = {
  title: "Panel",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const session = await auth();
  const articles = await getArticles(30);

  return (
    <main className="min-h-svh bg-sand">
      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-stone">
              Hola, {session?.user?.name}
              {session?.user?.role ? ` · ${session.user.role}` : null}
            </span>
            <SignOutButton />
          </div>
        </header>

        <Separator className="my-10 bg-linen" />

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="font-display text-3xl tracking-tight text-ink">
              Artículos
            </h1>
            <Badge variant="outline">{articles.length} publicados</Badge>
          </div>

          <div className="overflow-hidden rounded-xl bg-cream ring-1 ring-foreground/10">
            {articles.map((article, i) => (
              <div key={article.id}>
                {i > 0 ? <Separator className="bg-linen/70" /> : null}
                <div className="flex items-center justify-between gap-4 px-6 py-5">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg text-ink">
                      {article.title}
                    </p>
                    <p className="mt-0.5 text-sm text-stone">
                      {article.category.name} · {formatDate(article.publishedAt)}
                    </p>
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="shrink-0 text-sm text-forest hover:underline"
                  >
                    Ver →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}