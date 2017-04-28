import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import _ from 'lodash';
import moment from 'moment';
import {
  Menu,
  Col,
  Row,
  Card,
  Form,
  Input,
  InputNumber,
  TimePicker,
  Button,
  Switch,
  Select,
  Modal,
  Icon,
  Spin
} from 'antd';
import SceneMenu from './comps/Menu';
// CodeMirror
import CodeMirror from 'react-codemirror';
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');

const Option = Select.Option;
const FormItem = Form.Item;

const judgePolicyMap = {
  'lt': {
    'title': '小于',
    'payloadType': 'number',
  },
  'gt': {
    'title': '大于',
    'payloadType': 'number',
  },
}

class AddRuleDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ieee: null,
      ep: null,
      type: null,
      payload: null
    }
  }
  filterAppsByIeee() {
    const { ieee } = this.state;
    const { devices } = this.props;
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].ieee === ieee) {
        return devices[i].apps
      }
    }
    return [];
  }
  handleCancel() { this.props.onCancel && this.props.onCancel() }
  handleSure() {
    const { ieee, ep, type, payload } = this.state;
    if (ieee && ep && type && payload) {
      this.props.onSure && this.props.onSure(this.state)
    }
  }
  handleSelectIeee(ieee) { this.setState({ ieee, ep: null, type: null, payload: null }) }
  handleSelectEp(ep) { this.setState({ ep: +ep }) }
  handleSelectType(type) { this.setState({ type }) }
  genPayloadNode() {
    const policy = judgePolicyMap[this.state.type];
    if (policy) {
      const { payloadType } = policy;
      if (payloadType == 'number') {
        const handler = value => this.setState({ payload: +value })
        return <InputNumber value={this.state.payload} onChange={handler} />
      }
      else {
        return <Input disabled value="未定义" />
      }
    }
    return <Input disabled value="尚未指定" />
  }
  render() {
    const { devices, visible } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
    return (
      <Modal
        title="增加一条规则"
        width={500}
        visible={visible}
        onCancel={this.handleCancel.bind(this)}
        onOk={this.handleSure.bind(this)}
      >
        <Form>
          <FormItem label="MAC地址" {...formItemLayout}>
            <Select value={this.state.ieee} onSelect={this.handleSelectIeee.bind(this)}>
              {devices.map(dev => {
                const { name, ieee } = dev;
                return <Option key={ieee} value={ieee}>{`${ieee} (${name})`}</Option>
              })}
            </Select>
          </FormItem>
          <FormItem label="端点" {...formItemLayout}>
            <Select value={this.state.ep + ''} onSelect={this.handleSelectEp.bind(this)}>
              {this.filterAppsByIeee().map(app => {
                const { name, endPoint } = app;
                return <Option key={endPoint} value={endPoint + ''}>{`${endPoint} (${name})`}</Option>
              })}
            </Select>
          </FormItem>
          <FormItem label="规则" {...formItemLayout}>
            <Select value={this.state.type} onSelect={this.handleSelectType.bind(this)}>
              {Object.keys(judgePolicyMap).map(type => {
                const { title, payloadType } = judgePolicyMap[type];
                return <Option key={type} value={type}>{title}</Option>
              })}
            </Select>
          </FormItem>
          <FormItem label="参数" {...formItemLayout}>
            {this.genPayloadNode()}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
AddRuleDialog.propTypes = {
  devices: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  onSure: PropTypes.func,
}
AddRuleDialog = connect(
  state => ({
    devices: state.device.list,
  })
)(AddRuleDialog);

class ChooserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      scene: props.scene,
      timeRange: ['00:00', '23:59'],
      rules: props.rules,
      addRuleDialogVisible: false
    }
  }
  componentWillReceiveProps(nextProps) {
    const { name, scene, timeRange, rules } = nextProps;
    this.setState({ name, scene, timeRange, rules });
  }
  handleChangeName(event) { const name = event.target.value; this.setState({ name }) }
  handleChangeTimeRange_0(time) {
    this.setState({
      timeRange: [time.format('HH:mm'), this.state.timeRange[1]]
    })
  }
  handleChangeTimeRange_1(time) {
    this.setState({
      timeRange: [this.state.timeRange[0], time.format('HH:mm')]
    })
  }
  handleChangeTimeRangeToWholeDay() {
    this.setState({
      timeRange: ['00:00', '23:59'],
    })
  }
  handleChangeScene(sid) { this.setState({ scene: sid }) }
  handleClickAddRule() {
    this.setState({ addRuleDialogVisible: true })
  }
  handleCancelAddRule() {
    this.setState({ addRuleDialogVisible: false })
  }
  handleAddRuleSure({ ieee, ep, type, payload }) {
    this.setState({
      addRuleDialogVisible: false,
      rules: this.state.rules.concat([{ ieee, ep, type, payload }])
    })
  }
  handleDeleteRule(index) {
    const rules = this.state.rules.filter((r, rIndex) => rIndex !== index);
    this.setState({ rules })
  }
  handleSave() {
    this.props.onSave && this.props.onSave({
      id: this.props.gid,
      name: this.state.name,
      scene: this.state.scene,
      timeRange: this.state.timeRange,
      rules: this.state.rules,
    });
  }
  render() {
    const { gid, sceneList, extraBtns } = this.props;
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    }
    return (
      <div>
        <AddRuleDialog
          visible={this.state.addRuleDialogVisible}
          onSure={this.handleAddRuleSure.bind(this)}
          onCancel={this.handleCancelAddRule.bind(this)}
        />
        <Form>
          <FormItem label="切换器ID" {...layout}>
            <p>{gid}</p>
          </FormItem>
          <FormItem label="名称" {...layout}>
            <Input value={this.state.name} onChange={this.handleChangeName.bind(this)} />
          </FormItem>
          <FormItem label="场景" {...layout}>
            <Select value={this.state.scene} onSelect={this.handleChangeScene.bind(this)}>
              {
                sceneList.map(s => <Option key={s.id}>{s.name}</Option>)
              }
            </Select>
          </FormItem>
          <FormItem label='时间约束' {...layout}>
            从 <TimePicker value={moment(this.state.timeRange[0], 'HH:mm')} format='HH:mm' onChange={this.handleChangeTimeRange_0.bind(this)} />
            到 <TimePicker value={moment(this.state.timeRange[1], 'HH:mm')} format='HH:mm' onChange={this.handleChangeTimeRange_1.bind(this)} />
            （<a onClick={this.handleChangeTimeRangeToWholeDay.bind(this)}>设为全天</a>）
          </FormItem>
          <FormItem label="规则列表" {...layout}>
            {
              this.state.rules.map((rule, index) => (
                <p key={index}>
                  {`${rule.ieee}:${rule.ep} ${judgePolicyMap[rule.type].title} ${rule.payload}`}
                  <a onClick={this.handleDeleteRule.bind(this, index)} >(删除)</a>
                </p>
              ))
            }
            <p><a onClick={this.handleClickAddRule.bind(this)}>增加一条规则</a></p>
          </FormItem>
        </Form>
        <Row>
          <Col span={20} offset={4}>
            <Button type="primary" onClick={this.handleSave.bind(this)}>保存</Button>
            {extraBtns}
          </Col>
        </Row>
      </div>
    )
  }
}
ChooserView.propTypes = {
  gid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scene: PropTypes.string.isRequired,
  timeRange: PropTypes.array.isRequired,
  rules: PropTypes.array.isRequired,
  sceneList: PropTypes.array.isRequired,
  extraBtns: PropTypes.array,
  onSave: PropTypes.func,
}
ChooserView = connect(
  state => ({
    sceneList: state.staticScene.list
  })
)(ChooserView)


const SideMenu = ({
  selectedId,
  groups
}) => (
    <Menu selectedKeys={[selectedId]}>
      {
        groups.map(group => (
          <Menu.Item key={group.id}>
            <Link to={`/staticScene/chooser/edit/${group.id}`}>{group.name}</Link>
          </Menu.Item>
        ))
      }
      <Menu.Item key="add">
        <Link to={`/staticScene/chooser/add`}>新增切换器 +</Link>
      </Menu.Item>
    </Menu>
  )

// Index
// =================================================

let Index = ({
  groups
}) => (
    <div>
      <SceneMenu name="chooser" />
      <Row gutter={8}>
        <Col span={6}>
          <SideMenu groups={groups} />
        </Col>
        <Col span={18}>从左侧列表选择</Col>
      </Row>
    </div>
  )
Index = connect(
  state => ({
    groups: state.staticSceneChooser.groups,
  })
)(Index)
export default Index;


// Editor
// ==========================================================

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  handleSave({ id, name, scene, timeRange, rules }) {
    this.props.setGroup({ id, name, scene, timeRange, rules });
  }
  handleDel(id) {
    this.props.delGroup(id);
  }
  render() {
    const { groups, groupSetting } = this.props;
    const { id: currentId } = this.props.params;
    const currentGroup = _.find(groups, g => g.id == currentId);
    return (
      <div>
        <SceneMenu name="chooser" />
        <Row gutter={8}>
          <Col span={6}>
            <SideMenu selectedId={currentId} groups={groups} />
          </Col>
          <Col span={18}>
            {
              currentGroup ?
                <Spin spinning={groupSetting} tip={'正在保存'}>
                  <ChooserView
                    gid={currentGroup.id}
                    name={currentGroup.name}
                    scene={currentGroup.scene}
                    timeRange={currentGroup.timeRange}
                    rules={currentGroup.rules}
                    extraBtns={[
                      <Button type="danger" onClick={this.handleDel.bind(this, currentGroup.id)} key='1'>删除</Button>
                    ]}
                    onSave={this.handleSave.bind(this)}
                  />
                </Spin> : '暂无'
            }
          </Col>
        </Row>
      </div>
    )
  }
}
// export Chooser
Editor = connect(
  state => ({
    groups: state.staticSceneChooser.groups,
    groupSetting: state.staticSceneChooser.groupSetting,
  }),
  dispatch => ({
    setGroup(group) { dispatch({ type: 'staticSceneChooser/setGroup', payload: group }) },
    delGroup(id) { dispatch({ type: 'staticSceneChooser/delGroup', payload: id }) }
  })
)(Editor)
export { Editor };


// add New
// ===========================================================

class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.isSavingFlag = false;
  }
  componentWillReceiveProps(nextProps) {
    if (this.isSavingFlag && !nextProps.groupAdding) {
      this.isSavingFlag = false;
      this.props.history.push('/staticScene/chooser')
    }
  }
  handleSave({ id, name, scene, timeRange, rules }) {
    this.props.addGroup({ id, name, scene, timeRange, rules });
    this.isSavingFlag = true;
  }
  render() {
    const { groups, groupAdding } = this.props;
    return (
      <div>
        <SceneMenu name="chooser" />
        <Row gutter={8}>
          <Col span={6}>
            <SideMenu groups={groups} selectedId="add" />
          </Col>
          <Col span={18}>
            <Spin spinning={groupAdding} tip={'正在保存'}>
              <ChooserView
                gid={'暂无'}
                name={''}
                scene={''}
                timeRange={[]}
                rules={[]}
                onSave={this.handleSave.bind(this)}
              />
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }
}
AddNew = connect(
  state => ({
    groups: state.staticSceneChooser.groups,
    groupAdding: state.staticSceneChooser.groupAdding
  }),
  dispatch => ({
    addGroup(group) { dispatch({ type: 'staticSceneChooser/addGroup', payload: group }) },
  })
)(AddNew)
export { AddNew };