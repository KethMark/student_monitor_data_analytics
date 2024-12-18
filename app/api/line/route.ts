import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

export async function GET() {
  try {
    const studentId = 1;

    const result = await db.execute(sql`
      SELECT 
        ${studentRecords.date} AS date, 
        ${studentRecords.sleepHours}::int AS sleep_hours, 
        ${studentRecords.stressLevel}::int AS stress_level
      FROM 
        ${studentRecords}
      WHERE 
        ${studentRecords.studentId} = ${studentId}
      ORDER BY 
        ${studentRecords.date} ASC
    `);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching student records:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
