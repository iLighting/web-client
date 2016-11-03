import React from 'react';
import { connect } from 'dva';
import { Radio } from 'antd';


function ModeSwitcher ({
  mode, 
  fetching,
  err,
  onChange
}) {

  function onRadioChange(event) {
    onChange && onChange(event.target.value);
  }

  return (
    <div>
      <Radio.Group onChange={onRadioChange} value={mode}>
        <Radio.Button value='manual'>手动模式</Radio.Button>
        <Radio.Button value='static'>场景模式</Radio.Button>
      </Radio.Group>
    </div>
  )

}

export default connect(
  state => ({
    mode: state.mode.name,
    fetching: state.mode.fetching,
    err: state.mode.err
  }),
  dispatch => ({
    onChange: mode => dispatch({type: 'mode/setRemote', payload: mode})
  })
)(ModeSwitcher)