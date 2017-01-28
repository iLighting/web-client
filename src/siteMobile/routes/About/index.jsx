import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import NavBar from 'antd-mobile/lib/nav-bar';

const Index = ({
  history
}) => {
  return (
    <div>
      <NavBar 
        leftContent="返回" 
        onLeftClick={() => history.replace('/')}
      >关于</NavBar>
      <a href="github.com/iLighting">github.com/iLighting</a>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
