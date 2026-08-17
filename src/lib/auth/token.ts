import "server-only";

import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";

/**
 * Devuelve el `accessToken` del backend GraphQL, extraído del JWT cifrado que
 * Auth.js guarda en la sesión al hacer login. Solo se resuelve en el servidor:
 * el token nunca se expone al cliente.
 */
export async function getAccessToken(): Promise<string | null> {
  const requestHeaders = await headers();
  const forwardedProto =
    requestHeaders.get("x-forwarded-proto") ?? "http";
  const envUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
  const secureCookie =
    forwardedProto.split(",")[0].trim() === "https" ||
    envUrl?.startsWith("https://") === true;

  const token = await getToken({
    req: { headers: requestHeaders },
    secret: process.env.AUTH_SECRET,
    secureCookie,
  });

  return (token?.accessToken as string | undefined) ?? null;
}