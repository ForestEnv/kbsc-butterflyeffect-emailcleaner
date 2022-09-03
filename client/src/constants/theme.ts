import { Dimensions } from "react-native";

export const COLORS = {
    main: '#FFF9F9',
    subOne:'#B6E3B5',
    subTwo:'#8ABC88',
    white: '#FFFFFF',
    lofi:'#ECE6E6'
}

export const FONTS = {
    medium: 16,
    regular: 20,
    mailAddress: 16,
    mailCount: 48,
    info: 15,
}

//피그마 스크린 사이즈 : Android Small
export const BASIC_DIMENSIONS = {
    height: 640,
    width: 360,
};

//높이 변환
export const DEVICE_HEIGHT : any = (
    Dimensions.get('screen').height * 
    (1 / BASIC_DIMENSIONS.height)
).toFixed(2);

//넓이 변환
export const DEVICE_WIDTH : any = (
    Dimensions.get('screen').width * 
    (1 / BASIC_DIMENSIONS.width)
).toFixed(2);