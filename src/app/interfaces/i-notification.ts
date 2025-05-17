export interface INotification {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    duration?: number; // Duration in milliseconds
}