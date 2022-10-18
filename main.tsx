import React from 'react';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import AppHome from './src/AppHome';

const App = () => {
  return (
    <Provider store={store}>
        <AppHome />
    </Provider>

  );
};
export default App;
