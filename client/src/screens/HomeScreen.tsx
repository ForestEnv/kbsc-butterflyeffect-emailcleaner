import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useUserState } from "../contexts/UserContext";
import authStorage from '../storages/authStorage';

const HomeScreen = () => {
  const [user, setUser] = useUserState();
  console.log('사용자 정보:', user?.id);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})

export default HomeScreen