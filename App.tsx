import React from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import normalize from 'react-native-normalize';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <View style={{ flex: 1, marginTop: normalize(20) }}>
        <RootNavigator />
      </View>
    </SafeAreaProvider>
  );
}

export default App;
