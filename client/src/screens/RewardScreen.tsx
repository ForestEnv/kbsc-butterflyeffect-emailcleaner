import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, Text, View,  FlatList, StatusBar, } from 'react-native';

import {COLORS, DEVICE_WIDTH, DEVICE_HEIGHT} from '../constants/theme';

import UserOne from '../assets/icons/user_1.svg';
import UserTwo from '../assets/icons/user_2.svg';
import UserThree from '../assets/icons/user_3.svg';
import UserFour from '../assets/icons/user_4.svg';
import UserFive from '../assets/icons/user_5.svg';

import LevelOne from '../assets/icons/icon_levelOne.svg';

import { RootStackNavigationProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';
import { useUserState } from "../contexts/UserContext";

import { getUserActivityData } from '../api/reward';

import BottomSheet, {
  BottomSheetModal, 
  TouchableOpacity,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';

const data = {
  user:'현탁',
  point: 3423,
  level: 'Lv.1'
}

export interface Member {

}
const member = [
  {
    id:1,
    profile: <UserOne></UserOne>,
    lank: 1,
    user: '윤걸',
    level: 'Lv.4',
    cnt: 36532
  },
  {
    id:2,
    profile: <UserTwo></UserTwo>,
    lank: 2,
    user: '희열',
    level: 'Lv.4',
    cnt: 23341
  },
  {
    id:3,
    profile: <UserThree></UserThree>,
    lank: 3,
    user: '현지',
    level: 'Lv.3',
    cnt: 13432
  },
  {
    id:4,
    profile: <UserFive></UserFive>,
    lank: 4,
    user: '동석',
    level: 'Lv.3',
    cnt: 13222
  },
  {
    id:5,
    profile: <UserOne></UserOne>,
    lank: 5,
    user: '지승',
    level: 'Lv.2',
    cnt: 7859
  },
]

interface HeaderProps {
  title: string;
  btnColor: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

function RewardScreen() {
  //사용자 번호 조회
  const [user] = useUserState();
  const user_no = user.no;

  const [activeTab, setActiveTab] = useState('나의 나무');
  const [userActivity, setUserActivity] = useState([])

  const navigation = useNavigation<RootStackNavigationProp>();

  //경험치 확인 이후 바텀시트
  const sheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['1%', DEVICE_HEIGHT * 105], []);
  const handleSheetChanges = useCallback((index: number) => {    
    console.log('handleSheetChanges', index);  
  }, []);

  const fetchData = async () => {
    const res = await getUserActivityData(user_no);
    setUserActivity(res);
  };

  const onClick = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    try{
      fetchData();
    }catch(error) {
      console.log(error);
    }
  },[]);

  console.log('데이터:', userActivity);
  return (
    <>
      <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
      <View style={styles.container}>
        {/* 마일리지 & 레벨 */}
        <View style={styles.box}>
          <TouchableOpacity onPress={onClick} style={[styles.levelInfo]}>
            <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular',position:'absolute', left:3, top:2}}>🎖️회원님의 레벨</Text>
            <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>{data.level}</Text>
          </TouchableOpacity>
          <View style={[styles.info, styles.shadow]}>
            <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular', position:'absolute', left:3, top:2 }}>🏆회원님의 마일리지</Text>
            <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>{userActivity[1]}P</Text>
          </View>
        </View>
        <BottomSheetModal
            ref={bottomSheetModalRef}          
            index={1}          
            snapPoints={snapPoints}          
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
        >
            <View>
              <Text>
                <Text style={{textAlign:'center',color:'#000000', fontSize:24, fontFamily:'NotoSansKR-Black'}}>✨현재 회원님의 경험치는 </Text>
                <Text style={{textAlign:'center',color:COLORS.subTwo, fontSize:24, fontFamily:'NotoSansKR-Black'}}>{userActivity[1]} </Text>
                <Text style={{textAlign:'center',color:'#000000', fontSize:24, fontFamily:'NotoSansKR-Black'}}>입니다. </Text>
              </Text>
            </View>
        </BottomSheetModal>
        {/* 헤더탭 */}
        <View style={{flexDirection:'row', alignSelf:'center', marginTop:DEVICE_HEIGHT * 17}}>
          <HeaderButton 
            title="나의 나무" 
            btnColor='#8ABC88' 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <HeaderButton 
            title="랭킹" 
            btnColor='#FFFFFF' 
            activeTab={activeTab}
            setActiveTab={setActiveTab}  
          />
        </View>
          {activeTab === '나의 나무' ? (
            <>
              <View style={styles.circle}>
                <TouchableOpacity style={styles.button}>
                  <LevelOne style={{marginBottom:DEVICE_HEIGHT * 25}}/>
                  <View>
                    <Text style={{color:'#736E6E', fontFamily:'NotoSansKR-Bold', fontSize:14, lineHeight:20}}>레벨 1에서는 기부할 나무가</Text>
                    <Text style={{color:'#736E6E', fontFamily:'NotoSansKR-Bold', fontSize:14, lineHeight:30, textAlign:'center'}}>아직 없습니다😣</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: DEVICE_HEIGHT * 25}}>
                <Text style={{color:'#000000', fontFamily:'NotoSansKR-Bold', fontSize:16}}>기부할 나무가 아닌 여러분만의 나무를 구매해보세요🌲</Text>
                <TouchableOpacity onPress={() => navigation.navigate('TreeStore', {miles: userActivity[1]})}>
                  <Text style={{color:'#736E6E', fontFamily:'NotoSansKR-Bold', fontSize:16, textAlign:'center', lineHeight:20, textDecorationLine:'underline'}}>상점으로 이동🏡</Text>
                </TouchableOpacity>
              </View>
            </>
            ) : (
                  <>
                    <View>
                      <Text style={{marginTop:DEVICE_HEIGHT * 12, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold'}}>👨‍👩‍👦‍👦다른 회원들의 디지털 탄소 중립 활동을 확인해 보세요</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{justifyContent:'flex-end'}}>랭킹</Text>
                      <Text>회원</Text>
                      <Text>레벨</Text>
                      <Text>이메일 삭제 수</Text>
                    </View>
                    <FlatList
                      data={member}
                      renderItem={({item, index}) => (
                        <>
                          <View style={{
                              flexDirection:'row',
                              marginTop:20,
                            }}
                          >
                            <Text style={{marginLeft: DEVICE_WIDTH * 23.6, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.lank}</Text>
                            <View style={{width:DEVICE_WIDTH * 39.1, height: DEVICE_HEIGHT * 38, position:'absolute', left:45, top:1, }}>{item.profile}</View>
                            <Text style={{marginLeft: DEVICE_WIDTH * 53.6, color:'#8ABC88', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.user}</Text>
                            <Text style={{marginLeft: DEVICE_WIDTH * 87.4, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.level}</Text>
                            <Text style={{marginLeft: DEVICE_WIDTH * 42.9, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.cnt}P</Text>
                            </View>
                          <View style={{width:DEVICE_WIDTH * 355, height: DEVICE_HEIGHT * 23, borderBottomWidth:1, borderColor:'#c3c1c1'}}/>
                        </>
                      )}
                      keyExtractor={item => `${item.id}`}
                    />
                  </>
            )
          }
      </View>
    </>
  );
}

const HeaderButton = ({title, btnColor, activeTab, setActiveTab}: HeaderProps) => (
  <TouchableOpacity
    style={{
      backgroundColor: activeTab === title ? '#8ABC88' : '#F4EAE6',
      width: DEVICE_WIDTH * 163,
      height: DEVICE_HEIGHT * 38,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 20,
    }}
    onPress={() => setActiveTab(title)}
  >
    <Text
      style={{
        fontSize:16,
        color: activeTab === title ? '#FFFFFF' : '#000000',
        fontFamily:'NotoSansKR-Bold' 
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    backgroundColor: COLORS.main
  },
  box:{
    flexDirection:'row',
    marginTop: DEVICE_HEIGHT * 26,
  },
  info:{
    backgroundColor: '#FFF9F9',
    width: DEVICE_WIDTH * 145,
    height: DEVICE_HEIGHT * 73,
    marginHorizontal: DEVICE_WIDTH * 15,
    alignItems:'center',
    padding:10,
    justifyContent:'center',
    borderRadius: 15,

  },
  levelInfo:{
    backgroundColor: '#FFF9F9',
    width: DEVICE_WIDTH * 120,
    height: DEVICE_HEIGHT * 73,
    marginHorizontal: DEVICE_WIDTH * 15,
    alignItems:'center',
    padding:10,
    justifyContent:'center',
    borderRadius: 15,

  },
  shadow:{
    elevation:59,
  },
  circle:{
    width: DEVICE_WIDTH * 249,
    height: DEVICE_HEIGHT * 236,
    marginTop: DEVICE_HEIGHT * 30,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:160,
    backgroundColor:COLORS.subOne,
  },
  button:{
    width: DEVICE_WIDTH * 230,
    height: DEVICE_HEIGHT * 216,
    padding:15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:160,
    backgroundColor:COLORS.subTwo,
  },
})

export default RewardScreen;