import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import SegmentedControl from 'antd-mobile/lib/segmented-control';
import NavBar from 'antd-mobile/lib/nav-bar';
import WhiteSpace from 'antd-mobile/lib/white-space';
import List from 'antd-mobile/lib/list';
import { filterAppsByType } from '../../../utils/device';

const Item = List.Item;
const Brief = Item.Brief;

const classifications = [
  { text: '全部', type: 'all', link: '/manual/all' },
  { text: '单色', type: 'lamp', link: '/manual/lamp' },
  { text: '调光', type: 'gray-lamp', link: '/manual/gray-lamp' },
  { text: '照度', type: 'illuminance-sensor', link: '/manual/illuminance-sensor' },
  { text: '温度', type: 'temperature-sensor', link: '/manual/temperature-sensor' },
  { text: '占用', type: 'occupy-sensor', link: '/manual/occupy-sensor' },
  { text: '语音', type: 'asr-sensor', link: '/manual/asr-sensor' },
]

const ClassificationEntrance = ({
  type,
  onClick
}) => {
  let index = 0;
  for (let i = 0; i < classifications.length; i++) {
    if (classifications[i].type === type) {
      index = i;
      break;
    }
  }
  function handleClick(e) {
    const index = e.nativeEvent.selectedSegmentIndex;
    onClick && onClick(classifications[index], index);
  }
  return (
    <SegmentedControl
      values={classifications.map(c => c.text)}
      selectedIndex={index}
      onChange={handleClick}
    />
  )
}

const AppList = ({
  apps,
  onClick,
}) => {
  function handleItemClick(app) {
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
          <Brief>{app.devName}</Brief>
        </Item>
      ))}
    </List>
  )
}

function genTypeAppListNode(type) {
  return ({
    history,
    deviceList
  }) => {
    const apps = filterAppsByType(deviceList, type === 'all' ? '' : type);
    function handleClassificationChange(c) {
      history.push(c.link);
    }
    function handleAppClick(app) {
      history.push(`/manual/nwk/${app.nwk}/ep/${app.endPoint}`);
    }
    return (
      <div>
        <NavBar
          leftContent="返回"
          onLeftClick={() => history.replace('/')}
        >手动控制</NavBar>
        <WhiteSpace />
        <ClassificationEntrance type={type} onClick={handleClassificationChange} />
        <WhiteSpace />
        {
          apps ?
            <AppList apps={apps} onClick={handleAppClick} /> :
            'loading...'
        }
      </div>
    )
  }
}

function genConnectedTypeAppListNode(type) {
  return connect(
    state => ({
      deviceList: state.device.list
    })
  )(genTypeAppListNode(type))
}

export default {
  AllApp: genConnectedTypeAppListNode('all'),
  LampApp: genConnectedTypeAppListNode('lamp'),
  GrayLampApp: genConnectedTypeAppListNode('gray-lamp'),
  IlluminanceApp: genConnectedTypeAppListNode('illuminance-sensor'),
  TemperatureApp: genConnectedTypeAppListNode('temperature-sensor'),
  OccupyApp: genConnectedTypeAppListNode('occupy-sensor'),
  AsrApp: genConnectedTypeAppListNode('asr-sensor'),
}