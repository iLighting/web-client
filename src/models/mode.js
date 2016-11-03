/**
 * 系统模式
 */

import api from '../services/api';

export default {
  namespace: 'mode',

  state: {
    name: '',
    fetching: false,
    err: null
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'fetchRemote' })
    },
  },

  effects: {
    *fetchRemote ({ payload }, { call, put }) {
      try {
        const mode = yield call(api.fetchMode);
        yield put({
          type: 'fetchRemoteSuccess',
          payload: mode
        });
      } catch (e) {
        yield put({
          type: 'fetchRemoteFailure',
          err: e.toString()
        });
      }
    },
    *setRemote ({ payload }, { call, put }) {
      try {
        const mode = yield call(api.setMode, payload);
        yield put({
          type: 'setRemoteSuccess',
          payload: mode
        });
      } catch (e) {
        yield put({
          type: 'setRemoteFailure',
          err: e.toString()
        });
      }
    }
  },

  reducers: {
    fetchRemote (state, action) {
      return { ...state, fetching: true, err: null };
    },
    fetchRemoteSuccess (state, action) {
      return {...state, fetching: false, name: action.payload};
    },
    fetchRemoteFailure (state, action) {
      return {...state, fetching: false, err: action.err};
    },
    setRemote (state, action) {
      return { ...state, fetching: true, err: null };
    },
    setRemoteSuccess (state, action) {
      return {...state, fetching: false, name: action.payload};
    },
    setRemoteFailure (state, action) {
      return {...state, fetching: false, err: action.err};
    },
  }
}