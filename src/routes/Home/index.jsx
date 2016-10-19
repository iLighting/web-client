import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';

function Index() {
  return (
    <div>
      <Menu name="home"></Menu>
      <h1>欢迎来到 iLighting 智能照明管理后台</h1>
      <hr />
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
