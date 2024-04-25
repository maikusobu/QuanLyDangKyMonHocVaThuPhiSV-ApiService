DO $$ BEGIN
 CREATE TYPE "action" AS ENUM('get', 'post', 'put', 'patch', 'delete');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
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
DO $$ BEGIN
 CREATE TYPE "term" AS ENUM('first', 'second', 'third');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "available_course" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"term" "term"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "available_course_item" (
	"course_id" integer NOT NULL,
	"available_course_id" integer NOT NULL,
	CONSTRAINT "available_course_item_available_course_id_course_id_pk" PRIMARY KEY("available_course_id","course_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"number_of_periods" integer NOT NULL,
	"course_type_id" integer NOT NULL,
	"faculty_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_date" date NOT NULL,
	"year" integer NOT NULL,
	"term" "term" NOT NULL,
	"student_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_registration_item" (
	"course_id" integer NOT NULL,
	"course_registration_id" integer NOT NULL,
	CONSTRAINT "course_registration_item_course_registration_id_course_id_pk" PRIMARY KEY("course_registration_id","course_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"unit_price" bigint NOT NULL,
	CONSTRAINT "course_type_name_unique" UNIQUE("name")
);
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
CREATE TABLE IF NOT EXISTS "province" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	CONSTRAINT "province_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student" (
	"id" serial PRIMARY KEY NOT NULL,
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
	"major_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "program_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"program_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	"term" "term" NOT NULL,
	"note" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tuition" (
	"id" serial PRIMARY KEY NOT NULL,
	"tuition_date" date NOT NULL,
	"total_registered_amount" integer NOT NULL,
	"total_actual_amount" integer NOT NULL,
	"course_registration_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tuition_payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"payment_date" date NOT NULL,
	"ammount" integer NOT NULL,
	"tuition_id" integer NOT NULL
);
