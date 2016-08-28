import { takeLatest, takeEvery } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import lampsApi from '../services/lamps';
import lampsActions from '../actions/lamps';
import { message } from 'antd';

function* lampsGet() {
  try {
    const data = yield call(lampsApi.lampsGet);
    if (data.type !== 'ok') throw new Error(data.err);
    yield put(lampsActions.lampsGetSuccess(data.payload));
  } catch (e) {
    yield put(lampsActions.lampsGetFailure(e));
  }
}

function* watchLampsGet() {
  yield takeLatest("lamps/list", lampsGet);
}

function* watchLampsGetDetail() {
  yield takeEvery("lamps/detail", function * ({payload}) {
    const { nwk, ep } = payload;
    try {
      const detail = yield call(lampsApi.lampsOneGet, nwk, ep);
      if (detail.type !== 'ok') throw new Error(detail.err);
      yield put(lampsActions.lampsGetDetailSuccess(detail.payload));
    } catch (e) {
      yield put(lampsActions.lampsGetDetailFailure(e));
    }
  });
}

function * watchLampsSetName() {
  yield takeLatest('lamps/setName', function * ({ payload }) {
    const { nwk, ep, name } = payload;
    try {
      const detail = yield call(lampsApi.lampsOneSetName, nwk, ep, name);
      if (detail.type !== 'ok') throw new Error(detail.err);
      yield put(lampsActions.lampsSetNameSuccess(detail.payload));
    } catch (e) {
      yield put(lampsActions.lampsSetNameFailure(e));
    }
  });
}

function * watchLampsSetPayload() {
  yield takeLatest('lamps/setPayload', function * ({ payload }) {
    const { nwk, ep, payload: appPayload } = payload;
    try {
      const detail = yield call(lampsApi.lampsOneSetPayload, nwk, ep, appPayload);
      if (detail.type !== 'ok') throw new Error(detail.err);
      yield put(lampsActions.lampsSetPayloadSuccess(detail.payload));
    } catch (e) {
      yield put(lampsActions.lampsSetPayloadFailure(e));
    }
  });
}

module.exports = function* () {
  yield [
    fork(watchLampsGet),
    fork(watchLampsGetDetail),
    fork(watchLampsSetName),
    fork(watchLampsSetPayload),
  ]
}
