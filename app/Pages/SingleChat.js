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
  ScrollView,
  FlatList,
} from 'react-native';
import {
  Input,
  Button,
  Popover,
  Label,
} from 'teaset';
import {
  Actions,
} from 'react-native-router-flux';

export default class SingleChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "请输入信息",
      chatHistory: [
        {key: "5",text: "test1", timeStamp: 1523257146633, owner: "mine"},
        {key: "1",text: "test2", timeStamp: 1523257146635, owner: "opposite"},
        {key: "6",text: "test3", timeStamp: 1523257146638, owner: "mine"},
        {key: "2",text: "test4", timeStamp: 1523257146639, owner: "opposite"},
        {key: "7",text: "dd", timeStamp: 1523257146640, owner: "mine"},
        {key: "3",text: "ff", timeStamp: 1523257146643, owner: "opposite"},
        {key: "8",text: "黄晓芳你最美了", timeStamp: 1523257146646, owner: "mine"},
        {key: "4",text: ".....", timeStamp: 1523257146650, owner: "opposite"},],
      styles: StyleSheet.create({
        container: {
          flex: 1,
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
        img: {
          width: px2dp(50),
          height: px2dp(50),
        },
        bottom: {
          flexDirection: 'row',
          height: px2dp(80),
          paddingLeft: px2dp(40),
          paddingRight: px2dp(40),
        },
        input: {
          width: px2dp(500),
          height: px2dp(80),
          marginRight: px2dp(30),
        },
        sendBtn: {
          height: px2dp(80),
        },
        chatFrame: {
          width: '100%',
          height: px2dp(600),
          marginBottom: px2dp(20),
        },
        singleFrame: {
          width: '80%',
          marginLeft: px2dp(20),
          marginTop: px2dp(20),
          flexDirection: 'row',
          alignItems: 'center',
          paddingRight: px2dp(60),
        },
        mineFrame: {
          paddingRight: 0,
          paddingLeft: px2dp(60),
          alignSelf: 'flex-end',
          justifyContent: 'flex-end',
          marginLeft: px2dp(20),
          marginRight: px2dp(20),
        },
        popOver: {
          padding: px2dp(16),
        },
        minePop: {
          backgroundColor: '#6ce26cd9',
        },
        userImg: {
          width: px2dp(80),
          height: px2dp(80),
          marginRight: px2dp(6),
        },
        mineImg: {
          marginRight: 0,
          marginLeft: px2dp(6),
        },
      }),
    };
  }

  render() {
    return (
      <View style={this.state.styles.container}>
        <View style={this.state.styles.header}>
          <TouchableOpacity onPress={Actions.pop}>
            <Image
              source={require('../Resources/images/back.png')}
              style={this.state.styles.img}
            />
          </TouchableOpacity>
          <Text style={this.state.styles.nickName}>{this.props.data.nickName}</Text>
        </View>
        <ScrollView style={this.state.styles.chatFrame}>
          <FlatList
            data={this.state.chatHistory}
            renderItem={({item}) => this.singlChat(item)}
          />
        </ScrollView>
        <View style={this.state.styles.bottom}>
          <Input style={this.state.styles.input} value={this.state.value}
                 onChangeText={text => this.setState({value: text})}/>
          <Button type='primary' size='md' title='发送' style={this.state.styles.sendBtn} onPress={() => {
            alert(this.state.value)
          }}/>
        </View>
      </View>
    );
  }

  singlChat(item) {
    return (
      <View>
        <View style={[this.state.styles.singleFrame, this.state.styles.mineFrame,item.owner === "opposite" ? {display:"none"} : {display:"flex"}]}>
          <Popover arrow='right' style={[this.state.styles.popOver, this.state.styles.minePop]}>
            <Label text={item.text} numberOfLines={100}/>
          </Popover>
          <Image
            source={require('../Resources/images/mine.jpg')}
            style={[this.state.styles.userImg, this.state.styles.mineImg]}
          />
        </View>
        <View style={[this.state.styles.singleFrame,item.owner === "mine" ? {display:"none"} : {display:"flex"}]}>
          <Image
            source={{uri: this.props.data.img}}
            style={this.state.styles.userImg}
          />
          <Popover arrow='left' style={this.state.styles.popOver}>
            <Label text={item.text} numberOfLines={100}/>
          </Popover>
        </View>
      </View>
    );
  }
}