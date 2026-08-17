import "server-only";

import {
  GetAdminPostDocument,
  ListCategoriesDocument,
  ListPostsDocument,
  ListTagsDocument,
  type PostStatus,
} from "@/gql/graphql";
import { getClient } from "@/lib/apollo/server";
import { getAccessToken } from "@/lib/auth/token";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface AdminTag {
  id: string;
  name: string;
  slug: string;
}

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  status: PostStatus;
  excerpt?: string | null;
  coverImage?: string | null;
  publishedAt?: string | null;
  updatedAt: string;
  category?: { id: string; name: string; slug: string } | null;
  author?: { id: string; fullName: string; avatarUrl?: string | null } | null;
}

export interface AdminPostDetail {
  id: string;
  title: string;
  slug: string;
  content?: string | null;
  excerpt?: string | null;
  coverImage?: string | null;
  status: PostStatus;
  publishedAt?: string | null;
  updatedAt?: string | null;
  category?: { id: string; name: string } | null;
  tags: { id: string; name: string }[];
}

async function authorizationContext() {
  const accessToken = await getAccessToken();
  return accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : undefined;
}

/**
 * Lista las categorías del panel. Requiere sesión autenticada (Bearer token del
 * JWT de Auth.js). Si el backend no está disponible, degrada a lista vacía.
 */
export async function listCategories(): Promise<AdminCategory[]> {
  try {
    const { data } = await getClient().query({
      query: ListCategoriesDocument,
      context: {
        ...(await authorizationContext()),
        fetchOptions: { cache: "no-store" },
      },
    });

    return data?.categories ?? [];
  } catch (error) {
    console.error("[admin] listCategories falló:", error);
    return [];
  }
}

/**
 * Lista las etiquetas del panel. Requiere sesión autenticada (Bearer token del
 * JWT de Auth.js). Si el backend no está disponible, degrada a lista vacía.
 */
export async function listTags(): Promise<AdminTag[]> {
  try {
    const { data } = await getClient().query({
      query: ListTagsDocument,
      context: {
        ...(await authorizationContext()),
        fetchOptions: { cache: "no-store" },
      },
    });

    return data?.tags ?? [];
  } catch (error) {
    console.error("[admin] listTags falló:", error);
    return [];
  }
}

/**
 * Lista los artículos del panel (todos los estados). Requiere sesión autenticada
 * (Bearer token del JWT de Auth.js). Si el backend no está disponible, degrada a
 * lista vacía.
 */
export async function listPosts(): Promise<AdminPost[]> {
  try {
    const { data } = await getClient().query({
      query: ListPostsDocument,
      variables: { limit: 100, offset: 0 },
      context: {
        ...(await authorizationContext()),
        fetchOptions: { cache: "no-store" },
      },
    });

    return data?.posts ?? [];
  } catch (error) {
    console.error("[admin] listPosts falló:", error);
    return [];
  }
}

/**
 * Devuelve el detalle de un artículo para el formulario de edición. Si no
 * existe o el backend no está disponible, devuelve `null`.
 */
export async function getPostDetail(id: string): Promise<AdminPostDetail | null> {
  try {
    const { data } = await getClient().query({
      query: GetAdminPostDocument,
      variables: { id },
      context: {
        ...(await authorizationContext()),
        fetchOptions: { cache: "no-store" },
      },
    });

    const post = data?.post;
    if (!post) return null;

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      coverImage: post.coverImage,
      status: post.status,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      category: post.category,
      tags: post.tags,
    };
  } catch (error) {
    console.error("[admin] getPostDetail falló:", error);
    return null;
  }
}