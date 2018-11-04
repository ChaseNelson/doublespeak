import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import Login from './Login';
import ChatList from './ChatList';

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
});

export default navigator;
