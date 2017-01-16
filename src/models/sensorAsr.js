
/**
 * 有关asr的信息
 */

export default {

  namespace: 'sensorAsr',

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
    selectSensor (state, action) {
      return {...state, current: action.payload}
    }
  },

}
