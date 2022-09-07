import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import ScanButton from './ScanButton';

interface EmailCountProps {
    emailCount: number;
    onScanSubmit: any;
};

function CircleView({emailCount, onScanSubmit}: EmailCountProps) {
    return(
        <View style={[styles.circle, styles.shadow]}>
            <Text style={styles.infoText}>현재 메일 수</Text>
            <Text style={styles.countText}>{emailCount}</Text>
            <ScanButton onScanSubmit={onScanSubmit}/>
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
        fontSize: FONTS.regular, 
        fontWeight:'600', 
        color:'#000000'
    },
    countText:{
        textAlign: 'center', 
        width: DEVICE_WIDTH * 100, 
        height: DEVICE_HEIGHT * 58, 
        marginTop: DEVICE_HEIGHT * 4, 
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