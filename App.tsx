import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeNavigator } from './src/Navigators/HomeNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { StatusBar } from 'react-native';
import { colors } from './src/theme/Colors';

export default () => {
  return (
    <AuthProvider>
      <App></App>
    </AuthProvider>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} />

      <HomeNavigator></HomeNavigator>
    </NavigationContainer>
  );
}
