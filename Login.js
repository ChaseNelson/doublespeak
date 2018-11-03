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
<<<<<<< 67419df7123eb30db764c0c9e34ad62346547165
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
=======
  apiKey: "AIzaSyDtJxu-PAdSB5ahIY66eI0ziESkllxcJnE",
  authDomain: "doublespeak-ba592.firebaseapp.com",
  databaseURL: "https://doublespeak-ba592.firebaseio.com",
  projectId: "doublespeak-ba592",
  storageBucket: "doublespeak-ba592.appspot.com",
>>>>>>> created working login page
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
<<<<<<< 67419df7123eb30db764c0c9e34ad62346547165
    if (password.length < 6) {
      alert('Password must be at least 6 characters!')
      return
    } else if (email.length < 7) {
      alert('Email and Password cannot be empty!')
      return
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(err => {
      alert(err.message)
    })
    this.loginUser(email, password)
  }

  loginUser = (email, password) => {
    if (email.length < 7 || password.length < 6) {
      alert('Email and Password cannot be left blank.')
      return
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => {
      this.setState({ currentUser: user.user })
      this.props.navigation.navigate('ChatList', { currentUser: user.user })
    })
    .catch(err => {
      alert(err.message)
    })
=======
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
>>>>>>> created working login page
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
<<<<<<< 67419df7123eb30db764c0c9e34ad62346547165
              value={ this.state.password }
=======
>>>>>>> created working login page
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
