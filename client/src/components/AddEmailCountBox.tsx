import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

function AddEmailCountBox() {
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
        backgroundColor: COLORS.white,
        borderRadius: 15,
    }
});
export default AddEmailCountBox;