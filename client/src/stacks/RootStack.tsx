import React, {useEffect, useState} from 'react';
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

import authStorage from '../storages/authStorage';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const [user, setUser] = useUserState();
    const [isRegistered, setIsRegistered] = useState(false);
    console.log('상태값'+user);
    useAuthLoadEffect();

 //asyncstorage정보 확인 debug
    useEffect(() => {
        const fn = async () => {
        //console.log('스토리지:', await authStorage.get())
        const test = await authStorage.get();
        const temp = test.isRegistered;
        setIsRegistered(temp);
        console.log('테스트:', temp);
        }
        fn();
    },[])
    console.log('회원가입 상태값'+isRegistered);
    
    return (
        <Stack.Navigator>
            { user ? (
                <>
                    <Stack.Screen name='Connection' component={ConnectionEmailScreen}/>
                    <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Landing' component={LandingScreen}/>
                    <Stack.Screen name='Register' component={RegisterScreen}/>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                </>
            )}
        </Stack.Navigator>
    )
}

export default RootStack;