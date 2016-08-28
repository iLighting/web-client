import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LampList from './LampList';
import { Row, Col } from 'antd';
import lampsActions from '../../actions/lamps';


class LampContaner extends Component {
  componentDidMount() {
    if (this.props.lamps.length <=0 ) {
      this.props.onFetchLamps();
    }
  }
  handleSelect = lamp => {
    const { device: nwk, endPoint: ep } = lamp;
    this.context.router.push(`/lamp/nwk/${nwk}/ep/${ep}`);
    this.props.onSelectLamp(lamp);
  }
  render() {
    const { lamps } = this.props;
    return (
      <Row>
        <Col span={4}>
          <LampList
            lamps={lamps.map(item => ({...item, id: item._id, title: '暂无'}))}
            loading={false}
            activeId={''}
            onSelect={this.handleSelect}
          />
        </Col>
        <Col span={20}>
          <div>请选择一个灯具</div>
        </Col>
      </Row>
    )
  }
}

LampContaner.contextTypes = {
  router: PropTypes.object.isRequired
}

LampContaner.propTypes = {
  lamps: PropTypes.array.isRequired,
  onFetchLamps: PropTypes.func.isRequired,
  onSelectLamp: PropTypes.func.isRequired,
}

module.exports = connect(
  state => ({
    lamps: state.lamps.lamps,
  }),
  dispatch => ({
    onFetchLamps: () => { dispatch(lampsActions.lampsGet()) },
    onSelectLamp: () => {}
  })
)(LampContaner);
