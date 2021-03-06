/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use: 全局变量
 */
import React, {Component} from 'react';
import {Dimensions, PixelRatio, Platform} from 'react-native';

// 项目中的图片可以通过Images.xxx 获取
import {Images} from '../Resources/index';

// 图片加载
global.Images = Images;

// 通过系统API获得屏幕宽高
let {height, width} = Dimensions.get('window');

// 处理安卓，iOS字体不同的类，使用方法 fontSize:FONT_SIZE(20)
import FontSize from './FontSize';

// 处理安卓，iOS宽高的区别，使用方法 width:px2dp(20)
import {px2dp} from './Tool';

// 系统是iOS
global.iOS = (Platform.OS === 'ios');

// 系统是安卓
global.Android = (Platform.OS === 'android');

// 获取屏幕宽度
global.SCREEN_WIDTH = width;

// 获取屏幕高度
global.SCREEN_HEIGHT = height;

// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();

// 最小线宽
global.pixel = 1 / PixelRatio;

// 适配字体
global.FONT_SIZE = FontSize;

// 屏幕适配
global.px2dp = px2dp;

//ip地址
global.ip = 'http://192.168.43.171:3000/'

