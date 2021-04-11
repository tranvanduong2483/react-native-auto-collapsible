/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Animated, View} from 'react-native';
import * as Styles from '../theme/Style';
const styles = Styles.appStyles;

const MARGIN = 30; //Khoảng cách để kích hoạt hiển thị bottom tab

interface Props {
  navigation: any;
}
interface State {}
export default class Feature2 extends Component<Props, State> {
  scroll = new Animated.Value(0);
  diffY: Animated.AnimatedDiffClamp;
  isShowingBottomTab: boolean = true;

  constructor(props: Props) {
    super(props);
    this.diffY = Animated.diffClamp(this.scroll, 0, 2 * MARGIN);
  }

  setTabBarVisible = (isShow: boolean) => {
    if (this.isShowingBottomTab === isShow) {
      return;
    }
    this.isShowingBottomTab = isShow;
    this.props.navigation?.dangerouslyGetParent()?.setOptions({
      tabBarVisible: isShow,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Animated.ScrollView
          style={styles.scrollViewContainer}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.scroll}}}],
            {
              useNativeDriver: false,
              listener: () => {
                this.setTabBarVisible(this.diffY.__getValue() < MARGIN);
              },
            },
          )}
          bounces={false}>
          <View style={[styles.viewItem, {backgroundColor: 'red'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'lawngreen'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'yellow'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'orange'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'red'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'yellow'}]} />
        </Animated.ScrollView>
      </View>
    );
  }
}
