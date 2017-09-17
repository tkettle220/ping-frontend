import React, { Component } from 'react';
import { AppRegistry, View, Image, Button, TouchableHighlight, StyleSheet, Text } from 'react-native';
import FBLoginMock from '../FBLoginMock';

import BackgroundGeolocation from "react-native-background-geolocation";
import {PushNotificationIOS} from "react-native";

import API from '../api';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token: null,
      user_id: null,
      friends: {},
      check_pings: null,
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
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
    }, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      BackgroundGeolocation.watchPosition(
        this.onLocation,
        (error) => console.error(error),
        {interval: 5000, persist: false}
      );

      if (!state.enabled) {
          BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });
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
    API.updateLocation(this.state.session_token, location.coords);
  }

  onPingsReceived = (ping_list) => {
    ping_list.map((ping) => PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date().toISOString(),
      alertBody:  `${this.state.friends[ping.from].name} pinged you. He is at ${ping.location.lat}, ${ping.location.lng}.`
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user_id) {
      this.state.check_pings = setInterval(async () => {
        let resp = await API.getPings(this.state.session_token);
        console.warn(JSON.stringify(resp));
        this.onPingsReceived(resp);
      }, 10000);
      this.props.navigator.push({
        screen: 'ping.FriendlistScreen',
        backButtonHidden: true,
        passProps: {
          friends: this.state.friends,
          session_token: this.state.session_token,
        },
        navigatorStyle: {
          disabledBackGesture: true,
        }
      });
    } else {
      clearInterval(this.state.check_pings);
      this.state.check_pings = null;
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#8e44ad'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{color: '#ecf0f1', fontSize: 50, textAlign: 'center', margin: 40}}>ping</Text>
        </View>
        <View style={{flex: 1, marginLeft: 40, marginRight: 40}}>
          <FBLoginMock setSession={(state) => this.setState(state)}/>
        </View>
      </View>
    );
  }
}
