import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Alert } from 'antd';
import ManualMenu from './comps/Menu';
import { pickAppFromNwkEp } from '../../utils/device';


const Gutter = () => <div style={{height: 8}}></div>;

// TODO: 改为带状态组件（切换灯具时，需要reset表单）
let LampMeta = ({
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
        <Form.Item label="灯具名" {...formItemLayout}>
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

LampMeta = Form.create()(LampMeta);

// OnOffLamp
// =====================================
const OnOffLamp = ({enable, payload, onChange}) => {
  const { on } = payload;
  function handleChange(value) {
    onChange({...payload, on: value})
  }
  return (
    <Switch 
      checkedChildren={'开'} 
      unCheckedChildren={'关'} 
      disabled={!enable} 
      checked={on} 
      onChange={handleChange} />
  )
}

// Lamp
// ====================================
const Lamp = ({
  deviceList,
  deviceListFetching,
  deviceListFetchErr,
  lampList,
  current,
  sysMode,
  selectLamp,
  setAppProps
}) => {

  let currentLamp = null;
  if (current) {
    currentLamp = pickAppFromNwkEp(deviceList, current[0], current[1])
  }
  const currentSelectedKey = current ? `${current[0]}-${current[1]}` : '';

  function onLampSelect({key}) {
    let [nwk, ep] = key.split('-');
    nwk = parseInt(nwk, 10);
    ep = parseInt(ep, 10);
    selectLamp(nwk, ep);
  }

  function onChangeName(name) {
    currentLamp && setAppProps(currentLamp.nwk, currentLamp.endPoint, {...currentLamp, name});
  }

  function onChangePayload(payload) {
    currentLamp && setAppProps(currentLamp.nwk, currentLamp.endPoint, {...currentLamp, payload});
  }

  let lampCtrlNode = null;
  const ctrlEnable = sysMode === 'manual';
  if (currentLamp) {
    const { type, payload } = currentLamp;
    switch (type) {
      case 'lamp': 
        lampCtrlNode = <OnOffLamp
          enable={ctrlEnable} 
          payload={payload} 
          onChange={onChangePayload} />; 
        break;
      default: lampCtrlNode = '暂无对应控制器';
    }
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
        <Col span={20}>
          {
            currentLamp ?
            <div>
              <Card title="基本信息">
                <LampMeta
                  name={currentLamp.name}
                  nwk={currentLamp.nwk}
                  endPoint={currentLamp.endPoint}
                  ieee={currentLamp.ieee}
                  onChangeName={onChangeName}
                />
              </Card>
              <Gutter />
              <Card title="控制器">
                { !ctrlEnable && <Alert message='非"手动模式"下，手动控制无效' type="warning" />}
                {lampCtrlNode}
              </Card>
            </div> :
            <div>暂无</div>
          }
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
    current: state.lamp.current,
    sysMode: state.mode.name
  }),
  dispatch => ({
    selectLamp (nwk, ep) { dispatch({type: 'lamp/selectLamp', payload: [nwk, ep]}) },
    setAppProps (nwk, ep, props) { dispatch({type: 'device/setAppProps', payload: [nwk, ep, props]}) }
  })
)(Lamp);
