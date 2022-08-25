import React, {useEffect, useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity 
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackNavigationProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';

import { useUserState } from "../contexts/UserContext";
import { useConnectionState } from '../contexts/ConnectionContext';

import useAuthLoadEffect from '../hooks/useAuthLoadEffect';

import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ConnectionEmailScreen from '../screens/ConnectionEmailScreen';
import MainTab from './MainTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const navigation = useNavigation<RootStackNavigationProp>();

    const [user] = useUserState();
    const [isConnectionEmail] = useConnectionState();

    //로그인 상태 유지
    useAuthLoadEffect();
    
    return (
        <Stack.Navigator>
            { user && isConnectionEmail ? (
                <>
                    <Stack.Screen name="MainTab" component={MainTab} options={{headerShown: false}}/>
                </>
            ) : (
                <>
                    <Stack.Screen name='Landing' component={LandingScreen} options={{headerShown: false}}/>
                    <Stack.Screen 
                        name='Register' 
                        component={RegisterScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerTransparent: true,
                            headerBackVisible: false,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text>회원가입</Text>
                                </View>
                            )
                        }}
                    />
                    <Stack.Screen 
                        name='Login' 
                        component={LoginScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerTransparent: true,
                            headerBackVisible: false,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text>취소</Text>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text>로그인</Text>
                                </View>
                            )
                        }}
                    />
                    <Stack.Screen name='Connection' component={ConnectionEmailScreen} options={{headerShown: false}}/>
                </>
            )}
        </Stack.Navigator>
    )
}

export default RootStack;