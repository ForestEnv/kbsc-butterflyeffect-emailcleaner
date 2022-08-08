import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import LandingScreen from '../screens/LandingScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConnectionScreen from '../screens/ConnectionScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen name="Landing" component={LandingScreen}/>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="Connection" component={ConnectionScreen}/>
    </Stack.Navigator>
  )
}

export default RootStack;