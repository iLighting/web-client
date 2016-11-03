import React from 'react';
import { connect } from 'dva';


function ModeCase ({mode, fetching, err}) {

  if (fetching) {
    return <span>加载中...</span>
  } else if (err) {
    return <span>{err}</span>
  } else {
    let name;
    switch (mode) {
      case 'manual': name = '手动'; break;
      case 'staticScene':
      case 'scene': name = '静态场景'; break;
      default: name = mode;
    }
    return <span>{name}</span>
  }

}

export default connect(
  state => ({
    mode: state.mode.name,
    fetching: state.mode.fetching,
    err: state.mode.err
  })
)(ModeCase)