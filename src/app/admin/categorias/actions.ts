"use server";

import { revalidatePath } from "next/cache";

import {
  CreateCategoryDocument,
  DeleteCategoryDocument,
  UpdateCategoryDocument,
} from "@/gql/graphql";
import { getClient } from "@/lib/apollo/server";
import { getAccessToken } from "@/lib/auth/token";
import { isUnauthorized } from "@/lib/admin/errors";
import { categoryFormSchema } from "./schemas";

export interface CategoryActionResult {
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

async function handleMutationError(error: unknown): Promise<CategoryActionResult> {
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

export async function createCategory(values: unknown): Promise<CategoryActionResult> {
  const parsed = categoryFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Datos de la categoría no válidos." };
  }

  try {
    await getClient().mutate({
      mutation: CreateCategoryDocument,
      variables: {
        input: {
          name: parsed.data.name,
          description: parsed.data.description || undefined,
        },
      },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePath("/admin/categorias");
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}

export async function updateCategory(
  id: string,
  values: unknown
): Promise<CategoryActionResult> {
  const parsed = categoryFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Datos de la categoría no válidos." };
  }

  try {
    await getClient().mutate({
      mutation: UpdateCategoryDocument,
      variables: {
        id,
        input: {
          name: parsed.data.name,
          description: parsed.data.description || undefined,
        },
      },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePath("/admin/categorias");
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}

export async function deleteCategory(id: string): Promise<CategoryActionResult> {
  try {
    await getClient().mutate({
      mutation: DeleteCategoryDocument,
      variables: { id },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePath("/admin/categorias");
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}