import React from 'react';
import 'react-native-gesture-handler';

/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import store from './src/app/store';

AppRegistry.registerComponent(appName, () => App);
