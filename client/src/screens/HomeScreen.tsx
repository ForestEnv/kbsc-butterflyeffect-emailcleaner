import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

import { useUserState } from "../contexts/UserContext";

import { emailConnection } from '../api/connection';
import { EmailCount } from '../api/types';

const HomeScreen = () => {
  const [user, setUser] = useUserState();
  // const [emailCountState] = useEmailCountState();
  //console.log("Data from Server = ", emailCount);
  const [email, setEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailCount, setEmailCount] = useState<EmailCount>();
  //타입 오류 : connection의 id 타입을 유니온 타입으로 대응
  const onConnectionSubmit = async () => {
    const temp = await emailConnection({
      no:user.no,
      id:user?.id,
      email,
      emailPassword,
    });
    setEmailCount(temp);
  }
  console.log('DATA FROM EXPRESS:', emailCount);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       const res = await emailConnection
  //     }
  //   }
  // })
  return (
    <View>
      <Text>이메일 연동하기</Text>
      <TextInput style={{borderWidth:2}}value={email} onChangeText={setEmail} placeholder="연동할 이메일 주소를 입력하세요"/>
      <TextInput style={{borderWidth:2}}value={emailPassword} onChangeText={setEmailPassword} placeholder="연동할 이메일 비밀번호를 입력하세요"/>
      <TouchableOpacity style={{alignItems:'center',backgroundColor:'grey', marginTop:10, borderWidth:2}}onPress={onConnectionSubmit}>
        <Text>추가</Text>
      </TouchableOpacity>
      <Text>연동된 이메일 수 </Text>
      <Text>{emailCount}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})

export default HomeScreen