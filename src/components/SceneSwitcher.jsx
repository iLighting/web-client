import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Select } from 'antd';

const Option = Select.Option;

function SceneSwitcher ({
  staticSceneList,
  sceneId,
  sysMode,
  onChange
}) {

  const shouldDisabled = sysMode === 'manual';
  
  function handleChange(value) {
    onChange && onChange(value);
  }

  return (
    <Select disabled={shouldDisabled} value={sceneId} style={{ width: 120 }} onChange={handleChange} >
      {
        staticSceneList.map(scene => (
          <Option key={scene.id} value={scene.id}>{scene.name}</Option>
        ))
      }
    </Select>
  )
}

export default connect(
  state => ({
    staticSceneList: state.staticScene.list,
    sceneId: state.sys.sceneId,
    sysMode: state.sys.mode,
  }),
  dispatch => ({
    onChange: (id) => dispatch({type: 'sys/setSceneId', payload: id})
  })
)(SceneSwitcher)