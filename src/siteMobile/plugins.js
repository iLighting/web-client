import { notification } from 'antd';

function onAction ({dispatch, getState}) {
  return function (next) {
    return function (action) {
      // 有err字段则警告错误
      if (action.err) {
        notification.error({
          message: action.type,
          description: action.err
        })
      }
      // 有notification字段则警告
      if (action.notification) {
        let { type, message, description } = action.notification;
        type = type || 'info';
        message = message || action.type;
        notification[type]({
          message, description
        });
      }
      next(action);
    }
  }
}

export default {
  onAction,
}
