import React, { useState, useEffect, useContext } from 'react';

// Imports for react-redux tools
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

// also need to install react-redux tools in browser
// --

import AppHome from './src/AppHome';

const App = () => {


  return (
    <Provider store={store}>
      <AppHome />
    </Provider>

  );
};

export default App;
