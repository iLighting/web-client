import api from '../services/api';
import { replaceSceneById } from '../utils/scene';

export default {
  namespace: 'staticScene',

  state: {
    list: [],
    listFetching: false,
    listFetchErr: null,
    // set scene
    setSceneFetching: false,
    setSceneErr: null
  },

  subscriptions: {
    setup({dispatch}) {
      dispatch({ type: 'fetchRemote' })
    }
  },

  effects: {
    *fetchRemote ({ payload }, { call, put }) {
      try {
        const staticSceneList = yield call(api.fetchStaticSceneList);
        yield put({
          type: 'fetchRemoteSuccess',
          payload: staticSceneList
        });
      } catch (e) {
        yield put({
          type: 'fetchRemoteFailure',
          err: e.toString()
        });
      }
    },
    *setScene (action, { call, put }) {
      try {
        const [id, scene] = action.payload;
        const newScene = yield call(api.setStaticScene, id, scene);
        yield put({
          type: 'setSceneSuccess',
          payload: newScene
        });
      } catch (e) {
        yield put({
          type: 'setSceneFailure',
          err: e.toString()
        });
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
    // set scene
    setScene (state, action) {
      return {...state, setSceneFetching: true, setSceneErr: null};
    },
    setSceneSuccess (state, action) {
      const scene = action.payload;
      return {...state, list: replaceSceneById(state.list, scene.id, scene), setSceneFetching: false, }
    },
    setSceneFailure (state, action) {
      const scene = action.payload;
      return {...state, setSceneFetching: false, setSceneErr: action.err }
    }
  }
}

