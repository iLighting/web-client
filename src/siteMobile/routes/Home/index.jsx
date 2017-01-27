import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Grid from 'antd-mobile/lib/grid';
import './index.module.less';

const entrances = [{
  text: '手动',
  link: '/manual/all',
}, {
  text: '场景',
  link: '#',
}, {
  text: '关于',
  link: '/about',
}]

const Index = ({
  history
}) => {

  function handleClickGrid (el) {
    history.push(el.link);
  }

  return (
    <div>
      <h3 style={{textAlign: 'center'}}>iLight<br/>智能照明</h3>
      <Grid data={entrances} columnNum={3} hasLine={true} onClick={handleClickGrid} />
      <p>芝士就是力量，法国就是培根</p>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
