import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'dva/router';
import NotFound from './routes/NotFound';
import IndexPage from './routes/Home';
import ManualIndex, { Lamp, SensorTemperature, SensorIlluminance, SensorAsr } from './routes/Manual';
import staticScene, { Summary, Editor } from './routes/Static';
import About from './routes/About';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/manual" component={ManualIndex}>
        <IndexRedirect to="lamp" />
        <Route path="lamp" component={Lamp} />
        <Route path="sensor-temperature" component={SensorTemperature} />
        <Route path="sensor-illuminance" component={SensorIlluminance} />
        <Route path="sensor-asr" component={SensorAsr} />
      </Route>
      <Route path="/staticScene" component={staticScene}>
        <IndexRedirect to="summary" />
        <Route path="summary" component={Summary} />
        <Route path="editor" component={Editor} />
      </Route>
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Router>
  );
};
