import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect, Link } from 'dva/router';
import Home from './routes/Home';
import About from './routes/About';
import Manual from './routes/Manual';
import App from './routes/Manual/App';
import Scene from './routes/Scene';
import Result from 'antd-mobile/lib/result';

const Result404 = () => <Result title="404" message="页面未找到" />

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
      {/** Manual **/}
      <Route path="/manual/all" component={Manual.AllApp} />
      <Route path="/manual/lamp" component={Manual.LampApp} />
      <Route path="/manual/gray-lamp" component={Manual.GrayLampApp} />
      <Route path="/manual/illuminance-sensor" component={Manual.IlluminanceApp} />
      <Route path="/manual/temperature-sensor" component={Manual.TemperatureApp} />
      <Route path="/manual/occupy-sensor" component={Manual.OccupyApp} />
      <Route path="/manual/asr-sensor" component={Manual.AsrApp} />
      <Route path="/manual/nwk/:nwk/ep/:ep" component={App} />
      {/** scene **/}
      <Route path="/scene" component={Scene} />
      {/** about **/}
      <Route path="/about" component={About} />
      <Route path="*" component={Result404} />
    </Router>
  );
};
