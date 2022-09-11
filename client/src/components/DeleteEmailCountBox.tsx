import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, } from '../constants/theme';

function DeleteEmailCountBox() {
    return(
        <View style={[styles.container, styles.shadow]}>
            <Text style={{
                    marginTop: DEVICE_HEIGHT * 9,
                    marginLeft:DEVICE_WIDTH * 9, 
                    color:'#000000', 
                    fontSize:14
                }}
            > 삭제한 총
            </Text>
            <Text style={{
                    marginLeft:DEVICE_WIDTH * 12.5, 
                    color:'#000000', 
                    fontSize:14
                }}
            >메일 수
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: DEVICE_WIDTH * 102,
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