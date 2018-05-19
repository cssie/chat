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
  ScrollView,
  FlatList,
  Image,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import {
    Actions,
} from 'react-native-router-flux';
export default class AddressCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
        data:[{key: '1', nickName: '测试用户', latestContent: '上次我們聊到這裡啦',chats:[{
                "fromid" : "1",
                "toid" : "2",
                "text" : "test",
                "timeStamp" : ""+ new Date().getTime(),
                "messageSucceed" : true
            }]
        }],
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
            friends:{
                height:px2dp(600),
            },
            singleFriend:{
                flexDirection: 'row',
                height: px2dp(120),
                alignItems: 'center',
                borderBottomColor: '#eee',
                borderBottomWidth: px2dp(2),
            },
            img:{
                width:px2dp(80),
                height:px2dp(80),
                paddingLeft:px2dp(10),
                marginRight:px2dp(20),
            },
        })
    };
  }

  componentWillMount(){
      let count = 0;
      DeviceEventEmitter.addListener('getData',(res)=>{
          count++;
          if(count === 1){
              console.log(res)
              this.setState({data:res})
          }
      })
  }

  render() {
      console.log(this.state)
    return (
      <View style={this.state.styles.container}>
          <Text style={this.state.styles.header}>聊天软件</Text>
          <ScrollView style={this.state.styles.friends}>
              <FlatList
                  data={this.state.data}
                  renderItem={({item}) => this.friend(item)}
              />
          </ScrollView>
      </View>
    );
  }
    friend(item){
      return(
          <TouchableOpacity onPress={() => {Actions.SingleChat({'data':item})}}>
              <View style={this.state.styles.singleFriend}>
                  <Image
                      source={require('../Resources/images/to.jpg')}
                      style={[this.state.styles.img]}
                  />
                  <Text>{item.nickName}</Text>
              </View>
          </TouchableOpacity>
      )
    }
}