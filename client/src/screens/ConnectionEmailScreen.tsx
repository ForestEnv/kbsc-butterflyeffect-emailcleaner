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
    <View>
      <Text>이메일 연동하기</Text>
      <TextInput style={{borderWidth:2}}value={email} onChangeText={setEmail} placeholder="연동할 이메일 주소를 입력하세요"/>
      <TextInput style={{borderWidth:2}}value={emailPassword} onChangeText={setEmailPassword} placeholder="연동할 이메일 비밀번호를 입력하세요"/>
      <TouchableOpacity style={{alignItems:'center',backgroundColor:'grey', marginTop:10, borderWidth:2}}onPress={onConnectionSubmit}>
        <Text>추가</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({});

export default ConnectionEmailScreen;
