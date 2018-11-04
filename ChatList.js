import React, { Component } from 'react';
import * as firebase from 'firebase';
import { StyleSheet, Text } from 'react-native';
import { Container, Content, Card, CardItem, Input, Item, Button, Label } from 'native-base';

export default class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: null,
      createRoomName: '',
      joinRoomName: '',
      currentUser: this.props.navigation.state.params.currentUser,
      uid: this.props.navigation.state.params.currentUser.uid,
    };
  }

  componentDidMount = () => {
    this.getRooms();
  };

  createNewRoom = roomName => {
    const { rooms } = this.state;
    let contains = false;
    if (rooms) {
      for (const room in rooms) {
        if (room === roomName) {
          contains = true;
          break;
        }
      }
    }
    if (!contains) {
      const { currentUser } = this.state;
      firebase
        .database()
        .ref(`Rooms/${roomName}`)
        .set({
          messages: {
            [new Date().getTime()]: {
              text: `${
                currentUser.displayName ? currentUser.displayName : currentUser.email
              } created room ${roomName}.`,
            },
          },
          userlist: [this.state.uid],
        })
        .catch(err => alert(err.message));
    } else {
      alert('Room already exists!');
    }
  };

  joinNewRoom = roomName => {
    const { rooms, currentUser } = this.state;
    if (rooms === null) {
      alert('Room does not exist.');
      return;
    }
    let contains = false;
    for (const room in rooms) {
      if (room === roomName) {
        contains = true;
        break;
      }
    }
    if (contains) {
      const roomRef = firebase.database().ref(`Rooms/${roomName}`);
      roomRef
        .child('userlist')
        .once('value')
        .then(data => {
          for (const key in data) {
            if (data[key] === this.state.uid) {
              alert('You are alreay in that room');
              return;
            }
          }

          // if not on list add to list
          roomRef.push(currentUser.uid);

          // added a new message to the room
          roomRef.child('messages').update({
            [new Date().getTime()]: {
              text: `${
                currentUser.displayName ? currentUser.displayName : currentUser.email
              } joined room ${roomName}.`,
            },
          });
        })
        .catch(err => {
          alert(err.message);
        });
    } else {
      alert('Room does not exist.');
    }
  };

  getRooms = () => {
    const roomsRef = firebase.database().ref('Rooms');
    roomsRef
      .once('value')
      .then(data => {
        const val = data.val();
        this.setState({ rooms: val });
        return val;
      })
      .catch(err => {
        alert(err.message);
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Item floatingLabel>
                <Label>Create a Room</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={createRoomName => this.setState({ createRoomName })}
                  value={this.state.createRoomName}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Button
                style={styles.createButton}
                rounded
                success
                onPress={() => {
                  this.createNewRoom(this.state.createRoomName);
                }}
              >
                <Text style={{ color: 'white' }}>Create</Text>
              </Button>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Item floatingLabel>
                <Label>Join a Room</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={joinRoomName => this.setState({ joinRoomName })}
                  value={this.state.joinRoomName}
                />
              </Item>
            </CardItem>
            <CardItem>
              <Button
                style={styles.createButton}
                rounded
                success
                onPress={() => {
                  this.joinNewRoom(this.state.joinRoomName);
                }}
              >
                <Text style={{ color: 'white' }}>Join</Text>
              </Button>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Testing Area</Text>
            </CardItem>
            <CardItem>
              <Text>
                {this.state.rooms ? JSON.stringify(this.state.rooms) : 'no rooms to show'}
              </Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered>
              <Text>Testing Area</Text>
            </CardItem>
            <CardItem>
              <Text>{JSON.stringify(this.state.currentUser)}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15,
  },
  createButton: {
    marginTop: 20,
  },
});
