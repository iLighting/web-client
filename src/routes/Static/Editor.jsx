import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Alert } from 'antd';
import SceneMenu from './comps/Menu';
// CodeMirror
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');


const codeOptions = {
  lineNumbers: true,
  mode: {name: 'javascript', json: true}
};

function pickNeeded(sceneObj) {
  if (!sceneObj) return sceneObj;
  const re = _.pick(sceneObj, ['name', 'items']);
  re.items = _.map(re.items, item => _.pick(item, ['ieee', 'ep', 'scenePayload']));
  return re;
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.tempCode = '';
    this.state = {
      err: ''
    }
  }
  handleSelectScene(e) {
    this.props.selectScene(e.key)
  }
  handleChange(code) {
    this.tempCode = code;
  }
  handleSave() {
    const { currentId } = this.props;
    try {
      const obj = JSON.parse(this.tempCode);
      this.props.saveScene(currentId, obj);
      this.setState({err: ''});   
    } catch (e) {
      this.setState({err: e.toString()})
    }
  }
  render() {
    const { list, currentId } = this.props;
    const currentScene = pickNeeded(_.find(list, scene => scene.id === currentId));
    if (currentScene) this.tempCode = JSON.stringify(currentScene);
    return (
      <div>
        <SceneMenu name="editor" />
        <Row gutter={8}>
          <Col span={4}>
            <Menu selectedKeys={[currentId]} onClick={this.handleSelectScene.bind(this)}>
              {
                list.map(scene => (
                  <Menu.Item key={scene.id}>{scene.name}</Menu.Item>
                ))
              }
            </Menu>
          </Col>
          <Col span={20}>
            {
              currentScene ? 
              <div>
                <header style={{textAlign: 'right'}}>
                  <Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
                </header>
                { this.state.err && <Alert message={this.state.err} type="error" />}
                <CodeMirror
                  value={JSON.stringify(currentScene, null, 2)}
                  onChange={this.handleChange.bind(this)}
                  options={codeOptions}
                />
              </div> :
              <div>请选择场景</div>
            }
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(
  state => ({
    list: state.staticScene.list,
    listFetching: state.staticScene.listFetching,
    listFetchErr: state.staticScene.listFetchErr,
    currentId: state.staticSceneEditor.currentId
  }),
  dispatch => ({
    selectScene(id) { dispatch({type: 'staticSceneEditor/selectScene', payload: id}) },
    saveScene(id, scene) { dispatch({type: 'staticScene/setScene', payload: [id, scene]}) },
  })
)(Editor);