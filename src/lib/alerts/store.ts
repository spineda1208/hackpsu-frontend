// Simple in-memory store for crime alerts
// In production, you'd use a database like Postgres, MongoDB, etc.

export interface Alert {
    id: string;
    crimeTypeID: string;
    crimeType: string;
    summary: string;
    timestamp: Date;
    severity: 'warning' | 'error';
    notificationsSent: number;
}

// Store alerts in memory (will reset on server restart)
// For production, replace with database storage
const alerts: Alert[] = [];
const MAX_ALERTS = 50; // Keep last 50 alerts

export function addAlert(alert: Omit<Alert, 'id' | 'timestamp'>): Alert {
    const newAlert: Alert = {
        ...alert,
        id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date(),
    };
    
    alerts.unshift(newAlert); // Add to beginning
    
    // Keep only MAX_ALERTS
    if (alerts.length > MAX_ALERTS) {
        alerts.splice(MAX_ALERTS);
    }
    
    console.log(`[Alerts] Added alert: ${newAlert.crimeType} at ${newAlert.timestamp.toLocaleString()}`);
    
    return newAlert;
}

export function getAlerts(limit: number = 20): Alert[] {
    return alerts.slice(0, limit);
}

export function getAlertById(id: string): Alert | undefined {
    return alerts.find(alert => alert.id === id);
}

export function clearAlerts(): void {
    alerts.length = 0;
    console.log('[Alerts] Cleared all alerts');
}

