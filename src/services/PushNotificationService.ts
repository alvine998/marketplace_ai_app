import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
// import api from '../config/api'; // Placeholder for backend integration

class PushNotificationService {
  /**
   * Request User Permission
   */
  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  /**
   * Get FCM Token
   */
  async getFCMToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        // TODO: Save this token to backend via API
        // await this.saveTokenToBackend(fcmToken);
        return fcmToken;
      } else {
        console.log('Failed', 'No token received');
        return null;
      }
    } catch (error) {
      console.log('Error fetching token:', error);
      return null;
    }
  }

  /**
   * Save Token to Backend (Placeholder)
   */
  // async saveTokenToBackend(token: string) {
  //   try {
  //       const userId = 'current_user_id'; // Get from AuthContext or Storage
  //       await api.post('/notifications/device-token', {
  //           token,
  //           platform: Platform.OS,
  //           userId
  //       });
  //   } catch (error) {
  //       console.error('Error saving token', error);
  //   }
  // }

  /**
   * Notification Listeners
   */
  notificationListener() {
    // Assume a function that handles foreground notifications
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // Show local notification using Toast or custom blocking modal
      // or use a library like react-native-push-notification to show a local alert
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g., navigate to screen
        }
      });

    // Assume a function that handles background notification taps
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    return unsubscribe;
  }
}

export default new PushNotificationService();
