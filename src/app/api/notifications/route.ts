import { NextRequest, NextResponse } from 'next/server';
import { sendEmailNotification } from '@/lib/notifications/email';

// Map of crime type IDs to human-readable crime names
const CRIME_TYPE_MAP: Record<number, string> = {
    0: 'Abuse',
    1: 'Arrest',
    2: 'Arson',
    3: 'Assault',
    4: 'Burglary',
    5: 'Explosion',
    6: 'Fighting',
    7: 'RoadAccidents',
    8: 'Robbery',
    9: 'Shooting',
    10: 'Shoplifting',
    11: 'Stealing',
    12: 'Vandalism',
};

/**
 * POST handler for sending email notifications to multiple users when a crime is detected.
 * Expects body: { crimeTypeId: number, emails: string[] }
 */
export async function POST(request: NextRequest) {
    try {
        const { crimeTypeId, emails } = await request.json();

        // Validate input
        if (!crimeTypeId || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json(
                { error: 'crimeTypeId and emails[] are required' },
                { status: 400 }
            );
        }

        // Resolve crime type from the map
        const crimeType = CRIME_TYPE_MAP[crimeTypeId] || 'Unknown Crime';
        
        // Send email to each recipient
        const results = await Promise.all(
            emails.map((to: string) => sendEmailNotification({ 
                to,
                crimeType
            }))
        );

            const failed = results
                .map((res: { success: boolean; error?: string }, i: number) => ({ index: i, result: res }))
                .filter((r) => !r.result.success);
        if (failed.length > 0) {
            return NextResponse.json({ error: 'Some emails failed', details: failed }, { status: 207 });
        }

        return NextResponse.json({ success: true, message: 'Emails queued/sent' });
    } catch (err) {
        console.error('Error in notifications POST:', err);
        return NextResponse.json({ error: 'Invalid request or server error' }, { status: 400 });
    }
}