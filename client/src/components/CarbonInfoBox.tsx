import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import BottomSheet, {
    BottomSheetModal, 
    TouchableOpacity,
    BottomSheetScrollView
} from '@gorhom/bottom-sheet';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import Car from '../assets/icons/icon_car.svg';

interface DeleteEmailCountProp {
    deleteEmailCount: number;
};

function CarbonInfoBox({deleteEmailCount}: DeleteEmailCountProp) {
    const infoBottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['1%', DEVICE_HEIGHT * 225], []);
    const handleSheetChanges = useCallback((index: number) => {}, []);
    
    const onClick = useCallback(() => {
        infoBottomSheetModalRef.current?.present();
    }, []);

    return(
        <View style={[styles.container, styles.shadow]}>
            <Text style={{color:'#000000', fontFamily:'NotoSansKR-Medium', fontSize:16, textAlign:'center'}}>🌏감소시킨 총 탄소량</Text>
            <Text style={{
                textAlign:'center',
                color:'#FFFFFF', 
                fontSize: 35, 
                lineHeight:48,
                fontFamily:'NotoSansKR-Bold',
            }}
            >{deleteEmailCount * 4.253}g</Text>
            <TouchableOpacity onPress={onClick}style={{marginHorizontal:17}}>
                <Text style={{color:'#848080', fontSize:12, fontFamily:'NotoSansKR-Black', lineHeight:20}}>🤔회원님이 감소시킨 탄소량은 어느 정도일까요?</Text>
            </TouchableOpacity>
            <BottomSheetModal
                ref={infoBottomSheetModalRef}          
                index={1}          
                snapPoints={snapPoints}          
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
            >  
                <View style={{alignItems:'center'}}>
                    <Car/>
                    <Text style={{fontSize:16, fontFamily:'NotoSansKR-Bold', color:'#000000', lineHeight:30}}>
                        ✔️2020년도까지 km당 자동차 온실가스 배출량은 
                    </Text>
                    <Text style={{fontSize:16, fontFamily:'NotoSansKR-Bold', color:'#000000', lineHeight:30}}>
                        97g이었어요😣
                    </Text>
                    <Text>
                        <Text style={{fontSize:16, fontFamily:'NotoSansKR-Bold', color:'#000000',lineHeight:30}}>
                            ✔️2025년도까지는 89g으로 감축시키는 것이 정부의 목적입니다🌳
                        </Text>
                    </Text>
                </View>
            </BottomSheetModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: DEVICE_WIDTH * 174,
        height: DEVICE_HEIGHT * 118,
        marginRight: DEVICE_WIDTH * 5,
        backgroundColor: COLORS.subTwo,
        borderRadius: 15,
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});
export default CarbonInfoBox;