import { NextRequest, NextResponse } from 'next/server';

/**
 * POST handler for Gemini crime type classification.
 * Expects body: { input: string }
 * Returns: { crimeTypeId: number, crimeType: string, report: string }
 */
export async function POST(request: NextRequest) {
    try {
        const { input } = await request.json();
        if (!input || typeof input !== 'string') {
            return NextResponse.json({ error: 'input (string) is required' }, { status: 400 });
        }

        // TODO: Replace this with actual Gemini API call
        // For now, mock a response
        // Example: classify input and generate a report
        const mockCrimeTypeId = 3; // e.g., Assault
        const mockCrimeType = 'Assault';
        const mockReport = `Incident Report:\n\nOn October 26, 2025, an assault was reported in the vicinity. The event involved multiple individuals and resulted in minor injuries. Authorities responded promptly and are investigating the circumstances.\n\nThe community is advised to remain vigilant and report any suspicious activity. Further updates will be provided as the investigation continues.`;

        return NextResponse.json({
            crimeTypeId: mockCrimeTypeId,
            crimeType: mockCrimeType,
            report: mockReport
        });
    } catch (err) {
        console.error('Error in Gemini POST:', err);
        return NextResponse.json({ error: 'Invalid request or server error' }, { status: 400 });
    }
}
