import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const lamps = handleActions({
  ['lamps/get'](state, action) {
    return {...state, loading: true}
  },
  ['lamps/get/success'](state, action) {
    return {...state, loading: false, lamps: action.payload}
  },
  ['lamps/one/get'](state, action) {
    return {...state, loading: true}
  },
  ['lamps/one/get/success'](state, action) {
    const id = action.meta;
    const data = action.payload;
    let n = {...state, loading: false};
    n.lamps[id] = data;
    return n;
  },
  ['lamps/one/set/level'](state) {
    return {...state, loading: true}
  },
  ['lamps/one/set/level/success'](state, action) {
    const {id, level} = action.payload;
    let n = {...state, loading: false};
    n.lamps[id].level = level;
    return n;
  }
}, {
  lamps: {},
  loading: false
});

module.exports = lamps;
