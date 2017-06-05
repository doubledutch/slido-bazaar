import React, { Component } from 'react';
import ReactNative from 'react-native';
import Update from 'react-addons-update'
import DD from './dd-bindings'

const { WebView, Alert, TouchableOpacity, Text, View, ScrollView, Image } = ReactNative
import Bazaar from 'bazaar-client'
const packageInfo = require('../package.json')

var ScreenView = ReactNative.View
var eventID = ''
const isSandboxed = false

class HomeView extends Component {
  constructor({ ddOverride }) {
    super()

    const eventID = DD.currentEvent.EventId
    const ScreenView = isSandboxed ? ReactNative.View : ReactNative.Platform.select({
      ios: () => Bazaar.View,
      android: () => ReactNative.View,
      web: () => ReactNative.View
    })()

    this.state = { loading: true }
  }

  componentDidMount() {
    var self = this

    DD.setTitle(`${packageInfo.name}`)
  }

  onLoaded() {
    this.setState({ loading: false })
  }

  render() {
    return (
      <ScreenView style={styles.container}>
        <WebView
          source={{ uri: 'https://app.sli.do/event/kaw8lou9' }}
          onLoad={this.onLoaded.bind(this)}
        />
        {this.state.loading ?
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View> : null
        }
      </ScreenView>
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 40,
    fontWeight: '600'
  }
});

export default HomeView
