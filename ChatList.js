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

export default class ChatList extends Component {

  constructor(props) {
    super(props)

    this.state = ({
      email: '',
      password: '',
      currentUser: null
    })
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Text>
            This is the Chat List page.
          </Text>
          <Text>{JSON.stringify(this.props.navigation.state.params.currentUser)}</Text>
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
