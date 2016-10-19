import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';

function Index() {
  return (
    <div>
      <Menu name="about"></Menu>
      <h1>关于</h1>
      <hr />
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
