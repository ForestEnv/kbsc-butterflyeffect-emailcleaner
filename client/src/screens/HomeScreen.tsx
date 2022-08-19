import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

import { useUserState } from "../contexts/UserContext";

function HomeScreen() {
  const [user, setUser] = useUserState();
  
  return (
    <View>
      <Text>홈스크린</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({})

export default HomeScreen;