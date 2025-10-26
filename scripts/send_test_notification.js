// Test script removed — Twilio integration was removed from the project.
//
// If you need a test script for a new notification provider, create a new
// script here that POSTs to /api/notifications or to your provider directly.

// Script to POST a test crime notification to the local Next.js API using emails.
// Usage (cmd.exe):
//   node scripts\send_test_notification.js test@example.com
// Or set TEST_EMAIL environment variable then run:
//   set TEST_EMAIL=test@example.com
//   node scripts\send_test_notification.js

const emailArg = process.argv[2];
const email = emailArg || process.env.TEST_EMAIL;
if (!email) {
	console.error('Usage: node scripts\\send_test_notification.js test@example.com');
	process.exit(1);
}

const payload = {
	// Use a crimeTypeId that exists in your CRIME_TYPE_MAP (e.g., 1)
	crimeTypeId: 1,
	emails: [email],
};

const port = process.env.PORT || 3000;
const url = `http://localhost:${port}/api/notifications`;

(async () => {
	try {
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
