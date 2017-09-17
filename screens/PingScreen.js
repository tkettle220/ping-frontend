import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

import MapView, { MAP_TYPES } from 'react-native-maps';

export default class PingScreen extends React.Component {
  constructor(props) {
    super(props);
    let my_latitude = this.props.location.latitude;
    let my_longitude = this.props.location.longitude;
    this.state = {
      my_latitude: my_latitude,
      my_longitude: my_longitude,
      region: {
        latitude: my_latitude,
        longitude: my_longitude,
        latitudeDelta: Math.abs(my_latitude-this.props.friend.location.lat)/2 * 1.5,
        longitudeDelta: Math.abs(my_longitude-this.props.friend.location.lng)/2 * 1.5,
      },
    };
  }
/*
  onRegionChange(region) {
    this.setState({ region });
  }

  jumpMyLocation() {
    return {
      latitude: (LATITUDE1+LATITUDE2)/2.0,
      longitude: (LONGITUDE1+LONGITUDE2)/2.0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
  }

  animate() {
    this.map.animateToRegion(this.jumpMyLocation());
  }*/

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          mapType={MAP_TYPES.STANDARD}
          style={styles.map}
          initialRegion={this.state.region}
          //onRegionChange={region => this.onRegionChange(region)}
        >
        <MapView.Marker
          coordinate={{latitude: parseFloat(this.props.friend.location.lat),
            longitude: parseFloat(this.props.friend.location.lng),}}>
            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.friend.pro_pic_url}} />
        </MapView.Marker>
        <MapView.Marker
          coordinate={{latitude: this.state.my_latitude,
            longitude: this.state.my_longitude,}}>
            <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: this.props.pro_pic_url}} />
        </MapView.Marker>

    </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.animate()}
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.buttonText}>ML</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: '#8e44ad',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 100,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
  },
});
