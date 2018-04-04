/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use: 工具类
 */
import {
  Platform
} from 'react-native';
// 设计图上的比例，宽度
let basePx = Platform.OS === 'ios' ? 750 : 720;

exports.px2dp = function px2dp(px: number): number {
  return px / basePx * SCREEN_WIDTH;
};