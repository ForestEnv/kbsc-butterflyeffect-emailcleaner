import React, {useState, useEffect} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TextInput,
    ActivityIndicator 
} from 'react-native';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';
import { ConnectionPwRouteProp } from '../stacks/types';
import { useRoute } from '@react-navigation/core';

import { useUserState } from "../contexts/UserContext";
import { useEmailAddressState } from '../contexts/EmailAddressContext';

import useConnection from '../hooks/useConnection';

function ConnectionEmailPwScreen() {
    //입력된 이메일 주소 값을 저장
    const {params} = useRoute<ConnectionPwRouteProp>();
    const [user] = useUserState();
    const [emailAddress, setEmailAddress] = useEmailAddressState();

    //연동할 이메일 비밀번호 State
    const [email_Pw, setEmailPassword] = useState('');
    const {mutate: setConnection, isLoading: connectionLoading} = useConnection();
    
    //연동 loading
    const isLoading = connectionLoading;

    //이메일 주소 입력 화면으로부터 받은 이메일 주소 값: string
    const email_id = params.email;
    
    //EventHandler: 이메일 연동 실행
    const onConnectionSubmit = () => {
        if(isLoading) {
            return;
        }
        setEmailAddress(email_id);
        setConnection({
            no:user.no,
            id:user?.id,
            email_id,
            email_Pw,
        });
    };

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.text}>해당 메일의 비밀번호를</Text>
                <Text style={styles.text}>입력해주세요.</Text>
                <Text style={{color:'#484848', marginLeft:DEVICE_WIDTH * 32, fontSize:14, fontFamily:"NotoSansKR-Medium"}}>연동이 완료되기까지 특정 시간이 소요됩니다.</Text>
                <View style={{marginTop:DEVICE_HEIGHT * 20, alignItems:'center'}}>
                    <TextInput secureTextEntry style={styles.input}value={email_Pw} onChangeText={setEmailPassword} placeholder="비밀번호를 입력하세요."/>
                    <TouchableOpacity style={styles.button}onPress={onConnectionSubmit}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="white"/>

                        ) : (
                            <Text style={styles.btnText}>완료</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={{color:'#000000', fontFamily:'NotoSansKR-Medium', fontSize:16, lineHeight:20, textAlign:'center'}}>❗구글 이메일인 경우에 앞서 설정을</Text>
                <Text style={{color:'#000000', fontFamily:'NotoSansKR-Medium', fontSize:16, lineHeight:20, textAlign:'center'}}>진행하고 발급받은 2차 인증번호로 입력</Text>
                <Text style={{color:'#000000', fontFamily:'NotoSansKR-Medium', fontSize:16, lineHeight:20, textAlign:'center'}}>해주세요.</Text>
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
    info: {
        width: DEVICE_WIDTH * 294,
        height: DEVICE_HEIGHT * 68,
        marginTop: DEVICE_HEIGHT * 30,
        marginLeft: DEVICE_WIDTH * 32,
        padding: DEVICE_HEIGHT * 10,
        borderRadius: 20,
        backgroundColor: COLORS.white
    }
});

export default ConnectionEmailPwScreen;