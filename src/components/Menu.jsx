import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

const MyMenu = ({name}) => {
  return (
    <Menu selectedKeys={[name]} mode="horizontal" theme="dark">
      <Menu.Item key="home"><Link to="/">概览</Link></Menu.Item>
      <Menu.Item key="manual"><Link to="/manual">手动控制</Link></Menu.Item>
      <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
    </Menu>
  )
}

MyMenu.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default MyMenu;
