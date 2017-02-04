
/**
 * 有关温度传感器的信息
 */

export default {

  namespace: 'sensorTemperature',

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
