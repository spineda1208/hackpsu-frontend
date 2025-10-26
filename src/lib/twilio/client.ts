import twilio from 'twilio';

if (!process.env.TWILIO_ACCOUNT_SID) {
  throw new Error('Missing TWILIO_ACCOUNT_SID environment variable');
}

if (!process.env.TWILIO_AUTH_TOKEN) {
  throw new Error('Missing TWILIO_AUTH_TOKEN environment variable');
}

if (!process.env.TWILIO_PHONE_NUMBER) {
  throw new Error('Missing TWILIO_PHONE_NUMBER environment variable');
}

export const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;