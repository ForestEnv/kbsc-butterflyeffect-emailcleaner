import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from './types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useQuery } from '@tanstack/react-query';

import useAuthLoadEffect from '../hooks/useAuthLoadEffect';
import { useUserState } from "../contexts/UserContext";
import { getIsConnectionEmail } from '../api/auth';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConnectionEmailScreen from '../screens/ConnectionEmailScreen';
import MainTab from './MainTab';

import authStorage from '../storages/authStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const [user, setUser] = useUserState();
    const [isConnectionEmail, setIsConnectionEmail] = useState(false);
    
    //로그인 상태 유지
    useAuthLoadEffect();
    
    //const isConnectionEmailQuery = useQuery(['isConnectionEmail', user.no], () => getIsConnectionEmail(user.no));

    return (
        <Stack.Navigator>
            { user && user.isConnectionEmail ? (
                <>
                    <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Landing' component={LandingScreen}/>
                    <Stack.Screen name='Register' component={RegisterScreen}/>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    <Stack.Screen name='Connection' component={ConnectionEmailScreen}/>
                </>
            )}
        </Stack.Navigator>
    )
}

export default RootStack;