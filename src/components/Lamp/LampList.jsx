import React, { Component, PropTypes } from 'react';
import {Table} from 'antd';
import classnames from 'classnames';
import styles from './LampList.module.less';

class LampList extends Component {
  handleRowClick (item) {
    this.props.onSelect(item);
  };
  render() {
    const { handleRowClick } = this;
    const { lamps, loading, activeId } = this.props;
    return (
      <ul className={styles.list}>
        {
          !loading && lamps.map(item => (
            <li
              className={classnames({
                [styles.item]: true,
                [styles.active]: `${item.device}-${item.endPoint}` == activeId,
              })}
              key={item.id}
              title={item.name}
              onClick={handleRowClick.bind(this, item)}
            >
              {item.name}
            </li>
          ))
        }
      </ul>
    )
  }
}

LampList.propTypes = {
  lamps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  activeId: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

module.exports = LampList;
