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
            emails: ["jaeminbird@gmail.com"]
        }
    },
    {
        name: "Shoplifting Detection",
        payload: {
            crimeTypeID: "Shoplifting detected",
            Summary: "Individual observed concealing merchandise in a bag and attempting to exit without payment.",
            emails: ["jaeminbird@gmail.com"]
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
    
    // Get the most recent notification (last in array)
    let testToSend = testPayloads[testPayloads.length - 1];
    
    // Check if it's not a crime
    const isCrime = testToSend.payload.crimeTypeID !== "No criminal activity detected";
    
    if (!isCrime) {
        console.log('Most recent notification is not a crime. Finding most recent crime...\n');
        
        // Find the most recent crime (iterate backwards)
        for (let i = testPayloads.length - 1; i >= 0; i--) {
            if (testPayloads[i].payload.crimeTypeID !== "No criminal activity detected") {
                testToSend = testPayloads[i];
                break;
            }
        }
    }
    
    console.log(`\n=== Sending: ${testToSend.name} ===`);
    console.log('Payload:', JSON.stringify(testToSend.payload, null, 2));
    
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testToSend.payload),
        });

        const data = await res.json();
        console.log('Response status:', res.status);
        console.log('Response body:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Failed to POST:', err);
    }
    
    console.log('\n✓ Notification sent');
    console.log('\n📊 View alerts on the dashboard:');
    console.log(`   http://localhost:${port}/dashboard`);
    console.log('\n💡 Tip: The dashboard auto-refreshes every 10 seconds, or click the refresh button.');
})();

