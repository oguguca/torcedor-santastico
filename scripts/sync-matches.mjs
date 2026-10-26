// Dispara a sincronização de partidas no servidor em execução.
// Uso: npm run sync:matches  (SITE_URL padrão: http://localhost:3000)
const base = process.env.SITE_URL ?? "http://localhost:3000";
const response = await fetch(`${base}/api/cron/sync-matches`, {
  headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
});
console.log(response.status, JSON.stringify(await response.json()));
process.exit(response.ok ? 0 : 1);
