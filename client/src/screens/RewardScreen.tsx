import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar, } from 'react-native';

import {COLORS, DEVICE_WIDTH, DEVICE_HEIGHT} from '../constants/theme';

import UserOne from '../assets/icons/user_1.svg';
import UserTwo from '../assets/icons/user_2.svg';
import UserThree from '../assets/icons/user_3.svg';
import UserFour from '../assets/icons/user_4.svg';
import UserFive from '../assets/icons/user_5.svg';

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
    user: '현탁',
    level: 'Lv.3',
    cnt: 13222
  },
  {
    id:5,
    profile: <UserOne></UserOne>,
    lank: 5,
    user: '요한',
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
  const [activeTab, setActiveTab] = useState('나의 나무');

  console.log('DEBUG TEST = ', activeTab);
  return (
    <>
      <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
      <View style={styles.container}>
        {/* 마일리지 & 레벨 */}
        <View style={styles.box}>
          <View style={[styles.info, styles.shadow]}>
            <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular', position:'absolute', left:3, top:2 }}>🏆{data.user}님의 마일리지</Text>
            <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>{data.point}P</Text>
          </View>
          <View style={[styles.levelInfo]}>
            <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular',position:'absolute', left:3, top:2}}>🎖️{data.user}님의 레벨</Text>
            <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>{data.level}</Text>
          </View>
        </View>
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
              <View>
                <Text>나무</Text>
              </View>
            ) : (
                  <>
                    <View>
                      <Text style={{marginTop:DEVICE_HEIGHT * 12, color:'#000000', fontSize:14, fontFamily:'NotoSansKR-Medium'}}>👨‍👩‍👦‍👦다른 회원들의 디지털 탄소 중립 활동을 확인해 보세요</Text>
                    </View>
                    <FlatList
                      data={member}
                      renderItem={({item, index}) => (
                        <>
                          <View style={{
                              flexDirection:'row',
                              marginTop:25,
                            }}
                          >
                            <Text style={{marginLeft: DEVICE_WIDTH * 23.6, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.lank}</Text>
                            <View style={{width:DEVICE_WIDTH * 39.1, height: DEVICE_HEIGHT * 38, position:'absolute', left:45, top:1, }}>{item.profile}</View>
                            <Text style={{marginLeft: DEVICE_WIDTH * 53.6, color:'#8ABC88', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.user}</Text>
                            <Text style={{marginLeft: DEVICE_WIDTH * 87.4, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.level}</Text>
                            <Text style={{marginLeft: DEVICE_WIDTH * 42.9, color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Bold', includeFontPadding:false,}}>{item.cnt}</Text>
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
    marginTop: DEVICE_HEIGHT * 6,
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
    elevation:79,
}
})

export default RewardScreen;