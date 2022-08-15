import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useUserState } from "../contexts/UserContext";
import authStorage from '../storages/authStorage';

const HomeScreen = () => {
  const [user, setUser] = useUserState();
  console.log('사용자 정보:', user?.id);

  //asyncstorage정보 확인 debug
  useEffect(() => {
    const fn = async () => {
      //console.log('스토리지:', await authStorage.get())
      const test = await authStorage.get()
      const temp = test?.user.isConnectionEmail;
      console.log('테스트:', temp);
    }
    fn();
  },[]);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})

export default HomeScreen