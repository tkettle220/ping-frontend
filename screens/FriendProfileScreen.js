import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, FlatList, TouchableHighlight, Button} from 'react-native';
import API from '../api';

export default class FriendProfileScreen extends Component {
  render() {
      return (
        <View style={{flexDirection: 'column', flex: 1, backgroundColor: '#ecf0f1'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <Profile ping={()=>API.pingFriend(this.props.session_token, this.props.friend_id, false)} name={this.props.friend.name} profilePic={this.props.friend.pro_pic_url + '?width=200&height=200'}/>
          </View>
      </View>
    );
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
