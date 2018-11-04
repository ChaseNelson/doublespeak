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

const navigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerVisible: false,
      },
    },
    ChatList: {
      screen: ChatList,
      navigationOptions: {
        headerVisible: false,
      },
    },
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  }
);

export default navigator;
