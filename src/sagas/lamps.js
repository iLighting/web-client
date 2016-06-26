import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import lampsApi from '../services/lamps';
import lampsActions from '../actions/lamps';
import { message } from 'antd';

function* lampsGet() {
  const data = yield call(lampsApi.lampsGet);
  yield put(lampsActions.lampsGetSuccess(data));
}

function* lampsOneGet(action) {
  const id = action.payload;
  const data = yield call(lampsApi.lampsOneGet, id);
  yield put(lampsActions.lampsOneGetSuccess(id, data));
}

function* watchLampsGet() {
  yield takeLatest("lamps/get", lampsGet);
}

function* watchLampsOneGet() {
  yield takeEvery("lamps/one/get", lampsOneGet);
}

function* watchLampsOneSetLevel() {
  yield takeLatest("lamps/one/set/level", function* (action) {
    const {id, level} = action.payload;
    const data = yield call(lampsApi.lampsOneSetLevel, id, level);
    yield put(lampsActions.lampsOneSetLevelSuccess(data.id, data.level));
  })
}

module.exports = function* () {
  yield [
    fork(watchLampsGet),
    fork(watchLampsOneGet),
    fork(watchLampsOneSetLevel),
  ]
}
