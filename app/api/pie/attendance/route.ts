import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

export async function GET() {
  try {
    const result = await db.execute(sql`
      SELECT 
        ${studentRecords.attendanceStatus} AS attendance_status, 
        COUNT(*)::int AS count
      FROM 
        ${studentRecords}
      WHERE ${studentRecords.attendanceStatus} IS NOT NULL 
      GROUP BY 
        ${studentRecords.attendanceStatus}
    `);

    const fillColors: Record<string, string> = {
      Present: 'var(--color-Present)',
      Late: 'var(--color-Late)',
      Absent: 'var(--color-Absent)',
    };

    const formattedResult = result.map((row) => ({
      attendance_status: row.attendance_status,
      count: row.count,
      fill: fillColors[row.attendance_status as keyof typeof fillColors] || 'var(--color-default)',
    }));

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Error fetching attendance status counts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
