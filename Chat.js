import React, { Component } from 'react';
import * as firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';

import { StyleSheet, Text } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: this.props.navigation.state.params.roomName,
      currentUser: this.props.navigation.state.params.currentUser,
      uid: this.props.navigation.state.params.uid,
      messages: [],
    };
  }

  componentDidMount = () => {
    firebase
      .database()
      .ref(`Rooms/${this.state.roomName}`)
      .once('value')
      .then(snapshot => {
        const mess = snapshot.val().messages;
        const messages = [];
        for (const key in mess) {
          const temp = {
            _id: 1,
            text: mess[key].text,
            createdAt: mess[key].timestamp,
            user: {
              _id: mess[key].sentBy.uid === this.state.uid ? 1 : 2,
              name: mess[key].sentBy.name,
            },
          };
          messages.push(temp);
        }
        this.setState({ messages });
      })
      .catch(err => {
        alert(err.message);
      });
  };

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    firebase
      .database()
      .ref(`Rooms/${this.state.roomName}/messages/${new Date().getTime()}`)
      .set({
        timestamp: new Date().getTime(),
        text: messages[messages.length - 1].text,
        sentBy: {
          uid: this.state.uid,
          name: this.state.currentUser.displayName
            ? this.state.currentUser.displayName
            : this.state.currentUser.email,
        },
      });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: this.state.currentUser.displayName
            ? this.state.currentUser.displayName
            : this.state.currentUser.email,
        }}
      />
    );
  }
}
