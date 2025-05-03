/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import './src/i18n';
import { LocationProvider } from './src/context/LocationContext';

const App = () => {
  return (
    <LocationProvider>
      <AppNavigator />
    </LocationProvider>
  );
};

export default App;
