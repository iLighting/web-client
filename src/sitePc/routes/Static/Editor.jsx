import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import { Menu, Col, Row, Card, Form, Input, Button, Switch, Alert, Modal, Select, Spin } from 'antd';
import SceneMenu from './comps/Menu';
import { filterAppsByTypes } from '../../../utils/device';

const FormItem = Form.Item;
const Option = Select.Option;

function pickNeeded(sceneObj) {
  if (!sceneObj) return sceneObj;
  const re = _.pick(sceneObj, ['id', 'name', 'items']);
  re.items = _.map(re.items, item => _.pick(item, ['ieee', 'ep', 'scenePayload']));
  return re;
}

class AddConf extends Component {
  componentWillReceiveProps(np) {
    if (np.visiable == false) {
      setTimeout(() => this.props.form.resetFields(), 500);
    }
  }
  getOnOffLampPayloadController() {
    return <Select>
      <Option value={JSON.stringify({ on: true })}>开</Option>
      <Option value={JSON.stringify({ on: false })}>关</Option>
    </Select>
  }
  getGrayLampPayloadController() {
    return <Select>
      {
        [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(level => (
          <Option key={level} value={JSON.stringify({ level })}>{level}%</Option>
        ))
      }
    </Select>
  }
  getPayloadController() {
    const lamp = JSON.parse(this.props.form.getFieldValue('lamp'));
    switch (lamp.type) {
      case 'lamp': return this.getOnOffLampPayloadController();
      case 'gray-lamp': return this.getGrayLampPayloadController();
      default: return <p>暂不支持</p>
    }
  }
  filterLamp() {
    return filterAppsByTypes(this.props.devices, ['lamp', 'gray-lamp']);
  }
  handleCancel() { this.props.onCancel && this.props.onCancel() }
  handleSure() {
    this.props.form.validateFields((err, values) => {
      if (err) { }
      else {
        const lamp = JSON.parse(this.props.form.getFieldValue('lamp'));
        const payload = JSON.parse(this.props.form.getFieldValue('payload'));
        this.props.onSure && this.props.onSure({
          ieee: lamp.ieee,
          ep: lamp.endPoint,
          scenePayload: payload,
        });
      }
    })
  }
  render() {
    const { visiable, devices } = this.props;
    const itemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return (
      <Modal
        title='新增配置'
        visible={visiable}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleSure.bind(this)}
      >
        <Form>
          <FormItem {...itemLayout} label='灯具'>
            {
              getFieldDecorator('lamp', {
                rules: [{ required: true }]
              })(
                <Select placeholder='请选择'>
                  {this.filterLamp().map((lamp, index) => {
                    const { name, endPoint, ieee } = lamp;
                    return <Option key={index} value={JSON.stringify(lamp)}>
                      {`${name} (${ieee}:${endPoint})`}
                    </Option>
                  })}
                </Select>
                )
            }
          </FormItem>
          <FormItem {...itemLayout} label='参数'>
            {
              getFieldValue('lamp') && getFieldDecorator('payload', {
                rules: [{ required: true }]
              })(this.getPayloadController())
            }
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
AddConf = Form.create()(AddConf);
AddConf = connect(
  state => ({
    devices: state.device.list,
  })
)(AddConf);
AddConf.propTypes = {
  visiable: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onSure: PropTypes.func
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addConfVisiable: false,
    }
  }
  handleLaunchAddConf(e) {
    e.preventDefault();
    this.setState({ addConfVisiable: true });
  }
  handleAddConfCancel() {
    this.setState({ addConfVisiable: false });
  }
  handleAddConfSure(conf) {
    this.setState({ addConfVisiable: false });
    this.props.form.setFieldsValue({
      items: this.props.form.getFieldValue('items').concat(
        _.pick(conf, ['ieee', 'ep', 'scenePayload'])
      )
    })
  }
  handleConfItemRemove(index, e) {
    e.preventDefault();
    this.props.form.setFieldsValue({
      items: this.props.form.getFieldValue('items').filter((_, i) => i !== index)
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) { }
      else {
        const { name, items } = this.props.form.getFieldsValue();
        this.props.onSave && this.props.onSave({
          ...this.props.scene,
          name, items
        })
      }
    })
  }
  render() {
    const scene = this.props.scene;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const itemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
    const btnLayout = { wrapperCol: { offset: 4 } };
    getFieldDecorator('items', { initialValue: scene.items });
    return (
      <div>
        <AddConf
          visiable={this.state.addConfVisiable}
          onCancel={this.handleAddConfCancel.bind(this)}
          onSure={this.handleAddConfSure.bind(this)}
        />
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem label='ID' {...itemLayout}>
            <p>{scene.id || 'null'}</p>
          </FormItem>
          <FormItem label='名称' {...itemLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true }],
              initialValue: scene.name || '未命名',
            })(
              <Input placeholder='name' />
              )}
          </FormItem>
          <FormItem label='配置' {...itemLayout}>
            {
              getFieldValue('items').map((item, index) => (
                <p
                  key={index}
                >
                  {item.ieee}:{item.ep} {JSON.stringify(item.scenePayload)}
                  （<a onClick={this.handleConfItemRemove.bind(this, index)}>删除</a>）
                </p>
              ))
            }
          </FormItem>
          <FormItem {...btnLayout}>
            <a onClick={this.handleLaunchAddConf.bind(this)}>添加一条配置 +</a>
          </FormItem>
          <FormItem {...btnLayout}>
            <Button type="primary" htmlType="submit" size="large">保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
Editor.propTypes = {
  scene: PropTypes.object.isRequired,
  onSave: PropTypes.func,
}
Editor = Form.create({
  mapPropsToFields: props => ({ name: { value: props.scene.name } })
})(Editor);

class Index extends Component {
  handleSelectScene(e) {
    this.props.selectScene(e.key)
  }
  handleCreateScene() {}
  handleSave(nextScene) {
    const { currentId } = this.props;
    this.props.saveScene(currentId, _.pick(nextScene, ['name', 'items']));
  }
  render() {
    const { list, currentId, isSetting } = this.props;
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
              <Menu.Item onclick={this.handleCreateScene.bind(this)}>新建场景 +</Menu.Item>
            </Menu>
          </Col>
          <Col span={20}>
            {
              currentScene ?
                <Spin spinning={isSetting}>
                  <Editor scene={currentScene} onSave={this.handleSave.bind(this)} /> 
                </Spin> :
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
    isSetting: state.staticScene.setSceneFetching,
    currentId: state.staticSceneEditor.currentId
  }),
  dispatch => ({
    selectScene(id) { dispatch({ type: 'staticSceneEditor/selectScene', payload: id }) },
    saveScene(id, scene) { dispatch({ type: 'staticScene/setScene', payload: [id, scene] }) },
  })
)(Index);