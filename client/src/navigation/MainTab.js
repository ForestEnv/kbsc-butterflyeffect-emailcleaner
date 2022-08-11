import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from '../navigation/HomeStack';
import RewardStack from '../navigation/RewardStack';
import MyProfileStack from '../navigation/MyProfileStack';

const Tab = createBottomTabNavigator();

function MainTab() {
    return (
        <View>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                />
                <Tab.Screen
                    name="Reward"
                    component={RewardStack}
                />
                <Tab.Screen
                    name="MyProfile"
                    component={MyProfileStack}
                />
            </Tab.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({})

export default MainTab;