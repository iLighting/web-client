import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch } from 'antd';
import SceneMenu from './comps/Menu';


const Summary = ({
  list,
  listFetching,
  listFetchErr,
}) => {
  return (
    <div>
      <SceneMenu name="summary" />
      <Card title="场景概况">
        <p>总数：{list.length}</p>
        <p>当前场景：TODO</p>
      </Card>
    </div>
  )
}

export default connect(
  state => ({
    list: state.staticScene.list,
    listFetching: state.staticScene.listFetching,
    listFetchErr: state.staticScene.listFetchErr,
  })
)(Summary);
