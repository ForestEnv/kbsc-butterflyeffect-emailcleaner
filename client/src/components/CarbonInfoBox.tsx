import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

function CarbonInfoBox() {
    return(
        <View style={styles.container}>
            <Text>hello</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width: DEVICE_WIDTH * 102,
        height: DEVICE_HEIGHT * 118,
        marginRight: DEVICE_WIDTH * 20,
        backgroundColor: COLORS.subTwo,
        borderRadius: 15,
    }
});
export default CarbonInfoBox;