import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './reduxStore';
import { ToastContainer } from 'react-toastify';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
        <ToastContainer position='bottom-left'/>
    </Provider>
);
