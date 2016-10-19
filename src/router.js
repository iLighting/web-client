import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'dva/router';
import IndexPage from './routes/Home';
import ManualIndex, { Lamp } from './routes/Manual';
import About from './routes/About';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/manual" component={ManualIndex}>
        <IndexRedirect to="lamp" />
        <Route path="lamp" component={Lamp} />
      </Route>
      <Route path="/about" component={About} />
    </Router>
  );
};
