import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import App from './App.js';

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)

if (rootElement) {
    root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    )
} else {
	throw new Error('Could not find root element to mount to!')
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
