import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
import UserAuth from './components/UserAuth.jsx';
import SpotifyTest from './components/SpotifyTest.jsx';
import CreatePlaylistForm from './components/CreatePlaylistForm.jsx';

ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App}>
      <Route path="spotify" component={SpotifyTest} />
      <Route path="db-test" component={CreatePlaylistForm} />
    </Route>
  </Router>
  ), document.querySelector('#root'));
