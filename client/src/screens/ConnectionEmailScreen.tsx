import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/core';
//import { RootStackNavigationProp } from '../stacks/types';
import { MainTabNavigationProp } from '../stacks/types';
import { useUserState } from "../contexts/UserContext";

function ConnectionEmailScreen() {
  const navigation = useNavigation<MainTabNavigationProp>();
  const [user, setUser] = useUserState();
  console.log('사용자 정보:', user);
  return (
    <View>
      <Text>ConnectionEmailScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('MainTab', {screen: 'Home'})}>
        <Text>홈으로 이동</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({});

export default ConnectionEmailScreen;
