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
    Toast
} from 'teaset';
import {
  Actions,
} from 'react-native-router-flux';
import io from "socket.io-client";

console.ignoredYellowBox = [ 'Setting a timer' ];

export default class SingleChat extends Component {

  constructor(props) {
    super(props);
    this.state = {
        message: "",
        id: "",
      chatHistory: [],
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
          paddingBottom: px2dp(80),
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

    componentDidMount(){
        const socket = io(ip);
        socket.on('connect',function () {
            console.log('连接得到');
        })
        this.socket = socket
        let self = this;
        this.socket.on('sendMessage',function (data) {
            if(data.toID === self.state.id){
                console.log('我收到了你的信息了',data.message)
                self.setState({chatHistory:[...self.state.chatHistory,{key: ""+ new Date().getTime(),text: data.message, owner: self.props.data.nickName}]});
            }
        })

        function getProps() {
            if(self.props.data.chats){
                let chatHistory = [];
                let id = "";
                for(let i = 0;i<self.props.data.chats.length;i++){
                    let owner = "mine";
                    if(self.props.data.chats[i].fromid === self.props.data.key){
                        owner = self.props.data.nickName;
                        id = self.props.data.chats[i].toid;
                    } else {
                        id = self.props.data.chats[i].fromid;
                    }
                    chatHistory.push({key: self.props.data.chats[i].timeStamp,text: self.props.data.chats[i].text, owner: owner})
                }
                self.setState({chatHistory:chatHistory,id:id})
            } else {
                setTimeout(function () {
                    getProps()
                },3000)
            }
        }
        getProps()

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
          <Input style={this.state.styles.input}
                 value={this.state.message}
                 onChangeText={text => this.setState({message: text})}
                 placeholder ="请输入内容"
          />
          <Button type='primary' size='md' title='发送' style={this.state.styles.sendBtn} onPress={() => this.sendMessage()}/>
        </View>
      </View>
    );
  }

  singlChat(item) {
    return (
      <View>
        <View style={[this.state.styles.singleFrame, this.state.styles.mineFrame,item.owner === this.props.data.nickName ? {display:"none"} : {display:"flex"}]}>
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
            source={require('../Resources/images/to.jpg')}
            style={this.state.styles.userImg}
          />
          <Popover arrow='left' style={this.state.styles.popOver}>
            <Label text={item.text} numberOfLines={100}/>
          </Popover>
        </View>
      </View>
    );
  }

  sendMessage(){
      if(this.socket){
          let self = this;
          this.socket.emit('requestMessage', {fromID: this.state.id,toID:this.props.data.key,message:this.state.message });
          this.setState({chatHistory:[...this.state.chatHistory,{key: ""+ new Date().getTime(),text: this.state.message, owner: "mine"}]},()=>{
              fetch(ip + 'sendMessage',{
                  method: 'POST',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                  },body: JSON.stringify({
                      fromid: self.state.id,
                      toid: self.props.data.key,
                      text: self.state.message
                  })
              })
                  .then((response) => response.json())
                  .then((responseJson) => {
                      if(responseJson.status){
                          console.log(self.state,'发送成功')
                      } else {
                      }
                  })
                  .catch((error) => {
                      console.error(error);
                  });
              self.setState({message:""})
              self.socket.emit('sendSuccess')
          })} else {
              alert('socket断掉啦')
          }
  }
}