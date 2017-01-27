import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'dva/router';
import Home from './routes/Home';
import About from './routes/About';
import Manual from './routes/Manual';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
      <Route path="/manual/all" component={Manual.AllType} />
      <Route path="/manual/lamp" component={Manual.LampType} />
      <Route path="/about" component={About} />
    </Router>
  );
};
