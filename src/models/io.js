import io from 'socket.io-client';
import api from '../services/api';

const url = '/api/io';

export default {

  namespace: 'io',

  state: {
    connecting: false,
    err: null,
    count: 0,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      const socket = io.connect(url);
      dispatch({ type: 'connect'});
      // 监听事件
      socket
        .on('connect', () => {
          dispatch({type: 'connectSuccess'});
        })
        .on('error', err => {
          dispatch({type: 'connectFailure', err: err.toString()});
        })
        .on('reconnect', () => {
          dispatch({
            type: 'reConnectSuccess',
            notification: {
              type: 'success',
              description: 'io重连成功'
            }
          });
        })
        .on('data', ({type, payload}) => {
          dispatch({type: 'receiveSuccess', payload: [type, payload]});
        })
    },
  },

  effects: {
    *reConnectSuccess (action, {put}) {
      yield [
        put({ type: 'device/fetchRemote' }),
        put({ type: 'sys/fetchMode' }),
        put({ type: 'sys/fetchSceneId' }),
        put({ type: 'staticScene/fetchRemote' }),
      ]
    },
    *receiveSuccess (action, {put}) {
      const [ eventName, eventPayload ] = action.payload;
      switch (eventName) {
        case 'device/join.success':
          yield put({type: 'device/fetchRemote'});
          break;
        case 'device/change.success':
          // TODO: 改为获取单个设备信息
          yield put({type: 'device/fetchRemote'});
          break;
        case 'sys/modeChange.success':
          yield put({type: 'sys/fetchModeSuccess', payload: eventPayload});
          break;
        case 'sys/sceneIdChange.success':
          yield put({type: 'sys/fetchSceneIdSuccess', payload: eventPayload});
          break;
      }
    }
  },

  reducers: {
    connect (state, action) {
      return {...state, connecting: true}
    },
    connectSuccess (state, action) {
      return {...state, connecting: false}
    },
    connectFailure (state, action) {
      return {...state, connecting: false, err: action.err}
    },
    reConnectSuccess (state, action) {
      return {...state, connecting: false}
    },
    receiveSuccess (state, action) {
      return {...state, count: state.count+1}
    }
  },

}
