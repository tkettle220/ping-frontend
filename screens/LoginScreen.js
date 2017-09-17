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
      pro_pic_url: null,
      location: {latitude: 37.976521, longitude: -122.413125},
      friends: {},
      check_pings: null,
    };
  }

  showMeThePing = (notif) => {
    let data = notif.getData();
    this.props.navigator.push({
      screen: 'ping.PingScreen',
      passProps: {...data},
      navigatorStyle: {
        disabledBackGesture: true,
      }
    });
  }

  componentWillMount() {
    BackgroundGeolocation.on('location', this.onLocation);
    PushNotificationIOS.addEventListener('localNotification',this.showMeThePing);
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
        {interval: 1000, persist: false}
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
    if (!this.state.user_id) return;
    this.setState({location: location.coords});
    API.updateLocation(this.state.session_token, location.coords);
  }

  onPingsReceived = (ping_list) => {
    ping_list.map((ping) => {
      friend_copy = JSON.parse(JSON.stringify(this.state.friends[ping.from]));
      friend_copy['location'] = {'lat': ping.location.lat, 'lng': ping.location.lng};
      PushNotificationIOS.scheduleLocalNotification({
      fireDate: new Date().toISOString(),
      alertBody:  `${this.state.friends[ping.from].name} pinged you. They are at ${ping.location.lat}, ${ping.location.lng}.`,
      userInfo: {
        friend: friend_copy,
        location: this.state.location,
        pro_pic_url: this.state.pro_pic_url,
      }
    }
  )})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pro_pic_url !== prevState.pro_pic_url) {
      //console.warn([JSON.stringify(prevState),JSON.stringify(this.props)]);
      this.state.check_pings = setInterval(async () => {
        let resp = await API.getPings(this.state.session_token);
        this.onPingsReceived(resp);
      }, 5000);
      this.props.navigator.push({
        screen: 'ping.FriendlistScreen',
        backButtonHidden: true,
        passProps: {
          friends: this.state.friends,
          session_token: this.state.session_token,
          pro_pic_url: this.state.pro_pic_url,
          location: this.state.location,
        },
        navigatorStyle: {
          disabledBackGesture: true,
        }
      });
    } else if (this.state.user_id === null){
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.pro_pic_url !== nextState.pro_pic_url;
  }
}
