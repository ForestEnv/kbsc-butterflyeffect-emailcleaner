import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity 
} from 'react-native';

import { RootStackNavigationProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';

import { DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, COLORS } from '../constants/theme';

function LandingScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();
    
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Register') }}
                >
                    <Text style={styles.text}>이메일로 시작하기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { navigation.navigate('Login') }}
                >
                    <Text style={styles.text}>로그인하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
    },
    form:{
        height:'100%',
        width:'100%',
        alignItems:"center",
        marginTop: DEVICE_HEIGHT * 370,
    },
    button:{
        width:DEVICE_WIDTH * 280,
        height:DEVICE_HEIGHT * 50 - 10,
        marginTop: DEVICE_HEIGHT * 15,
        borderRadius:20,
        borderWidth:1,
        backgroundColor:COLORS.lofi,
    },
    text:{
        fontSize: FONTS.medium,
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * 10
    }
})

export default LandingScreen;