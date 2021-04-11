/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  PanResponder,
  PanResponderInstance,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import * as Styles from '../theme/Style';
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const styles = Styles.appStyles;

const PULL_SHOW_SEARCH_VIEW_MARGIN = 100; //Khoảng cách để kích hoạt hiển thị search view
const PULL_SHOW_BOTTOM_TAB_MARGIN = 10; //Khoảng cách để kích hoạt hiển thị bottom tab

const TEXT_INPUT_MARGIN_TOP = 30;

interface Props {}
interface State {}
export default class Feature1_2Screen extends Component<Props, State> {
  //searchview config
  inputRef: React.RefObject<TextInput> = React.createRef();
  searchViewOpacity: Animated.Value = new Animated.Value(0);
  blueViewTranslateY: Animated.Value = new Animated.Value(0);
  isShowSearchView: boolean = false;
  panResponder: PanResponderInstance;
  scrollOnTop: boolean = true;

  //bottomTab config
  scroll = new Animated.Value(0);
  diffY: Animated.AnimatedDiffClamp;
  isShowingBottomTab: boolean = true;

  constructor(props: Props) {
    super(props);

    //searchview
    this.panResponder = this.createPanResponder();

    //bottom tab
    this.diffY = Animated.diffClamp(
      this.scroll,
      0,
      2 * PULL_SHOW_BOTTOM_TAB_MARGIN,
    );
  }
  createPanResponder = (): PanResponderInstance => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!this.isShowSearchView && gestureState.dy <= 0) {
          return false;
        }

        if (gestureState.dy === 0 && gestureState.dx === 0) {
          return false;
        }

        return this.scrollOnTop;
      },
      onPanResponderMove: (_, gestureState) => {
        const {dy} = gestureState;
        let opacity;

        //Chưa vuốt
        if (dy === 0) {
          return;
        }

        //Vuốt xuống dy
        if (dy > 0) {
          opacity = dy / PULL_SHOW_SEARCH_VIEW_MARGIN;
          //Nếu searchview ở trạng thái ẩn thì áp dụng opacity tăng dần 0->(dy/MARGIN)
          if (!this.isShowSearchView) {
            this.searchViewOpacity.setValue(opacity);
          } else {
            //Nếu searchview ở trạng thái hiện thì dịch chuyển view xanh (giống ios) 0.5*dy
            this.blueViewTranslateY.setValue(0.5 * dy);
          }
          return;
        }

        //Vuốt lên |dy|
        if (dy < 0) {
          opacity =
            -dy / PULL_SHOW_SEARCH_VIEW_MARGIN > 1
              ? 0
              : 1 + dy / PULL_SHOW_SEARCH_VIEW_MARGIN;
          //Nếu searchview ở trạng thái hiện thì áp dụng opacity tiến về 0
          if (this.isShowSearchView) {
            // Ẩn bàn phím nếu có vuốt lên trong trường hợp đang mở searchview (this.isShowSearchView === true)
            this.inputRef.current?.blur();
            this.searchViewOpacity.setValue(opacity);
          }
          return;
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const {dy} = gestureState;
        if (this.isShowSearchView) {
          Animated.timing(this.blueViewTranslateY, {
            duration: 500,
            toValue: 0,
            useNativeDriver: false,
            easing: Easing.elastic(0.8),
          }).start();
        }

        if (dy > PULL_SHOW_SEARCH_VIEW_MARGIN && dy > 0) {
          this.showSearchView();
          this.inputRef.current?.focus();
          return;
        }

        if (
          dy < 0 ||
          (dy > 0 &&
            dy <= PULL_SHOW_SEARCH_VIEW_MARGIN &&
            !this.isShowSearchView)
        ) {
          this.hideSearchView();
          return;
        }
      },
      onPanResponderTerminate: () => {
        this.showSearchView();
        this.inputRef.current?.focus();
      },
    });
  };
  showSearchView = (animationTime = 500) => {
    this.isShowSearchView = true;
    Animated.timing(this.searchViewOpacity, {
      duration: animationTime,
      toValue: 1,
      useNativeDriver: false,
      easing: Easing.elastic(0.8),
    }).start();
  };

  hideSearchView = (animationTime = 300) => {
    this.isShowSearchView = false;
    Animated.timing(this.searchViewOpacity, {
      duration: animationTime,
      toValue: 0,
      useNativeDriver: false,
      easing: Easing.out(Easing.exp),
    }).start();
  };

  //bottom tab
  setTabBarVisible = (isShow: boolean) => {
    if (this.isShowingBottomTab === isShow) {
      return;
    }
    this.isShowingBottomTab = isShow;
    this.props.navigation?.dangerouslyGetParent()?.setOptions({
      tabBarVisible: isShow,
    });
  };

  onPress = () => {
    //[option] ẩn searchview
    this.hideSearchView();

    //[option]
    this.inputRef.current?.blur();

    //xử lí onPress
    // {
    //   ex. navigate đến các navigator.screen khác
    // }
  };

  _renderSearchView = () => (
    <Animated.View
      style={[
        styles.searchViewContainer,
        {
          opacity: this.searchViewOpacity,
          transform: [
            {
              translateX: this.searchViewOpacity.interpolate({
                inputRange: [0, 0.005, 0.01, 1],
                outputRange: [SCREEN_WIDTH, SCREEN_WIDTH, 0, 0],
              }),
            },
          ],
        },
      ]}>
      <Animated.View
        style={{
          opacity: this.searchViewOpacity.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 1, 1],
          }),
          transform: [
            {
              translateY: this.searchViewOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, TEXT_INPUT_MARGIN_TOP],
              }),
            },
          ],
        }}>
        <TextInput
          ref={this.inputRef}
          style={styles.input}
          placeholder="Nhập từ khoá để tìm kiếm"
        />

        <Animated.View
          style={[
            styles.blueView,
            {
              transform: [
                {
                  translateY: this.blueViewTranslateY,
                },
              ],
            },
          ]}>
          <Text style={styles.textInSearchView}>
            Đây là nội dung trong view Xanh
          </Text>
          <Text style={styles.textInSearchView}>
            View Xanh, TextInput là con của view đỏ
          </Text>
          <TouchableHighlight style={styles.button} onPress={this.onPress}>
            <Text>Ẩn search view</Text>
          </TouchableHighlight>

          <Text style={styles.textInSearchView}>
            Kéo lên để đóng search view
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  _renderContent = () => {
    const contentTranslateY = this.searchViewOpacity.interpolate({
      //content dịch chuyển Y theo khi kích hoạt searchview (giống ios)
      inputRange: [0, 1],
      outputRange: [0, 70],
    });

    const contentScaleX = this.searchViewOpacity.interpolate({
      //content co lai 1->0.95 theo khi kích hoạt searchview (giống ios)
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });
    return (
      <Animated.ScrollView
        style={styles.scrollViewContainer}
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 70, paddingBottom: 100}}
        // onScroll={this.handleScroll}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: this.scroll}}}],
          {
            useNativeDriver: false,
            listener: event => {
              //searchview
              this.handleScroll(event);
            },
          },
        )}
        bounces={false}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: contentTranslateY,
              },
              {scaleX: contentScaleX},
            ],
          }}>
          <View style={[styles.viewItem, {backgroundColor: 'lawngreen'}]}>
            <Text style={styles.contentText}>
              Khi scroll vị trí 0, kéo xuống để mở search view (feature 2)
            </Text>
          </View>
          <View style={[styles.viewItem, {backgroundColor: 'yellow'}]}>
            <Text style={styles.contentText}>
              Kéo lên/xuống để ẩn/hiện bottom tab (feature 1)
            </Text>
          </View>
          <View style={[styles.viewItem, {backgroundColor: 'orange'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'white'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'yellow'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'red'}]} />
          <View style={[styles.viewItem, {backgroundColor: 'pink'}]} />
        </Animated.View>
      </Animated.ScrollView>
    );
  };

  handleScroll = (event: any) => {
    this.scrollOnTop = event.nativeEvent.contentOffset.y <= 0;

    //bottom tab
    this.setTabBarVisible(
      this.diffY.__getValue() < PULL_SHOW_BOTTOM_TAB_MARGIN || this.scrollOnTop, //scroll đang ở top thì buộc phải hiển thị bottom tab
    );
  };

  render() {
    return (
      <View style={styles.container} {...this.panResponder.panHandlers}>
        {this._renderSearchView()}
        {this._renderContent()}
      </View>
    );
  }
}
