import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { AUTH_USER } from './actions/types';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Private from './components/private';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token')

// If we have a token, consider the user to be signed in
if (token) {
  store.dispatch({ type: AUTH_USER })
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
        <Route path="private" component={RequireAuth(Private)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
