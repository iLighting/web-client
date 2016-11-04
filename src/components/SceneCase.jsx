import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';


function SceneCase ({staticSceneList, sceneId, fetching, err}) {

  if (fetching) {
    return <span>加载中...</span>
  } else if (err) {
    return <span>{err}</span>
  } else {
    const scene = _.find(staticSceneList, item => item.id === sceneId);
    return <span>{scene ? scene.name : '暂无'}</span>
  }

}

export default connect(
  state => ({
    staticSceneList: state.staticScene.list,
    sceneId: state.sys.sceneId,
    fetching: state.sys.sceneIdFetching,
    err: state.sys.sceneIdErr,
  })
)(SceneCase)