/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use: 入口文件
 */

import React, {Component} from 'react';
import Router from './app/Router';
import './app/Common/Global';

export default class App extends Component {
  render() {
    return (
      <Router/>
    );
  }
}