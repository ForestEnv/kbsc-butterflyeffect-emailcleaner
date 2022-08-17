import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import {clearToken} from '../lib/client';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';

function MyProfileScreen() {
    const [hser, setUser] = useUserState();
    
    const onLogout = () => {
        setUser(null);
        clearToken();
        authStorage.clear();
    };

    return (
        <View>
            <TouchableOpacity onPress={onLogout}>
                <Text>
                    로그아웃
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})

export default MyProfileScreen;