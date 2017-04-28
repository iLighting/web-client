/**
 * 有关占用传感器的信息
 */

export default {

  namespace: 'sensorOccupy',

  state: {
    current: null // [nwk, ep]
  },

  subscriptions: {
    setup({
      dispatch,
      history
    }) {},
  },

  effects: {},

  reducers: {
    selectSensor(state, action) {
      return { ...state,
        current: action.payload
      }
    }
  },

}
