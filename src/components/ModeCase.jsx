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
      case 'manual': name = '手动模式'; break;
      case 'static': name = '场景模式'; break;
      default: name = mode;
    }
    return <span>{name}</span>
  }

}

export default connect(
  state => ({
    mode: state.sys.mode,
    fetching: state.sys.modeFetching,
    err: state.sys.modeErr
  })
)(ModeCase)