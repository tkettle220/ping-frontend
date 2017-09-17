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

import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
import {PushNotificationIOS} from "react-native";

PushNotificationIOS.requestPermissions();
registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'ping.LoginScreen', // unique ID registered with Navigation.registerScreen
    title: 'Welcome', // title of the screen as appears in the nav bar (optional)
    navigatorStyle: {navBarHidden: true, disabledBackGesture: true}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});


/*

export default class ping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token: null,
      user_id: null,
      friends: null
    };
  }

  componentWillMount() {
    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      distanceFilter: 1,
      // Activity Recognition
      stopTimeout: 5,
      stopDetectionDelay: 10 ,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      BackgroundGeolocation.watchPosition(
        this.onLocation,
        (error) => console.error(error),
        {interval: 10, persist: false}
      );


      if (!state.enabled) {
          BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
  }

  checkForPings = async () => {
    try {
      let response = await fetch(API_URL + 'location', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
          session_token: this.state.session_token
        })
      });
      let responseJSON = await response.json();
      console.warn(JSON.stringify(responseJSON));
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.stopWatchPosition();
  }


  onLocation = (location) => {
    console.log('- [js]location: ', JSON.stringify(location));
    if (!this.state.user_id) return;
    console.log('sending');
    this.updateLocation(location.coords);
  }

  updateLocation = async (location) => {
    try {
      let response = await fetch(API_URL + 'location', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: location.latitude,
          lng: location.longitude,
          session_token: this.state.session_token
        })
      });
      let responseJSON = await response.json();
      console.warn(JSON.stringify(responseJSON));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.column}>
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
*/
