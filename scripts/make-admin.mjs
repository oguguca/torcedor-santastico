// Dá o papel de administrador a um usuário já cadastrado.
// Uso: node --env-file=.env.local scripts/make-admin.mjs email@exemplo.com
import pg from "pg";

const email = process.argv[2]?.trim().toLowerCase();
if (!email) {
  console.error("Informe o e-mail: node --env-file=.env.local scripts/make-admin.mjs email@exemplo.com");
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
await client.connect();
const { rowCount } = await client.query(`update "user" set role = 'admin' where lower(email) = $1`, [email]);
await client.end();

console.log(rowCount ? `${email} agora é administrador.` : `Nenhum usuário encontrado com ${email}.`);
process.exit(rowCount ? 0 : 1);
