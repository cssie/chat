/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use:
 */
import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import  io  from 'socket.io-client';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{key: '1', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '2', nickName: '小b', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '3', nickName: '小c', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '4', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '5', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '6', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '7', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '8', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '9', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '10', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
        {key: '11', nickName: '小a', latestContent: '上次我們聊到這裡啦', img: 'http://i.imgur.com/UePbdph.jpg'},
      ],
      title: '聊天软件'  ,
      styles: StyleSheet.create({
        header: {
          height: px2dp(100),
          fontSize: FONT_SIZE(20),
          lineHeight: px2dp(100),
          backgroundColor: '#333333e3',
          color: '#fff',
          paddingLeft: px2dp(20),
        },
        container: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
          marginBottom: px2dp(1),
          padding: px2dp(20),
        },
        imgStyle: {
          width: px2dp(80),
          height: px2dp(80),
        },
        rightContent: {
          flex: 1,
        },
        nickName: {
          fontSize: FONT_SIZE(16),
          marginBottom: px2dp(6),
          textAlign: 'left',
          paddingLeft: px2dp(16),
        },
        content: {
          textAlign: 'left',
          paddingLeft: px2dp(16),
        },
        list: {
          backgroundColor: '#F5FCFF',
          height: px2dp(1160),
        }
      }),
    };
  }

  componentDidMount(){
      var socket = io('http://192.168.43.171:3000/');
      socket.on('connect',function () {
          socket.emit('my', {hello: 'world'});
          console.log('122222')
      })
      console.log(socket);
  }

  render() {
    return (
      <View>
        <Text style={this.state.styles.header}>{this.state.title}</Text>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderchat(item)}
          style={this.state.styles.list}
        />
      </View>
    );
  }

  renderchat(data) {
    return (
      <TouchableNativeFeedback onPress={() => {Actions.SingleChat({'data':data})}}>
        <View style={this.state.styles.container}>
          <Image
            source={{uri: data.img}}
            style={this.state.styles.imgStyle}
          />
          <View style={this.state.styles.rightContent}>
            <Text style={this.state.styles.nickName}>{data.nickName}</Text>
            <Text style={this.state.styles.content}>{data.latestContent}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }
}