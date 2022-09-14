import React, { 
    useEffect, 
    useState,  
} from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar,
    ScrollView
} from 'react-native';

const classification = [
    {id:1, sort:'광고'},
    {id:2, sort:'뉴스레터'},
    {id:3, sort:'알림'},
    {id:4, sort:'개인'},
]

function CountEmailClassification() {
    return(
        <View>
            <Text>hello!</Text>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default CountEmailClassification;