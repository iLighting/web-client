import {notification} from 'antd';
import sseActions from '../actions/sse';

const sseUrl = "/api/sse";

let errorNotificationOption;

const openNotification = function (options, type="open") {
  let key = (new Date()).valueOf();
  let newOptions = {
    key,
    message: "一条消息",
    description: "暂无描述",
    ...options
  };
  notification[type](newOptions);
  return newOptions;
};

module.exports = function(store) {

  if (!window.sse) {
    window.sse = new EventSource(sseUrl);
  }
  const sse = window.sse;
  sse.onmessage = function(e) {
    store.dispatch(sseActions.sseReceived(e));
  }
  sse.onopen = function() {
    store.dispatch(sseActions.sseStateChange("open"));
  }
  sse.onerror = function(event) {
    store.dispatch(sseActions.sseStateChange("error"));
    errorNotificationOption = openNotification({
      message: "服务器推送服务丢失",
      description: "尝试刷新页面解决",
      duration: null,
    }, "error");
  }

  return sse;

}
