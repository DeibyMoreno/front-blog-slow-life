"use server";

import { revalidatePath } from "next/cache";

import {
  CreateTagDocument,
  DeleteTagDocument,
} from "@/gql/graphql";
import { getClient } from "@/lib/apollo/server";
import { getAccessToken } from "@/lib/auth/token";
import { isUnauthorized } from "@/lib/admin/errors";
import { tagFormSchema } from "./schemas";

export interface TagActionResult {
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

async function handleMutationError(error: unknown): Promise<TagActionResult> {
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

export async function createTag(values: unknown): Promise<TagActionResult> {
  const parsed = tagFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: "Datos de la etiqueta no válidos." };
  }

  try {
    await getClient().mutate({
      mutation: CreateTagDocument,
      variables: { input: { name: parsed.data.name } },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePath("/admin/etiquetas");
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}

export async function deleteTag(id: string): Promise<TagActionResult> {
  try {
    await getClient().mutate({
      mutation: DeleteTagDocument,
      variables: { id },
      context: await authorizationContext(),
      fetchPolicy: "no-cache",
    });

    revalidatePath("/admin/etiquetas");
    return { ok: true };
  } catch (error) {
    return handleMutationError(error);
  }
}
