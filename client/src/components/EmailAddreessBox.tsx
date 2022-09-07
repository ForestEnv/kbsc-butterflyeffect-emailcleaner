import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput,
    ActivityIndicator, 
    TouchableOpacity,
    StatusBar,
    Image 
} from 'react-native';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

interface EmailAddressProps {
    email: string;
}

function EmailAddressBox({email}: EmailAddressProps) {
    return(
        <View style={[styles.box, styles.shadow]}>
            <Text style={styles.addressText}>{email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: DEVICE_WIDTH * 202,
        height: DEVICE_HEIGHT * 40,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:20,
        backgroundColor:COLORS.white  
    },
    addressText:{
        fontSize: FONTS.mailAddress,
        color:'#000000',
        fontFamily: 'NotoSansKR-Bold'
    },
    shadow:{
        shadowColor:'#000',
        elevation:35,
    }
});

export default EmailAddressBox;