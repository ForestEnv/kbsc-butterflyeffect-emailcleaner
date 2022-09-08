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

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";
import { useEmailAddressState } from '../contexts/EmailAddressContext';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import  useScan  from '../hooks/useScan';

import { getEmailCount } from "../api/email";
import { getEmailClassification } from '../api/email';
import { getDeleteEmailNum } from '../api/email';
import { DeleteNumber } from '../api/types';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';


import HeaderView from '../components/HeaderView';
import EmailAddressBox from '../components/EmailAddreessBox';
import CircleView from '../components/CircleView';
import FirstUseInfo from '../components/FirstUseInfo';

import Scan from '../assets/icons/icon_scan.svg';

function HomeScreen() {
  const [user] = useUserState();
  
  //scan 결과 상태값
  const [scanResult, setScanResult] = useState();

  //연동된 이메일 주소
  const [emailAddress] = useEmailAddressState();
  const email_id = emailAddress[0];
  
  //리액트 쿼리를 사용한 데이터 페칭 : 연동된 이메일 아이디, 이메일 수
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));
  
  //리액트 쿼리를 사용한 데이터 페칭 : scan 작업 이후 분류된 이메일 리스트
  //const {mutate: getEmailClassification, isLoading: scanLoading } = useScan();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getEmailClassification(user.no, email_id);
    }
    fetchData();
  },[])

  //이메일 삭제 수 State
  const [deleteNum, setDeleteNum] = useState<DeleteNumber>();
  
  //바텀시트
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%','80%'], []);
  
  //바텀시트 eventHandler
  const handlePresentModalPress = useCallback(() => {  
    bottomSheetModalRef.current?.present();  
  }, []);

  const handleSheetChanges = useCallback((index: number) => {    
    console.log('handleSheetChanges', index);  
  }, []);

  //스캔 실행
  const onScanSubmit = () => {
    handlePresentModalPress();
    // getEmailClassification({
    //   user_no: user.no,
    //   email_id
    // })
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
      <BottomSheetModalProvider>
        <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
        <View style={styles.container}>
          <HeaderView/>
          <View style={styles.main}>
            <EmailAddressBox email={data.email}/>
            <CircleView emailCount={data.emailCount} onScanSubmit={onScanSubmit}/>
            <BottomSheetModal          
              ref={bottomSheetModalRef}          
              index={1}
              style={{borderRadius:20, }}
              snapPoints={snapPoints}          
              onChange={handleSheetChanges}        
            >          
              <View style={styles.contentContainer}>            
                <Text>Awesome 🎉</Text>          
              </View>        
            </BottomSheetModal> 
            { !deleteNum ? (
                <View>
                  <Text>사용 내역이 있습니다.</Text>
                </View>
              ) : (
                <FirstUseInfo/>
            )}
          </View>
        </View>
      </BottomSheetModalProvider>
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