import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'dva/router';
import Home from './routes/Home';
import About from './routes/About';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />      
      <Route path="/about" component={About} />
    </Router>
  );
};
