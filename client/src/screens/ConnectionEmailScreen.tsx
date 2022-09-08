import React, {useState, useEffect} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput 
} from 'react-native';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';
import {useNavigation} from '@react-navigation/native';
import { RootStackNavigationProp } from '../stacks/types';

function ConnectionEmailScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  
  //연동할 이메일 State 
  const [email, setEmail] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>연동하고자 하는</Text>
        <Text style={styles.text}>이메일 주소를 입력해주세요.</Text>
        <View style={{marginTop:DEVICE_HEIGHT * 20, alignItems:'center'}}>
          <TextInput style={styles.input}value={email} onChangeText={setEmail} placeholder="연동할 이메일 주소를 입력하세요"/>
          <TouchableOpacity 
            style={styles.button}
            onPress={()=> {
              navigation.navigate('ConnectionPw', {email:email});
            }}
          >
            <Text style={styles.btnText}>다음</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    marginLeft: DEVICE_WIDTH * 32,
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
  input:{
    borderBottomWidth:1,
    width: DEVICE_WIDTH * 300,
    height: DEVICE_HEIGHT * 40,
    marginBottom: DEVICE_HEIGHT * 5
  },
});

export default ConnectionEmailScreen;
