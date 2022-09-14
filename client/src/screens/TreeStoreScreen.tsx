import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity,
    StatusBar,
    Image,
    FlatList
} from 'react-native';

import { RootStackNavigationProp } from '../stacks/types';
import { useNavigation } from '@react-navigation/native';

import Plus from '../assets/icons/icon_plus.svg';

import {COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS} from '../constants/theme';

const data = [
    {id:0, title:'블루베리 묘목', image: require('../assets/images/tree_blueberry.png'), price:'38,000'},
    {id:1, title:'오랜지 묘목', image: require('../assets/images/tree_orange.png'), price:'43,250'},
    {id:2, title:'자두 묘목', image: require('../assets/images/tree_jadu.png'), price:'25,000'},
    {id:3, title:'대추 묘목', image: require('../assets/images/tree_daechu.png'), price:'4,000'},
    {id:4, title:'배롱나무 묘목', image: require('../assets/images/tree_tropical.png'), price:'9,500'},
    {id:5, title:'무화과나무 묘목', image: require('../assets/images/tree_baerong.png'),price:'9,800'},
    {id:6, title:'키위나무 묘목', image: require('../assets/images/tree_yolo.png'), price:'25,800'},
    {id:7, title:'복숭아나무 묘목', image: require('../assets/images/tree_peach.png'), price:'60,000'}
]

function TreeStoreScreen() {
    return(
        <View style={styles.container}>
            <View style={[styles.info, styles.shadow]}>
                <Text style={{color:'#000000', fontSize:16, fontFamily:'NotoSansKR-Regular', position:'absolute', left:3, top:2 }}>🏆현탁님의 마일리지</Text>
                <Text style={{color:'#000000', fontSize:30, fontFamily:'NotoSansKR-Bold', includeFontPadding:false, position:'absolute', left:10, bottom:3}}>2195P</Text>
            </View>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={item => `${item.id}`}
                renderItem={({item, index}) => (
                    <>
                        <View style={[styles.treeBox, styles.shadow]}>
                            <Image source={item.image} style={styles.image}/>
                            <View style={{marginLeft: DEVICE_WIDTH * 20, marginTop: DEVICE_HEIGHT * 10}}>
                                <Text style={{fontFamily: 'NotoSansKR-Bold', color:'#000000', lineHeight:20}}>{item.title}</Text>
                                <Text style={{fontFamily: 'NotoSansKR-Medium', color:'#000000', lineHeight:20}}>{item.price}P</Text>
                                <TouchableOpacity style={{position:'absolute', right:10, bottom:2}}>
                                    <Plus/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            />
        </View>
    );
} 

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.main
    },
    info:{
        width: DEVICE_WIDTH * 145,
        height: DEVICE_HEIGHT * 73,
        marginTop: DEVICE_WIDTH * 65,
        marginLeft: DEVICE_WIDTH * 20,
        alignItems:'center',
        padding:10,
        justifyContent:'center',
        borderRadius: 15,
        backgroundColor: '#FFF9F9',
    },
    treeBox:{
        marginTop: DEVICE_HEIGHT * 30,
        marginLeft: DEVICE_WIDTH * 15,
        width: DEVICE_WIDTH * 156,
        height: DEVICE_HEIGHT * 202,
        borderRadius: 20,
        backgroundColor: COLORS.white,
    },
    image:{
        marginLeft: DEVICE_WIDTH * 35,
        marginTop: DEVICE_HEIGHT * 30,
        height: DEVICE_HEIGHT * 115,
        
    },
    shadow:{
        elevation:59,
    },
});

export default TreeStoreScreen;