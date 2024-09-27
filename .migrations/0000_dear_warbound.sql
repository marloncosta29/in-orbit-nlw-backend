CREATE TABLE IF NOT EXISTS "goals" (
	"is" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"desire_weekly_frequency" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
