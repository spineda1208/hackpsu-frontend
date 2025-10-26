# Gemini AI Crime Detection Integration

This document explains how the Gemini AI crime detection system integrates with the email notification system.

## Overview

The system uses Gemini AI to analyze CCTV footage frames and detect potential criminal activity. When a crime is detected, it automatically sends email notifications to subscribed users.

## API Endpoint

**POST** `/api/gemini`

### Request Format

```json
{
  "crimeTypeID": "Robbery detected",
  "Summary": "Two individuals were observed forcing entry into a vehicle...",
  "emails": ["user@example.com"] // Optional
}
```

### Supported Crime Types

- `No criminal activity detected` (no notification sent)
- `Robbery detected`
- `Violence detected`
- `Shoplifting detected`
- `Drug abuse detected`
- `Arson detected`

### Response Format

```json
{
  "success": true,
  "crimeTypeID": "Robbery detected",
  "crimeType": "Robbery",
  "notificationsSent": 2,
  "results": [
    {
      "email": "user1@example.com",
      "success": true
    },
    {
      "email": "user2@example.com",
      "success": true
    }
  ]
}
```

## Python Integration

Update your Python code to use the correct URL:

### For Local Development:
```python
def post_to_email_server(notif_json: dict):
    import requests
    
    # Use localhost when testing
    base_url = "http://localhost:3000/api/gemini"
    
    try:
        response = requests.post(
            base_url,
            json=notif_json,
            headers={'Content-Type': 'application/json'}
        )
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error sending notification: {str(e)}")
        return None
```

### For Production:
```python
base_url = "https://watchout.tech/api/gemini"
```

## Configuration

### Environment Variables

Add to your `.env.local` file:

```bash
# EmailJS Configuration (Required)
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_USER_ID=your_user_id
EMAILJS_PRIVATE_KEY=your_private_key

# Notification Recipients (Optional - can be passed in API request)
NOTIFICATION_EMAILS=email1@example.com,email2@example.com,email3@example.com
```

### EmailJS Template Variables

Your EmailJS template should include these variables:
- `{{to}}` - Recipient email
- `{{time}}` - Timestamp of detection
- `{{crime_type}}` - Type of crime detected
- `{{message}}` - Summary from Gemini analysis

Example template:
```
Subject: Crime Alert: {{crime_type}}

Dear User,

A crime has been detected by our AI monitoring system at {{time}}.

Crime Type: {{crime_type}}

Details:
{{message}}

Please refer to local authorities for more information.

Best regards,
WatchOut Security Team
```

## Testing

### Test the endpoint locally:

1. Start your Next.js development server:
```bash
npm run dev
```

2. Run the test script:
```bash
node scripts\send_gemini_notification.js
```

This will test three scenarios:
- Robbery detection (should send emails)
- Violence detection (should send emails)
- No crime detected (should NOT send emails)

### Test with specific email:

Modify the test script or create your own request:
```javascript
const response = await fetch('http://localhost:3000/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        crimeTypeID: "Robbery detected",
        Summary: "Test notification",
        emails: ["your-email@example.com"]
    })
});
```

## Flow Diagram

```
CCTV Footage → Gemini AI Analysis → POST /api/gemini
                                          ↓
                                    Crime Detected?
                                          ↓
                                         Yes
                                          ↓
                              Send Email via EmailJS
                                          ↓
                                   Return Results
```

## Troubleshooting

### Emails not sending?
1. Check your EmailJS credentials in `.env.local`
2. Verify EmailJS template exists and is active
3. Check that `NOTIFICATION_EMAILS` is set or emails are passed in the request

### Python connection error?
1. Make sure Next.js dev server is running (`npm run dev`)
2. Verify the URL is correct (localhost:3000 for dev)
3. Check that port 3000 is not blocked by firewall

### "No criminal activity detected" emails?
This is expected behavior - no notifications are sent when no crime is detected. The API will return success but won't send emails.

