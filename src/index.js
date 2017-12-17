import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import posts from './reducers/posts'
import categories from './reducers/categories'
import comments from './reducers/comments'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

import App from './App'
import DetailPost from './components/detailPost'
import NewPost from './components/newPost'
import EditPost from './components/editPost'
import EditComment from './components/editComment'
import Categories from './components/categories'
import Posts from './components/posts'
import NotFound from './components/notFound'

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
        comments,
        routing: routerReducer
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App} />
                <Route path="/:category" component={App} />           
                <Route path="/posts/new" component={NewPost} />
                <Route path="/posts/:id/edit" component={EditPost} />
                <Route path="/posts/:postId/comment/:commentId/edit" component={EditComment} />
                <Route path="/:category/:id" component={DetailPost} />
                <Route path="*" component={NotFound} />
            </Router>
        </Provider>
    ),
    document.getElementById('root')
)

registerServiceWorker();
