import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Grid from 'antd-mobile/lib/grid';
import List from 'antd-mobile/lib/list';
import './index.module.less';

const Item = List.Item;
const Brief = Item.Brief;

const entrances = [{
  icon: require('./images/lights.png'),
  text: '手动',
  link: '/manual/all',
}, {
  icon: require('./images/home.png'),
  text: '场景',
  link: '/scene',
}, {
  icon: require('./images/information.png'),
  text: '关于',
  link: '/about',
}]

const Index = ({
  history,
  deviceList
}) => {

  function handleClickGrid (el) {
    history.push(el.link);
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>iLight<br/>智能照明</h3>
      <Grid data={entrances} columnNum={3} hasLine={true} onClick={handleClickGrid} />
      <List renderHeader={() => '设备信息'}>
        <Item extra={deviceList.length}>设备数</Item>
      </List>
    </div>
  );
}

export default connect(
state => ({
  deviceList: state.device.list
})
)(Index);
