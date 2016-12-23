import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';
import ModeSwitcher from '../../components/ModeSwitcher';


function Index() {
  return (
    <div>
      <Menu name="home"></Menu>
      <h1>欢迎来到 iLighting 智能照明管理后台</h1>
      <hr />
      <br/>
      <h2>概览</h2>
      <div>系统状态：{<ModeSwitcher />}</div>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
