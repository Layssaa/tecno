import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/index';
import "./index.css"
import { MyProvider } from './Context/Context';

ReactDOM.render(
  <React.StrictMode>
    <MyProvider>
      <Routes />
    </MyProvider>
  </React.StrictMode>,
  document.getElementById('root')
);