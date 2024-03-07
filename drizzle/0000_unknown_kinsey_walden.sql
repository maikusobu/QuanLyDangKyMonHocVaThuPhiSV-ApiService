CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" varchar(255) NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
