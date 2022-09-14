import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
    CompositeNavigationProp,
    NavigatorScreenParams,
    RouteProp,
} from '@react-navigation/core';
import { NativeStackNavigationProp,} from '@react-navigation/native-stack';

/* MainTab */
export type MainTabParamList = {
    홈: undefined;
    마이트리: undefined;
    설정: undefined;
}
export type MainTabNavigationScreenParams = NavigatorScreenParams<MainTabParamList>;
export type MainTabNavigationProp = CompositeNavigationProp<
    RootStackNavigationProp,
    BottomTabNavigationProp<MainTabParamList>
>;
export type MainTabRouteProp = RouteProp<RootStackParamList, 'MainTab'>;

/* RootStack */
export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    Register: undefined;
    Connection: undefined;
    ConnectionPw: {
        email:string;
    };
    MainTab: MainTabNavigationScreenParams;
    Restore: undefined;
    TreeStore: {
        miles: number;
    };
};

export type ConnectionPwRouteProp =  RouteProp<RootStackParamList, 'ConnectionPw'>;
export type TreeStoreProp = RouteProp<RootStackParamList, 'TreeStore'>;

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;