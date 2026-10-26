import "server-only";

type EmailMessage = {
  to: string;
  subject: string;
  text: string;
};

/**
 * Envia e-mail pelo Resend quando RESEND_API_KEY está configurada.
 * Sem chave, em desenvolvimento, apenas mostra a mensagem no terminal
 * para que os links de verificação e redefinição possam ser testados.
 */
export async function sendEmail({ to, subject, text }: EmailMessage): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // EMAIL_LOG_LINKS=true força o log no terminal (só para testes locais do build).
    if (process.env.NODE_ENV === "production" && process.env.EMAIL_LOG_LINKS !== "true") {
      console.error(`[email] RESEND_API_KEY ausente: e-mail "${subject}" para ${to} não foi enviado.`);
      return;
    }
    console.info(`\n[email:dev] Para: ${to}\n[email:dev] Assunto: ${subject}\n[email:dev] ${text}\n`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Torcedor Santastico <onboarding@resend.dev>",
      to,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    console.error(`[email] Falha ao enviar "${subject}" para ${to}: ${response.status}`);
  }
}
