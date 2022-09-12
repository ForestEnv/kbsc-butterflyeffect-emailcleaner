import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import {Fold} from 'react-native-animated-spinkit';

import ScanButton from './ScanButton';
import DeleteButton from './DeleteButton';

interface EmailCountProps {
    emailCount: number;
    onScanSubmit: any;
    onDeleteSubmit: any;
    homeScreenState: boolean;
    isScanLoading: boolean;
};

function CircleView({emailCount, onScanSubmit, onDeleteSubmit, homeScreenState, isScanLoading}: EmailCountProps) {
    return(
        <View style={[styles.circle, styles.shadow]}>
            {isScanLoading ? (
                <>
                    <Fold size={85} color="#F4EAE6"/>
                    <Text style={{marginTop: DEVICE_HEIGHT * 20, textAlign:'center',color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Medium'}}>회원님의 이메일을 스캔중입니다.</Text>
                </>
                ):(
                    <>
                        {homeScreenState ? (
                            <View>
                                <Text style={styles.infoText}>현재 메일 수</Text>
                                <Text style={styles.countText}>{emailCount}</Text>
                                <ScanButton onScanSubmit={onScanSubmit}/>
                            </View>
                        ) : (
                            <View>
                                <Text style={styles.infoText}>삭제될 메일 수</Text>
                                <DeleteButton onDeleteSubmit={onDeleteSubmit}/>
                            </View>
                        )}
                    </>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    circle:{
        width: DEVICE_WIDTH * 249,
        height: DEVICE_HEIGHT * 236,
        marginTop:19,
        padding:15,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:160,
        backgroundColor:COLORS.subOne,
    },
    infoText:{
        textAlign: 'center', 
        width: DEVICE_WIDTH * 108, 
        height: DEVICE_HEIGHT * 29, 
        marginTop: DEVICE_HEIGHT * 30,
        marginLeft: DEVICE_WIDTH *20, 
        fontSize: FONTS.regular, 
        fontWeight:'600', 
        color:'#000000'
    },
    countText:{
        textAlign: 'center', 
        width: DEVICE_WIDTH * 100, 
        height: DEVICE_HEIGHT * 58, 
        marginTop: DEVICE_HEIGHT * 2,
        marginLeft: DEVICE_WIDTH * 24, 
        includeFontPadding:false, 
        fontSize: FONTS.mailCount, 
        fontFamily:'NotoSansKR-Bold',
        color:'#000000', 
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default CircleView;