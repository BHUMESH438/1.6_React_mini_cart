import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Approvider } from './Context'; //{}=>use named exports
ReactDOM.createRoot(document.getElementById('root')).render(
  <Approvider>
    <App />
  </Approvider>
);
