import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {}
interface State {}
export default class MyComponent extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the MyComponent component</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
