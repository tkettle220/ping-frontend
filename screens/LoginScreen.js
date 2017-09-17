import React, { Component } from 'react';
import { AppRegistry, View, Image, Button, TouchableHighlight, StyleSheet, Text } from 'react-native';
import FBLoginMock from '../FBLoginMock';

import BackgroundGeolocation from "react-native-background-geolocation";
const API_URL = 'https://gentle-anchorage-13426.herokuapp.com/api/';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session_token: null,
      user_id: null,
      friends: {},
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.user_id) {
      this.props.navigator.push({
        screen: 'ping.FriendlistScreen',
        backButtonHidden: true,
        passProps: {
          friends: this.state.friends,
        },
        navigatorStyle: {
          disabledBackGesture: true,
        }
      });
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
