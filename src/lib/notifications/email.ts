import { sendEmailViaEmailJS } from '@/lib/emailjs/client';

export interface EmailNotificationOptions {
    to: string;
    crimeType: string;
    templateParams?: Record<string, unknown>;
}

/**
 * Sends a single email notification using EmailJS.
 * Returns { success: boolean, error?: string }
 * 
 * The email will include:
 * - Timestamp (automatic)
 * - Crime type with warning message
 */
export async function sendEmailNotification({ to, crimeType, templateParams }: EmailNotificationOptions) {
    const result = await sendEmailViaEmailJS({ to, crimeType, templateParams });
    if (!result.success) {
        return { success: false, error: result.error || `Status ${result.status || 'unknown'}` };
    }
    return { success: true };
}
