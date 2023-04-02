import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MyStack from './src/navigation/my_stack.js';

AppRegistry.registerComponent(appName, () => MyStack);
