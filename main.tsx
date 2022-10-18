import React from 'react';
import {
  ActivityIndicator,
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
      <ActivityIndicator size="large" color="#0000ff" />
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
