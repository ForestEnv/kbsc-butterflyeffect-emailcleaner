import React from 'react'
import { 
    StyleSheet, 
    View,
    Text, 
    TouchableOpacity,
    Image 
} from 'react-native';

import { DEVICE_HEIGHT, DEVICE_WIDTH, COLORS, FONTS} from '../constants/theme';

function FirstUseInfo() {
    return(
        <View style={[styles.box, styles.shadow]}>
            <Text>
                <Text style={{fontSize: FONTS.info, color: "#000000", fontFamily:"NotoSansKR-Medium"}}>🖐️현탁님, 아직 활동 내역이 없습니다.</Text>
                <Text style={{fontSize: FONTS.info, color: "#000000", fontFamily:"NotoSansKR-Medium"}}>메일을 삭제해서 감소시킨 탄소량을</Text>
                <Text style={{fontSize: FONTS.info, color: "#000000", fontFamily:"NotoSansKR-Medium"}}>확인해보세요😊</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: DEVICE_WIDTH * 293,
        height: DEVICE_HEIGHT * 118,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: DEVICE_WIDTH * 28,
        borderRadius: 20,
        backgroundColor: COLORS.white
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default FirstUseInfo;

