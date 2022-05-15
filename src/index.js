import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './contexts/AuthProvider';
import GlobalProvider from './contexts/GlobalProvider';
import './index.scss';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
