import { twilioClient, twilioPhoneNumber } from './client';

// Function to send SMS notification using Twilio
export interface NotificationOptions {
    to: string;
    body: string;
}

// Sends an SMS notification using Twilio
export async function sendSMSNotification({ to, body }: NotificationOptions) {
    // Try to send the message via Twilio API
    try {
        const message = await twilioClient.messages.create({
            body,
            to,
            from: twilioPhoneNumber,
        });
        return {
            success: true,
            messageId: message.sid,
        };
    } catch (error) {
        console.error('Failed to send SMS notification:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        };
    }
}