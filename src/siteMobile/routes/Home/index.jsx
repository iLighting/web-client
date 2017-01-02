import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import './index.module.less';

function Index() {
  return (
    <div>
      <h1>欢迎来到 iLighting 智能照明管理后台</h1>
      <hr />
      <br/>
      <h2>概览</h2>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
