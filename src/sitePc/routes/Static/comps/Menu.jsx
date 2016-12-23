import React from 'react';
import { Menu } from 'antd';
import { Link } from 'dva/router';

const SubMenu = ({name}) => {
  return (
    <Menu selectedKeys={[name]} mode="horizontal">
      <Menu.Item key="summary"><Link to="/staticScene/summary">概览</Link></Menu.Item>
      <Menu.Item key="editor"><Link to="/staticScene/editor">编辑</Link></Menu.Item>
    </Menu>
  )
}

SubMenu.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default SubMenu;
