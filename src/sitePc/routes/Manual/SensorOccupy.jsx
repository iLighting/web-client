import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Slider, Alert } from 'antd';
import ManualMenu from './comps/Menu';
import { pickAppFromNwkEp } from '../../../utils/device';
import ModeCase from '../../components/ModeCase';
import AppMeta from './comps/AppMeta';
import SimpleSensor from './comps/SimpleSensor';



const Occupy = ({ enable, payload }) => {
  const { occupy } = payload;
  return <div>占用：{occupy + ''}</div>
}

function filterSensorOccupy(devices) {
  let sensors = [];
  devices.forEach(dev => {
    dev.apps.forEach(app => {
      if (['occupy-sensor'].indexOf(app.type) >= 0) sensors.push({
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
    menuName: 'sensor-occupy',
    controllerMap: {
      'occupy-sensor': Occupy
    },
    deviceList: state.device.list,
    deviceListFetching: state.device.listFetching,
    deviceListFetchErr: state.device.listFetchErr,
    sensorList: filterSensorOccupy(state.device.list),
    current: state.sensorOccupy.current,
    sysMode: state.sys.mode
  }),
  dispatch => ({
    selectSensor(nwk, ep) { dispatch({ type: 'sensorOccupy/selectSensor', payload: [nwk, ep] }) },
    setAppProps(nwk, ep, props) { dispatch({ type: 'device/setAppProps', payload: [nwk, ep, props] }) }
  })
)(SimpleSensor);
