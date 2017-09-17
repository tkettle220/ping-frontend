import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, FlatList, TouchableHighlight, Button, Alert} from 'react-native';
import API from '../api';

export default class FriendProfileScreen extends Component {
  onPingCompletion = (response) => {
    if (!response.status) {
      Alert.alert('Ping Failed', 'The user you tried to ping is out of range.', [{text: 'OK'}])
    } else {
      this.props.navigator.push({
        screen: 'ping.PingScreen',
        passProps: {
          friend: response.friend,
          pro_pic_url: this.props.pro_pic_url,
          location: this.props.location,
        },
        navigatorStyle: {
          disabledBackGesture: true,
        }
      });
    }
  }

  render() {
      return (
        <View style={{flexDirection: 'column', flex: 1, backgroundColor: '#ecf0f1'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <Profile ping={async () => {
              let resp = await API.pingFriend(this.props.session_token, this.props.friend_id, false);
              this.onPingCompletion(resp);
            }}
              name={this.props.friend.name}
              profilePic={this.props.friend.pro_pic_url + '?width=200&height=200'}
            />
          </View>
      </View>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
}

class Profile extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 10}}>
        <Image style={{width: 200, height: 200, borderRadius: 100}} source={{uri: this.props.profilePic}} />
        <Text style={{fontSize: 40, padding: 10}}>{this.props.name}</Text>
        <Button title=' ping ' onPress={this.props.ping} style={{flex: 1}} color="#8e44ad" />
      </View>
     );
  }
}
