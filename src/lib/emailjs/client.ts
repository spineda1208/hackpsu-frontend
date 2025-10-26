// Simple server-side EmailJS client using the EmailJS REST API.
// Docs: https://www.emailjs.com/docs/rest-api/send/

if (!process.env.EMAILJS_SERVICE_ID) {
  throw new Error('Missing EMAILJS_SERVICE_ID environment variable');
}
if (!process.env.EMAILJS_TEMPLATE_ID) {
  throw new Error('Missing EMAILJS_TEMPLATE_ID environment variable');
}
if (!process.env.EMAILJS_USER_ID) {
  throw new Error('Missing EMAILJS_USER_ID environment variable');
}

const EMAILJS_API = 'https://api.emailjs.com/api/v1.0/email/send';

export interface EmailJSPayload {
  to: string;
  subject: string;
  message: string;
  templateParams?: Record<string, unknown>;
}

export async function sendEmailViaEmailJS(payload: EmailJSPayload) {
  const { to, subject, message, templateParams = {} } = payload;

  const body = {
    service_id: process.env.EMAILJS_SERVICE_ID,
    template_id: process.env.EMAILJS_TEMPLATE_ID,
    user_id: process.env.EMAILJS_USER_ID,
    template_params: {
      to_email: to,
      subject,
      message,
      ...templateParams,
    },
  };

  try {
    const res = await fetch(EMAILJS_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      return { success: false, status: res.status, error: text };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
