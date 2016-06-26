import React, { Component, PropTypes } from 'react';
import {Table} from 'antd';
import styles from './LampList.module.less';

const genCols = function() {
  return [
    {
      key: "name",
      dataIndex: "name",
      title: "光源列表",
      className: styles["list-item"]
    }
  ]
};

/**
 * [genDataSource description]
 * @param  {Array} lamps [description]
 * @return {Array}       [description]
 */
const genDataSource = function (lamps) {
  let ids = Object.keys(lamps);
  return ids.map(id => ({
    key: id,
    name: lamps[id].name,
  }))
}

class LampList extends Component {
  handleRowClick(rec, index) {
    this.props.onSelect(rec.key, rec);
  }
  get dataSource() {
    const self = this;
    const lamps = self.props.lamps;
    const ids = Object.keys(lamps);
    const routerId = self.props.activeId;
    return ids.map(id => {
      const st = routerId==id? styles['list-item-inner--active']:"";
      return {
        key: id,
        name: <div className={st}>{lamps[id].name}</div>
      }
    })
  }
  render() {
    const self = this;
    return (
      <Table
        columns={genCols()}
        dataSource={self.dataSource}
        onRowClick={self.handleRowClick.bind(self)}
        showHeader={false}
        useFixedHeader={false}
        bordered={true}
        pagination={false}
      />
    )
  }
}

LampList.propTypes = {
  lamps: PropTypes.object.isRequired,
  activeId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  onSelect: PropTypes.func.isRequired
}

module.exports = LampList;
