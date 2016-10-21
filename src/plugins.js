import { notification } from 'antd';

function onAction ({dispatch, getState}) {
  return function (next) {
    return function (action) {
      if (action.err) {
        notification.error({
          message: action.type,
          description: action.err
        })
      }
      next(action);
    }
  }
}

export default {
  onAction,
}
