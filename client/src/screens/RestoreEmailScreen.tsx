import React, { 
    useEffect, 
    useState, 
} from 'react';

import { 
    StyleSheet, 
    Text, 
    View,
    StatusBar,
    ScrollView,
    Alert
} from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { useUserState } from "../contexts/UserContext";
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../stacks/types';

import { getDeleteEmailList } from '../api/restore';
import { setRestoreEmailList } from '../api/restore';

import {Bounce} from 'react-native-animated-spinkit';
import { DEVICE_HEIGHT, DEVICE_WIDTH, FONTS, COLORS } from '../constants/theme';

import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';

function RestoreEmailScreen() {
    const navigation = useNavigation<RootStackNavigationProp>();

    //사용자 정보 조회
    const [user] = useUserState();
    
    //체크박스 상태값
    const [toggleCheckBox, setToggleCheckBox] = useState([]);

    //삭제된 이메일 리스트 조회 API
    const {data, isLoading} = useQuery(['restore', user.no], () => getDeleteEmailList(user.no));
    
    //삭제된 이메일 수 
    //const deleteEmailCount = data.result.length;

    //체크박스 EventHandler
    const handleSingleCheck = (newValue: boolean, dataIndex:number) => {
        if (newValue) {
            // 단일 선택 시 체크된 아이템을 배열에 추가
            setToggleCheckBox(prev => [...prev, dataIndex]);
        } else {
            // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
            setToggleCheckBox(toggleCheckBox.filter((el) => el !== dataIndex));
        }
    };
    console.log('복구 리스트:', toggleCheckBox);
    
    //삭제 실행 이벤트 핸들러
    const onRestoreSubmit = () => {
        const user_no = user.no;
        const email_id = data.result[0].email_id;
        const email_no = data.result[0].email_no;
        const list = toggleCheckBox;
        
        setRestoreEmailList({
            user_no,
            email_id,
            email_no,
            list
        })
        setToggleCheckBox([]);
        Alert.alert('체크하신 이메일에 대한 복구가 완료되었습니다🎊')

    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => 
                <TouchableOpacity onPress={onRestoreSubmit}>
                    <Text style={{fontSize:18, color:'#000000', fontFamily:'NotoSansKR-Bold'}}>복구하기</Text>
                </TouchableOpacity>
        });
    }, [navigation, onRestoreSubmit]);

    //삭제 이메일 조회 loading
    if(isLoading){
        return(
            <>
                <StatusBar backgroundColor={'#F4EAE6'} barStyle={'dark-content'}/>
                <View style={{flex:1, backgroundColor: 'rgba(0, 0, 0, 0.25)', alignItems:'center', justifyContent:'center'}}>
                    <Bounce size={65} color="#B6E3B5"/>
                    <Text style={{color:'#000000', fontSize:20, fontFamily:'NotoSansKR-Medium'}}>인박스 정보를 가져오고 있습니다. </Text>
                </View>
            </>
        )
    }
    return(
        <ScrollView style={styles.container}>
            <View style={{marginTop: DEVICE_HEIGHT * 60,}}>
                <Text style={{
                        marginLeft: DEVICE_WIDTH * 20,
                        color: '#000000',
                        fontFamily: 'NotoSansKR-Bold',
                        fontSize: 20
                    }}
                >총개의 메일이 있습니다.</Text>
                {data.result.map((item, index) => (
                    <>
                        <View key={item.no} style={{marginLeft:2,}}>
                            <View style={{flexDirection:'row', marginHorizontal:17, alignItems:'center', }}>
                                <CheckBox
                                    disabled={false}
                                    value={toggleCheckBox.includes(item.no) ? true : false}
                                    onValueChange={(newValue) => handleSingleCheck(newValue, item.no)}
                                />
                                <Text 
                                    numberOfLines={2} 
                                    style={{
                                            color:'#000000', 
                                            marginLeft:DEVICE_WIDTH * 8,
                                            fontSize:16, 
                                            fontFamily:'NotoSansKR-Bold', 
                                            includeFontPadding:false,
                                    }}
                                > {item.title}</Text>
                            </View>
                            <Text style={{color:'#898D89', fontSize:16, marginLeft:DEVICE_WIDTH * 50}}>{item.sender}</Text>
                        </View>
                        <View style={{borderBottomWidth:1, borderBottomColor:'#c3c1c1', marginHorizontal:DEVICE_WIDTH *25}}></View>
                    </>
                    ))
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.main
    }
});

export default RestoreEmailScreen;