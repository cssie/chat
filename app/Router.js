/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use: 路由文件
 */
import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Scene,
  Router,
  Reducer,
  Tabs,
  Stack,
  Lightbox,
} from 'react-native-router-flux';
import {Theme} from 'teaset';

import TabIcon from './Component/TabIcon';

import Home from './Pages/Home';
import AddressCard from './Pages/AddressCard';
import Mine from './Pages/Mine';
import SingleChat from './Pages/SingleChat';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    // console.log('ACTION:',action,Actions.currentScene)
    // console.log('Actions:', Actions);
    return defaultReducer(state, action);
  };
};

const getSceneStyle = () => ({
  backgroundColor: Theme.backgroundColor,
  // shadowOpacity: 1,
  // shadowRadius: 3,
});

const router = (...props) => (
  <Router createReducer={reducerCreate}
          getSceneStyle={getSceneStyle}
  >
    <Lightbox
      hideNavBar
    >
      <Stack hideNavBar headerMode='screen' key="root">
        <Tabs
          key="tabbar"                       // 唯一标识
          wrap={true}                        // 自动使用自己的导航栏包装每个场景
          showLabel={false}                  // 显示文字
          tabBarStyle={styles.tabBarStyle}   // tabBar的样式
          swipeEnabled={true}               // 是否可以滑动
          headerMode='screen'                // 页面切换方式
          icon={TabIcon}                     // 自定义Icon显示方式
          lazy={true}                        // 是否默认渲染tabbar
          tabBarPosition={'bottom'}          // tabbar在顶部还是底部，iOS默认顶部，安卓默认顶部
          activeBackgroundColor='white'      // 选中tabbar的背景色
          inactiveBackgroundColor='white'    // 未选中tabbar的背景色
          activeTintColor='#4ECBFC'          // 选中tabbar图标的颜色
          inactiveTintColor='#aaa'           // 未选中tabbar图标的颜色
        >
          <Stack key="Home"
                 hideNavBar
                 title={'聊 天'}
                 iconName={'wechat'}
                 selectedIcon={'wechat'}
          >
            <Scene component={Home} key="Home_key" initial={true}/>
            <Scene component={SingleChat} key="SingleChat"/>
          </Stack>
          <Stack key='AddressCard'
                 hideNavBar
                 title='通讯录'
                 iconName={'address-card'}
                 selectedIcon={'address-card'}
          >
            <Scene component={AddressCard} key="AddressCard_key"/>
          </Stack>
          <Stack key="Mine"
                 hideNavBar
                 title='我 的'
                 iconName={'user'}
                 selectedIcon={'user'}
          >
            <Scene component={Mine} key="Mine_key"/>
          </Stack>
        </Tabs>
        {/*// 推荐把需要的路由放在<Tabs/>后面，跳转的时候通过key，Actions.Test3_key*/}
        <Scene component={Mine} key="Mine_key"/>

      </Stack>

    </Lightbox>
  </Router>
);

export default router;

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
    height: 49,
  },
});



