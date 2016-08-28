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
    this.props.onFetch();
  }
  handleSelect = lamp => {
    this.props.onSelect(lamp);
    this.context.router.push("/lamps/"+lamp._id);
  };
  handleNavigate = item => {
    switch (item.key) {
      case "sensor":
        this.context.router.push("/sensor");
        break;
    }
  };
  get currentLampObject() {
    let obj = this.props.lamps.lamps[this.props.lamps.currentLamp];
    return obj? obj: undefined;
  }
  render() {
    const { handleNavigate, handleSelect } = this;
    const { lamps, children } = this.props;
    const { _id:activeId } = lamps.current;
    return (
      <ManualLayout activeKey="lamps" onNavigate={handleNavigate}>
        <div className={styles.wrapper}>
          <Row>
            <Col span={5}>
              <LampList
                activeId={activeId || ""}
                lamps={lamps.lamps.map(item => ({...item, id: item._id}))}
                loading={lamps.loading}
                onSelect={handleSelect}
              />
            </Col>
            <Col span={19}>
              {
                <div className={styles.notice}>请从列表中选择一个光源</div>
              }
            </Col>
          </Row>
        </div>
      </ManualLayout>
    )
  }
}

Lamps.propTypes = {
  lamps: PropTypes.shape({
    lamps: PropTypes.array.isRequired,
    current: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.any,
  onFetch: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

Lamps.contextTypes = {
  router: PropTypes.object,
}

module.exports = connect(
  state => ({
    lamps: state.lamps,
  }),
  dispatch => ({
    onFetch: () => {dispatch(lampsActions.lampsGet())},
    onSelect: lamp => {dispatch(lampsActions.lampsSelect(lamp))},
  })
)(Lamps);
