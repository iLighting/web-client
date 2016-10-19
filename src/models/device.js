import api from '../services/api';

export default {

  namespace: 'device',

  state: {
    list: [],
    listFetching: false,
    listFetchErr: null,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      dispatch({ type: 'fetchRemote' })
    },
  },

  effects: {
    *fetchRemote ({ payload }, { call, put }) {
      try {
        const deviceList = yield call(api.fetchDeviceList);
        yield put({
          type: 'fetchRemoteSuccess',
          payload: deviceList
        });
      } catch (e) {
        yield put({
          type: 'fetchRemoteFailure',
          err: e.toString()
        });
      }
    },
  },

  reducers: {
    fetchRemote (state, action) {
      return { ...state, listFetching: true, listFetchErr: null };
    },
    fetchRemoteSuccess (state, action) {
      return {...state, listFetching: false, list: action.payload};
    },
    fetchRemoteFailure (state, action) {
      return {...state, listFetching: false, listFetchErr: action.err};
    }
  },

}
