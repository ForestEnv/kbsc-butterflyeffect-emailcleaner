import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

interface DeleteEmailCountProp {
    deleteEmailCount: number;
};

function CarbonInfoBox({deleteEmailCount}: DeleteEmailCountProp) {
    return(
        <View style={[styles.container, styles.shadow]}>
            <Text style={{color:'#000000', fontFamily:'NotoSansKR-Medium', fontSize:16, textAlign:'center'}}>🌏감소시킨 총 탄소량</Text>
            <Text style={{
                textAlign:'center',
                color:'#FFFFFF', 
                fontSize: 35, 
                lineHeight:81,
                fontFamily:'NotoSansKR-Bold'
            }}
            
            >{deleteEmailCount * 4.253}g</Text>
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