ALTER TABLE "tuition_payment" RENAME COLUMN "ammount" TO "amount";--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "is_deleted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "student" ADD COLUMN "mssv" varchar;--> statement-breakpoint
ALTER TABLE "student" ADD COLUMN "address" varchar(255) NOT NULL;