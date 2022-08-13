import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuthLoadEffect from '../hooks/useAuthLoadEffect';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConnectionEmailScreen from '../screens/ConnectionEmailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    useAuthLoadEffect();
    return (
        <Stack.Navigator>
            <Stack.Screen name='Landing' component={LandingScreen}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            <Stack.Screen name='Login' component={LoginScreen}/>
            <Stack.Screen name='Connection' component={ConnectionEmailScreen}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})

export default RootStack;