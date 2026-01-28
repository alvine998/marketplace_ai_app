import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/authService';
import PushNotificationService from '../services/PushNotificationService';

const NotificationHandler: React.FC = () => {
    const { isLoggedIn, user, updateFcmToken } = useAuth();

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        if (isLoggedIn && user) {
            registerFCM().then(() => {
                // Setup listener after permission/token check (or can be done independently)
                unsubscribe = PushNotificationService.notificationListener();
            });
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [isLoggedIn, user?.id]);

    const registerFCM = async () => {
        try {
            const hasPermission = await PushNotificationService.requestUserPermission();
            if (!hasPermission) {
                console.log('FCM Permission denied');
                return;
            }

            const token = await PushNotificationService.getFCMToken();
            if (token) {
                // 1. Update token in local context
                updateFcmToken(token);

                // 2. Register token on the backend via the auth service (update user)
                // Note: Ensure updateProfile supports the payload structure
                await updateProfile(user!.id, { fcmTokens: [token] });

                console.log('FCM Token registered successfully:', token);
            }
        } catch (error) {
            console.error('Failed to register FCM token:', error);
        }
    };

    return null; // This component doesn't render anything
};

export default NotificationHandler;
