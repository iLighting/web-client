import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import NavBar from 'antd-mobile/lib/nav-bar';
import List from 'antd-mobile/lib/list';
import Switch from 'antd-mobile/lib/switch';
import WhiteSpace from 'antd-mobile/lib/white-space';
import Icon from 'antd-mobile/lib/icon';


const Item = List.Item;
const Brief = Item.Brief;

const Scene = ({
  history,
  sceneList,
  currentScene,
  currentMode,
  router,
  // action
  setSceneId,
  setModeManual,
  setModeStaticScene,
}) => {

  const isStaticSceneMode = currentMode == 'static';

  function handleModeChange(checked) {
    checked ? setModeStaticScene() : setModeManual();
  }

  function handleSceneSelect(scene) {
    setSceneId(scene.id);
  }

  function genDesc() {
    return isStaticSceneMode ? '场景功能已启用' : `当前为 ${currentMode} 模式，切换至场景模式以启用场景功能`;
  }

  return (
    <div>
      <NavBar 
          leftContent="返回" 
          onLeftClick={() => history.goBack()}
        >场景</NavBar>
      <WhiteSpace />
      <List renderFooter={genDesc}>
        <Item extra={<Switch checked={isStaticSceneMode} onChange={handleModeChange} />}>场景模式</Item>
      </List>
      {
        isStaticSceneMode && sceneList && (
          <List>
            {sceneList.map(scene => (
              <Item 
                key={scene.id} 
                multipleLine
                extra={scene.id == currentScene && <Icon type="check-circle-o" />}
                onClick={handleSceneSelect.bind(null, scene)}
              >
                {scene.name}
                <Brief>含 {scene.items.length} 个光源</Brief>
              </Item>
            ))}
          </List>
        )
      }
    </div>
  )
}

export default connect(
  state => ({
    sceneList: state.staticScene.list,
    currentScene: state.sys.sceneId,
    currentMode: state.sys.mode,
  }),
  dispatch => ({
    setSceneId: (id) => dispatch({type: 'sys/setSceneId', payload: id}),
    setModeManual: () => dispatch({type: 'sys/setMode', payload: 'manual'}),
    setModeStaticScene: () => dispatch({type: 'sys/setMode', payload: 'static'}),
  })
)(Scene);