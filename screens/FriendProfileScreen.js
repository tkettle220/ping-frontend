import React, { Component } from 'react';
import { AppRegistry, ScrollView, Image, Text, StyleSheet, View, FlatList, TouchableHighlight, Button} from 'react-native';

export default class FriendProfileScreen extends Component {
  render() {
      return (
        <View style={{flexDirection: 'column', flex: 1, backgroundColor: '#ecf0f1'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 4}}>
            <Profile name={this.props.friend.name} profilePic={this.props.friend.pro_pic_url + '?width=200&height=200'}/>
          </View>
      </View>
    );
  }
}

class Profile extends React.Component {
  handlePress(){

  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', padding: 10}}>
        <Image style={{width: 200, height: 200, borderRadius: 100}} source={{uri: this.props.profilePic}} />
        <Text style={{fontSize: 40, padding: 10}}>{this.props.name}</Text>
        <Button title=' ping ' onPress={this.handlePress} style={{flex: 1}} color="#8e44ad" />
      </View>
     );
  }
}
