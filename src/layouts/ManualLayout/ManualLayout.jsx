import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import {Menu} from 'antd';

const ManualLayout = ({ children, activeKey, onNavigate }) => {
  return (
    <div>
      <Menu
        mode="horizontal"
        selectedKeys={[activeKey]}
        onClick={onNavigate}
        >
        <Menu.Item key="lamps">光源</Menu.Item>
        <Menu.Item key="sensor">传感器</Menu.Item>
      </Menu>
      <div>
        {children}
      </div>
    </div>
  );
};

ManualLayout.propTypes = {
  children: PropTypes.element.isRequired,
  activeKey: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default ManualLayout;
