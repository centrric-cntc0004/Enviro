





import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NetworkErrorScreen from './src/common/NetworkError'
import { Provider } from 'react-redux';
import { store, persistor } from './src/store/store'
import { PersistGate } from 'redux-persist/integration/react'

import AuthScreen from './src/screens/login';
import Navigator from './src/common/Navigator'


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
         
          <Navigator />
         
        </NavigationContainer>
      </PersistGate>
    </Provider>


  );
};

export default App;

