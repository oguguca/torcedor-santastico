import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as schema from "@/db/schema";
import { siteConfig } from "@/config/site";
import { sendEmail } from "./email";

export const auth = betterAuth({
  appName: siteConfig.name,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      // Sem await: evita revelar pelo tempo de resposta se o e-mail existe.
      void sendEmail({
        to: user.email,
        subject: "Redefina sua senha no Torcedor Santastico",
        text: `Olá, ${user.name}! Para criar uma nova senha, acesse: ${url}\n\nSe você não pediu isso, ignore este e-mail.`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Confirme seu e-mail no Torcedor Santastico",
        text: `Olá, ${user.name}! Confirme seu e-mail para entrar na arquibancada: ${url}`,
      });
    },
  },
  user: {
    // Campos do perfil: lidos na sessão, mas só alterados pela Server Action do perfil.
    additionalFields: {
      city: { type: "string", required: false, input: false },
      supporterSince: { type: "number", required: false, input: false },
      role: { type: "string", required: false, defaultValue: "user", input: false },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 dias
    updateAge: 60 * 60 * 24, // renova a cada dia de uso
  },
  // Deve ser o último plugin: grava cookies em Server Actions.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
