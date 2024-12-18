import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

type AttendanceStatus = 'Present' | 'Late' | 'Absent';

export async function GET() {
    try {
      const result = await db.execute(sql`
        SELECT 
          ${studentRecords.attendanceStatus} AS attendance_status, 
          COUNT(*)::int AS count
        FROM 
          ${studentRecords}
        GROUP BY 
          ${studentRecords.attendanceStatus}
      `);
  
      const fillColors: Record<AttendanceStatus, string> = {
        Present: 'var(--color-present)',
        Late: 'var(--color-late)',
        Absent: 'var(--color-absent)',
      };
  
      const formattedResult = result
        .map((row) => {
          const attendanceStatus = row.attendance_status as AttendanceStatus; 
          if (attendanceStatus !== null) {
            return {
              condition: attendanceStatus.toLowerCase(),
              count: row.count, 
              fill: fillColors[attendanceStatus], 
            };
          }
          return null;
        })
        .filter((row) => row !== null); 
  
      return NextResponse.json(formattedResult);
    } catch (error) {
      console.error('Error fetching attendance mood analysis:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
