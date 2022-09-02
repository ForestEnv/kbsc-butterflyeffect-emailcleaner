import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  ActivityIndicator, 
  TouchableOpacity,
  StatusBar, 
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";

import { getEmailCount } from "../api/email";
import { getDeleteEmailNum } from '../api/email';

import { DeleteNumber } from '../api/types';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';


function HomeScreen() {
  const [user] = useUserState();
  //리액트 쿼리를 사용한 데이터 페칭
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));
  const [deleteNum, setDeleteNum] = useState<DeleteNumber>();

  //삭제 유무 판별 API 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await getDeleteEmailNum(user.no);
          setDeleteNum(res);
        } catch(error){
            console.log('데이터 조회 실패');
          }
        };
    fetchData();
  }, []);
  
  //이메일 주소, 이메일 수 데이터 로딩
  if(isLoading) {
    return(
      <ActivityIndicator size="large" color="green"/>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.main} barStyle={'dark-content'}/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontSize:30, marginRight:50}}>ButterflyEffect</Text>
          <TouchableOpacity>
            <Text style={{fontSize:18}}>휴지통</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize:18}}>알림</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <View style={[styles.emailBox, styles.shadow]}>
            <Text style={styles.address}>{data.email}</Text>
          </View>
          <View style={[styles.circle, styles.shadow]}>
            <Text style={{fontSize: FONTS.regular, fontWeight:'600'}}>현재 메일 수</Text>
            <Text style={{fontSize: FONTS.mailCount, }}>{data.emailCount}</Text>
            <TouchableOpacity style={[styles.btnScan, styles.shadow]}>
              <Text style={{fontSize:20}}>
                스캔하기
              </Text>
            </TouchableOpacity>
          </View>
          { !deleteNum ? (
              <View>
                <Text>사용 내역이 있습니다.</Text>
              </View>
            ) : (
              <View style={[styles.firstInfo, styles.shadow]}>
                <Text>현탁님! 아직 활동 내역이 없습니다.</Text>
                <Text>메일을 삭제해 감소시킨 탄소량을</Text>
                <Text>확인해보세요</Text>
              </View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: COLORS.main,
  },
  header:{
    height:'10%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',  
  },
  main:{
    alignItems:'center',
    marginTop:'3%'
  },
  emailBox: {
    width: DEVICE_WIDTH * 202,
    height: DEVICE_HEIGHT * 40,
    alignItems:'center',
    justifyContent: 'center',
    padding:10,
    borderRadius:20,
    backgroundColor:COLORS.white  
  },
  circle:{
    width:249,
    height:236,
    marginTop:19,
    borderRadius:160,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.subOne,
  },
  address:{
    fontSize: FONTS.mailAddress
  },
  firstInfo:{
    width: DEVICE_WIDTH * 293,
    height: DEVICE_HEIGHT * 118,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: DEVICE_WIDTH * 28,
    borderRadius: 20,
    backgroundColor: COLORS.white
  },
  btnScan:{
    width: DEVICE_WIDTH * 120,
    height: DEVICE_HEIGHT * 53,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: COLORS.subTwo, 
    paddingHorizontal:10, 
    marginTop:20,  
    borderRadius:20
  },
  shadow:{
    shadowColor:'#000',
    elevation:35,
  }
})

export default HomeScreen;