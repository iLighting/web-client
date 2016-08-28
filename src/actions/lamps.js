const { expect } = require('chai');

module.exports = {
  lampsGet: () => ({
    type: "lamps/list"
  }),
  lampsGetSuccess: (data) => {
    return {
      type: "lamps/list.success",
      payload: data
    }
  },
  lampsGetFailure: err => {
    return {
      type: 'lamps/list.failure',
      payload: null,
      err,
    }
  },
  lampsGetDetail: (nwk, ep) => ({
    type: 'lamps/detail',
    payload: {nwk, ep},
  }),
  lampsGetDetailSuccess: detail => ({
    type: 'lamps/detail.success',
    payload: detail,
  }),
  lampsGetDetailFailure: err => ({
    type: 'lamps/detail.failure',
    payload: err
  }),
  lampsSelect: lamp => ({
    type: 'lamps/select',
    payload: lamp,
  }),
  lampsSetName: (nwk, ep, name) => ({
    type: 'lamps/setName',
    payload: {nwk, ep, name}
  }),
  lampsSetNameSuccess: detail => ({
    type: 'lamps/setName.success',
    payload: detail
  }),
  lampsSetNameFailure: err => ({
    type: 'lamps/serName.failure',
    payload: null,
    err
  }),
  // set payload
  // ---------------------------
  lampsSetPayload: (nwk, ep, payload) => ({
    type: 'lamps/setPayload',
    payload: {nwk, ep, payload}
  }),
  lampsSetPayloadSuccess: detail => ({
    type: 'lamps/setPayload.success',
    payload: detail
  }),
  lampsSetPayloadFailure: err => ({
    type: 'lamps/serPayload.failure',
    payload: null,
    err
  }),
}
