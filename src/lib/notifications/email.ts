import { sendEmailViaEmailJS } from '@/lib/emailjs/client';

export interface EmailNotificationOptions {
  to: string;
  subject: string;
  message: string;
  templateParams?: Record<string, unknown>;
}

/**
 * Sends a single email notification using EmailJS.
 * Returns { success: boolean, error?: string }
 */
export async function sendEmailNotification({ to, subject, message, templateParams }: EmailNotificationOptions) {
  const result = await sendEmailViaEmailJS({ to, subject, message, templateParams });
  if (!result.success) {
    return { success: false, error: result.error || `Status ${result.status || 'unknown'}` };
  }
  return { success: true };
}
