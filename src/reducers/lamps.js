import { handleActions } from 'redux-actions';
import { combineReducer } from 'redux';

const lamps = handleActions({
  ['lamps/list'](state, action) {
    return {...state, loading: true}
  },
  ['lamps/list.success'](state, action) {
    return {...state, loading: false, lamps: action.payload}
  },
  ['lamps/list.failure'](state, action) {
    return {...state, loading: false, err: action.err}
  },
  ['lamps/detail'](state, { payload }) {
    return {...state, currentLoading: true };
  },
  ['lamps/detail.success'](state, { payload }) {
    return {...state, current: payload, currentLoading: false };
  },
  ['lamps/detail.failure'](state, { err }) {
    return {...state, currentLoading: false, err };
  },
  ['lamps/setName'](state, { name }) {
    return {...state, setNameLoading: true};
  },
  ['lamps/setName.success'](state, { payload: detail }) {
    return {...state, setNameLoading: false, current: detail }
  },
  ['lamps/setName.failure'](state, { err }) {
    return {...state, setNameErr: err, setNameLoading: false};
  },
  // set level
  // ------------------------
  ['lamps/setPayload'](state, { payload: level }) {
    return {...state, setPayloadLoading: true};
  },
  ['lamps/setPayload.success'](state, { payload: detail }) {
    return {...state, setPayloadLoading: false, current: detail }
  },
  ['lamps/setPayload.failure'](state, { err }) {
    return {...state, setPayloadErr: err, setPayloadLoading: false};
  }
}, {
  // lamp container
  lamps: [],
  loading: true,
  err: '',
  // lamp current
  current: {},
  currentLoading: true,
  currentErr: '',
  // set name
  setNameLoading: false,
  setNameErr: '',
  // set payload
  setPayloadLoading: false,
  setPayloadErr: '',
});

module.exports = lamps;
