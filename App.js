import React, { Component } from 'react';
import * as firebase from 'firebase'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'

// Init Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDtJxu-PAdSB5ahIY66eI0ziESkllxcJnE",
  authDomain: "doublespeak-ba592.firebaseapp.com",
  databaseURL: "https://doublespeak-ba592.firebaseio.com",
  projectId: "doublespeak-ba592",
  storageBucket: "doublespeak-ba592.appspot.com",
}

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
