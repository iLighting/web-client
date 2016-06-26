import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link, IndexRedirect } from 'react-router';
import Manual from '../components/Manual';
import Lamps from '../components/Lamps/Lamps';
import LampPanel from '../components/Lamps/LampPanel';
import NotFound from '../components/NotFound';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={Manual} >
      <IndexRedirect to="/lamps" />
      <Route path="lamps" component={Lamps} >
        <Route path=":id" component={LampPanel} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
