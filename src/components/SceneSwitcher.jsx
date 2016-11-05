import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Select, Row, Col, Button } from 'antd';

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

  function handleFresh() {
    onChange && sceneId && onChange(sceneId);
  }

  return (
    <span>
      <Select disabled={shouldDisabled} value={sceneId} onChange={handleChange} style={{width: 200}}>
        {
          staticSceneList.map(scene => (
            <Option key={scene.id} value={scene.id}>{scene.name}</Option>
          ))
        }
      </Select>
      <Button disabled={shouldDisabled} onClick={handleFresh} style={{marginLeft: 8}}>刷新场景</Button>
    </span>
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