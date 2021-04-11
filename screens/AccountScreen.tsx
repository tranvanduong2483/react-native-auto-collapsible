import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
interface Props {}
interface State {}
export default class AccountScreen extends Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <Text>I'm the AccountScreen component</Text>
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
