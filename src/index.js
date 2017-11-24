import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import createBrowserHistory from 'history/createBrowserHistory'

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'



import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import posts from './reducers/posts'
import categories from './reducers/categories'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const initialState = {
    posts: {
        fetching: false,
        sorting: 'voteScore',
        items: []
    },
    categories: {
        fetching: false,
        selected: null,
        items: []
    }
}

const customHistory = createBrowserHistory()

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
  }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        posts,
        categories,
        routing: routerReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
)

const history = syncHistoryWithStore(customHistory, store)

function Test() {
    return <p>Just an test</p>
}

ReactDOM.render(
    (
        <Provider store={store}>
            <App />
        </Provider>
    ),
    document.getElementById('root')
)

registerServiceWorker();
