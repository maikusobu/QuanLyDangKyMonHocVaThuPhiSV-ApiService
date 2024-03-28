DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "term" AS ENUM('first', 'second', 'third');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"100" varchar NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"number_of_periods" integer NOT NULL,
	"course_type_id" integer NOT NULL,
	"faculty_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"unit_price" bigint NOT NULL,
	CONSTRAINT "course_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "district" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"is_minor" boolean NOT NULL,
	"province_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "faculty" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "faculty_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "province" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "province_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"id" char(8) PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"date_of_birth" date NOT NULL,
	"gender" "gender" NOT NULL,
	"major_id" integer NOT NULL,
	"district_id" integer NOT NULL,
	"priority_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "major" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"faculty_id" integer NOT NULL,
	CONSTRAINT "major_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "priority" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"discount_percentage" numeric(5, 2) NOT NULL,
	CONSTRAINT "priority_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program" (
	"id" serial PRIMARY KEY NOT NULL,
	"term" "term" NOT NULL,
	"major_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_item" (
	"program_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "program_item_program_id_course_id_pk" PRIMARY KEY("program_id","course_id")
);
