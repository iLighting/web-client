import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Menu from '../../components/Menu';

import Summary from './Summary';
import Editor from './Editor';
import Chooser from './Chooser';

function Index({children}) {
  return (
    <div>
      <Menu name="static"></Menu>
      {children}
    </div>
  );
}

Index.propTypes = {
  children: PropTypes.node.isRequired
};

export default Index;

export {
  Summary,
  Editor,
  Chooser,
}
