
/**
 * 有关灯具的信息
 */

export default {

  namespace: 'lamp',

  state: {
    current: null  // [nwk, ep]
  },

  subscriptions: {
    setup ({ dispatch, history }) {
    },
  },

  effects: {
  },

  reducers: {
    selectLamp (state, action) {
      return {...state, current: action.payload}
    }
  },

}
