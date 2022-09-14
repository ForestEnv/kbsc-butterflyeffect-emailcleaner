import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, } from '../constants/theme';

interface DeleteEmailCountProp {
    deleteEmailCount: number;
}

function DeleteEmailCountBox() {
    return(
        <View style={[styles.container, styles.shadow]}>
            <Text style={{
                    marginTop: DEVICE_HEIGHT * 9,
                    marginLeft:DEVICE_WIDTH * 2, 
                    color:'#000000', 
                    fontSize:16,
                    fontFamily:'NotoSansKR-Medium',
                    lineHeight:24,
                    textAlign:'center'
                }}
            > 📜삭제한 총 메일 수
            </Text>
            {/* <Text style={{
                    marginLeft:DEVICE_WIDTH * 15.5, 
                    color:'#000000', 
                    fontSize:14,
                    fontFamily:'NotoSansKR-Bold',
                    lineHeight:20
                }}
            >메일 수
            </Text> */}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: DEVICE_WIDTH * 140,
        height: DEVICE_HEIGHT * 118,
        marginRight: DEVICE_WIDTH * 20,
        backgroundColor: COLORS.white,
        borderRadius:15,
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default DeleteEmailCountBox;