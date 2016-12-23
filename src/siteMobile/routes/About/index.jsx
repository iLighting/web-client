import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

function Index() {
  return (
    <div>
      <h1>关于</h1>
      <hr />
      <a href="github.com/iLighting">github.com/iLighting</a>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
