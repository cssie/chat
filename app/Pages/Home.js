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
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import  io  from 'socket.io-client';


export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{key: '1', nickName: '测试用户', latestContent: '上次我們聊到這裡啦',chats:[{
              "fromid" : "1",
              "toid" : "2",
              "text" : "test",
              "timeStamp" : ""+ new Date().getTime(),
              "messageSucceed" : true
      }]},
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
      console.log(this)
      let self = this;
      function getData(){
          fetch(ip + 'all',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },body: JSON.stringify({
                  owner: self.props.data
              })
          })
              .then((response) => response.json())
              .then((responseJson) => {
                  if(responseJson.friends){
                      for(let i=0;i<responseJson.friends.length;i++){
                          let latestChat = "";
                          let chat = [];
                          for(let j =0;j<responseJson.chats.length;j++){
                              if(responseJson.friends[i].id === responseJson.chats[j].fromid || responseJson.friends[i].id === responseJson.chats[j].toid){
                                  latestChat = responseJson.chats[j].text;
                                  chat.push(responseJson.chats[j])
                              }
                          }
                          self.setState({data:[...self.state.data,{key: responseJson.friends[i].id, nickName: responseJson.friends[i].name, latestContent: latestChat,chats:chat}]},()=>{
                              setInterval(function () {
                                  DeviceEventEmitter.emit('getData',self.state.data);
                              },2000)
                          })
                      }
                  }else{
                      setTimeout(function () {
                          getData()
                      },3000)
                  }
              })
              .catch((error) => {
                  console.error(error);
              });
      }
      getData()
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
      <TouchableOpacity onPress={() => {Actions.SingleChat({'data':data})}}>
        <View style={this.state.styles.container}>
          <Image
              source={require('../Resources/images/to.jpg')}
            style={this.state.styles.imgStyle}
          />
          <View style={this.state.styles.rightContent}>
            <Text style={this.state.styles.nickName}>{data.nickName}</Text>
            <Text style={this.state.styles.content}>{data.latestContent}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}