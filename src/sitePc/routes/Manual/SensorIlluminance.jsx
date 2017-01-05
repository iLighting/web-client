import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Slider, Alert } from 'antd';
import ManualMenu from './comps/Menu';
import { pickAppFromNwkEp } from '../../../utils/device';
import ModeCase from '../../components/ModeCase';
import AppMeta from './comps/AppMeta';
import SimpleSensor from './comps/SimpleSensor';



const Illuminance = ({enable, payload}) => {
  const { level } = payload;
  return <div>{level} 勒克斯</div>
}

function filterSensorIlluminance(devices) {
  let sensors = [];
  devices.forEach(dev => {
    dev.apps.forEach(app => {
      if (['illuminance-sensor'].indexOf(app.type)>=0) sensors.push({
        ...app,
        nwk: dev.nwk,
        ieee: dev.ieee
      })
    })
  });
  return sensors;
}

export default connect(
  state => ({
    menuName: 'sensor-illuminance',
    controllerMap: {
      'illuminance-sensor': Illuminance
    },
    deviceList: state.device.list,
    deviceListFetching: state.device.listFetching,
    deviceListFetchErr: state.device.listFetchErr,
    sensorList: filterSensorIlluminance(state.device.list),
    current: state.sensorIlluminance.current,
    sysMode: state.sys.mode
  }),
  dispatch => ({
    selectSensor (nwk, ep) { dispatch({type: 'sensorIlluminance/selectSensor', payload: [nwk, ep]}) },
    setAppProps (nwk, ep, props) { dispatch({type: 'device/setAppProps', payload: [nwk, ep, props]}) }
  })
)(SimpleSensor);
