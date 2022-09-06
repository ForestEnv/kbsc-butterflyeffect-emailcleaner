import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AuthForm from '../components/AuthForm';

import { COLORS } from '../constants/theme';

function RegisterScreen() {
    return (
        <View style={{flex:1, backgroundColor:COLORS.main, alignItems:'center'}}>
            <AuthForm isRegister/>
        </View>
    );
};

export default RegisterScreen;