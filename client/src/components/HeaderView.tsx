import React from 'react'
import { 
    StyleSheet, 
    View, 
    TouchableOpacity,
    Image 
} from 'react-native';

import { DEVICE_HEIGHT, DEVICE_WIDTH, } from '../constants/theme';

import {useNavigation} from '@react-navigation/native';
import { RootStackNavigationProp } from '../stacks/types';

import Notification from '../assets/icons/icon_notification.svg';
import TrashCan from '../assets/icons/icon_trash-can.svg';

function HeaderView() {
    const navigation = useNavigation<RootStackNavigationProp>();

    return(
        <View style={styles.container}>
            <Image source={require('../assets/images/logo.png')} style={{height:DEVICE_HEIGHT * 35, width:DEVICE_WIDTH*210, }}/>
            <View style={{flexDirection:'row', marginRight:DEVICE_WIDTH * 5.1,}}>
                <TouchableOpacity 
                    style={{marginRight: DEVICE_WIDTH * 18.1, marginTop: DEVICE_HEIGHT * 2.3}}
                    onPress={() => navigation.navigate('Restore')}
                >
                    <TrashCan/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Notification/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        height:'10%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around', 
    }
});

export default HeaderView;
