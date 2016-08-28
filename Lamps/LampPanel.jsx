import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Card, Slider, Spin} from 'antd';
import lampsActions from '../../actions/lamps';
import styles from './LampPanel.module.less';

const sliderMarks = {
  0: "关",
  25: "25%",
  50: "50%",
  75: "75%",
  100: "全亮"
}

const Gutter = () => <div className={styles["gutter"]}></div>;

class LampPanel extends Component {
  fetch() {
    const { nwk, ep } = this.props;
    this.props.onFetchDetail(nwk, ep);
  }
  handleChangeName(name) {
    this.props.onChangeName(name);
  }
  handleChangeLevel(level) {
    this.props.onChangeLevel(level);
  }
  render() {
    const { handleChangeLevel } = this;
    const { nwk, ep, loading, err } = this.props;
    return (
      loading ?
        <div>载入中</div> :
        err ?
          <div>{err}</div> :
          <div>
            <Card title="基本信息">
              <p>名称：{'d'}</p>
            </Card>
            <Gutter />
            <Card title="监控">
              <p>亮度：</p>
              <Slider
                min={0}
                max={100}
                marks={sliderMarks}
                value={9}
                onChange={handleChangeLevel}
              />
            </Card>
          </div>
    )
  }
}

LampPanel.propTypes = {
  nwk: PropTypes.number.isRequired,
  ep: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  err: PropTypes.node.isRequired,
  onFetchDetail: PropTypes.func.isRequired,
  onChangeLevel: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
}

module.exports = connect(
  state => ({
    nwk: state.lamps.currentLamp.device || -1,
    ep: state.lamps.currentLamp.endPoint || -1,
    loading: state.lamps.currentLampLoading,
    err: state.lamps.currentLampErr
  }),
  dispatch => ({
    onFetchDetail: (nwk, ep) => {},
    onChangeName: name => {},
    onChangeLevel: level => {}
  })
)(LampPanel);
