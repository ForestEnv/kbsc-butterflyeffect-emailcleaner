import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
} from 'react-native';

import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';

import { useNavigation } from '@react-navigation/core';
import { RootStackNavigationProp } from '../stacks/types';

import authStorage from '../storages/authStorage';

import { DEVICE_WIDTH, DEVICE_HEIGHT, COLORS, FONTS } from '../constants/theme';

export interface AuthFormProps {
    isRegister?: boolean;
}

function AuthForm({isRegister}: AuthFormProps) {
    const navigation = useNavigation<RootStackNavigationProp>();
    
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const {mutate: login, isLoading: loginLoading} = useLogin();
    const {mutate: register, isLoading: registerLoading} = useRegister();

    const isLoading = loginLoading || registerLoading;
    
    const onPress = () => {
        if(isLoading) {
            return;
        }
        if(isRegister) {
            register({
                id,
                name,
                password,
            });
        } else {
            login({
                id,
                password,
            });
        }
    };

    return (
        <KeyboardAvoidingView>
            <View>
                <View>
                    {isRegister ? (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder='email'
                                value={id}
                                onChangeText={setId}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='name'
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                            />
                        </>
                    ) : (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder='아이디를 입력하세요'
                                value={id}
                                onChangeText={setId}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </>
                    )}
                    <Text>비밀번호</Text>
                    <TextInput
                        style={styles.pwInput}
                        placeholder='비밀번호를 입력하세요'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={onPress}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="white"/>
                        ) : (
                            <Text style={styles.text}>
                                {isRegister ? '회원가입' : '로그인'}
                            </Text>
                            
                        )}
                    
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input:{
        borderBottomWidth:1,
        width: DEVICE_WIDTH * 300,
        height: DEVICE_HEIGHT * 40,
        marginTop: DEVICE_HEIGHT * 60,
    },
    button:{
        width:DEVICE_WIDTH * 300,
        height:DEVICE_HEIGHT * 50 - 10,
        marginTop: DEVICE_HEIGHT * 30,
        borderRadius:20,
        borderWidth:2,
        backgroundColor:COLORS.lofi,
    },
    pwInput:{
        borderBottomWidth:1,
        width: DEVICE_WIDTH * 300,
        height: DEVICE_HEIGHT * 40,
        marginTop: DEVICE_HEIGHT * 10,
    },
    text:{
        fontSize: FONTS.medium,
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * 10
    }
});

export default AuthForm;