import { createStackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Themes from '../screens/Themes';
import Options from '../screens/Options';

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: () => null,
    },
  },
  Options: {
    screen: Options,
    navigationOptions: {
      headerTitle: 'Options',
    },
  },
  Themes: {
    screen: Themes,
    navigationOptions: {
      headerTitle: 'Themes',
    },
  },
}, {
  headerMode: 'screen',
});

const CurrencyListStack = createStackNavigator({
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title,
    }),
  }
}, {
  headerMode: 'screen',
});

export default createStackNavigator({
  Home: {
    screen: HomeStack,
  },
  CurrencyList: {
    screen: CurrencyListStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
