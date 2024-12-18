import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

export async function GET() {
  try {
    const result = await db.execute(sql`
      SELECT 
        ${studentRecords.riskLevel} AS risk_level, 
        COUNT(*)::int AS count
      FROM 
        ${studentRecords}
      WHERE ${studentRecords.riskLevel} IS NOT NULL 
      GROUP BY 
        ${studentRecords.riskLevel}
    `);

    const fillColors: Record<string, string> = {
        Low: 'var(--color-Low)',
        Medium: 'var(--color-Medium)',
        High: 'var(--color-High)',
      };
      
      const formattedResult = result.map((row) => ({
        risk_level: row.risk_level,
        count: row.count,
        fill: fillColors[row.risk_level as keyof typeof fillColors] || 'var(--color-default)',
      }));
      

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Error fetching risk level counts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
