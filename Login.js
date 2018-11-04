import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      currentUser: null,
    };
  }

  signUpUser = (email, password) => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }
    if (email.length < 7) {
      alert('Email and Password cannot be empty!');
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        alert(err.message);
      });
    this.loginUser(email, password);
  };

  loginUser = (email, password) => {
    if (email.length < 7 || password.length < 6) {
      alert('Email and Password cannot be left blank.');
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ currentUser: user.user });
        this.props.navigation.navigate('ChatList', { currentUser: user.user });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Text style={styles.lightlightFont}>doublespeak</Text>
          <Text style={styles.grayFont}>doublespeak</Text>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email: email.replace(/\s/g, '') })}
              value={this.state.email}
              style={styles.input}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
              style={styles.input}
            />
          </Item>
          <Button
            style={styles.loginButton}
            full
            rounded
            success
            onPress={() => {
              this.loginUser(this.state.email, this.state.password);
            }}
            value={this.state.password}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>
          <Button
            style={styles.signUpButton}
            full
            rounded
            primary
            onPress={() => {
              this.signUpUser(this.state.email, this.state.password);
            }}
          >
            <Text style={{ color: 'white' }}>Sign Up</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0823',
    justifyContent: 'center',
    padding: 15,
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: '#053E2C',
  },
  signUpButton: {
    marginTop: 20,
    backgroundColor: '#082B50',
  },
  lightlightFont: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Courier New',
  },
  grayFont: {
    color: '#B0AFB9',
    fontWeight: 'bold',
    fontSize: 30,
    fontFamily: 'Courier New',
    transform: [{ rotate: '180deg' }],
  },
  input: {
    color: '#EEE',
    fontFamily: 'Courier New',
  },
});
