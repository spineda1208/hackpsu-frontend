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
if (!process.env.EMAILJS_PRIVATE_KEY) {
    throw new Error('Missing EMAILJS_PRIVATE_KEY environment variable');
}

const EMAILJS_API = 'https://api.emailjs.com/api/v1.0/email/send';

export interface EmailJSPayload {
    to: string;
    crimeType: string;
    templateParams?: Record<string, unknown>;
}

export async function sendEmailViaEmailJS(payload: EmailJSPayload) {
    const { to, crimeType, templateParams = {} } = payload;

    // Default message if no summary provided
    const defaultMessage = `A crime has been detected in your area: ${crimeType}. Please refer to local authorities for more information.`;
    
    // This matches EmailJS API requirements exactly
    const body = {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_USER_ID,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
        to: to, // EmailJS expects 'to' not 'to_email'
        time: new Date().toLocaleString(),
        crime_type: crimeType,
        message: templateParams.summary || defaultMessage,
        ...templateParams,
        },
    };

    // Make the POST request to EmailJS API
    try {
        const res = await fetch(EMAILJS_API, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });

        // Handle non-200 responses
        if (!res.ok) {
            const text = await res.text();
            return { success: false, status: res.status, error: text };
        }

        return { success: true };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
}
