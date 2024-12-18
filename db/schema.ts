import {
  serial,
  varchar,
  pgTable,
  numeric,
  integer,
  date,
} from "drizzle-orm/pg-core";

export const studentRecords = pgTable("student_records", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id"),
  date: date("date"),
  classTime: varchar("class_time", { length: 20 }),
  attendanceStatus: varchar("attendance_status", { length: 20 }),
  stressLevel: numeric("stress_level", { precision: 4, scale: 2 }),
  sleepHours: numeric("sleep_hours", { precision: 4, scale: 1 }),
  anxietyLevel: integer("anxiety_level"),
  moodScore: integer("mood_score"),
  riskLevel: varchar("risk_level", { length: 10 }),
});

// import { db } from "@/db/index";
// import { patients, medical_history, treatment_details } from "@/db/schema";
// import { NextResponse } from "next/server";
// import { eq } from "drizzle-orm";

// export async function GET() {
//   try {
//     const patientsWithRelations = await db
//       .select()
//       .from(patients)
//       .leftJoin(medical_history, eq(patients.id, medical_history.patient_id))
//       .leftJoin(treatment_details, eq(patients.id, treatment_details.patient_id))
//       .orderBy(patients.id)

//     return NextResponse.json(patientsWithRelations);
//   } catch (error) {
//     console.error("Failed to fetch patients with related data:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch patients with related data" },
//       { status: 500 }
//     );
//   }
// }