import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaEmailJS } from '@/lib/emailjs/client';
import { getCrimeTypeName } from '@/lib/emailjs/crime-types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { crimeTypeId, emails } = body;

        // Validate input
        if (!crimeTypeId || !emails || !Array.isArray(emails) || emails.length === 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Invalid payload. Expected { crimeTypeId: number, emails: string[] }' 
                },
                { status: 400 }
            );
        }

        const crimeType = getCrimeTypeName(crimeTypeId);
        const results = [];

        // Send email to each recipient
        for (const email of emails) {
            const result = await sendEmailViaEmailJS({
                to: email,
                crimeType: crimeType,
            });
            results.push({
                email,
                ...result,
            });
        }

        // Check if all emails were sent successfully
        const allSuccess = results.every(r => r.success);

        return NextResponse.json({
            success: allSuccess,
            results,
        }, { 
            status: allSuccess ? 200 : 207 // 207 Multi-Status if some failed
        });

    } catch (error) {
        console.error('Error in /api/notifications:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}

