import api from '../../services/api';
import {
  injectModel
} from '../../utils/model';

export default {
  namespace: 'staticSceneChooser',

  state: {
    currentId: '',
    // groups
    groups: [],
    groupsFetching: false,
    groupsErr: null,
    // add group
    groupAdding: false,
    groupAddErr: null,
    // set group
    groupSetting: false,
    groupSetErr: null,
    // del group
    groupDeleting: false,
    groupDeleteErr: null
  },

  subscriptions: {
    setup({
      dispatch
    }) {
      dispatch({
        type: 'fetchGroups'
      })
    }
  },

  reducers: {
    selectGroup(state, action) {
      return { ...state,
        currentId: action.payload
      }
    },
    // groups
    fetchGroups(state, action) {
      return { ...state,
        groupsFetching: true,
        groupsErr: null
      }
    },
    fetchGroupsSuccess(state, action) {
      return { ...state,
        groupsFetching: false,
        groups: action.payload
      }
    },
    fetchGroupsFailure(state, action) {
      return { ...state,
        groupsFetching: false,
        groupsErr: action.err
      }
    },
    // addGroup
    addGroup(state, action) {
      return { ...state,
        groupAdding: true,
        groupAddErr: null
      }
    },
    addGroupSuccess(state, action) {
      const group = action.payload;
      const newGroups = state.groups.concat([group]);
      return { ...state,
        groupAdding: false,
        groups: newGroups
      }
    },
    addGroupFailure(state, action) {
      return { ...state,
        groupAdding: false,
        groupAddErr: action.err
      };
    },
    // setGroup
    setGroup(state, action) {
      return { ...state,
        groupSetting: true,
        groupSetErr: null
      }
    },
    setGroupSuccess(state, action) {
      const group = action.payload;
      const newGroups = state.groups.map(g => g.id === group.id ? group : g);
      return { ...state,
        groupSetting: false,
        groups: newGroups
      }
    },
    setGroupFailure(state, action) {
      return { ...state,
        groupSetting: false,
        groupSetErr: action.err
      };
    },
    // delGroup
    delGroup(state, action) {
      return { ...state,
        groupdeleting: true,
        groupDeleteErr: null
      }
    },
    delGroupSuccess(state, action) {
      const gid = action.payload;
      const newGroups = state.groups.filter(g => g.id !== gid);
      return { ...state,
        groupdeleting: false,
        groups: newGroups
      }
    },
    delGroupFailure(state, action) {
      return { ...state,
        groupdeleting: false,
        groupDeleteErr: action.err
      };
    },
  },

  effects: {
    fetchGroups: function* (action, {
      call,
      put
    }) {
      try {
        const groups = yield call(api.fetchStaticSceneChooserGroups);
        yield put({
          type: 'fetchGroupsSuccess',
          payload: groups
        });
      } catch (e) {
        yield put({
          type: 'fetchGroupsFailure',
          err: e
        })
      }
    },
    addGroup: function* (action, {
      call,
      put
    }) {
      try {
        const {
          name,
          scene,
          timeRange,
          rules
        } = action.payload;
        const group = yield call(api.addStaticSceneChooserGroup, {
          name,
          scene,
          timeRange,
          rules
        });
        yield put({
          type: 'addGroupSuccess',
          payload: group
        })
      } catch (e) {
        yield put({
          type: 'addGroupFailure',
          err: e
        })
      }
    },
    setGroup: function* (action, {
      call,
      put
    }) {
      try {
        const {
          id,
          name,
          scene,
          timeRange,
          rules
        } = action.payload;
        const group = yield call(api.setStaticSceneChooserGroup, {
          id,
          name,
          scene,
          timeRange,
          rules
        });
        yield put({
          type: 'setGroupSuccess',
          payload: { ...group,
            id
          }
        })
      } catch (e) {
        yield put({
          type: 'setGroupFailure',
          err: e
        })
      }
    },
    delGroup: function* (action, {
      call,
      put
    }) {
      try {
        const gid = action.payload;
        yield call(api.deleteStaticSceneChooserGroup, gid);
        yield put({
          type: 'delGroupSuccess',
          payload: gid
        })
      } catch (e) {
        yield put({
          type: 'delGroupFailure',
          err: e
        })
      }
    },
  }
}
