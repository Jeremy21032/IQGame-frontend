import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { lightTheme } from './theme';

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={lightTheme}>
        <AppNavigator />
      </PaperProvider>
    </AuthProvider>
  );
}
