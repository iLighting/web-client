import api from '../services/api';

export default {
  namespace: 'staticSceneEditor',

  state: {
    currentId: ''
  },

  subscriptions: {
    setup({dispatch}) {}
  },

  effects: {},

  reducers: {
    selectScene (state, action) {
      return { ...state, currentId: action.payload };
    },
  }
}
