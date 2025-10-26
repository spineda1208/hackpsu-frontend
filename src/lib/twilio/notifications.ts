import { twilioClient, twilioPhoneNumber } from './client';

export interface NotificationOptions {
  to: string;
  body: string;
}

export async function sendSMSNotification({ to, body }: NotificationOptions) {
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