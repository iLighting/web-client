import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { pickAppFromNwkEp } from '../../../../utils/device';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Slider, Alert } from 'antd';
import ManualMenu from './Menu';
import AppMeta from './AppMeta';

const Gutter = () => <div style={{height: 8}}></div>;

const Sensor = ({
  menuName,
  controllerMap,
  deviceList,
  deviceListFetching,
  deviceListFetchErr,
  sensorList,
  current,
  sysMode,
  selectSensor,
  setAppProps
}) => {

  let currentSensor = null;
  if (current) {
    currentSensor = pickAppFromNwkEp(deviceList, current[0], current[1])
  }
  const currentSelectedKey = current ? `${current[0]}-${current[1]}` : '';

  function onSensorSelect({key}) {
    let [nwk, ep] = key.split('-');
    nwk = parseInt(nwk, 10);
    ep = parseInt(ep, 10);
    selectSensor(nwk, ep);
  }

  function onChangeName(name) {
    currentSensor && setAppProps(currentSensor.nwk, currentSensor.endPoint, {...currentSensor, name});
  }

  let ctrlNode = null;
  const ctrlEnable = sysMode === 'manual';
  if (currentSensor) {
    const { type, payload } = currentSensor;
    if (controllerMap.hasOwnProperty(type)) {
      const Controller = controllerMap[type];
      ctrlNode = <Controller
        enable={ctrlEnable}
        payload={payload} />;
    } else {
      ctrlNode = '暂无对应控制器';
    }
  }

  return (
    <div>
      <ManualMenu name={menuName}></ManualMenu>
      <Row gutter={8}>
        <Col span={4}>
          <Menu selectedKeys={[currentSelectedKey]} onClick={onSensorSelect}>
            {
              sensorList.map(app => (
                <Menu.Item key={`${app.nwk}-${app.endPoint}`}>
                  {app.name}
                </Menu.Item>
              ))
            }
          </Menu>
        </Col>
        <Col span={20}>
          {
            currentSensor ?
            <div>
              <Card title="基本信息">
                <AppMeta
                  name={currentSensor.name}
                  nwk={currentSensor.nwk}
                  endPoint={currentSensor.endPoint}
                  ieee={currentSensor.ieee}
                  onChangeName={onChangeName}
                />
              </Card>
              <Gutter />
              <Card title="控制器">
                { !ctrlEnable && <Alert message={<div><ModeCase /> 下，手动控制无效</div>} type="warning" />}
                {ctrlNode}
              </Card>
            </div> :
            <div>暂无</div>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Sensor;