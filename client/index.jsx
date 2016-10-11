import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
import UserAuth from './components/UserAuth.jsx';
import SpotifyTest from './components/SpotifyTest.jsx';

ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/">
      <IndexRoute component={App}>
        <Route path="login" component={UserAuth} />
      </IndexRoute>
      <Route path="spotify" component={SpotifyTest} />
    </Route>

  </Router>
  ), document.querySelector('#root'));

