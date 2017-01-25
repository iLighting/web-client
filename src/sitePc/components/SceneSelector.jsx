import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Select, Row, Col, Button } from 'antd';

const Option = Select.Option;

/**
 * sceneId
 * onChange
 */
function SceneSelector ({
  staticSceneList,
  sceneId,
  onChange
}) {
  
  function handleChange(value) {
    onChange && onChange(value);
  }

  return (
    <span>
      <Select value={sceneId} onChange={handleChange} style={{width: 200}}>
        {
          staticSceneList.map(scene => (
            <Option key={scene.id} value={scene.id}>{scene.name}</Option>
          ))
        }
      </Select>
    </span>
  )
}

export default connect(
  state => ({
    staticSceneList: state.staticScene.list
  }),
)(SceneSelector)