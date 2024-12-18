CREATE TABLE "student_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"date" date NOT NULL,
	"class_time" varchar(20) NOT NULL,
	"attendance_status" varchar(20) NOT NULL,
	"stress_level" numeric(4, 2) NOT NULL,
	"sleep_hours" numeric(4, 1) NOT NULL,
	"anxiety_level" integer NOT NULL,
	"mood_score" integer NOT NULL,
	"risk_level" varchar(10) NOT NULL
);
