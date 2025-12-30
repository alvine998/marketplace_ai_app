import React from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import RootNavigator from './src/navigation/RootNavigator';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import NotificationHandler from './src/components/NotificationHandler';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <AuthProvider>
          <NotificationHandler />
          <CartProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor="#fff"
            />
            <View style={{ flex: 1, marginTop: normalize(30) }}>
              <RootNavigator />
            </View>
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
      <Toast />
    </SafeAreaProvider>
  );
}

export default App;
