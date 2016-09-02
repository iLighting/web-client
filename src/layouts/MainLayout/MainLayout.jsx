import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import {Menu} from 'antd';
import styles from './MainLayout.less';

const handleClick = function(item) {
  switch (item.key) {
    case "home":
      window.location.href = "/";
      break;
    case "manual":
      window.location.href = "/manual.html"
  }
}

const MainLayout = ({ children, activeKey }) => {
  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[activeKey]}
        onClick={handleClick}
        >
        <Menu.Item key="home">首页</Menu.Item>
        <Menu.Item key="manual">控制面板</Menu.Item>
      </Menu>
      <div>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  activeKey: PropTypes.string.isRequired
};

export default MainLayout;
