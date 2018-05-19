import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    Input,
    Button,
    Toast,
} from 'teaset'
import {
    Actions,
} from 'react-native-router-flux';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            password:"",
            styles: StyleSheet.create({
                header: {
                    height: px2dp(100),
                    fontSize: FONT_SIZE(20),
                    lineHeight: px2dp(100),
                    backgroundColor: '#333333e3',
                    color: '#fff',
                    paddingLeft: px2dp(20),
                },
                container:{
                    width: px2dp(800),
                    height: px2dp(1400),
                    backgroundColor: '#fff',
                },
                viewContainer:{
                    width:"60%",
                    marginLeft:"15%",
                    padding: "10%",
                },
                inputStyle:{
                    marginTop:px2dp(20),
                },
                loginBtn:{
                    marginTop:px2dp(20),
                },
            }),
        };
    }

    render() {
        return (
            <View style={this.state.styles.container}>
                <Text style={this.state.styles.header}>聊天软件</Text>
                <View style={this.state.styles.viewContainer}>
                    <Input size='md'
                           value={this.state.name}
                           maxLength = {10}
                           placeholder ="请输入名字"
                           onChangeText={text => this.setState({name: text})}
                           style={this.state.styles.inputStyle}/>
                    <Input size='md'
                           value={this.state.password}
                           maxLength = {10}
                           placeholder ="请输入密码"
                               onChangeText={text => this.setState({password: text})}
                           style={this.state.styles.inputStyle}/>
                    <Button type='primary' size='md' title='登录' style={this.state.styles.loginBtn} onPress={() => this.login()}/>
                    <Button type='primary' size='md' title='注册' style={this.state.styles.loginBtn} onPress={() => this.regist()}/>
                </View>
            </View>
        );
    }

    login(){
        fetch(ip + 'login',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status){
                    Actions.Home({'data':this.state.name})
                } else {
                    if(responseJson.message === ''){
                        Toast.message('密码错误');
                    }else{
                        Toast.message(responseJson.message);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    regist(){
        fetch(ip + 'regist',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },body: JSON.stringify({
                name: this.state.name,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.status){
                    Toast.message('注册成功，请登录');
                } else {
                    Toast.message('注册失败，请稍后再试');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
}