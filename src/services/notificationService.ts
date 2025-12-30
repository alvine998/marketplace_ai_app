import axios from 'axios';

// Placeholder API URL - should be replaced with actual backend URL
const API_URL = 'https://api.marketplace.com/notifications';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'order' | 'promo' | 'chat';
    timestamp: string;
    isRead: boolean;
}

class NotificationService {
    /**
     * Fetch notifications for the current user
     */
    async getNotifications(): Promise<Notification[]> {
        try {
            // Mock API call
            // const response = await axios.get(API_URL);
            // return response.data;

            return [
                {
                    id: '1',
                    title: 'Pesanan Terkirim',
                    message: 'iPhone 15 Pro kamu sedang dalam perjalanan!',
                    type: 'order',
                    timestamp: new Date().toISOString(),
                    isRead: false,
                },
                {
                    id: '2',
                    title: 'Promo Flash Sale',
                    message: 'Diskon up to 90% hanya hari ini. Cek sekarang!',
                    type: 'promo',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    isRead: true,
                }
            ];
        } catch (error) {
            console.error('Error fetching notifications:', error);
            return [];
        }
    }

    /**
     * Mark a notification as read
     */
    async markAsRead(notificationId: string): Promise<boolean> {
        try {
            // await axios.patch(`${API_URL}/${notificationId}`, { isRead: true });
            return true;
        } catch (error) {
            console.error('Error marking notification as read:', error);
            return false;
        }
    }

    /**
     * Register or update the FCM token for the user on the backend
     */
    async updateFcmToken(userId: string, token: string): Promise<boolean> {
        try {
            console.log(`Registering FCM Token for User ${userId}: ${token}`);
            // await axios.post(`${API_URL}/register-fcm`, { userId, token });
            return true;
        } catch (error) {
            console.error('Error updating FCM token:', error);
            return false;
        }
    }
}

export const notificationService = new NotificationService();
