import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';
import style from './index.module.less';

function Index() {
  return (
    <div>
      <Menu name="about"></Menu>
      <div className={style.content}>
        <h1>iLighting</h1>
        <p>美和舒适的照明</p>
        <p>华南理工大学 · 光电所</p>
        <a href="https://github.com/iLighting">https://github.com/iLighting</a>
      </div>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
