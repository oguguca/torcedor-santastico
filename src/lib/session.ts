import "server-only";
import { headers } from "next/headers";
import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "./auth";
import { routes } from "@/config/routes";

/**
 * Sessão atual validada no banco, ou `null`. Use dentro de um <Suspense>.
 * cache(): uma única consulta por requisição, mesmo chamada em vários componentes.
 */
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

/** Usuário administrador; os demais recebem 404, sem revelar que a página existe. */
export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") notFound();
  return user;
}

/** Usuário logado; sem sessão válida, redireciona para o login. */
export async function requireUser() {
  const session = await getSession();
  if (!session) redirect(routes.signIn);
  return session.user;
}
