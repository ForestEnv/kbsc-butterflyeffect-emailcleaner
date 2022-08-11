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

export interface AuthFormProps {
    isRegister?: boolean;
}

function AuthForm({isRegister}: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
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
                email,
                username,
                password,
            });
        } else {
            login({
                email,
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
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                            <TextInput
                                placeholder='name'
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </>
                    ) : (
                        <TextInput
                            placeholder='email'
                            value={email}
                            onChangeText={setEmail}
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
                    <TouchableOpacity style={{backgroundColor:'grey', borderWidth:1}}>
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