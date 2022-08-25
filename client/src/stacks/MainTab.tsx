import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';

import HomeScreen from '../screens/HomeScreen';
import RewardScreen from '../screens/RewardScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>()

function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
      <Tab.Screen name="Reward" component={RewardScreen} options={{headerShown: false}}/>
      <Tab.Screen name="MyProfile" component={MyProfileScreen}/>
    </Tab.Navigator>
  )
}

export default MainTab;