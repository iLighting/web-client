import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

const SubMenu = ({name}) => {
  return (
    <Menu selectedKeys={[name]} mode="horizontal">
      <Menu.Item key="lamp"><Link to="/manual/lamp">光源</Link></Menu.Item>
      <Menu.Item key="sensor-temperature"><Link to="/manual/sensor-temperature">温度传感器</Link></Menu.Item>
      <Menu.Item key="sensor-light"><Link to="/manual/sensor-light">光照传感器</Link></Menu.Item>
    </Menu>
  )
}

SubMenu.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default SubMenu;
