/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { FBLogin, FBLoginManager } from 'react-native-facebook-login';
import FBLoginMock from './FBLoginMock';

export default class ping extends Component {
  render() {
    return (
      <View style={styles.column}>
        <FBLoginMock />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

AppRegistry.registerComponent('ping', () => ping);
