// Crime type mapping for notification emails
export const CRIME_TYPE_MAP: Record<number, string> = {
    1: 'Theft',
    2: 'Assault',
    3: 'Vandalism',
    4: 'Burglary',
    5: 'Vehicle Theft',
    6: 'Robbery',
    7: 'Other',
};

// Gemini crime type mapping (matches the AI model outputs)
export const GEMINI_CRIME_TYPE_MAP: Record<string, string> = {
    'No criminal activity detected': 'No Crime',
    'Robbery detected': 'Robbery',
    'Violence detected': 'Violence',
    'Shoplifting detected': 'Shoplifting',
    'Drug abuse detected': 'Drug Abuse',
    'Arson detected': 'Arson',
};

export function getCrimeTypeName(crimeTypeId: number): string {
    return CRIME_TYPE_MAP[crimeTypeId] || 'Unknown Crime';
}

export function getGeminiCrimeTypeName(crimeTypeId: string): string {
    return GEMINI_CRIME_TYPE_MAP[crimeTypeId] || crimeTypeId;
}

export function shouldNotify(crimeTypeId: string): boolean {
    // Don't send notifications if no crime was detected
    return crimeTypeId !== 'No criminal activity detected';
}

