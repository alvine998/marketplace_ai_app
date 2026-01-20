import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/authService';

const NotificationHandler: React.FC = () => {
    const { isLoggedIn, user, updateFcmToken } = useAuth();

    useEffect(() => {
        if (isLoggedIn && user) {
            registerFCM();
        }
    }, [isLoggedIn, user?.id]);

    const registerFCM = async () => {
        try {
            // Mock FCM Token retrieval
            // In a real app, you would use:
            // const token = await messaging().getToken();

            const mockToken = `fcm_token_${user?.id}_${Platform.OS}`;

            // 1. Update token in local context
            updateFcmToken(mockToken);

            // 2. Register token on the backend via the auth service (update user)
            await updateProfile(user!.id, { fcmTokens: [mockToken] });

            console.log('FCM Token registered successfully:', mockToken);
        } catch (error) {
            console.error('Failed to register FCM token:', error);
        }
    };

    return null; // This component doesn't render anything
};

export default NotificationHandler;
