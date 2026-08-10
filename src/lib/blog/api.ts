import "server-only";

import { GetPostBySlugDocument, ListPostsDocument } from "@/gql/graphql";
import { query } from "@/lib/apollo/server";
import type { Article, ArticleDetail } from "@/lib/blog/types";
import { DUMMY_ARTICLES } from "./dummy-data";

const REVALIDATE_SECONDS = 900;

function readingTime(content?: string | null, excerpt?: string | null): number {
  const text = `${content ?? ""} ${excerpt ?? ""}`.trim();
  if (!text) return 1;
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface PostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  category?: { name: string; slug: string } | null;
  author: { id: string; fullName: string; avatarUrl?: string | null };
}

function mapPostToArticle(post: PostSummary): Article {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    category: post.category
      ? { slug: post.category.slug, name: post.category.name }
      : { slug: "sin-categoria", name: "Sin categoría" },
    coverImage: post.coverImage ? { url: post.coverImage } : null,
    publishedAt: post.publishedAt ?? post.createdAt,
    readingTime: readingTime(post.excerpt),
    author: {
      id: post.author.id,
      name: post.author.fullName,
      avatar: post.author.avatarUrl ? { url: post.author.avatarUrl } : null,
    },
  };
}

export async function getArticles(limit = 12): Promise<Article[]> {
  try {
    const { data } = await query({
      query: ListPostsDocument,
      variables: { limit, offset: 0, status: "PUBLISHED" },
      context: {
        fetchOptions: { next: { revalidate: REVALIDATE_SECONDS } },
      },
    });

    return DUMMY_ARTICLES;

    if (!data) return [];

    return data.posts.map(mapPostToArticle);
  } catch (error) {
    console.error("[blog] getArticles falló:", error);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ArticleDetail | null> {
  try {
    const { data } = await query({
      query: GetPostBySlugDocument,
      variables: { slug },
      context: {
        fetchOptions: { next: { revalidate: REVALIDATE_SECONDS } },
      },
    });

    const post = data?.postBySlug;
    if (!post) return null;

    const base = mapPostToArticle(post);

    return {
      ...base,
      body: post.content ?? "",
      gallery: (post.gallery ?? []).map((url) => ({ url })),
      tags: post.tags.map((t) => ({ slug: t.slug, name: t.name })),
    };
  } catch (error) {
    console.error("[blog] getArticleBySlug falló:", error);
    return null;
  }
}