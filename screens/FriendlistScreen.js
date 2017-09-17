import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, FlatList, TouchableHighlight} from 'react-native';

export default class FriendListScreen extends Component {
  selectFriend = (fbid) => {
    return () => {this.props.navigator.push({
      screen: 'ping.FriendProfileScreen',
      passProps: {
        friend_id: fbid,
        pro_pic_url: this.props.pro_pic_url,
        location: this.props.location,
        friend: this.props.friends[fbid],
        session_token: this.props.session_token,
      },
      navigatorStyle: {
        disabledBackGesture: true,
      }
    })}
  }

  render() {
      return (
        <View>
          <ScrollView style={{backgroundColor: '#ecf0f1'}}>
            {this.props.friends ? Object.entries(this.props.friends).map(([fbid, friend]) => <FriendProfile onPress={this.selectFriend(fbid)} key={friend.name} name={friend.name} profilePic={friend.pro_pic_url} />) : null}
          </ScrollView>
        </View>
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }
}

class FriendProfile extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} underlayColor='#bdc3c7'>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <Image borderRadius={30} style={{width: 60, height: 60}} source={{uri: this.props.profilePic}} />
          <Text style={{fontSize: 20, padding: 10}}>{this.props.name}</Text>
        </View>
      </TouchableHighlight>
     );
  }
}
