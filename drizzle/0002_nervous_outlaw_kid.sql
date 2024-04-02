DO $$ BEGIN
 CREATE TYPE "action" AS ENUM('get', 'post', 'put', 'patch', 'delete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "role" AS ENUM('admin', 'employee', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "department_permission" (
	"department_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	CONSTRAINT "department_permission_department_id_permission_id_pk" PRIMARY KEY("department_id","permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	"role" "role" NOT NULL,
	"department_id" integer,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"endpoint" varchar(100) NOT NULL,
	"action" "action" NOT NULL
);
--> statement-breakpoint
DROP TABLE "admin";--> statement-breakpoint
ALTER TABLE "program_item" DROP CONSTRAINT "program_item_program_id_course_id_pk";--> statement-breakpoint
ALTER TABLE "program_item" ADD COLUMN "id" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "program_item" ADD COLUMN "term" "term" NOT NULL;--> statement-breakpoint
ALTER TABLE "program_item" ADD COLUMN "note" varchar(100);--> statement-breakpoint
ALTER TABLE "program" DROP COLUMN IF EXISTS "term";