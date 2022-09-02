import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

import {COLORS, DEVICE_WIDTH, DEVICE_HEIGHT} from '../constants/theme';

console.log("디바이스 높이:", DEVICE_HEIGHT* 70);
console.log("디바이스 너비:", DEVICE_WIDTH );

function RewardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={[styles.info, styles.shadow]}>
          <Text>님의 마일리지</Text>
        </View>
        <View style={[styles.info, styles.shadow]}>
          <Text>님의 감소시킨 탄소량</Text>
        </View>
      </View>
        <View>
          <Text>현재 회원들의 디지털 탄소 중립 활동을 확인해 보세요</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems:'center',
    backgroundColor: COLORS.main
  },
  box:{
    flexDirection:'row',
    marginTop: DEVICE_HEIGHT * 6,
  },
  info:{
    width: DEVICE_WIDTH * 136,
    height: DEVICE_HEIGHT * 73,
    marginHorizontal: DEVICE_WIDTH * 15,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 15,
  },
  shadow:{
    shadowColor:'#000',
    shadowOffset:{
        width:10,
        height:10,
    },
    shadowOpacity: 0.89,
    shadowRadius:10.84,
    elevation:15,
}
})

export default RewardScreen;