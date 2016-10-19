import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row } from 'antd';
import ManualMenu from './comps/Menu';
import { pickAppFromNwkEp } from '../../utils/device';

const Lamp = ({
  deviceList,
  deviceListFetching,
  deviceListFetchErr,
  lampList,
  current,
  selectLamp
}) => {

  const currentSelectedKey = current ? `${current[0]}-${current[1]}` : '';

  function onLampSelect({key}) {
    let [nwk, ep] = key.split('-');
    nwk = parseInt(nwk, 10);
    ep = parseInt(ep, 10);
    selectLamp(nwk, ep);
  }

  return (
    <div>
      <ManualMenu name="lamp"></ManualMenu>
      <Row gutter={8}>
        <Col span={4}>
          <Menu selectedKeys={[currentSelectedKey]} onClick={onLampSelect}>
            {
              lampList.map(lamp => (
                <Menu.Item key={`${lamp.nwk}-${lamp.endPoint}`}>{lamp.name}</Menu.Item>
              ))
            }
          </Menu>
        </Col>
        <Col span={18}>
          {current}
        </Col>
      </Row>
    </div>
  )
}

function filterLampApps(devices) {
  let lamps = [];
  devices.forEach(dev => {
    dev.apps.forEach(app => {
      if (app.type === 'lamp') lamps.push({
        ...app,
        nwk: dev.nwk,
        ieee: dev.ieee
      })
    })
  });
  return lamps;
}

export default connect(
  state => ({
    deviceList: state.device.list,
    deviceListFetching: state.device.listFetching,
    deviceListFetchErr: state.device.listFetchErr,
    lampList: filterLampApps(state.device.list),
    current: state.lamp.current
  }),
  dispatch => ({
    selectLamp (nwk, ep) { dispatch({type: 'lamp/selectLamp', payload: [nwk, ep]}) }
  })
)(Lamp);
