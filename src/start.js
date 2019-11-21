import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Welcome from './components/Welcome/Welcome';
import Dashboard from './components/Dashboard/Dashboard';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducer';
import { Provider } from 'react-redux'; 
import { composeWithDevTools } from 'redux-devtools-extension'; 
import { init } from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let elem;
const userIsLogin = location.pathname != '/welcome';

if (!userIsLogin) {
    elem = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <Dashboard />
        </Provider>
    );
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
