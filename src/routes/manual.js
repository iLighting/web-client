import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import Manual from '../components/Manual';
import LampContainer from '../components/Lamp/LampContainer';
import Lamp from '../components/Lamp/Lamp';
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Manual} >
      <IndexRedirect to="lamp" />
      <Router path='lamp' component={LampContainer} />
      <Router path='lamp/nwk/:nwk/ep/:ep' component={Lamp} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
