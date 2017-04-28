import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

const SubMenu = ({ name }) => {
  return (
    <Menu selectedKeys={[name]} mode="horizontal">
      <Menu.Item key="lamp"><Link to="/manual/lamp">光源</Link></Menu.Item>
      <Menu.Item key="sensor-temperature"><Link to="/manual/sensor-temperature">温度传感器</Link></Menu.Item>
      <Menu.Item key="sensor-illuminance"><Link to="/manual/sensor-illuminance">照度传感器</Link></Menu.Item>
      <Menu.Item key="sensor-occupy"><Link to="/manual/sensor-occupy">占用传感器</Link></Menu.Item>
      <Menu.Item key="sensor-asr"><Link to="/manual/sensor-asr">语音传感器</Link></Menu.Item>
    </Menu>
  )
}

SubMenu.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default SubMenu;
