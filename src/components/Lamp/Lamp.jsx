import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import LampList from './LampList';
import { Row, Col, Slider, Card, Form, Button, Input } from 'antd';
import lampsActions from '../../actions/lamps';
import LampMeta from './LampMeta';
import styles from './Lamp.module.less';


const Gutter = () => <div className={styles["gutter"]}></div>;


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
                <LampMeta
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
