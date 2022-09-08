import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text,
  View ,
} from 'react-native';

import AuthForm from '../components/AuthForm';

import { COLORS } from '../constants/theme';

function LoginScreen() {
  return (
    <View style={styles.container}>
      <AuthForm/>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    backgroundColor: COLORS.main
  }
})

export default LoginScreen;