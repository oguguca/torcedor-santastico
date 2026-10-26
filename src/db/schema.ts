/**
 * Tabelas do núcleo do Better Auth (usuário, sessão, conta e verificação)
 * e da central de partidas (competições, times e jogos).
 */
import { boolean, index, integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  /** Perfil do torcedor (editado pela página de perfil). */
  city: text("city"),
  supporterSince: integer("supporter_since"),
  /** "user" ou "admin". Só muda direto no banco (script make-admin). */
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_user_id_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("account_user_id_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

/* ---------- Central de partidas ---------- */

export const competition = pgTable(
  "competition",
  {
    id: serial("id").primaryKey(),
    /** Código da competição no provedor de dados, ex.: "BSA" (Brasileirão). */
    code: text("code").notNull(),
    name: text("name").notNull(),
    season: integer("season").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("competition_code_season_idx").on(table.code, table.season)],
);

export const team = pgTable(
  "team",
  {
    id: serial("id").primaryKey(),
    /** Origem dos dados ("santos-api") e o id do time lá. */
    source: text("source").notNull(),
    externalId: text("external_id").notNull(),
    name: text("name").notNull(),
    shortName: text("short_name").notNull(),
    tla: text("tla"),
    crestUrl: text("crest_url"),
    venue: text("venue"),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("team_source_external_idx").on(table.source, table.externalId)],
);

export const match = pgTable(
  "match",
  {
    id: serial("id").primaryKey(),
    source: text("source").notNull(),
    externalId: text("external_id").notNull(),
    competitionId: integer("competition_id")
      .notNull()
      .references(() => competition.id),
    matchday: integer("matchday"),
    kickoffAt: timestamp("kickoff_at", { withTimezone: true }).notNull(),
    /** Status do provedor: SCHEDULED, TIMED, IN_PLAY, PAUSED, FINISHED, POSTPONED... */
    status: text("status").notNull(),
    homeTeamId: integer("home_team_id")
      .notNull()
      .references(() => team.id),
    awayTeamId: integer("away_team_id")
      .notNull()
      .references(() => team.id),
    homeScore: integer("home_score"),
    awayScore: integer("away_score"),
    venue: text("venue"),
    /** Correção manual do admin: a sincronização não sobrescreve horário, status e placar. */
    manualOverride: boolean("manual_override").notNull().default(false),
    lastSyncedAt: timestamp("last_synced_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    uniqueIndex("match_source_external_idx").on(table.source, table.externalId),
    index("match_kickoff_idx").on(table.kickoffAt),
  ],
);
