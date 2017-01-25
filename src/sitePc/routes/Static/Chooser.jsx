import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import {
  Menu,
  Col,
  Row,
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Switch,
  Select
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
    'title': 'less then',
    'payloadType': 'number',
  },
  'gt': {
    'title': 'great then',
    'payloadType': 'number',
  },
}

/**
 * @param {Array} devices
 */
function genIeeeSelector(devices) {
  return (
    <Select>
      {devices.map(dev => {
        const {name, ieee} = dev;
        return <Option key={ieee} value={ieee}>{`${name} (${ieee})`}</Option>
      })}
    </Select>
  )
}

function genPolicyTypeSelector(policyMap) {
  return (
    <Select>
      {_.map(policyMap, (config, name) => <Option key={name}>{config.title}</Option>)}
    </Select>
  )
}

class ChooserView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uuid = 0;
  }
  getUuid() {
    return this.uuid++;
  }
  handleTypeChange(type) {
    this.setState({type});
  }
  render() {
    const getUuid = this.getUuid.bind(this);

    const { 
      judgePolicyMap, 
      sceneList, 
      devices,
    } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 15 },
    };
    const formItemLayoutNoLabel = {
      wrapperCol: { span: 15, offset: 4 },
    };
    getFieldDecorator('rules', { initialValue: [getUuid()] });
    console.log(getFieldValue('rules'))
    const ruleNodes = getFieldValue('rules').map((k, index) => {
      return (
        <FormItem {...formItemLayoutNoLabel} key={index}>
          {getFieldDecorator(`rule${k}-ieee`)(genIeeeSelector(devices))}
          {getFieldDecorator(`rule${k}-type`)(genPolicyTypeSelector(judgePolicyMap))}
          {getFieldDecorator(`rule${k}-payload`)(<Input placeholder="按格式输入" />)}
        </FormItem>
      )
    });
    return (
      <Form>
        <FormItem {...formItemLayout} label={'Scene'}>
          {getFieldDecorator('scene')(
            <Select>
              {sceneList.map(s => <Option key={s.id} value={s.id}>{s.name}</Option>)}
            </Select>
          )}
        </FormItem>
        {ruleNodes}
      </Form>
    )
  }
}
ChooserView = Form.create()(ChooserView);
ChooserView = connect(
  state => ({
    sceneList: state.staticScene.list,
    devices: state.device.list,
  })
)(ChooserView);


// chooser
// ===============================================================

const codeOptions = {
  lineNumbers: true,
  mode: {name: 'javascript', json: true}
};

const Chooser = ({
  groups,
  currentId,
  sceneList,
  // callback
  selectGroup
}) => {

  const currentGroup = _.find(groups, g => g.id == currentId);
  
  let tempChooser;

  function handleSelectGroup (e) {
    selectGroup(e.key);
  }

  function handleChange (value) {
    tempChooser = value;
  }

  return (
    <div>
      <SceneMenu name="chooser" />
      <Row gutter={8}>
        <Col span={6}>
          <Menu selectedKeys={[currentId]} onClick={handleSelectGroup}>
            {
              groups.map(group => <Menu.Item key={group.id}>{group.name}</Menu.Item>)
            }
          </Menu>
        </Col>
        <Col span={18}>
          {
            currentGroup ? 
              <CodeMirror
                value={JSON.stringify(_.pick(currentGroup, [
                  'name', 'scene', 'rules',
                ]), null, 2)}
                onChange={handleChange}
                options={codeOptions}
              />: '暂无'
          }
        </Col>
      </Row>
    </div>
  )
}


export default connect(
  state => ({
    groups: state.staticSceneChooser.groups,
    currentId: state.staticSceneChooser.currentId,
  }),
  dispatch => ({
    selectGroup(id) { dispatch({type: 'staticSceneChooser/selectGroup', payload: id}) },
  })
)(Chooser)