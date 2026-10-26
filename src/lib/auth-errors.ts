/** Traduz os códigos de erro do Better Auth para mensagens em português. */
const messages: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "E-mail ou senha incorretos.",
  EMAIL_NOT_VERIFIED:
    "Confirme seu e-mail antes de entrar. Enviamos um novo link para a sua caixa de entrada.",
  USER_ALREADY_EXISTS: "Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
    "Já existe uma conta com este e-mail. Tente entrar ou recuperar a senha.",
  INVALID_EMAIL: "Digite um e-mail válido.",
  PASSWORD_TOO_SHORT: "A senha precisa ter pelo menos 8 caracteres.",
  PASSWORD_TOO_LONG: "A senha pode ter no máximo 128 caracteres.",
  INVALID_TOKEN: "Este link não é mais válido. Peça um novo.",
  TOKEN_EXPIRED: "Este link expirou. Peça um novo.",
  USER_NOT_FOUND: "Não encontramos uma conta com este e-mail.",
};

const fallback = "Algo deu errado. Tente de novo em instantes.";

type AuthError = { code?: string; status?: number } | null | undefined;

export function authErrorMessage(error: AuthError): string {
  if (!error) return fallback;
  if (error.status === 429) return "Muitas tentativas seguidas. Aguarde um pouco e tente de novo.";
  return (error.code && messages[error.code]) || fallback;
}

/** Mensagem para códigos que chegam pela URL (links de e-mail inválidos). */
export function authErrorFromCode(code: string | null | undefined): string | null {
  if (!code) return null;
  return messages[code] ?? fallback;
}
