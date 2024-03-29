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
  StatusBar,
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';

import BottomSheet, {
  BottomSheetModal, 
  TouchableOpacity,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";
import { useEmailAddressState } from '../contexts/EmailAddressContext';

import { getEmailCount } from "../api/email";
import { getEmailClassification } from '../api/email';
import { deleteEmail } from '../api/email';
import { getDeleteEmailNum } from '../api/email';
import { DeleteNumber } from '../api/types';
import { getEmailAddress } from '../api/email';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import HeaderView from '../components/HeaderView';
import EmailAddressBox from '../components/EmailAddreessBox';
import CircleView from '../components/CircleView';
import FirstUseInfo from '../components/FirstUseInfo';
import ActivityInfoView from '../components/ActivityInfoView';
import CountEmailClassification from '../components/CountEmailClassification';

import {Fold} from 'react-native-animated-spinkit';
import {Bounce} from 'react-native-animated-spinkit';
import CheckBox from '@react-native-community/checkbox';

import Person from '../assets/icons/icon_person.svg';
import Alarm from '../assets/icons/icon_alaram.svg';
import Ads from '../assets/icons/icon_ads.svg';
import NewsLetter from '../assets/icons/icon_newsletter.svg';
import authStorage from '../storages/authStorage';

import { useNavigation } from '@react-navigation/native';
import { MainTabNavigationProp } from '../stacks/types';
//분류 
const classification = [
  {id:1, sort:'광고', icon:<Ads/>},
  {id:2, sort:'뉴스레터', icon:<NewsLetter/>},
  {id:3, sort:'알림', icon:<Alarm/>},
  {id:4, sort:'개인', icon:<Person/>},
]

//분류 응답 데이터 타입
interface ScanResult {
  index:number;
  date:string;
  subject:string;
  sender:string;
  body:string;
  pred:string;
}

function HomeScreen()  {
  //HomeScreen 전체 상태값
  const [homeScreenState, setHomeScreenState] = useState(true);
  const navigation = useNavigation<MainTabNavigationProp>();
  
  //사용자 번호 조회
  const [user] = useUserState();
  const user_no = user.no;

  const [emailAddress, setEmailAddress] = useEmailAddressState();
  
  const [emailId, setEmailId] = useState('');
  const email_id = emailId;

  //리액트 쿼리를 사용한 데이터 페칭 : 연동된 이메일 아이디, 이메일 수
  const {data, isLoading} = useQuery(['count', user.no], () => getEmailCount(user.no));
  
  //Tab 상태값
  const [toggleState, setToggleState] = useState<string>("광고");
  
  //scan 결과 상태값
  const [scanResult, setScanResult] = useState<ScanResult[]>([]);
  const [isScanLoading, setIsScanLoading] = useState(false);

  //delete 로딩 상태값
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

   //이메일 삭제 수 State
  const [deleteNum, setDeleteNum] = useState<{totalCount:number;}|null>({totalCount:0});
  
  //체크박스 상태값
  //const [toggleCheckBox, setToggleCheckBox] = useState(true);
  const [toggleCheckBox, setToggleCheckBox] = useState([]);
  const [deleteEmailIndex, setDeleteEmailIndex] = useState([]);
  const list = deleteEmailIndex;

  //체크박스 전체 선택
  const handleAllCheck = (newValue:boolean) => {
    if(newValue){
      const indexArray: number[] = [];
      scanResult.forEach((item) => indexArray.push(item.index));
      setToggleCheckBox(indexArray);
      //삭제 예정 인덱스에 전체 체크된 인덱스 저장
      setDeleteEmailIndex(indexArray);
    } else{
      setToggleCheckBox([]);
    }
  }
  
  //체크박스 단일 선택 EventHandler
  const onHandleCheckBox = (newValue:boolean, dataIndex: number) => {
    if(newValue){
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setToggleCheckBox(prev => [...prev, dataIndex])
      setDeleteEmailIndex(prev => [...prev, dataIndex])
    }
    else{
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setToggleCheckBox(toggleCheckBox.filter((item) => item !== dataIndex))
      setDeleteEmailIndex(deleteEmailIndex.filter((item) => item !== dataIndex))
    }
  }

  const emailList = scanResult.filter(item => (
    item.pred === toggleState
  ));
  
  //분류된 이메일 수 카운트
  const classificationEmailCount = scanResult.filter(item => (
    item.pred === toggleState
  )).length;
  
  //삭제할 이메일 수 카운트
  const deletionEmailCount = deleteEmailIndex.length;

  //Eventhandler: Tab
  const toggleTab = (index: string) => {
    setToggleState(index);
  };
  
  //스캔 이후 바텀시트
  const sheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1%', DEVICE_HEIGHT * 525], []);
  const handleSheetChanges = useCallback((index: number) => {    
    console.log('handleSheetChanges', index);  
  }, []);

  //삭제 이후 바텀시트
  const deleteBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const deleteSnapPoints = useMemo(() => ['1%', DEVICE_HEIGHT * 375], []);
  const deleteHandleSheetChanges = useCallback((index: number) => {}, []);
  
  
  //스캔 API
  const fetchScanData = async (email_id: string) => {
    
    //스캔 데이터 로딩
    setIsScanLoading(true);
    //분류 결과 받아옴
    const res = await getEmailClassification({user_no, email_id});
    //상태값에 분류 결과 저장
    setScanResult(res);
    //체크박스 기본값을 true로 초기화
    setIsScanLoading(false)
    //바텀시트 실행
    bottomSheetModalRef.current?.present();
    setHomeScreenState(false);
  }


  //스캔 실행
  const onScanSubmit = useCallback((email_id: string) => {
    try{
      fetchScanData(email_id);
    } catch(error){
        console.log(error);
    } 
  }, []);
  
  //삭제 API
  const fetchDeleteData = async (email_id: string, list: number[]) => {
    setIsDeleteLoading(true);
    console.log('REQUEST DATA TO SERVER', user_no, email_id, list)
    //삭제 실행
    await deleteEmail({user_no, email_id, list});
    
    setIsDeleteLoading(false);
    //바텀시트 실행
    deleteBottomSheetModalRef.current?.present();
    setHomeScreenState(true);
  }
  console.log(deleteNum);
  //삭제 실행
  const onDeleteSubmit = useCallback((email_id: string, list: number[]) => {
    try{
      fetchDeleteData(email_id, list);
    } catch(error){
      console.log(error);
    }
  }, []);

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
  }, [deleteNum]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await getEmailAddress(user.no);
        setEmailId(res);
        setEmailAddress(res);
      } catch(error) {
        console.log('이메일 데이터 조회 실패');
      }
    };
    fetchData();
  },[]);
  
  //로그인 이후 인박스 조회 loading
  if(isLoading) {
    return(
      <>
        <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
        <View style={{flex:1, backgroundColor: COLORS.main, alignItems:'center', justifyContent:'center'}}>
          <Fold size={65} color="#FFFFFF"/>
          <Text style={{color:'#000000', fontSize:20, fontFamily:'NotoSansKR-Bold', marginTop: DEVICE_HEIGHT * 20}}>인박스 정보를 가져오고 있습니다. </Text>
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
          <CircleView 
            emailCount={data.Ressult[0].emailCount}
            deletionEmailCount={deletionEmailCount} 
            onScanSubmit={onScanSubmit}
            onDeleteSubmit={onDeleteSubmit}
            homeScreenState={homeScreenState} 
            isScanLoading={isScanLoading}
            isDeleteLoading={isDeleteLoading}
            email_id={email_id}
            list={list}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}          
            index={1}          
            snapPoints={snapPoints}          
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
          > 
            <ScrollView style={styles.contentContainer}>
              <View>
                <Text style={{ textAlign:'center',fontFamily:'NotoSansKR-Bold', color:'#000000', fontSize:24, height:DEVICE_HEIGHT * 45, }}>스캔 작업을 완료했습니다🎊</Text>
                <Text style={{height:DEVICE_HEIGHT*30,textAlign:'center',}}>
                  <Text style={{fontFamily:'NotoSansKR-Bold', color:'red', fontSize:16,}}>삭제를 원하지 않는 메일은 &nbsp;</Text>
                  <Text style={{fontFamily:'NotoSansKR-Bold', color:'#000000', fontSize:16  }}>체크를</Text>
                </Text>          
                <Text style={{marginBottom:5,textAlign:'center',fontFamily:'NotoSansKR-Bold', color:'#000000', fontSize:16, lineHeight:20, }}>해제시켜주세요.</Text>
              </View>
              <View 
                style={{
                  flexDirection:'row',
                  marginTop:DEVICE_HEIGHT * 15,
                  alignItems:'center',
                  justifyContent:'center',
                }}
              >
                {classification.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => toggleTab(item.sort)}
                    style={{
                      width: DEVICE_WIDTH * 70,
                      height: DEVICE_HEIGHT * 70,
                      marginHorizontal: DEVICE_WIDTH * 8,
                      alignItems:'center',
                      justifyContent:'center',
                      borderWidth:3,
                      borderRadius: 15,
                      borderColor:"#ECE6E6",
                      backgroundColor: toggleState === item.sort ? '#b6e3b5' : '#FFFFFF'
                    }}
                  >
                      <View style={{marginTop:15}}>{item.icon}</View>
                      <Text style={{fontFamily:'NotoSansKR-Medium', color:'#000000', fontSize:14}}>{item.sort}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{marginRight:DEVICE_WIDTH * 110}}>
                <Text style={{marginLeft:DEVICE_WIDTH * 15}}>
                  <Text style={{fontFamily:'NotoSansKR-Black', fontSize:25, color:'#b6e3b5'}}>{classificationEmailCount}</Text>
                  <Text style={{fontFamily:'NotoSansKR-Bold', fontSize:23, color:'#000000', }}>개의 메일이 있습니다.</Text>
                </Text>
              </View>
              <View style={{flexDirection:'row', marginLeft: DEVICE_WIDTH * 16}}>
                <Text style={{color:'#948B8B', fontFamily:'NotoSansKR-Bold', lineHeight:39, fontSize:16}}>전체 삭제 체크</Text>
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox.length === scanResult.length ? true : false}
                  onValueChange={(newValue) => handleAllCheck(newValue)}
                  style={{marginBottom: DEVICE_HEIGHT*2}}
                />
              </View>
              <View style={{marginTop:DEVICE_HEIGHT * 2}}>
                <View style={{borderBottomWidth:2, borderBottomColor:'#c3c1c1', }}></View>
                  {emailList.map((item, index) => (
                    <>
                      <View key={index} style={{marginLeft:2,}}>
                        <View style={{flexDirection:'row', marginHorizontal:17, alignItems:'center', }}>
                          <CheckBox
                            disabled={false}
                            value={toggleCheckBox.includes(item.index) ? true : false}
                            onValueChange={(newValue) => onHandleCheckBox(newValue, item.index)}
                          />
                          <Text numberOfLines={2} style={{color:'#000000', marginLeft:DEVICE_WIDTH * 8,fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.subject}</Text>
                        </View>
                        <Text style={{color:'#898D89', fontSize:16, marginLeft:DEVICE_WIDTH * 50}}>{item.sender}</Text>

                      </View>
                      <View style={{borderBottomWidth:1, borderBottomColor:'#c3c1c1', marginHorizontal:DEVICE_WIDTH *25}}></View>
                    </>
                  ))}
              </View>            
            </ScrollView> 
          </BottomSheetModal>
          <BottomSheetModal
            ref={deleteBottomSheetModalRef}          
            index={1}          
            snapPoints={deleteSnapPoints}          
            onChange={deleteHandleSheetChanges}
            enablePanDownToClose={true}
          >
            <View>
              <View style={{alignItems:'center'}}>
                <Text style={{fontFamily: 'NotoSansKR-Bold',textAlign:'center', color:'#000000', fontSize:20}}>{deletionEmailCount}개의 이메일 삭제를 완료했습니다🎉</Text>
              </View>
              <View style={{backgroundColor:'#FFE9E9',width:DEVICE_WIDTH * 240, height: DEVICE_HEIGHT * 80, marginLeft: DEVICE_WIDTH * 60, alignItems:'center',borderRadius:15, }}>
                <Text style={{fontFamily: 'NotoSansKR-Medium', color:'#000000', fontSize:14}}>감소시킨 탄소량</Text>
                <Text style={{fontFamily: 'NotoSansKR-Bold', color:'#000000', fontSize:30, lineHeight:40}}>{deletionEmailCount * 4.22}g</Text>
              </View>
              <Text style={{fontFamily: 'NotoSansKR-Bold', textAlign:'center',color:'#000000', fontSize:16}}>일상 생활 속에서 또 다른 탄소 중립을 실천해 보세요🎁</Text>
              <View style={{width:DEVICE_WIDTH * 315, height: DEVICE_HEIGHT * 115, marginLeft: DEVICE_WIDTH * 24, borderRadius:15, backgroundColor:'#F4EAE6'}}>
                <Text style={{fontFamily: 'NotoSansKR-Bold',color:'#000000', fontSize:16}}>회원님, 이번에는</Text>    
                <Text style={{fontFamily: 'NotoSansKR-Bold',color:COLORS.subTwo, fontSize:16, lineHeight:20}}>샤워 시간을 1분 줄여보는게 어떨까요?😊</Text>
                <Text style={{fontFamily: 'NotoSansKR-Medium',color:'#000000', fontSize:16}}>샤워 시간을 1분 줄이면 가구당 연간 4.3kg의 CO2를 줄일 수 있습니다.</Text>    
              </View>
              <View>
                <Text style={{textAlign:'center',fontFamily: 'NotoSansKR-Medium', color:'#000000', fontSize:14}}>현탁님이 성장시키고 있는 나무를 확인하러 가보세요🌲</Text>
                <TouchableOpacity onPress={() => navigation.navigate('마이트리')}>
                  <Text style={{textAlign:'center',fontFamily: 'NotoSansKR-Bold', color:'#000000', fontSize:16, lineHeight:18}}>
                    이동하기
                  </Text>
                </TouchableOpacity>
              </View>
            </View> 
          </BottomSheetModal>
          { deleteNum ? (
              <ActivityInfoView homeScreenState={homeScreenState} deleteEmailCount={deleteNum.totalCount}/>
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
    //alignItems: 'center',
  },
  shadow:{
    shadowColor:'#000',
    elevation:35,
  }
})

export default HomeScreen;