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
} from 'react-native';
import {
    Button,
} from 'teaset';
import {
    Actions,
} from 'react-native-router-flux';

export default class Mine extends Component {

  constructor(props) {
    super(props);
    this.state = {
        styles: StyleSheet.create({
            header:{
                height: px2dp(100),
                fontSize: FONT_SIZE(20),
                lineHeight: px2dp(100),
                backgroundColor: '#333333e3',
                color: '#fff',
                paddingLeft: px2dp(20),
            },
            container:{
                backgroundColor: '#fff',
                height:px2dp(1200),
            },
            logoutBtn:{
                marginTop:px2dp(20),
            },
        })
    };
  }

  render() {
    return (
        <View style={this.state.styles.container}>
            <Text style={this.state.styles.header}>聊天软件</Text>
            <Button type='primary' size='md' title='退出' style={this.state.styles.logoutBtn} onPress={() => Actions.Login()}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});