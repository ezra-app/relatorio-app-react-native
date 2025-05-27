import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ReportProvider } from './src/contexts/ReportContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ReportProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ReportProvider>
  );
}
