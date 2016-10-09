import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './components/App.jsx';
import UserAuth from './components/UserAuth.jsx';

ReactDOM.render(<App />, document.querySelector('#root'));

ReactDOM.render((
  <Router history={hashHistory} >
    <Route path="/" component={App} >
      <Route path="login" component={UserAuth} />
    </Route>

  </Router>
  ), document.querySelector('#root'));


