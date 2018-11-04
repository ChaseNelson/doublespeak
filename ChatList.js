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
    firebase
      .database()
      .ref('Rooms')
      .on(
        'value',
        snapshot => {
          this.setState({ rooms: snapshot.val() });
        },
        err => {
          alert(err.messages);
        }
      );
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
      let alreadyInRoom = false;
      const roomRef = firebase.database().ref(`Rooms/${roomName}`);
      roomRef
        .child('userlist')
        .once('value')
        .then(data => {
          alert(JSON.stringify(data));
          Object.keys(data).forEach(key => {
            if (key === this.state.uid || data[key] === this.state.uid) {
              alert('You are alreay in that room');
              alreadyInRoom = true;
            }
          });
          if (alreadyInRoom) return;

          // if not on list add to list
          roomRef.child('userlist').push(currentUser.uid);

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

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem header bordered style={styles.card}>
              <Item floatingLabel>
                <Label style={styles.input}>Create a Room</Label>
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
                <Text style={{ color: 'white', fontFamily: 'Courier New' }}>Create</Text>
              </Button>
            </CardItem>
          </Card>
          <Card>
            <CardItem header bordered style={styles.card}>
              <Item floatingLabel>
                <Label style={styles.input}>Join a Room</Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={joinRoomName => this.setState({ joinRoomName })}
                  value={this.state.joinRoomName}
                  style={styles.input}
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
                <Text style={{ color: 'white', fontFamily: 'Courier New' }}>Join</Text>
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
    backgroundColor: '#0C0823',
    justifyContent: 'center',
    padding: 15,
  },
  createButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#053E2C',
  },
  card: {
    backgroundColor: '#0F539B',
    fontFamily: 'Courier New',
  },
  input: {
    color: '#EEE',
    fontFamily: 'Courier New',
  },
});
