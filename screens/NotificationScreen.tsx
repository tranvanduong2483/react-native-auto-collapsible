import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {}
interface State {}
export default class NotificationScreen extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the NotificationScreen component</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
