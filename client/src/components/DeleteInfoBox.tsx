import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

function DeleteInfoBox() {
    return(
            <View style={[styles.container, styles.shadow]}>
                <Text style={{color:'#000000', fontFamily: 'NotoSansKR-Medium',fontSize:16 }}>
                    <Text>❗삭제된 이메일은 휴지통으로 &nbsp;</Text>
                    <Text>이전됩니다. &nbsp;</Text>
                    <Text>향후 복구를 희망하는 메일이 있으면 휴지통에</Text>
                    <Text>가서 복구를 진행하세요😊</Text>
                </Text>
            </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: DEVICE_WIDTH * 295,
        height: DEVICE_HEIGHT * 115,
        marginTop: DEVICE_HEIGHT * 27,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        padding:25
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default DeleteInfoBox;