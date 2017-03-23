import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import NavBar from 'antd-mobile/lib/nav-bar';
import WingBlank from 'antd-mobile/lib/wing-blank';
import WhiteSpace from 'antd-mobile/lib/white-space';
import style from './index.module.less';

const Index = ({
  history
}) => {
  return (
    <div>
      <NavBar 
        leftContent="返回" 
        onLeftClick={() => history.replace('/')}
      >关于</NavBar>
      <WhiteSpace />
      <WingBlank>
        <div className={style.content}>
          <p>美和舒适的照明</p>
          <p>华南理工大学 · 光电所</p>
          <a href="https://github.com/iLighting">https://github.com/iLighting</a>
        </div>
      </WingBlank>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
