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
import ConnectionEmailPwScreen from '../screens/ConnectionEmailPwScreen';
import MainTab from './MainTab';

import Back from '../assets/icons/icon-back.svg';

import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
    const navigation = useNavigation<RootStackNavigationProp>();

    const [user] = useUserState();
    const [isConnectionEmail] = useConnectionState();

    //로그인 상태 유지
    useAuthLoadEffect();
    
    return (
        <Stack.Navigator>
            {/* 사용자가 현재 로그인중이면서 연동된 인박스 주소가 있으면 홈스크린으로 접속함 
                연동된 인박스 주소가 없으면 이메일 연동 스크린 접속*/}
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
                                    <Back/>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text style={{fontSize:23, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>회원가입</Text>
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
                                    <Back/>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text style={{fontSize:23, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>로그인</Text>
                                </View>
                            )
                        }}
                    />
                    <Stack.Screen 
                        name='Connection' 
                        component={ConnectionEmailScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerTransparent: true,
                            headerBackVisible: false,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Back/>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text style={{fontSize:20, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>이메일 연동</Text>
                                </View>
                            )
                        }}
                    />
                    <Stack.Screen 
                        name='ConnectionPw' 
                        component={ConnectionEmailPwScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerTransparent: true,
                            headerBackVisible: false,
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Back/>
                                </TouchableOpacity>
                            ),
                            headerTitle: () => (
                                <View>
                                    <Text style={{fontSize:20, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>이메일 연동</Text>
                                </View>
                            )
                        }}
                    />
                </>
            )}
        </Stack.Navigator>
    )
}

export default RootStack;