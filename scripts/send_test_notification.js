// Simple script to POST a test crime notification to your local Next.js API.
// Usage (cmd.exe):
//   node scripts\send_test_notification.js +1YOURNUMBER
// Or set TEST_PHONE environment variable then run:
//   set TEST_PHONE=+1YOURNUMBER
//   node scripts\send_test_notification.js

// NOTE: This expects your dev server to be running at http://localhost:3000
// and the API route `/api/notifications` to be implemented (as in this project).

const phoneArg = process.argv[2];
const phone = phoneArg || process.env.TEST_PHONE;
if (!phone) {
    console.error('Usage: node scripts\\send_test_notification.js +1YOURNUMBER');
    process.exit(1);
}

const payload = {
    // Use a crimeTypeId that exists in your `CRIME_TYPE_MAP` (e.g., 1)
    crimeTypeId: 1,
    phoneNumbers: [phone],
};

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/api/notifications`;

(async () => {
    try {
        // Node 18+ has global `fetch`. If you're on an older Node, install node-fetch.
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log('Response status:', res.status);
        console.log('Response body:', JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Failed to POST test notification:', err);
        process.exit(1);
    }
})();
