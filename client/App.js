import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import RootStack from './src/navigation/RootStack';

function App() {
  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  )
}

export default App;

const styles = StyleSheet.create({});

