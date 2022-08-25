import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native'
import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";

import { getEmailCount } from "../api/email";
import { getDeleteEmailNum } from '../api/email';
import { EmailCount } from '../api/types';

import { COLORS } from '../constants/theme';

function HomeScreen() {
  const [user] = useUserState();
  
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));
  console.log({data, isLoading});
  // const [count, setCount] = useState<EmailCount>()
  // const [isLoading, setIsLoading] = useState(false);
  // const [deleteNum, setDeleteNum] = useState<{
  //   deleteNum: number;
  // } | null>(null);

  // //로그인하고 나서 홈스크린이 렌더링될 때 데이터 패칭 오류
  // //console.log('첫번째 로딩'+isLoading)

  // //setIsLoading(true);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try{
  //       setIsLoading(true);
  //       console.log('비동기에서 로딩'+isLoading)
  //       const res = await getEmailCount(user.no);
  //       console.log('Result From useEffect' + res.emailCount)
  //       setCount(res);
  //     }catch(error){
  //       console.log('데이터 조회 실패');
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchData();
  // },[count]);

 // console.log('마지막 로딩'+isLoading)

  
  
  // useEffect(() => {
    //   const fetchData = async () => {
      //     try{
        //       const res = await getDeleteEmailNum(user.no);
        //       setDeleteNum(res);
        //     }catch(error){
          //       console.log('데이터 조회 실패');
          //     }
          //   };
          //   fetchData();
          // });
          
          //console.log("삭제된 이메일 수:"+deleteNum.deleteNum);
          if(isLoading) {
            return(
              <ActivityIndicator size="small" color="white"/>
            )
          }
  return (
    // <>
    //   {!isLoading ? (
    //       <ActivityIndicator size="small" color="white"/>
    //     ) : (
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
                <Text style={styles.address}>{data.email}</Text>
              </View>
              <View style={styles.circle}>
                <Text style={{fontSize:20}}>현재 총 메일 수</Text>
                <Text style={{fontSize:30}}>{data.emailCount}</Text>
                <TouchableOpacity style={{backgroundColor: COLORS.white, paddingHorizontal:10, marginTop:20, borderWidth:2, borderRadius:20,}}>
                  <Text style={{fontSize:20}}>
                    스캔하기
                  </Text>
                </TouchableOpacity>
              </View>
              {/* { !deleteNum ? (
                  <View>
                    <Text>사용 내역이 있습니다.</Text>
                  </View>
              ) : (
                  <View style={styles.firstInfo}>
                    <Text>사용 내역이 없습니다.</Text>
                  </View>
              )} */}
            </View>
          </View>
    //     )}
    // </>
   
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
  },
  firstInfo:{
    marginTop:20,
    width:336,
    height:'30%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    borderWidth:2,
    backgroundColor:'#d9d9d9'
  }
})

export default HomeScreen;