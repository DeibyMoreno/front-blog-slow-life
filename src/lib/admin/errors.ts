import {
  CombinedGraphQLErrors,
  ServerError,
} from "@apollo/client/errors";

function isUnauthorizedExtensions(
  extensions: Record<string, unknown> | undefined
): boolean {
  if (!extensions) return false;

  if (extensions.code === "UNAUTHORIZED") return true;

  const http = extensions.http as { status?: number } | undefined;
  if (http?.status === 401) return true;

  const response = extensions.response as { status?: number } | undefined;
  if (response?.status === 401) return true;

  return false;
}

/**
 * Detecta un 401/`UNAUTHORIZED` del backend en un error lanzado por una
 * operación Apollo Client v4. El backend enmascara la sesión como describen
 * `api.md` (`extensions.code` "UNAUTHORIZED" con `http.status` 401), así que se
 * comprueban las tres formas en las que v4 reporta un rechazo de auth:
 * - `CombinedGraphQLErrors` (errores GraphQL en el `errors` de la respuesta)
 * - `ServerError` (HTTP no 2xx de respuesta sin cuerpo GraphQL válido)
 * - cualquier otro error de red que exponga `status`/`statusCode` 401
 */
export function isUnauthorized(error: unknown): boolean {
  if (CombinedGraphQLErrors.is(error)) {
    return error.errors.some((gqlError) =>
      isUnauthorizedExtensions(gqlError.extensions)
    );
  }

  if (ServerError.is(error)) {
    return error.statusCode === 401;
  }

  if (typeof error !== "object" || error === null) return false;

  const candidate = error as { status?: number; statusCode?: number };
  return candidate.status === 401 || candidate.statusCode === 401;
}