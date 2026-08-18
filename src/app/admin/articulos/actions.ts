"use server";

import { revalidatePath } from "next/cache";

import {
  CreatePostDocument,
  DeletePostDocument,
  UpdatePostDocument,
} from "@/gql/graphql";
import { getClient } from "@/lib/apollo/server";
import { getAccessToken } from "@/lib/auth/token";
import { isUnauthorized } from "@/lib/admin/errors";
import { postFormSchema, type PostFormValues } from "./schemas";

export interface PostActionResult {
  ok: boolean;
  error?: string;
  errorCode?: "UNAUTHORIZED";
}

async function authorizationContext() {
  const accessToken = await getAccessToken();
  return accessToken
    ? { headers: { Authorization: `Bearer ${accessToken}` } }
    : undefined;
}

async function handleMutationError(error: unknown): Promise<PostActionResult> {
  if (isUnauthorized(error)) {
    // El accessToken del backend caducó (TTL 15 min y no hay refresh). La sesión
    // de Auth.js se cierra desde el cliente para que el usuario vuelva a entrar
    // con un token fresco.
    return {
      ok: false,
      errorCode: "UNAUTHORIZED",
      error: "Tu sesión expiró. Vuelve a iniciar sesión.",
    };
  }

  console.error("[admin] mutation falló:", error);
  return { ok: false, error: "No se pudo completar la acción." };
}

function emptyToUndefined(value: string | undefined): string | undefined {
  return value && value.trim().length > 0 ? value : undefined;
}

function toCreateInput(values: PostFormValues) {
  return {
    title: values.title,
    excerpt: emptyToUndefined(values.excerpt),
    content: values.content,
    coverImage: emptyToUndefined(values.coverImage),
    status: values.status,
    categoryId: emptyToUndefined(values.categoryId),
    tagIds: values.tagIds,
  };
}

function toUpdateInput(values: PostFormValues) {
  return {
    title: values.title,
    excerpt: emptyToUndefined(values.excerpt),
    content: values.content,
    coverImage: emptyToUndefined(values.coverImage),
    status: values.status,
    categoryId: emptyToUndefined(values.categoryId),
    tagIds: values.tagIds,
  };
}

function revalidatePostPaths() {
  revalidatePath("/admin/articulos");
  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
}

export async function createPost(values: unknown): Promise<PostActionResult> {
  const parsed = postFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Datos del artículo no válidos." };
  }

  try {
    await getClient().mutate({
      mutation: CreatePostDocument,
      variables: { input: toCreateInput(parsed.data) },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePostPaths();
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}

export async function updatePost(
  id: string,
  values: unknown
): Promise<PostActionResult> {
  const parsed = postFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Datos del artículo no válidos." };
  }

  try {
    await getClient().mutate({
      mutation: UpdatePostDocument,
      variables: { id, input: toUpdateInput(parsed.data) },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePostPaths();
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}

export async function deletePost(id: string): Promise<PostActionResult> {
  try {
    await getClient().mutate({
      mutation: DeletePostDocument,
      variables: { id },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePostPaths();
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}
