import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

import useLogin from '../hooks/useLogin';
import useRegister from '../hooks/useRegister';

import { useNavigation } from '@react-navigation/core';
import { RootStackNavigationProp } from '../stacks/types';

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
                                placeholder='email'
                                value={id}
                                onChangeText={setId}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder='name'
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                            />
                        </>
                    ) : (
                        <TextInput
                            placeholder='email'
                            value={id}
                            onChangeText={setId}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    )}
                    <TextInput
                        placeholder='password'
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={{backgroundColor:'grey', borderWidth:1}} onPress={onPress}>
                        <Text>
                            {isRegister ? '회원가입' : '로그인'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AuthForm;