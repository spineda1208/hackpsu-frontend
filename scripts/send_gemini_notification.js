// Test script for Gemini crime detection notifications
// Usage:
//   node scripts\send_gemini_notification.js
//
// This simulates the POST request that the Python Gemini model makes
// after analyzing CCTV footage.

const testPayloads = [
    {
        name: "Robbery Detection",
        payload: {
            crimeTypeID: "Robbery detected",
            Summary: "Two individuals were observed forcing entry into a vehicle. One person acted as a lookout while the other broke the window.",
            emails: ["jaeminbird@gmail.com"] // Optional: specify emails here or use NOTIFICATION_EMAILS env var
        }
    },
    {
        name: "Violence Detection",
        payload: {
            crimeTypeID: "Violence detected",
            Summary: "Physical altercation between three people observed in the parking lot. One person was knocked to the ground during the incident.",
        }
    },
    {
        name: "No Crime (Should not send)",
        payload: {
            crimeTypeID: "No criminal activity detected",
            Summary: "Normal pedestrian traffic observed. No suspicious activity detected.",
        }
    }
];

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/api/gemini`;

(async () => {
    console.log('Testing Gemini notification endpoint...\n');
    
    for (const test of testPayloads) {
        console.log(`\n=== ${test.name} ===`);
        console.log('Payload:', JSON.stringify(test.payload, null, 2));
        
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(test.payload),
            });

            const data = await res.json();
            console.log('Response status:', res.status);
            console.log('Response body:', JSON.stringify(data, null, 2));
        } catch (err) {
            console.error('Failed to POST:', err);
        }
    }
    
    console.log('\n✓ All tests completed');
})();

