import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SegmentedControl from 'antd-mobile/lib/segmented-control';
import NavBar from 'antd-mobile/lib/nav-bar';
import WhiteSpace from 'antd-mobile/lib/white-space';
import List from 'antd-mobile/lib/list';
import { pickAppByType } from '../../utils/device';

const Item = List.Item;
const Brief = Item.Brief;

const classifications = [
  {text: '全部', type: ''},
  {text: '光源', type: 'lamp'},
  {text: '照度', type: 'illuminance'},
  {text: '温度', type: 'temperature'},
]

const ClassificationEntrance = ({type}) => {
  let index = 0;
  for (let i=0; i<classifications.length; i++) {
    if (classifications[i].type === type) {
      index = i;
      break;
    }
  }
  return (
    <SegmentedControl
      values={classifications.map(c => c.text)}
      selectedIndex={index}
    />
  )
}

const AppList = ({
  apps,
  onClick,
}) => {
  function handleItemClick (app) {
    onClick && onClick(app);
  }
  return (
    <List>
      {apps.map(app => (
        <Item 
          key={app.id}
          arrow="horizontal"
          multipleLine
          onClick={handleItemClick.bind(null, app)}
        >
          {app.name}
          <Brief>TODO</Brief>
        </Item>
      ))}
    </List>
  )
}

function genTypeAppListNode (type) {
  return ({
    deviceList
  }) => {
    const apps = pickAppByType(deviceList, type);
    function handleAppClick (app) {}
    return (
      <div>
        <WhiteSpace />
        <ClassificationEntrance type={type} />
        <WhiteSpace />
        <AppType apps={apps} onClick={handleAppClick}/>
      </div>
    )
  }
}

function genConnectedTypeAppListNode (type) {
  return connect(
    state => ({
      deviceList: state.device.list
    })
  )(genTypeAppListNode(type))
}



export genConnectedTypeAppListNode() as AllApp;