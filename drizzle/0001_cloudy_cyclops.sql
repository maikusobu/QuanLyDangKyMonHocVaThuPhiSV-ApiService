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
CREATE TABLE IF NOT EXISTS "course_registration" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_date" date NOT NULL,
	"year" integer NOT NULL,
	"term" "term" NOT NULL,
	"student_id" char(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "course_registration_item" (
	"course_id" integer NOT NULL,
	"course_registration_id" integer NOT NULL,
	CONSTRAINT "course_registration_item_course_registration_id_course_id_pk" PRIMARY KEY("course_registration_id","course_id")
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
