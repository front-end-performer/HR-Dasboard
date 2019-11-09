import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome/Welcome';
import Dashboard from './components/Dashboard/Dashboard';
//redux
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import { reducer } from './reducer';
import { Provider } from 'react-redux'; // will connect app with redux state we willl use
import { composeWithDevTools } from 'redux-devtools-extension'; // connecting with dev tool in webbrowser
import { init } from './socket';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let elem;
const userIsLogin = location.pathname != '/welcome';

if (!userIsLogin) {
    elem = <Welcome />;
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
