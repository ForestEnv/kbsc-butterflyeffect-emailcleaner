import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput 
} from 'react-native';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';
import { ConnectionPwRouteProp } from '../stacks/types';
import { useRoute } from '@react-navigation/core';
import { useUserState } from "../contexts/UserContext";
import useConnection from '../hooks/useConnection';

function ConnectionEmailPwScreen() {
    //입력된 이메일 주소 값을 저장
    const {params} = useRoute<ConnectionPwRouteProp>();
    const [user] = useUserState();
    
    //연동할 이메일 비밀번호 State
    const [emailPassword, setEmailPassword] = useState('');
    const {mutate: setConnection} = useConnection();
    
    const email = params.email;

    //EventHandler: 이메일 연동 실행
    const onConnectionSubmit = () => {
        setConnection({
            no:user.no,
            id:user?.id,
            email,
            emailPassword,
        });
    };

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>해당 메일의 비밀번호를</Text>
                <Text style={styles.text}>입력해주세요.</Text>
                <Text style={{color:'#484848', marginLeft:DEVICE_WIDTH * 32, fontSize:14, fontFamily:"NotoSansKR-Medium"}}>연동이 완료되기까지 특정 시간이 소요됩니다.</Text>
                <View style={{marginTop:DEVICE_HEIGHT * 20, alignItems:'center'}}>
                    <TextInput style={styles.input}value={emailPassword} onChangeText={setEmailPassword} placeholder="비밀번호를 입력하세요."/>
                    <TouchableOpacity style={styles.button}onPress={onConnectionSubmit}>
                        <Text style={styles.btnText}>완료</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:COLORS.main
    },
    form:{
        marginTop: DEVICE_HEIGHT * 70
    },
    input:{
        borderBottomWidth:1,
        width: DEVICE_WIDTH * 300,
        height: DEVICE_HEIGHT * 40,
        marginBottom: DEVICE_HEIGHT * 5
    },
    button:{
        width:DEVICE_WIDTH * 280,
        height:DEVICE_HEIGHT * 50 - 10,
        marginTop: DEVICE_HEIGHT * 15,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:COLORS.subTwo,
    },
    btnText:{
        color:'#000000',
        fontSize: FONTS.medium,
        fontFamily: 'NotoSansKR-Bold',
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * 2
    },
    text:{
        color:'#000000',
        fontSize: 20,
        fontFamily:"NotoSansKR-Bold",
        marginLeft: DEVICE_WIDTH * 32,
        lineHeight:30
    },
});

export default ConnectionEmailPwScreen;