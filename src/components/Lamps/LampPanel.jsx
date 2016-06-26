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
  get lampId() {
    return this.props.routeParams.id;
  }
  get lampObj() {
    const self = this;
    const lid = self.lampId;
    return self.props.lamps[lid];
  }
  handleChangeLevel(level) {
    this.props.dispatch(lampsActions.lampsOneSetLevel(this.lampId, level));
  }
  render() {
    const self = this;
    return (
      self.lampObj?
        <div>
          <Spin spinning={self.props.isLoading}>
            <Card title="基本信息">
              <p>名称：{self.lampObj.name}</p>
            </Card>
            <Gutter />
            <Card title="监控">
              <p>亮度：</p>
              <Slider
                min={0}
                max={100}
                marks={sliderMarks}
                disabled={self.props.isLoading}
                value={self.lampObj.level}
                onChange={self.handleChangeLevel.bind(self)}
              />
            </Card>
          </Spin>
        </div> :
        <div>光源ID错误，请重新选择</div>
    )
  }
}

LampPanel.propTypes = {
  lamps: PropTypes.object.isRequired
}

module.exports = connect(
  (state) => ({
    lamps: state.lamps.lamps,
    isLoading: state.lamps.loading
  })
)(LampPanel);
