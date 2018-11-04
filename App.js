import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Login from './Login';
import ChatList from './ChatList';
import Chat from './Chat';

// Init Firebase
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
};

firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
    },
  },
  ChatList: {
    screen: ChatList,
    navigationOptions: {
      title: 'Chat List',
      headerLeft: null,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: 'Chat Room',
      headerLeft: null,
    },
  },
});

export default navigator;
