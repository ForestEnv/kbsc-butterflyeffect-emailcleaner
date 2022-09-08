import React, { 
  useEffect, 
  useState, 
  useCallback, 
  useRef, 
  useMemo, 
} from 'react';

import { 
  StyleSheet, 
  Text, 
  View, 
  ActivityIndicator, 
  StatusBar,
} from 'react-native';
import { BottomSheet } from '@rneui/themed';

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";
import { useEmailAddressState } from '../contexts/EmailAddressContext';

import { getEmailCount } from "../api/email";
import { getEmailClassification } from '../api/email';
import { getDeleteEmailNum } from '../api/email';
import { DeleteNumber } from '../api/types';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';


import HeaderView from '../components/HeaderView';
import EmailAddressBox from '../components/EmailAddreessBox';
import CircleView from '../components/CircleView';
import FirstUseInfo from '../components/FirstUseInfo';

function HomeScreen() {
  const [user] = useUserState();
  
  //scan 결과 상태값
  const [scanResult, setScanResult] = useState();

  //연동된 이메일 주소
  // const [emailAddress] = useEmailAddressState();
  // const email_id = emailAddress[0];
  
  //리액트 쿼리를 사용한 데이터 페칭 : 연동된 이메일 아이디, 이메일 수
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));

  //이메일 삭제 수 State
  const [deleteNum, setDeleteNum] = useState<DeleteNumber>();

  //스캔 실행
  const onScanSubmit = () => {
    
  };

  //서비스 사용 여부 API 
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
  
  //이메일 주소 & 이메일 수 조회 데이터 로딩
  if(isLoading) {
    return(
      <>
        <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
        <View style={{flex:1, backgroundColor:COLORS.main}}>
          <ActivityIndicator size="large" color="green"/>
        </View>
      </>
    );
  };

  return (
    <>
      <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
      <View style={styles.container}>
        <HeaderView/>
        <View style={styles.main}>
          <EmailAddressBox email={data.Ressult[0].email_address}/>
          <CircleView emailCount={data.Ressult[0].emailCount} onScanSubmit={onScanSubmit}/>
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
  contentContainer: {    
    flex: 1,    
    alignItems: 'center',
  },
  shadow:{
    shadowColor:'#000',
    elevation:35,
  }
})

export default HomeScreen;