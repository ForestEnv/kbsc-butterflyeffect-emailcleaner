import React, {useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../stacks/types';

import {clearToken} from '../lib/client';
import {useUserState} from '../contexts/UserContext';
import authStorage from '../storages/authStorage';

import { DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, COLORS } from '../constants/theme';

function MyProfileScreen() {
    const [user, setUser] = useUserState();
    const navigation = useNavigation<RootStackNavigationProp>();
    
    const onLogout = () => {
        setUser(null);
        clearToken();
        authStorage.clear();
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <TouchableOpacity onPress={onLogout}>
                    <Text style={{marginRight: DEVICE_WIDTH * 15, marginTop: DEVICE_HEIGHT * 13,fontSize:18, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>로그아웃</Text>
                </TouchableOpacity>
        });
    }, [navigation, onLogout]);

    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={{
                        color:'#000000',
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Bold'
                    }}
                >다수의 이메일을 연동해</Text>
                <Text style={{
                        marginBottom: DEVICE_HEIGHT * 10,
                        color:'#000000',
                        fontSize: 16,
                        fontFamily: 'NotoSansKR-Bold',
                        lineHeight:20
                    }}
                >디지털 탄소 중립 활동량을 늘려보세요😁</Text>
            </View>
            <KeyboardAvoidingView style={{marginTop:DEVICE_HEIGHT * 20}}>
                <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Medium'}}>이메일</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='아이디를 입력하세요.'
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                <Text style={{marginTop:13, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Medium'}}>비밀번호</Text>
                    <TextInput
                        style={styles.pwInput}
                        placeholder='비밀번호를 입력하세요.'
                        secureTextEntry
                    />
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>추가</Text>
            </TouchableOpacity>            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.main,
        alignItems:'center'
    },
    info:{
        width: DEVICE_WIDTH * 311,
        heihgt: DEVICE_HEIGHT * 70,
        marginTop: 80,
        alignItems:'center',
        borderRadius:15,
        borderWidth:1,
        backgroundColor: COLORS.white
    },
    input:{
        borderBottomWidth:1,
        width: DEVICE_WIDTH * 300,
        height: DEVICE_HEIGHT * 40,
    },
    pwInput:{
        borderBottomWidth:1,
        width: DEVICE_WIDTH * 300,
        height: DEVICE_HEIGHT * 40,
    },
    button:{
        width:DEVICE_WIDTH * 300,
        height:DEVICE_HEIGHT * 50 - 10,
        marginTop: DEVICE_HEIGHT * 30,
        borderRadius:20,
        backgroundColor:COLORS.subTwo,
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        color:'#000000',
        fontFamily:'NotoSansKR-Medium',
        fontSize: FONTS.medium,
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * 2
    }
})

export default MyProfileScreen;