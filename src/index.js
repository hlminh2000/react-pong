import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import StoreProvider from './stateManagement/StoreProvider.js'
import './index.css';

ReactDOM.render(
   <StoreProvider>
      <App></App>
   </StoreProvider>,
  document.getElementById('root')
);
