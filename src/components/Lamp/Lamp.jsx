import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import LampList from './LampList';
import { Row, Col, Slider, Card, Form, Button, Input } from 'antd';
import lampsActions from '../../actions/lamps';
import styles from './Lamp.module.less';

const sliderMarks = {
  0: "关",
  25: "25%",
  50: "50%",
  75: "75%",
  100: "全亮"
}

const Gutter = () => <div className={styles["gutter"]}></div>;

@Form.create()
class LampInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }
  handleClickEdit = () => {
    this.setState({isEditing: true});
  }
  handleSubmit = e => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form;
    const { name } = getFieldsValue();
    this.handleCancel();
    this.props.onChange({ name });
  }
  handleCancel = () => {
    this.setState({isEditing: false});
  }
  render () {
    const { name, type } = this.props;
    const { isEditing } = this.state;
    const { getFieldProps } = this.props.form;
    const itemSty = {
      width: '200px'
    };
    return (
      isEditing ?
      <Form horizontal onSubmit={this.handleSubmit}>
        <Form.Item label="名称">
          <Input
            type="text"
            placeholder="请输入新名称"
            style={itemSty}
            {...getFieldProps('name', {initialValue: name})}
          />
        </Form.Item>
        <Form.Item label="类型">
          <Input type="text" readOnly value={type} style={itemSty} />
        </Form.Item>
        <Button type="primary" htmlType="submit" size="small">确定</Button>
      </Form> :
      <div>
        <p>名称：{name}</p>
        <p>类型：{type}</p>
        <p style={{marginTop: 8}}>
          <Button type="ghost" size="small" onClick={this.handleClickEdit}>编辑</Button>
        </p>
      </div>
    )
  }
}
LampInfo.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

class Lamp extends Component {
  componentDidMount() {
    this.props.onFetchLamps();
    this.fetchDetail(...this.getNwkEp());
  }
  getNwkEp = () => {
    const { nwk, ep } = this.props.params;
    return [parseInt(nwk, 10), parseInt(ep, 10)];
  }
  fetchDetail = (nwk, ep) => {
    this.props.onFetchDetail(nwk, ep);
  }
  handleSelect = lamp => {
    const { device: nwk, endPoint: ep } = lamp;
    this.context.router.push(`/lamp/nwk/${nwk}/ep/${ep}`);
    this.fetchDetail(nwk, ep);
    // this.props.onSelectLamp(lamp);
  }
  handleInfoChange = ({name, type}) => {
    name && this.handleChangeName(name);
  }
  handleChangeName = name => {
    const [nwk, ep] = this.getNwkEp();
    this.props.onChangeName(nwk, ep, name);
  }
  handleChangeLevel = level => {
    const [nwk, ep] = this.getNwkEp();
    console.log(level);
    this.props.onChangePayload(nwk, ep, {
      ...this.props.current.payload,
      level
    });
  }
  render() {
    const [nwk, ep] = this.getNwkEp();
    const activeId = `${nwk}-${ep}`;
    const { lamps, current,  currentLoading, currentErr } = this.props;
    return (
      <Row>
        <Col span={4}>
          <LampList
            lamps={lamps.map(item => ({...item, id: item._id, title: '暂无'}))}
            loading={false}
            activeId={activeId}
            onSelect={this.handleSelect}
          />
        </Col>
        <Col span={20}>
          {
            currentLoading ?
            <div className={styles.panel}>载入中</div> :
            <div className={styles.panel}>
              <Card title="基本信息">
                <LampInfo
                  name={current.name}
                  type={current.type}
                  onChange={this.handleInfoChange}
                />
              </Card>
              <Gutter />
              <Card title="监控">
                <p>亮度：</p>
                <Slider
                  min={0}
                  max={100}
                  marks={sliderMarks}
                  value={current.payload.level}
                  onChange={this.handleChangeLevel}
                />
              </Card>
            </div>
          }
        </Col>
      </Row>
    )
  }
}

Lamp.contextTypes = {
  router: PropTypes.object.isRequired
}

Lamp.propTypes = {
  lamps: PropTypes.array.isRequired,
  current: PropTypes.object.isRequired,
  currentLoading: PropTypes.bool.isRequired,
  currentErr: PropTypes.node.isRequired,
  onFetchLamps: PropTypes.func.isRequired,
  // onSelectLamp: PropTypes.func.isRequired,
  onFetchDetail: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePayload: PropTypes.func.isRequired,
}

module.exports = connect(
  state => ({
    lamps: state.lamps.lamps,
    current: state.lamps.current,
    currentLoading: state.lamps.currentLoading,
    currentErr: state.lamps.currentErr,
  }),
  dispatch => ({
    onFetchLamps: () => { dispatch(lampsActions.lampsGet()) },
    // onSelectLamp: () => {},
    onFetchDetail: (nwk, ep) => { dispatch(lampsActions.lampsGetDetail(nwk, ep)) },
    onChangeName: (nwk, ep, name) => { dispatch(lampsActions.lampsSetName(nwk, ep, name)) },
    onChangePayload: (nwk, ep, payload) => { dispatch(lampsActions.lampsSetPayload(nwk, ep, payload)) },
  })
)(Lamp);
