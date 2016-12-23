import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch } from 'antd';
import SceneMenu from './comps/Menu';
import SceneSwitcher from '../../components/SceneSwitcher';


const Summary = ({}) => {
  return (
    <div>
      <SceneMenu name="summary" />
      <Card title="场景概况">
        <div>当前场景：<SceneSwitcher /></div>
      </Card>
    </div>
  )
}

export default connect(
  state => ({
  })
)(Summary);
