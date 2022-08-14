import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import { useUserState } from "../contexts/UserContext";

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConnectionEmailScreen from '../screens/ConnectionEmailScreen';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const [user, setUser] = useUserState();
    useAuthLoadEffect();
    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Landing' component={LandingScreen}/>
                    <Stack.Screen name='Register' component={RegisterScreen}/>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    {/* <Stack.Screen name='Connection' component={ConnectionEmailScreen}/> */}
                </>
            )}
        </Stack.Navigator>
    )
}

export default RootStack;