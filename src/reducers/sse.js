import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const sse = handleActions({
  ['sse/received'](state, action) {
    return {...state, origin: action.payload};
  },
  ['sse/state/change'](state, action) {
    return {...state, state: action.payload};
  }
}, {
  origin: {},
  state: null,
});

module.exports = sse;
