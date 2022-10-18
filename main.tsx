import React from 'react';
import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

import AppHome from './src/AppHome';

const App = () => {
  let persistor = persistStore(store);

  const LoadingMarkup = () => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <Text style={{
          marginTop: 50,
          fontSize: 30,
          alignSelf: 'center',
          fontWeight: 'bold',
          color: 'grey',
        }}>
          Custom Counter
        </Text>
        <Text style={{
          marginTop: 20,
          fontSize: 15,
          alignSelf: 'center',
          fontWeight: 'bold',
          color: 'grey',
        }}>
          Loading data...
        </Text>
      <ActivityIndicator style={{paddingTop:20}} size="large" color="##1565c0" />
    </View>
  );

  return (
      <Provider store={store}>
        <PersistGate loading={<LoadingMarkup />} persistor={persistor}>
            <AppHome />
        </PersistGate>
      </Provider>
  );
};
export default App;
