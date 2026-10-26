CREATE TABLE "competition" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"name" text NOT NULL,
	"season" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "match" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"external_id" text NOT NULL,
	"competition_id" integer NOT NULL,
	"matchday" integer,
	"kickoff_at" timestamp with time zone NOT NULL,
	"status" text NOT NULL,
	"home_team_id" integer NOT NULL,
	"away_team_id" integer NOT NULL,
	"home_score" integer,
	"away_score" integer,
	"venue" text,
	"manual_override" boolean DEFAULT false NOT NULL,
	"last_synced_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team" (
	"id" serial PRIMARY KEY NOT NULL,
	"source" text NOT NULL,
	"external_id" text NOT NULL,
	"name" text NOT NULL,
	"short_name" text NOT NULL,
	"tla" text,
	"crest_url" text,
	"venue" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" text DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_competition_id_competition_id_fk" FOREIGN KEY ("competition_id") REFERENCES "public"."competition"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_home_team_id_team_id_fk" FOREIGN KEY ("home_team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_away_team_id_team_id_fk" FOREIGN KEY ("away_team_id") REFERENCES "public"."team"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "competition_code_season_idx" ON "competition" USING btree ("code","season");--> statement-breakpoint
CREATE UNIQUE INDEX "match_source_external_idx" ON "match" USING btree ("source","external_id");--> statement-breakpoint
CREATE INDEX "match_kickoff_idx" ON "match" USING btree ("kickoff_at");--> statement-breakpoint
CREATE UNIQUE INDEX "team_source_external_idx" ON "team" USING btree ("source","external_id");