import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { sql } from 'drizzle-orm';
import { studentRecords } from '@/db/schema';

type RiskLevel = 'Low' | 'Medium' | 'High';

export async function GET() {
  try {
    const result = await db.execute(sql`
      SELECT 
        ${studentRecords.riskLevel} AS risk_level, 
        AVG(${studentRecords.sleepHours}) AS avg_sleep_hours
      FROM 
        ${studentRecords}
      GROUP BY 
        ${studentRecords.riskLevel}
    `);

    const fillColors: Record<RiskLevel, string> = {
      Low: 'var(--color-low)',
      Medium: 'var(--color-medium)',
      High: 'var(--color-high)',
    };

    const formattedResult = result
      .map((row) => {
        const riskLevel = row.risk_level as RiskLevel;
        if (riskLevel !== null) {
          const two = Number(row.avg_sleep_hours).toFixed(2)
          return {
            condition: riskLevel.toLowerCase(), 
            count: Number(two), 
            fill: fillColors[riskLevel], 
          };
        }
        return null;
      })
      .filter((row) => row !== null);  

    return NextResponse.json(formattedResult);
  } catch (error) {
    console.error('Error fetching student risk analysis:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
