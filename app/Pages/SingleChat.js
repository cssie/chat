/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use:
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
} from 'teaset';
import {
  Actions,
} from 'react-native-router-flux';

export default class SingleChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      styles: StyleSheet.create({
        container: {
          flex:1,
          backgroundColor: '#fff',
        },
        header: {
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#333333e3',
          paddingLeft: px2dp(20),
          height: px2dp(100),
        },
        nickName: {
          fontSize: FONT_SIZE(20),
          height: px2dp(100),
          lineHeight: px2dp(100),
          color: '#fff',
          paddingLeft: px2dp(20),
        },
        back: {
          width: px2dp(50),
          height: px2dp(50),
        },
        bottom: {
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          height: px2dp(100),
        }
      }),
    };
  }

  render() {
    console.log(global.Images)
    return (
      <View style={this.state.styles.container}>
        <View style={this.state.styles.header}>
          <TouchableOpacity onPress={Actions.pop}>
            <Image
              source={require('../Resources/images/back.png')}
              style={this.state.styles.back}
            />
          </TouchableOpacity>
          <Text style={this.state.styles.nickName}>{this.props.data.nickName}</Text>
        </View>
        <View>

        </View>
        <View style={this.state.styles.bottom}>
          <Input style={{width: 200}} />
        </View>
      </View>
    );
  }
}