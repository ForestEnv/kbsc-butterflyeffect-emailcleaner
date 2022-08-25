import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

import { useQuery } from '@tanstack/react-query';
import { EmailCount } from '../api/types';

import { useUserState } from "../contexts/UserContext";
import { getEmailCount } from "../api/email";

function HomeScreen() {
  const [user, setUser] = useUserState();
  const [count, setCount] = useState<{
    email: string;
    emailCount: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await getEmailCount(user.no);
        setCount(res);
      }catch(error){
        console.log('데이터 조회 실패');
      }
    };
    fetchData();
  }, []);

  console.log(count.emailCount);
  
  return (
    <View>
      <Text>이메일 개수{count.emailCount}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})

export default HomeScreen;