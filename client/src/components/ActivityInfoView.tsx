import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
} from 'react-native';

import DeleteEmailCountBox from './DeleteEmailCountBox';
import CarbonInfoBox from './CarbonInfoBox';
import AddEmailCountBox from './AddEmailCountBox';
import DeleteInfoBox from './DeleteInfoBox';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

interface ScreenStateProps {
    homeScreenState: boolean;
}

interface DeleteEmailCountProp {
    deleteEmailCount: number;
};

function ActivityInfoView(homeScreenState: ScreenStateProps) {
    console.log("자식 상태", homeScreenState);
    if(homeScreenState.homeScreenState){console.log('wow')}
    else{console.log('fuck')}
    return(
        <>
            {homeScreenState.homeScreenState ? (
                <View style={styles.container}>
                    <DeleteEmailCountBox/>
                    <CarbonInfoBox/>
                </View>
            ) : (
                <DeleteInfoBox/>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginTop: DEVICE_HEIGHT * 20,
    },
    
});
export default ActivityInfoView;