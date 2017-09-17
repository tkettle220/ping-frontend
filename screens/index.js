import { Navigation } from 'react-native-navigation';

import LoginScreen from './LoginScreen';
import FriendlistScreen from './FriendlistScreen';
import FriendProfileScreen from './FriendProfileScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('ping.LoginScreen', () => LoginScreen);
  Navigation.registerComponent('ping.FriendlistScreen', () => FriendlistScreen);
  Navigation.registerComponent('ping.FriendProfileScreen', () => FriendProfileScreen);


}
