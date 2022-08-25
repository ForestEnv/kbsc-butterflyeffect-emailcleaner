import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

import { useUserState } from "../contexts/UserContext";
import { getEmailCount } from "../api/email";

import { COLORS } from '../constants/theme';

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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text>휴지통</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>알림</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
        <View style={styles.emailBox}>
          <Text style={styles.address}>{count.email}</Text>
        </View>
        <View style={styles.circle}>
          <Text style={{fontSize:20}}>현재 총 메일 수</Text>
          <Text style={{fontSize:30}}>{count.emailCount}</Text>
          <TouchableOpacity style={{backgroundColor: COLORS.white, paddingHorizontal:10, marginTop:20, borderWidth:2, borderRadius:20,}}>
            <Text style={{fontSize:20}}>
              스캔하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.white,
  },
  header:{
    height:'10%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',  
    borderBottomWidth:2
  },
  main:{
    alignItems:'center',
    marginTop:'13%'
  },
  emailBox: {
    borderRadius:20,
    borderWidth:2,
    padding:10,
    backgroundColor:COLORS.lofi  
  },
  circle:{
    width:249,
    height:236,
    marginTop:19,
    borderRadius:160,
    borderWidth:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.lofi,
  },
  address:{
    fontSize:17
  }
})

export default HomeScreen;