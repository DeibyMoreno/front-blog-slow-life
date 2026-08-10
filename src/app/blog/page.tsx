import type { Metadata } from "next";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogMarquee } from "@/components/blog/blog-marquee";
import { FeaturedStory } from "@/components/blog/featured-story";
import { BlogFeed } from "@/components/blog/blog-feed";
import { getArticles } from "@/lib/blog/api";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Historias de estilo de vida y de la ropa que los acompaña: vivir despacio, observar el agua pasar y recordar que la prisa es solo una ilusión.",
};

export default async function BlogPage() {
  const fetched = await getArticles(30);
  const articles = fetched.length > 0 ? fetched : [];

  const [featured, ...rest] = articles;

  return (
    <>
      <SiteHeader tone="dark" overlay />

      <main className="flex-1 bg-cream">
        <BlogHero />
        <BlogMarquee />
        {featured ? <FeaturedStory article={featured} /> : null}
        <BlogFeed articles={rest} />
      </main>

      <SiteFooter />
    </>
  );
}
