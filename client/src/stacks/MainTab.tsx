import React from 'react';
import { 
  View,
  StyleSheet,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './types';

import HomeScreen from '../screens/HomeScreen';
import RewardScreen from '../screens/RewardScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

import { COLORS, DEVICE_HEIGHT, DEVICE_WIDTH, FONTS } from '../constants/theme';

import Home from '../assets/icons/icon_home.svg';
import Tree from '../assets/icons/icon_tree.svg';
import Settings from '../assets/icons/icon_settings.svg';


const Tab = createBottomTabNavigator<MainTabParamList>()

function MainTab() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName='홈'
        // Tab Bar 크기 조정 
        screenOptions={{  
          tabBarLabelStyle:{fontSize:13, fontWeight:'500'},
          tabBarStyle: { 
            height:55,  
            borderTopWidth:0,
            backgroundColor: 'transparent',
            position: 'absolute',
            elevation: 0, 
          },
          tabBarActiveTintColor: '#8ABC88',
          tabBarInactiveTintColor: '#000000',
        }}
      >
        <Tab.Screen 
          name="홈" 
          component={HomeScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Home width={DEVICE_WIDTH * 26} height={DEVICE_WIDTH *26} fill='#8ABC88'/>
              )
            }}
          />
        <Tab.Screen 
          name="마이트리" 
          component={RewardScreen} 
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Tree width={DEVICE_WIDTH * 30} height={DEVICE_WIDTH *28} color={color}/>
              )
            }}
        />
        <Tab.Screen 
          name="설정" 
          component={MyProfileScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Settings width={DEVICE_WIDTH * 30} height={DEVICE_WIDTH *28} color={color}/>
              )
            }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
export default MainTab;