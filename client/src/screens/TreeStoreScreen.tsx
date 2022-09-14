import React, { useState, useEffect, useMemo, useRef, useCallback,  } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar,
    Image,
    FlatList,
    Alert,
    ActivityIndicator
} from 'react-native';

import { RootStackNavigationProp } from '../stacks/types';
import { TreeStoreProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/core';
import { setMilege } from '../api/reward';
import { useUserState } from "../contexts/UserContext";

import { TouchableOpacity } from 'react-native-gesture-handler';
import Plus from '../assets/icons/icon_plus.svg';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';
import BottomSheet, {
    BottomSheetModal, 
} from '@gorhom/bottom-sheet';

const data = [
    {id:0, title:'블루베리 묘목', image: require('../assets/images/tree_blueberry.png'), price: 38000},
    {id:1, title:'오랜지 묘목', image: require('../assets/images/tree_orange.png'), price: 43250},
    {id:2, title:'자두 묘목', image: require('../assets/images/tree_jadu.png'), price: 25000},
    {id:3, title:'대추 묘목', image: require('../assets/images/tree_daechu.png'), price: 4000},
    {id:4, title:'배롱나무 묘목', image: require('../assets/images/tree_tropical.png'), price: 9500},
    {id:5, title:'무화과나무 묘목', image: require('../assets/images/tree_baerong.png'),price: 9800},
    {id:6, title:'키위나무 묘목', image: require('../assets/images/tree_yolo.png'), price: 25800},
    {id:7, title:'복숭아나무 묘목', image: require('../assets/images/tree_peach.png'), price: 60000}
]

function TreeStoreScreen() {
    const [user] = useUserState();
    const user_no = user.no;

    const [isLoading, setIsLoading] = useState(false);
    
    const {params} = useRoute<TreeStoreProp>();
    const miles = params.miles;

    //경험치 확인 이후 바텀시트
    const sheetRef = useRef<BottomSheet>(null);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['1%', DEVICE_HEIGHT * 225], []);
    const handleSheetChanges = useCallback((index: number) => {    
        console.log('handleSheetChanges', index);  
    }, []);

    const onClick = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const onPurchaseSubmit = (miles: number) => {
        setIsLoading(true);
        setMilege(user_no, miles);
        setIsLoading(false);
        Alert.alert('나무 구매를 완료했습니다🌲');
    };

    return(
        <View style={styles.container}>
            <View style={[styles.info, styles.shadow]}>
                <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular', position:'absolute', left:3, top:2 }}>🏆회원님의 마일리지</Text>
                <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>{miles}P</Text>
            </View>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => (
                    <>
                        <View style={[styles.treeBox, styles.shadow]}>
                            <Image source={item.image} style={styles.image}/>
                            <View style={{marginLeft: DEVICE_WIDTH * 20, marginTop: DEVICE_HEIGHT * 10}}>
                                <Text style={{fontFamily: 'NotoSansKR-Bold', color:'#000000', lineHeight:20}}>{item.title}</Text>
                                <Text style={{fontFamily: 'NotoSansKR-Medium', color:'#000000', lineHeight:20}}>{item.price}P</Text>
                                <TouchableOpacity onPress={onClick} containerStyle={{position:'absolute', right:20, bottom:2}} >
                                    <Plus/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            />
            <BottomSheetModal
                ref={bottomSheetModalRef}          
                index={1}          
                snapPoints={snapPoints}          
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
            >
                <View>
                    <Image source={data[3].image} style={{height: DEVICE_HEIGHT * 170, width: DEVICE_WIDTH *150, marginLeft: DEVICE_WIDTH * 20, marginTop:DEVICE_HEIGHT *10}}/>
                    <View style={{position:'absolute', right:10, marginTop: DEVICE_HEIGHT * 50}}>
                        <Text style={{textAlign:'center',color:'#000000', fontFamily:'NotoSansKR-Bold', fontSize:18, lineHeight:20}}>대추 묘목을 선택하셨습니다.</Text>
                        <Text style={{textAlign:'center',color:'#000000', fontFamily:'NotoSansKR-Bold', fontSize:18, lineHeight:20}}> 구매를 원하시면 아래 구매하기</Text>
                        <Text style={{textAlign:'center',color:'#000000', fontFamily:'NotoSansKR-Bold', fontSize:18, lineHeight:20}}>버튼을 눌러주세요🎊</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => onPurchaseSubmit(data[3].price)}
                        containerStyle={{
                            position:'absolute', 
                            right: 20, 
                            bottom:29,
                            backgroundColor:COLORS.subTwo,
                            width: DEVICE_WIDTH * 183,
                            height: DEVICE_HEIGHT * 34,
                            borderRadius:20
                        }}
                    >   
                        {isLoading ? (
                            <ActivityIndicator size="large" color="black"/>
                        ) : (
                            <View>
                                <Text style={{textAlign:'center',color:'#000000', fontFamily:'NotoSansKR-Bold', fontSize:14}}>구매하기</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.main
    },
    info:{
        width: DEVICE_WIDTH * 145,
        height: DEVICE_HEIGHT * 73,
        marginTop: DEVICE_WIDTH * 65,
        marginLeft: DEVICE_WIDTH * 20,
        alignItems:'center',
        padding:10,
        justifyContent:'center',
        borderRadius: 15,
        backgroundColor: '#FFF9F9',
    },
    treeBox:{
        marginTop: DEVICE_HEIGHT * 30,
        marginLeft: DEVICE_WIDTH * 15,
        width: DEVICE_WIDTH * 156,
        height: DEVICE_HEIGHT * 202,
        borderRadius: 20,
        backgroundColor: COLORS.white,
    },
    image:{
        marginLeft: DEVICE_WIDTH * 35,
        marginTop: DEVICE_HEIGHT * 30,
        height: DEVICE_HEIGHT * 115,
        
    },
    shadow:{
        elevation:59,
    },
});

export default TreeStoreScreen;