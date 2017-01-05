import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';

import Lamp from './Lamp';
import SensorTemperature from './SensorTemperature';
import SensorIlluminance from './SensorIlluminance';


function Index({children}) {
  return (
    <div>
      <Menu name="manual"></Menu>
      {children}
    </div>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired
};

export default Index;

export {
  Lamp,
  SensorTemperature,
  SensorIlluminance,
}
