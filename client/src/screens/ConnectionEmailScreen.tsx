import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/core';
//import { RootStackNavigationProp } from '../stacks/types';
import { MainTabNavigationProp } from '../stacks/types';
import { useUserState } from "../contexts/UserContext";

import useConnection from '../hooks/useConnection';

function ConnectionEmailScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [user, setUser] = useUserState();
  const [email, setEmail] = useState('');

  const {mutate: emailConnction} = useConnection();
  
  //타입 오류 : connection의 id 타입을 유니온 타입으로 대응
  const onConnectionSubmit = () => {
    emailConnction({
      id:user?.id,
      email,
    });
  }

  return (
    <View>
      <Text>이메일 연동하기</Text>
      <TextInput style={{borderWidth:2}}value={email} onChangeText={setEmail} placeholder="연동할 이메일 주소를 입력하세요"/>
      <TouchableOpacity style={{alignItems:'center',backgroundColor:'grey', marginTop:10, borderWidth:2}}onPress={onConnectionSubmit}>
        <Text>추가</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({});

export default ConnectionEmailScreen;
