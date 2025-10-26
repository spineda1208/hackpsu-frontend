import { NextRequest, NextResponse } from 'next/server';
import { sendSMSNotification } from '@/lib/twilio/notifications';


// Map of crime type IDs to readable crime names
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
    12: 'Vandalism'
};

/**
 * POST handler for sending SMS notifications to multiple users when a crime is detected.
 * Expects a JSON body: { crimeTypeId: number, phoneNumbers: string[] }
 */
export async function POST(request: NextRequest) {
    try {
        const { crimeTypeId, phoneNumbers } = await request.json();

        // Validate input
        if (!crimeTypeId || !Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
            return NextResponse.json(
                { error: 'crimeTypeId and phoneNumbers[] are required' },
                { status: 400 }
            );
        }

        // Get the crime type name from the map, fallback to 'Unknown Crime'
        const crimeType = CRIME_TYPE_MAP[crimeTypeId] || 'Unknown Crime';
        const message = `Crime detected nearby: ${crimeType}. Refer to local authorities for more information.`;

        // Send SMS to each phone number and collect results
        const results = await Promise.all(
            phoneNumbers.map((to) => sendSMSNotification({ to, body: message }))
        );

        // Check if any failed
        const failed = results.filter((r) => !r.success);
        if (failed.length > 0) {
            return NextResponse.json(
                { error: 'Some notifications failed', details: failed },
                { status: 207 } // 207: Multi-Status
            );
        }

        return NextResponse.json({ success: true, message: 'Notifications sent.' });
    } catch (error) {
        console.error('Error sending notifications:', error);
        return NextResponse.json(
            { error: 'Failed to send notifications' },
            { status: 500 }
        );
    }
}