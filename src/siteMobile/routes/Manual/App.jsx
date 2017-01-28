import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import NavBar from 'antd-mobile/lib/nav-bar';
import InputItem from 'antd-mobile/lib/input-item';
import List from 'antd-mobile/lib/list';
import Button from 'antd-mobile/lib/button';
import Switch from 'antd-mobile/lib/switch';
import Slider from 'antd-mobile/lib/slider';
import WingBlank from 'antd-mobile/lib/wing-blank';
import { createForm } from 'rc-form';
import { pickAppFromNwkEp } from '../../../utils/device';

const Item = List.Item;

// Lamp
// =====================================
const Lamp = ({enable, payload, onChange}) => {
  const { on } = payload;
  function handleChange(value) {
    onChange({...payload, on: value})
  }
  const ctrl = (
    <Switch 
        checkedChildren={'开'} 
        unCheckedChildren={'关'}
        disabled={!enable} 
        checked={on} 
        onChange={handleChange} />
  )
  return (
    <Item extra={ctrl}>
        开关
    </Item>
  )
}

// GrayLamp
// =====================================
const GrayLampMarks = {
  0: '关',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '全亮'
}
const GrayLamp = ({enable, payload, onChange}) => {
  const { level } = payload;
  function handleChange(value) {
    onChange({...payload, level: value})
  }
  const ctrl = (
    <Slider 
      marks={GrayLampMarks}
      value={level}
      disabled={!enable}
      onChange={handleChange} />
  )
  return (
    <WingBlank>
      {ctrl}
    </WingBlank>
  )
}

// SimpleDisplay, such as temperature and illuminance sensor
// ===================================================
const genSimpleDisplay = (label, uint) => ({payload}) => {
  const firstKey = Object.keys(payload)[0];
  const value = payload[firstKey];
  return (
    <Item extra={`${value} ${uint}`}>
      {label}
    </Item>
  )
}
const Temperature = genSimpleDisplay('温度', '℃');
const Illuminance = genSimpleDisplay('照度', 'lux');

const UnsupportType = () => <Item>暂不支持</Item>

function getTypeAppCtrlConstructor(type) {
  switch (type) {
    case 'lamp': return Lamp;
    case 'gray-lamp': return GrayLamp;
    case 'temperature-sensor': return Temperature;
    case 'illuminance-sensor': return Illuminance;
    default: return UnsupportType;
  }
}

let App = ({
  deviceList,
  currentMode,
  history,
  params,
  form,
  // actions
  setAppProps,
}) => {

  const { getFieldProps, getFieldsValue, resetFields } = form;
  const currentApp = pickAppFromNwkEp(deviceList, params.nwk, params.ep);
  const isManualMode = currentMode === 'manual';
  const AppCtrl = getTypeAppCtrlConstructor(currentApp && currentApp.type);

  function handleSave() {
    const {name} = getFieldsValue();
    setAppProps(currentApp.device, currentApp.endPoint, {name});
  }

  function handleReset() { resetFields() }

  function handleChangeAppPayload(payload) {
    setAppProps(currentApp.device, currentApp.endPoint, {payload});
  }

  return (
    <div>
      <NavBar 
          leftContent="返回" 
          onLeftClick={() => history.goBack()}
        >{ currentApp ? currentApp.name : '应用'}</NavBar>
      {
        currentApp ? 
        <div>
          <List renderHeader={() => '基本属性'}>
            <InputItem {...getFieldProps('name', {
              initialValue: currentApp.name
            })}>名称</InputItem>
            <InputItem
              editable={false}
              value={currentApp.device}
            >地址</InputItem>
            <InputItem
              editable={false}
              value={currentApp.endPoint}
            >端点</InputItem>
            <InputItem
              editable={false}
              value={currentApp.ieee}
            >MAC</InputItem>
          </List>
          <footer>
            <Button inline onClick={handleSave} type="primary">保存</Button>
            <Button inline onClick={handleReset}>重置</Button>
          </footer>
          <List renderHeader={() => '控制器' + (isManualMode ? '' : '（当前非手动模式，控制器不可用）')}>
            <AppCtrl 
              enable={isManualMode} 
              payload={currentApp.payload} 
              onChange={handleChangeAppPayload} 
            />            
          </List>
        </div> :
        'loading...'
      }
    </div>
  )
}
App = createForm()(App);

export default connect(
  state => ({
    deviceList: state.device.list,
    currentMode: state.sys.mode,
  }),
  dispatch => ({
    setAppProps (nwk, ep, props) { dispatch({type: 'device/setAppProps', payload: [nwk, ep, props]}) }
  })
)(App);