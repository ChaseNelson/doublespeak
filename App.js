import Login from './Login'
import ChatList from './ChatList'

import { createStackNavigator } from 'react-navigation'

const navigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerLeft: null,
    }
  },
  ChatList: {
    screen: ChatList,
    navigationOptions: {
      title: 'Chat List',
      headerLeft: null,
    }
  }
})

export default navigator
