'use strict';
var React = require('react');
var ReactNative = require('react-native');
var PropTypes = require('prop-types');

var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} = ReactNative;

const API_URL = 'http://7bf94d8e.ngrok.io/api/';
import { FBLoginManager } from 'react-native-facebook-login';

var FBLoginMock = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    onPress: PropTypes.func,
    onLogin: PropTypes.func,
    onLogout: PropTypes.func,
    setSession: PropTypes.func,
  },

  getInitialState: function(){
    return {
      user: null,
    };
  },

  handleLogin: async function(){
    var _this = this;
    await FBLoginManager.login(async function(error, data){
      if (!error) {
        _this.setState({ user : data});
        let userId = _this.state.user.credentials.userId;
        let token = _this.state.user.credentials.token;
        _this.props.setSession(userId, token);
        await _this.sendToTommy(userId, token);
        _this.props.onLogin && _this.props.onLogin();
      } else {
        console.log(error, data);
      }
    });
  },

  sendToTommy: async function(userid, token) {
    try {
      //let response = await fetch('https://requestb.in/vdx5wfvd', {
      let response = await fetch(API_URL + 'session', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facebook_id: userid,
          session_token: token
        })
      });
      let responseJSON = await response.json();
      console.warn(JSON.stringify(responseJSON));

    } catch (error) {
      console.error(error);
    }
  },

  handleLogout: function(){
    var _this = this;
    FBLoginManager.logout(function(error, data){
      if (!error) {
        _this.setState({ user : null});
        _this.props.setSession(null, null);
        _this.props.onLogout && _this.props.onLogout();
      } else {
        console.log(error, data);
      }
    });
  },

  onPress: async function(){
    this.state.user
      ? this.handleLogout()
      : await this.handleLogin();

    this.props.onPress && this.props.onPress();
  },

  componentWillMount: function(){
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){
      if (!error) {
        _this.setState({ user : data})
      }
    });
  },

  render: function() {
    var text = this.state.user ? "Log out" : "Log in with Facebook";
    return (
      <View style={this.props.style}>
        <TouchableHighlight
          style={styles.container}
          onPress={this.onPress}
        >
          <View style={styles.FBLoginButton}>
            <Image style={styles.FBLogo} source={require('./images/FB-f-Logo__white_144.png')} />
            <Text style={[styles.FBLoginButtonText, this.state.user ? styles.FBLoginButtonTextLoggedIn : styles.FBLoginButtonTextLoggedOut]}
              numberOfLines={1}>{text}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FBLoginButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    height: 30,
    width: 175,
    paddingLeft: 2,

    backgroundColor: 'rgb(66,93,174)',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgb(66,93,174)',

    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  FBLoginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Helvetica neue',
    fontSize: 14.2,
  },
  FBLoginButtonTextLoggedIn: {
    marginLeft: 5,
  },
  FBLoginButtonTextLoggedOut: {
    marginLeft: 18,
  },
  FBLogo: {
    position: 'absolute',
    height: 14,
    width: 14,

    left: 7,
    top: 7,
  },
});

module.exports = FBLoginMock;
