import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

export async function GET() {
  try {
    const result = await db.execute(sql`
      SELECT 
        ${studentRecords.date} as date, 
        ${studentRecords.stressLevel} as avg_stress_level, 
        ${studentRecords.anxietyLevel} as avg_anxiety_level
      FROM ${studentRecords}
      ORDER BY ${studentRecords.date}
    `);

    const formattedResult = result.map((row) => ({
      date: row.date,
      avg_stress_level: Number(row.avg_stress_level), 
      avg_anxiety_level: Number(row.avg_anxiety_level), 
    }));

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Error fetching student analytics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
