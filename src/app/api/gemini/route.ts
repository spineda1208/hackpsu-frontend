import { NextRequest, NextResponse } from 'next/server';
import { sendEmailViaEmailJS } from '@/lib/emailjs/client';
import { getGeminiCrimeTypeName, shouldNotify } from '@/lib/emailjs/crime-types';

interface GeminiPayload {
    crimeTypeID: string;
    Summary: string;
    emails?: string[]; // Optional: specific emails to notify
}

export async function POST(request: NextRequest) {
    try {
        const body: GeminiPayload = await request.json();
        const { crimeTypeID, Summary, emails } = body;

        // Validate input
        if (!crimeTypeID) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'Invalid payload. Expected { crimeTypeID: string, Summary: string, emails?: string[] }' 
                },
                { status: 400 }
            );
        }

        // Check if we should send notifications for this crime type
        if (!shouldNotify(crimeTypeID)) {
            return NextResponse.json({
                success: true,
                message: 'No criminal activity detected. No notifications sent.',
                crimeTypeID,
            });
        }

        // Get the friendly crime type name
        const crimeType = getGeminiCrimeTypeName(crimeTypeID);
        
        // Get emails to notify (either from payload or from environment/database)
        const recipientEmails = emails || getSubscribedEmails();

        if (!recipientEmails || recipientEmails.length === 0) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: 'No email recipients configured. Please provide emails in the request or set NOTIFICATION_EMAILS environment variable.' 
                },
                { status: 400 }
            );
        }

        const results = [];

        // Send email to each recipient
        for (const email of recipientEmails) {
            const result = await sendEmailViaEmailJS({
                to: email,
                crimeType: crimeType,
                templateParams: {
                    summary: Summary || `A crime has been detected: ${crimeType}`,
                },
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
            crimeTypeID,
            crimeType,
            notificationsSent: results.filter(r => r.success).length,
            results,
        }, { 
            status: allSuccess ? 200 : 207 // 207 Multi-Status if some failed
        });

    } catch (error) {
        console.error('Error in /api/gemini:', error);
        return NextResponse.json(
            { 
                success: false, 
                error: error instanceof Error ? error.message : 'Unknown error' 
            },
            { status: 500 }
        );
    }
}

/**
 * Get subscribed email addresses from environment variable or database
 * Format: NOTIFICATION_EMAILS=email1@example.com,email2@example.com
 */
function getSubscribedEmails(): string[] {
    const emailsEnv = process.env.NOTIFICATION_EMAILS;
    if (!emailsEnv) {
        return [];
    }
    
    return emailsEnv
        .split(',')
        .map(email => email.trim())
        .filter(email => email.length > 0);
}

