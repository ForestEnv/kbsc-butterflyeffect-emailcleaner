import React, { useEffect, useState } from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  ActivityIndicator, 
  TouchableOpacity,
  StatusBar,
  Image 
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";

import { getEmailCount } from "../api/email";
import { getDeleteEmailNum } from '../api/email';

import { DeleteNumber } from '../api/types';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import HeaderView from '../components/HeaderView';
import FirstUseInfo from '../components/FirstUseInfo';

import Scan from '../assets/icons/icon_scan.svg';

function HomeScreen() {
  const [user] = useUserState();
  
  //리액트 쿼리를 사용한 데이터 페칭 : 연동된 이메일 아이디, 이메일 수
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));
  
  //이메일 삭제 수 State
  const [deleteNum, setDeleteNum] = useState<DeleteNumber>();

  //서비스 사용 여부  API 
  useEffect(() => {
    const fetchData = async () => {
      try {
          const res = await getDeleteEmailNum(user.no);
          setDeleteNum(res);
        } catch(error) {
            console.log('데이터 조회 실패');
          }
    };
    fetchData();
  }, []);
  
  //이메일 주소, 이메일 수 데이터 로딩
  if(isLoading) {
    return(
      <>
        <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
        <View style={{flex:1, backgroundColor:COLORS.main}}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
      <View style={styles.container}>
        <HeaderView/>
        <View style={styles.main}>
          <View style={[styles.emailBox, styles.shadow]}>
            <Text style={styles.address}>{data.email}</Text>
          </View>
          <View style={[styles.circle, styles.shadow]}>
              <Text style={{ textAlign: 'center', marginTop: DEVICE_HEIGHT * 30, width: DEVICE_WIDTH * 108, height: DEVICE_HEIGHT * 29, fontSize: FONTS.regular, fontWeight:'600', color:'#000000'}}>현재 메일 수</Text>
              <Text style={{ textAlign: 'center', marginTop: DEVICE_HEIGHT * 4, width: DEVICE_WIDTH * 100, height: DEVICE_HEIGHT * 58, includeFontPadding:false, fontSize: FONTS.mailCount, color:'#000000', fontFamily:'NotoSansKR-Bold' }}>{data.emailCount}</Text>
            <View style={{marginTop: DEVICE_HEIGHT * 25, alignItems:'center', justifyContent:'center',}}>
              <Text style={{color:'#a19f9f', }}>아래 스캔 버튼을 클릭하세요.</Text>
              <TouchableOpacity style={[styles.btnScan, styles.shadow]}>
                  <Scan/>
              </TouchableOpacity>
            </View>
          </View>
          { !deleteNum ? (
              <View>
                <Text>사용 내역이 있습니다.</Text>
              </View>
            ) : (
              <FirstUseInfo/>
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
  main:{
    alignItems:'center',
    marginTop:'3%'
  },
  emailBox: {
    width: DEVICE_WIDTH * 202,
    height: DEVICE_HEIGHT * 40,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:20,
    backgroundColor:COLORS.white  
  },
  circle:{
    width: DEVICE_WIDTH * 249,
    height: DEVICE_HEIGHT * 236,
    marginTop:19,
    borderRadius:160,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:COLORS.subOne,
  },
  address:{
    fontSize: FONTS.mailAddress,
    color:'#000000',
    fontFamily: 'NotoSansKR-Bold'
  },
  btnScan:{
    width: DEVICE_WIDTH * 120,
    height: DEVICE_HEIGHT * 53,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: COLORS.subTwo, 
    paddingHorizontal:10, 
    marginTop: DEVICE_HEIGHT * 4,  
    marginBottom:DEVICE_HEIGHT * 18,
    borderRadius:20
  },
  shadow:{
    shadowColor:'#000',
    elevation:35,
  }
})

export default HomeScreen;