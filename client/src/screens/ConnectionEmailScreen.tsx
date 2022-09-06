import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput 
} from 'react-native'

import { useUserState } from "../contexts/UserContext";

import useConnection from '../hooks/useConnection';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';

function ConnectionEmailScreen() {
  const [user, setUser] = useUserState();
  
  //이메일, 비밀번호 상태 
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');

  const {mutate: setConnction} = useConnection();
  
  //타입 오류 : connection의 id 타입을 유니온 타입으로 대응
  const onConnectionSubmit = () => {
    setConnction({
      no:user.no,
      id:user?.id,
      email,
      emailPassword,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>연동하고자 하는</Text>
        <Text style={styles.text}>이메일 주소를 입력해주세요.</Text>
        <View style={{marginTop:DEVICE_HEIGHT * 42, alignItems:'center'}}>
          <TextInput style={{borderWidth:2}}value={email} onChangeText={setEmail} placeholder="연동할 이메일 주소를 입력하세요"/>
          <TextInput style={{borderWidth:2}}value={emailPassword} onChangeText={setEmailPassword} placeholder="연동할 이메일 비밀번호를 입력하세요"/>
          <TouchableOpacity style={styles.button}onPress={onConnectionSubmit}>
            <Text style={styles.btnText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:COLORS.main    
  },
  form:{
    marginTop: DEVICE_HEIGHT * 70
  },
  text:{
    color:'#000000',
    fontSize: 20,
    fontFamily:"NotoSansKR-Bold",
    marginLeft: DEVICE_WIDTH * 24,
    lineHeight:30
  },
  btnText:{
    color:'#000000',
    fontSize: FONTS.medium,
    fontFamily: 'NotoSansKR-Bold',
    textAlign: 'center',
    marginVertical: DEVICE_HEIGHT * 2
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
});

export default ConnectionEmailScreen;
