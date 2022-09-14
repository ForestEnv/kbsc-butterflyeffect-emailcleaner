import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';
import Scan from '../assets/icons/icon_scan.svg';

interface EventProps {
    onScanSubmit : any;
    email_id: string;
}
function ScanButton({onScanSubmit, email_id}: EventProps) {
    return(
        <View style={styles.container}>
            <Text style={{color:'#a19f9f', fontFamily:'NotoSansKR-Bold' }}>아래 스캔 버튼을 클릭하세요.</Text>
            <TouchableOpacity
                onPress={() => onScanSubmit(email_id)}
                style={[styles.button, styles.shadow]}
            >
                <Scan/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        marginTop: DEVICE_HEIGHT * 1, 
        alignItems:'center', 
        justifyContent:'center',
    },
    button:{
        width: DEVICE_WIDTH * 120,
        height: DEVICE_HEIGHT * 53,
        marginTop: DEVICE_HEIGHT * 4,  
        marginBottom:DEVICE_HEIGHT * 18,
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal:10, 
        borderRadius:20,
        backgroundColor: COLORS.subTwo, 
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default ScanButton;