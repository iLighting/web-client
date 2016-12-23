import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';


function NotFound({children}) {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
}

export default NotFound;
