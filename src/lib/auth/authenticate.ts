import "server-only";

import { LoginDocument } from "@/gql/graphql";
import { getClient } from "@/lib/apollo/server";

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string;
}

/**
 * Valida las credenciales contra el backend GraphQL de Slow Life mediante la
 * mutation `login`. Devuelve el usuario junto con sus tokens (JWT del backend),
 * que Auth.js guarda en su propia sesión para requests autenticadas.
 */
export async function authenticate(
  email: string,
  password: string
): Promise<AuthenticatedUser | null> {
  try {
    const { data } = await getClient().mutate({
      mutation: LoginDocument,
      variables: { input: { email, password } },
      fetchPolicy: "no-cache",
    });

    const login = data?.login;
    if (!login) return null;

    return {
      id: login.user.id,
      name: login.user.fullName,
      email: login.user.email,
      image: login.user.avatarUrl ?? undefined,
      role: login.user.role.name,
      accessToken: login.accessToken,
      refreshToken: login.refreshToken,
    };
  } catch {
    return null;
  }
}