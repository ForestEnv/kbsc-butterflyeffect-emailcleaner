import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../stacks/types';
import { useUserState } from "../contexts/UserContext";

function LandingScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();
    const [user, setUser] = useUserState();
    
    return (
        <View style={{flex:1, alignItems:'center'}}>
            <TouchableOpacity 
                style={{ marginTop:10, borderColor:'black',  borderWidth:1}}
                onPress={() => { navigation.navigate('Register') }}
            >
                <Text style={{fontSize:20}}>이메일로 시작하기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{ marginTop:10, borderColor:'black',  borderWidth:1}}    
                onPress={() => { navigation.navigate('Login') }}
            >
                <Text style={{fontSize:20}}>로그인하기</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})

export default LandingScreen;