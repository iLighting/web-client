import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Slider, Alert } from 'antd';
import ManualMenu from './comps/Menu';
import { pickAppFromNwkEp } from '../../../utils/device';
import ModeCase from '../../components/ModeCase';


const Gutter = () => <div style={{height: 8}}></div>;

// TODO: 改为带状态组件（切换时，需要reset表单）
let AppMeta = ({
  name, nwk, ieee, endPoint, form,
  onChangeName
}) => {

  const { getFieldDecorator, resetFields } = form;
  const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 14 },
  };

  function handleSubmit() {
    const { name } = form.getFieldsValue();
    onChangeName && onChangeName(name);
  }

  return (
    <div>
      <Form horizontal>
        <Form.Item label="传感器名" {...formItemLayout}>
          {
            getFieldDecorator('name', {
              initialValue: name
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="网络地址" {...formItemLayout}>
          <p className="ant-form-text">{nwk}</p>
        </Form.Item>
        <Form.Item label="MAC" {...formItemLayout}>
          <p className="ant-form-text">{ieee}</p>
        </Form.Item>
        <Form.Item label="端口" {...formItemLayout}>
          <p className="ant-form-text">{endPoint}</p>
        </Form.Item>
      </Form>
      <footer style={{textAlign: 'right'}}>
        <Button type="primary" size="small" onClick={handleSubmit}>保存</Button>
      </footer>
    </div>
  )
};

AppMeta = Form.create()(AppMeta);

const Temperature = ({enable, payload}) => {
  const { temperature } = payload;
  return <div>{temperature} 摄氏度</div>
}

// Sensor
// ====================================
const Sensor = ({
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
    switch (type) {
      case 'temperature-sensor': 
        ctrlNode = <Temperature
          enable={ctrlEnable} 
          payload={payload} />; 
        break;
      default: ctrlNode = '暂无对应控制器';
    }
  }

  return (
    <div>
      <ManualMenu name="sensor-temperature"></ManualMenu>
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

function filterSensorTemperature(devices) {
  let sensors = [];
  devices.forEach(dev => {
    dev.apps.forEach(app => {
      if (['temperature-sensor'].indexOf(app.type)>=0) sensors.push({
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
    deviceList: state.device.list,
    deviceListFetching: state.device.listFetching,
    deviceListFetchErr: state.device.listFetchErr,
    sensorList: filterSensorTemperature(state.device.list),
    current: state.sensorTemperature.current,
    sysMode: state.sys.mode
  }),
  dispatch => ({
    selectSensor (nwk, ep) { dispatch({type: 'sensorTemperature/selectSensor', payload: [nwk, ep]}) },
    setAppProps (nwk, ep, props) { dispatch({type: 'device/setAppProps', payload: [nwk, ep, props]}) }
  })
)(Sensor);
