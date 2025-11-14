import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './StoreConfig';
import axios from "axios";

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true';

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);
