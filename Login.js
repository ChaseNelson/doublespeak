import React, { Component } from 'react';
import * as firebase from 'firebase'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from 'native-base'

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

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      currentUser: null
    })
  }

  signUpUser = (email, password) => {
    try {
      if (password.length < 6) {
        alert('Password must be at least 6 characters!')
        return
      }
      firebase.auth().createUserWithEmailAndPassword(email.trim(), password)
      this.loginUser(email, password)
    } catch(err) {
      console.error(err)
    }
  }

  loginUser = (email, password) => {
    try {
      if (email.length === 0 || password.length === 0) {
        alert('Email and Password cannot be left blank.')
        return
      }
      firebase.auth().signInWithEmailAndPassword(email.trim(), password)
      .then(user => {
        this.setState({ currentUser: user.user })
        this.props.navigation.navigate('ChatList', { currentUser: user.user })
      })
      .catch(err => {
        alert(err.message)
      })
    } catch(err) {
      console.error(err)
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email: email.replace(/\s/g, '') })}
                value={ this.state.email }
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() => {this.loginUser(this.state.email, this.state.password)}}
            >
              <Text style={{ color: 'white' }}>Login</Text>
            </Button>
            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() => {this.signUpUser(this.state.email, this.state.password)}}
            >
              <Text style={{ color: 'white' }}>Sign Up</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15
  }
})
