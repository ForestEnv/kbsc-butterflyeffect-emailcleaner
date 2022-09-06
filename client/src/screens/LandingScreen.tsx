import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';

import { RootStackNavigationProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';

import { DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, COLORS } from '../constants/theme';

function LandingScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();
    
    return (
        <>
            <StatusBar backgroundColor={COLORS.main} barStyle={'dark-content'}/>
            <View style={styles.container}>
                <View style={{alignItems:"center", backgroundColor:COLORS.main, marginTop:64}}>
                    <Image source={require('../assets/images/brand_logo.png')} style={styles.image}/>
                </View>
                <View style={{alignItems:'center', height: DEVICE_HEIGHT * 100, marginTop: DEVICE_HEIGHT * 40.52}}>
                    <Text style={{color:'#000000', fontSize:20, fontFamily:'NotoSansKR-Bold', lineHeight:30}}>작은 실천으로 예상하지 못한 결과로</Text>
                    <Text>
                        <Text style={{color:'#000000', fontSize:20, fontFamily:'NotoSansKR-Bold', lineHeight:30}}>이루어지는 &nbsp;</Text>
                        <Text style={{color:'#8ABC88', fontSize:20, fontFamily:'NotoSansKR-Black', lineHeight:30}}>공간</Text>
                    </Text>
                </View>
                <View style={styles.form}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate('Register') }}
                    >
                        <Text style={styles.text}>시작하기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => { navigation.navigate('Login') }}
                    >
                        <Text style={styles.text}>계정이 이미 있어요</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.main,
    },
    form:{
        height:'100%',
        width:'100%',
        alignItems:"center",
        marginBottom: DEVICE_HEIGHT * 50,
    },
    button:{
        width:DEVICE_WIDTH * 280,
        height:DEVICE_HEIGHT * 50 - 10,
        marginTop: DEVICE_HEIGHT * 15,
        borderRadius:20,
        backgroundColor:COLORS.subTwo,
    },
    image:{
        width:DEVICE_WIDTH * 195,
        height: DEVICE_HEIGHT * 125,
        backgroundColor: COLORS.main
    },
    text:{
        color:'#000000',
        fontSize: FONTS.medium,
        fontFamily: 'NotoSansKR-Bold',
        textAlign: 'center',
        marginVertical: DEVICE_HEIGHT * 2
    }
})

export default LandingScreen;