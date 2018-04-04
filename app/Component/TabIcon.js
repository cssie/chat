/**
 *@ time: 2018/3/28
 *@ author: 二 白
 *@ use: 标签组件
 */
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const TabIcon = (props) => {
  return (
    <View style={styles.tabIconStyle}>

      <Icon name={!props.focused ? props.iconName : props.selectedIcon}
            size={27}
            color={props.tintColor}/>

      <Text
        style={{
          color: props.tintColor,
          fontSize: FONT_SIZE(10)
        }}
      >
        {props.title}
      </Text>
    </View>
  )
};

export default TabIcon;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
