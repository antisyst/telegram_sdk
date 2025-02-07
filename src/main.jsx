import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SDKProvider } from '@telegram-apps/sdk-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SDKProvider acceptCustomStyles debug>
      <App />
    </SDKProvider>
  </React.StrictMode>
);
