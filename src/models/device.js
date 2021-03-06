/**
 * 所有的设备信息
 */

import api from '../services/api';
import { replaceAppByNwkEp } from '../utils/device';

export default {

  namespace: 'device',

  state: {
    list: [],
    listFetching: false,
    listFetchErr: null,
    // setAppProps
    setAppPropsFetching: false,
    setAppPropsErr: null,
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
    *setAppProps (action, {call, put}) {
      try {
        const [nwk, ep, props] = action.payload;
        const app = yield call(api.setAppProps, nwk, ep, props);
        yield put({
          type: 'setAppPropsSuccess',
          payload: [nwk, ep, app]
        })
      } catch (e) {
        yield put({
          type: 'setAppPropsFailure',
          err: e.toString()
        })
      }
    }
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
    },
    // setAppProps
    setAppProps (state, action) {
      return {...state, setAppPropsFetching: true, setAppPropsErr: null};
    },
    setAppPropsSuccess (state, action) {
      const [nwk, ep, app] = action.payload;
      return {
        ...state,
        // replace list instance
        list: replaceAppByNwkEp(state.list, nwk, ep, app).concat(),
        setAppPropsFetching: false,
      }
    },
    setAppPropsFailure (state, action) {
      return {...state, setAppPropsFetching: false, setAppPropsErr: action.err};
    }
  },

}
