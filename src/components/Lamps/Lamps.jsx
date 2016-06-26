import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Row, Col} from 'antd';
import ManualLayout from '../../layouts/ManualLayout/ManualLayout';
import LampList from './LampList';
import LampPanel from './LampPanel';
import lampsActions from '../../actions/lamps';
import styles from './Lamps.module.less';

class Lamps extends Component {
  componentWillMount() {
    this.fetchLampsSummary()
  }
  fetchLampsSummary() {
    this.props.dispatch(lampsActions.lampsGet());
  }
  handleSelect(id, rowRec) {
    this.context.router.push("/lamps/"+id);
  }
  handleNavigate(item) {
    switch (item.key) {
      case "sensor":
        this.context.router.push("/sensor");
        break;
    }
  }
  get currentLampObject() {
    let obj = this.props.lamps.lamps[this.props.lamps.currentLamp];
    return obj? obj: undefined;
  }
  render() {
    const self = this;
    return (
      <ManualLayout activeKey="lamps" onNavigate={self.handleNavigate.bind(self)}>
        <div className={styles.wrapper}>
          <Row gutter={15}>
            <Col span={5}>
              <LampList
                activeId={self.props.params.id || ""}
                lamps={self.props.lamps.lamps}
                onSelect={self.handleSelect.bind(self)}
              />
            </Col>
            <Col span={19}>
              {
                self.props.children || <div className={styles.notice}>请从列表中选择一个光源</div>
              }
            </Col>
          </Row>
        </div>
      </ManualLayout>
    )
  }
}

Lamps.contextTypes = {
  router: PropTypes.object.isRequired
}

module.exports = connect(
  (state) => ({
    lamps: state.lamps
  })
)(Lamps);
